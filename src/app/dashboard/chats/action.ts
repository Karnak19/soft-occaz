'use server';

import { redirect } from 'next/navigation';
import { auth as clerkAuth } from '@clerk/nextjs/server';
import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';

import { prisma } from '$/utils/db';
import { sendEmails } from '$/utils/emails';

import { firebaseConfig } from './firebase';

type Args = {
  targetId: string;
  listingTitle?: string;
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

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

  const initialMessage = {
    userId: userId,
    message: `Salut, je suis intéressé par ton annonce: ${listingTitle} 😁`,
    timestamp: new Date(),
  };

  const users = [userId, targetId];
  const messages = [...(listingTitle ? [initialMessage] : [])];

  if (existingChat) {
    const chatId = existingChat.firebaseCollectionId;
    await setDoc(doc(db, 'chats', chatId), { messages, users }, { merge: true });

    redirect(`/dashboard/chats?chat=${chatId}`);
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
      include: { users: true },
    }),
    setDoc(newFirebaseDoc, { messages, users }),
  ]);

  const user = newChat.users.find((u) => u.clerkId === targetId);
  const from = newChat.users.find((u) => u.clerkId === userId);

  if (user?.email && from) {
    await sendEmails.newPrivateMessage({
      user: {
        email: user.email,
        firstName: user.firstName,
        username: user.username ?? undefined,
      },
      from: {
        username: from.username ?? from.firstName,
        avatar: from.avatar ?? undefined,
      },
    });
  }

  redirect(`/dashboard/chats?chat=${newChat.firebaseCollectionId}`);
};
