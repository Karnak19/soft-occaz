import useSound from 'use-sound';

export function useMessageSounds() {
  const [playReceived] = useSound('/received.mp3', {
    volume: 1,
  });

  const [playSent] = useSound('/pop.mp3', {
    volume: 1,
  });

  return {
    playMessageReceived: playReceived,
    playMessageSent: playSent,
  };
}
