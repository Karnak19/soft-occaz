import { NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, Timestamp } from 'firebase/firestore';

import { checkSecret } from '$/utils/check-secret';
import { prisma } from '$/utils/db';
import { sendEmails } from '$/utils/emails';
import { firebaseConfig } from '$/app/dashboard/chats/firebase';

export const revalidate = 0;

const firestore = getFirestore(initializeApp(firebaseConfig));

type Message = {
  message: string;
  userId: string;
  timestamp: Timestamp;
};

export type RenderableMessage = {
  message: string;
  mine: boolean;
  timestamp: Timestamp;
};

type ChatDocument = {
  messages: Message[];
  lastMessage?: Message;
  users: [string, string];
  lastSeen?: {
    [key: string]: Timestamp;
  };
};

const getChatsWithUsers = async () => {
  return prisma.usersChat.findMany({
    select: {
      firebaseCollectionId: true,
      users: true,
    },
  });
};

const getFirebaseChat = async (chatId: string) => {
  const document = doc(firestore, 'chats', chatId).withConverter<ChatDocument>({
    fromFirestore: (snapshot) => {
      const data = snapshot.data();
      return {
        messages: data?.messages ?? [],
        lastMessage: data?.lastMessage,
        users: data?.users ?? [],
        lastSeen: data?.lastSeen,
      };
    },
    toFirestore: (chat) => {
      return chat;
    },
  });

  return getDoc(document);
};

const shouldSendNotification = (chat: ChatDocument, userId: string) => {
  const lastSeen = chat.lastSeen?.[userId];

  if (!lastSeen) {
    return false;
  }

  const lastMessage = chat.lastMessage ?? chat.messages[chat.messages.length - 1];

  return lastMessage.userId !== userId && lastMessage.timestamp.seconds > lastSeen.seconds;
};

function truthy<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export async function GET(request: Request) {
  try {
    const secret = new URL(request.url).searchParams.get('secret');
    checkSecret(secret);
  } catch (error) {
    return new Response('Unauthorized', { status: 401 });
  }

  const chats = await getChatsWithUsers();

  const firebaseChats = await Promise.all(
    chats.map((chat) => {
      return getFirebaseChat(chat.firebaseCollectionId);
    }),
  );

  const usersWhoNeedNotifications = firebaseChats
    .map((chat, index) => {
      if (!chat.exists()) {
        return null;
      }

      const [user1, user2] = chats[index].users;

      if (shouldSendNotification(chat.data(), user1.id)) {
        return user1;
      }

      if (shouldSendNotification(chat.data(), user2.id)) {
        return user2;
      }

      return null;
    })
    .filter(truthy);

  usersWhoNeedNotifications.forEach((user) => {
    if (!user.email) {
      return;
    }
    sendEmails.newPrivateMessage({
      user: {
        username: user.username ?? user.firstName,
        firstName: user.firstName,
        email: user.email,
      },
    });
  });

  return NextResponse.json({ mailed: usersWhoNeedNotifications.map((user) => user.username) });
}
