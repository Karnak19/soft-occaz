'use server';

import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { firebaseConfig } from './firebase';
import { prisma } from '$/utils/db';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';
import { initializeApp } from 'firebase/app';
import { redirect } from 'next/navigation';

type Args = {
  targetId: string;
  listingTitle?: string;
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createChatAction = async ({ targetId, listingTitle }: Args) => {
  const user = await getClerkUserFromDb();

  const existingChat = await prisma.usersChat.findFirst({
    where: {
      AND: [{ users: { some: { id: user.id } } }, { users: { some: { id: targetId } } }],
    },
  });

  if (existingChat) {
    await setDoc(
      doc(db, 'chats', existingChat.firebaseCollectionId),
      {
        messages: [
          ...(listingTitle
            ? [
                {
                  userId: user.id,
                  message: `Salut, je suis intéressé par ton annonce: ${listingTitle} 😁`,
                  timestamp: new Date(),
                },
              ]
            : []),
        ],
        users: [user.id, targetId],
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
          connect: [{ id: user.id }, { id: targetId }],
        },
      },
    }),
    setDoc(newFirebaseDoc, {
      messages: [
        ...(listingTitle
          ? [
              {
                userId: user.id,
                message: `Salut, je suis intéressé par ton annonce: ${listingTitle} 😁`,
                timestamp: new Date(),
              },
            ]
          : []),
      ],
    }),
  ]);

  redirect(`/dashboard/chats?chat=${newChat.firebaseCollectionId}`);
};
