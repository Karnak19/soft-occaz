'use client';

import { generatePocketbaseFilterAction } from '$/app/actions'; // Import the server action
import { useUser } from '$/app/pocketbase-provider'; // Import the useUser hook
import { useServerActionMutation } from '$/hooks/zsa';
import { motion } from 'framer-motion';
import { LockIcon, SearchIcon, SparklesIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';

export function AiSearchForm() {
  const user = useUser(); // Get current user
  const { mutate, status } = useServerActionMutation(generatePocketbaseFilterAction, {
    onSuccess: (data) => {
      router.push(`/annonces?ai_q=${data?.generatedFilter}`);
    },
  });
  const [prompt, setPrompt] = useState('');
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseenter', handleMouseEnter);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseenter', handleMouseEnter);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    return mutate({ prompt });
  };

  return (
    <section ref={sectionRef} className="py-14 md:py-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 opacity-90" />

      {/* Background pattern using a repeating radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#3730a3_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]" />

      {/* Mouse follower effect */}
      <motion.div
        className="absolute pointer-events-none w-64 h-64 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-[80px]"
        animate={{
          x: mousePosition.x - 128, // Half of the width
          y: mousePosition.y - 128, // Half of the height
          opacity: isHovering ? 0.6 : 0,
          scale: isHovering ? 1 : 0.5,
        }}
        transition={{
          x: { duration: 0.2, ease: 'easeOut' },
          y: { duration: 0.2, ease: 'easeOut' },
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 },
        }}
      />

      {/* Floating circles decoration */}
      <motion.div
        className="absolute top-20 right-[20%] w-64 h-64 rounded-full bg-blue-300 dark:bg-blue-700 blur-3xl opacity-20"
        animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-[15%] w-72 h-72 rounded-full bg-purple-300 dark:bg-purple-700 blur-3xl opacity-20"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-2"
          >
            <SparklesIcon className="h-6 w-6 text-indigo-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
              Recherche Intelligente d'Annonces
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Décrivez l'équipement ou la réplique que vous cherchez en langage naturel, et laissez notre IA trouver les meilleures
            correspondances pour vous.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full relative"
            whileHover={{ scale: 1.02 }}
          >
            <Card className="shadow-xl dark:shadow-indigo-900/20 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader className="pb-0">
                <CardTitle className="text-xl text-center text-indigo-700 dark:text-indigo-400">Recherche IA</CardTitle>
                <CardDescription className="text-center">
                  Ex: "AK47 tactique noir avec rails" ou "Gilet plate carrier multicam taille L"
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {user ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        name="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Que recherchez-vous?"
                        className="pl-10 py-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={status === 'pending'}
                      className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-md transition-all"
                    >
                      {status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 border-t-2 border-white rounded-full animate-spin" />
                          <span>Recherche en cours...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 justify-center">
                          <SparklesIcon className="h-5 w-5" />
                          <span>Rechercher avec IA</span>
                        </div>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/40 p-4 rounded-md">
                      <LockIcon className="h-5 w-5" />
                      <p>Cette fonctionnalité est réservée aux membres, veuillez vous connecter pour utiliser l'IA</p>
                    </div>
                    <Button
                      asChild
                      className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-md transition-all"
                    >
                      <Link href="/sign-in">
                        <div className="flex items-center gap-2 justify-center">
                          <span>Se connecter pour utiliser l'IA</span>
                        </div>
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              {!user && (
                <CardFooter className="pt-0 text-center text-sm text-gray-500">
                  Pas encore inscrit ?{' '}
                  <Link href="/sign-up" className="text-indigo-600 hover:underline ml-1">
                    Créer un compte
                  </Link>
                </CardFooter>
              )}
            </Card>

            {/* Subtle glow effect under the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-30 -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
