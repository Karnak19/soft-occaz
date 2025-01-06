'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckIcon, CopyIcon, UserIcon } from 'lucide-react';

import { Collections, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { useServerActionMutation } from '$/hooks/zsa';
import { Avatar, AvatarFallback, AvatarImage } from '$/components/ui/avatar';
import { Button } from '$/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';
import { Input } from '$/components/ui/input';
import { Label } from '$/components/ui/label';
import { useToast } from '$/components/ui/use-toast';
import { usePocketbase } from '$/app/pocketbase-provider';

import { generateReferralCodeAction } from './actions';

interface ReferralCardProps {
  user: UsersResponse;
}

export function ReferralCard({ user }: ReferralCardProps) {
  const { toast } = useToast();
  const { pb } = usePocketbase();
  const [isCopied, setIsCopied] = useState<'code' | 'url' | null>(null);

  const { mutate: generateCode, isPending } = useServerActionMutation(generateReferralCodeAction, {
    onSuccess: () => {
      toast({
        title: 'Code généré !',
        description: 'Votre code de parrainage a été généré avec succès.',
      });
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la génération du code de parrainage.',
        variant: 'destructive',
      });
    },
  });

  const { data: referredUsers } = useQuery({
    queryKey: ['referred-users', user.id],
    queryFn: () =>
      pb.collection(Collections.Users).getList<UsersResponse>(1, 50, {
        filter: `referrer = "${user.id}"`,
        sort: '-created',
      }),
    enabled: Boolean(user.referral_code),
  });

  const handleCopy = async (type: 'code' | 'url') => {
    const textToCopy = type === 'code' ? user.referral_code : `${window.location.origin}/sign-up?code=${user.referral_code}`;

    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(type);
    toast({
      title: 'Copié !',
      description:
        type === 'code'
          ? 'Le code de parrainage a été copié dans votre presse-papier.'
          : 'Le lien de parrainage a été copié dans votre presse-papier.',
    });

    setTimeout(() => setIsCopied(null), 2000);
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Code de parrainage</CardTitle>
        <CardDescription>Partagez ce code avec vos amis pour les inviter sur la plateforme</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {user.referral_code ? (
          <>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="referral_code">Code</Label>
                <div className="flex gap-2">
                  <Input id="referral_code" value={user.referral_code} readOnly className="font-mono" />
                  <Button onClick={() => handleCopy('code')} variant="outline" size="icon">
                    {isCopied === 'code' ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="referral_url">Lien de parrainage</Label>
                <div className="flex gap-2">
                  <Input
                    id="referral_url"
                    value={`${window.location.origin}/sign-up?code=${user.referral_code}`}
                    readOnly
                    className="font-mono"
                  />
                  <Button onClick={() => handleCopy('url')} variant="outline" size="icon">
                    {isCopied === 'url' ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Utilisateurs parrainés ({referredUsers?.totalItems ?? 0})</Label>
              {referredUsers?.items.length ? (
                <div className="grid gap-2">
                  {referredUsers.items.map((referredUser) => (
                    <div key={referredUser.id} className="flex items-center gap-2 rounded-lg border p-2">
                      <Avatar className="size-8">
                        <AvatarFallback>
                          <UserIcon className="size-4" />
                        </AvatarFallback>
                        {referredUser.avatar && (
                          <AvatarImage src={pb.files.getURL(referredUser, referredUser.avatar)} alt={referredUser.name} />
                        )}
                      </Avatar>
                      <div className="grid flex-1">
                        <span className="text-sm font-medium">{referredUser.name || referredUser.email}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(referredUser.created).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Aucun utilisateur parrainé pour le moment</p>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">Vous n&apos;avez pas encore de code de parrainage</p>
            <Button onClick={() => generateCode({})} disabled={isPending}>
              {isPending ? 'Génération...' : 'Générer un code'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
