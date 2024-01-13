import { doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import useSound from 'use-sound';

type UseGetChatArgs = {
  id: string;
  myId: string;
};

type Message = {
  message: string;
  userId: string;
};

type ChatDocument = {
  messages: Message[];
};

export function useChat({ id, myId }: UseGetChatArgs) {
  const [playSend] = useSound('/pop.mp3', {
    volume: 0.25,
  });
  const [playReceived] = useSound('/received.mp3');

  const firestore = useFirestore();

  const chatRef = doc(firestore, 'chats', id).withConverter<ChatDocument>({
    fromFirestore: (snapshot) => {
      const data = snapshot.data();
      return { messages: data?.messages ?? [] };
    },
    toFirestore: (chat) => {
      return { messages: chat.messages };
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

  const sendMessage = async (message: string) => {
    playSend();
    await updateDoc(chatRef, {
      messages: [
        ...data?.messages,
        {
          userId: myId,
          message,
          timestamp: new Date(),
        },
      ],
    });
  };

  return {
    status,
    messages:
      data?.messages.map((m) => {
        return {
          message: m.message,
          mine: m.userId === myId,
        };
      }) ?? [],
    sendMessage,
  };
}
