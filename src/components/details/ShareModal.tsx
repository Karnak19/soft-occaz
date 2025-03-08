import { XCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

import { Card } from '../ui/card';

const MotionCard = motion(Card);

interface ShareModalProps {
  title: string;
  onClose: () => void;
}

export default function ShareModal({ title, onClose }: ShareModalProps) {
  const getShareUrl = () => {
    if (typeof window === 'undefined') return '';
    return `https://airsoftmarket.fr${window.location.pathname}`;
  };

  const handleShare = (platform: 'facebook' | 'x' | 'discord' | 'copy') => {
    const url = getShareUrl();

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'x':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          '_blank',
        );
        break;
      case 'discord':
        const discordMessage = `${title}\n${url}`;
        window.open(`https://discord.com/channels/@me?message=${encodeURIComponent(discordMessage)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        onClose();
        break;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-51 grid place-items-center bg-black/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MotionCard
        className="w-full max-w-md overflow-auto p-6"
        initial={{ y: 100, opacity: 0, scale: 0.1 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <div>
          <button type="button" className="p-4 md:p-0" onClick={onClose}>
            <span className="sr-only">Close</span>
            <XCircleIcon className="size-8 text-muted-foreground hover:text-foreground" aria-hidden="true" />
          </button>
        </div>

        <h3 className="mb-4 text-lg font-medium">Partager l&apos;annonce</h3>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleShare('facebook')}
            className="w-full rounded-md bg-[#1877f2] px-4 py-2 text-white hover:bg-[#1877f2]/90"
          >
            Partager sur Facebook
          </button>
          <button onClick={() => handleShare('x')} className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-black/90">
            Partager sur X
          </button>
          <button
            onClick={() => handleShare('discord')}
            className="w-full rounded-md bg-[#5865F2] px-4 py-2 text-white hover:bg-[#5865F2]/90"
          >
            Partager sur Discord
          </button>
          <button
            onClick={() => handleShare('copy')}
            className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Copier le lien
          </button>
          <button onClick={onClose} className="w-full rounded-md border border-muted px-4 py-2 hover:bg-muted">
            Fermer
          </button>
        </div>
      </MotionCard>
    </motion.div>
  );
}
