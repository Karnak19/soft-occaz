'use server';

import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { firebaseConfig } from './firebase';
import { prisma } from '$/utils/db';
import { initializeApp } from 'firebase/app';
import { redirect } from 'next/navigation';
import { auth as clerkAuth } from '@clerk/nextjs/server';

type Args = {
  targetId: string;
  listingTitle?: string;
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createChatAction = async ({ targetId, listingTitle }: Args) => {
  const {
    userId,
    // getToken
  } = await clerkAuth();

  if (!userId) {
    redirect('/sign-in');
  }

  // TODO: Fix this
  // const token = await getToken({ template: 'integration_firebase' });
  // console.log('🚀 ~ createChatAction ~ token:', token);

  // if (!token) {
  //   throw new Error('No token');
  // }

  const [existingChat] = await Promise.all([
    prisma.usersChat.findFirst({
      where: {
        AND: [{ users: { some: { clerkId: userId } } }, { users: { some: { clerkId: targetId } } }],
      },
    }),
    // signInWithCustomToken(auth, token),
  ]);

  if (existingChat) {
    await setDoc(
      doc(db, 'chats', existingChat.firebaseCollectionId),
      {
        messages: [
          ...(listingTitle
            ? [
                {
                  userId: userId,
                  message: `Salut, je suis intéressé par ton annonce: ${listingTitle} 😁`,
                  timestamp: new Date(),
                },
              ]
            : []),
        ],
        users: [userId, targetId],
      },
      { merge: true },
    );

    redirect(`/dashboard/chats?chat=${existingChat.firebaseCollectionId}`);
  }

  const newFirebaseDoc = doc(collection(db, 'chats'));

  const [newChat] = await Promise.all([
    prisma.usersChat.create({
      data: {
        firebaseCollectionId: newFirebaseDoc.id,
        users: {
          connect: [{ clerkId: userId }, { clerkId: targetId }],
        },
      },
    }),
    setDoc(newFirebaseDoc, {
      messages: [
        ...(listingTitle
          ? [
              {
                userId: userId,
                message: `Salut, je suis intéressé par ton annonce: ${listingTitle} 😁`,
                timestamp: new Date(),
              },
            ]
          : []),
      ],
      users: [userId, targetId],
    }),
  ]);

  redirect(`/dashboard/chats?chat=${newChat.firebaseCollectionId}`);
};
