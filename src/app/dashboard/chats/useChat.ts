import { doc, updateDoc, arrayUnion, Timestamp, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import useSound from 'use-sound';

type UseGetChatArgs = {
  id: string;
  myId: string;
  shouldPlaySound?: boolean;
};

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

export function useChat({ id, myId, shouldPlaySound = true }: UseGetChatArgs) {
  const [_playSend] = useSound('/pop.mp3', { volume: 0.25 });
  const [_playReceived] = useSound('/received.mp3', { volume: 0.25 });

  const playSend = shouldPlaySound ? _playSend : () => {};
  const playReceived = shouldPlaySound ? _playReceived : () => {};

  const firestore = useFirestore();

  const chatRef = doc(firestore, 'chats', id).withConverter<ChatDocument>({
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

  const { data, status } = useFirestoreDocData(chatRef);

  useEffect(() => {
    if (status === 'success' && data?.messages.length) {
      const lastMessage = data.messages[data.messages.length - 1];
      if (lastMessage.userId !== myId) {
        playReceived();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, data, myId]);

  const getNotificationsCount = () => {
    const last = data?.lastSeen?.[myId];

    if (!last) {
      return data?.messages.length;
    }

    return data?.messages.filter((m) => m.timestamp?.seconds > last?.seconds).length;
  };

  const updateLastSeen = async () => {
    const last = data?.lastSeen?.[myId];
    const lastMessage = data?.lastMessage || data?.messages[data?.messages.length - 1];

    if (last && last?.seconds > lastMessage?.timestamp.seconds) {
      return;
    }

    await setDoc(chatRef, { lastSeen: { [myId]: new Date() } }, { merge: true });
  };

  const sendMessage = async (message: string) => {
    playSend();
    const newMessage = {
      userId: myId,
      message,
      timestamp: new Date(),
    };

    await updateDoc(chatRef, {
      messages: arrayUnion(newMessage),
      lastMessage: newMessage,
    });
  };

  return {
    status,
    messages:
      data?.messages.map((m) => {
        return {
          message: m.message,
          mine: m.userId === myId,
          timestamp: m.timestamp,
        };
      }) ?? [],
    sendMessage,
    getNotificationsCount,
    updateLastSeen,
  };
}
