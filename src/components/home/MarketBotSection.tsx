import { Avatar, AvatarFallback, AvatarImage } from '$/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';
import { MARKET_BOT_ID } from '$/utils/market-bot';
import { createStaticClient } from '$/utils/pocketbase/static';
import { Bot, Info } from 'lucide-react';

export default async function MarketBotSection() {
  const pb = await createStaticClient();
  const botId = MARKET_BOT_ID;

  let botProfile;
  try {
    botProfile = await pb.collection('users').getOne(botId);
  } catch (error) {
    console.error('Failed to fetch Market Bot profile:', error);
  }

  return (
    <section className="container">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-2 mb-2">
          {botProfile ? (
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage src={pb.files.getURL(botProfile, botProfile.avatar, { thumb: '100x100' })} alt="Market Bot" />
              <AvatarFallback>
                <Bot className="h-6 w-6 text-primary" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Bot className="h-6 w-6 text-primary" />
          )}
          <h2 className="text-3xl font-bold tracking-tight">Market Bot</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl">Comprendre le fonctionnement de notre robot d'importation d'annonces</p>
      </div>

      <Card className="border-2 border-primary/20 bg-primary/5 max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            <CardTitle>À propos du Market Bot</CardTitle>
          </div>
          <CardDescription>Notre robot qui importe automatiquement des annonces depuis d'autres plateformes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            {botProfile && (
              <div className="hidden sm:block">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={pb.files.getURL(botProfile, botProfile.avatar, { thumb: '200x200' })} alt="Market Bot" />
                  <AvatarFallback>
                    <Bot className="h-8 w-8 text-primary" />
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
            <div>
              <p>
                <span className="font-semibold">Market Bot</span> est notre système automatisé qui importe des annonces depuis
                d'autres plateformes d'airsoft. Ce n'est pas un utilisateur réel et{' '}
                <span className="font-semibold text-primary">il ne répond pas aux messages privés</span>.
              </p>
              {botProfile && <p className="text-sm text-muted-foreground mt-2">ID: {botProfile.id} • Compte système</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Ce que fait Market Bot</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Importe automatiquement des annonces depuis d'autres plateformes</li>
                <li>Met à jour le statut des annonces quand elles sont vendues</li>
                <li>Enrichit notre catalogue pour vous offrir plus de choix</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Comment contacter le vendeur</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Utilisez le lien original de l'annonce fourni dans la description</li>
                <li>Contactez directement le vendeur sur la plateforme d'origine</li>
                <li className="text-red-500">⚠️ N'envoyez pas de messages à Market Bot - ils ne seront jamais lus</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
            <p className="text-sm font-medium flex items-center gap-2">
              <Info className="h-4 w-4" />
              Les annonces importées par Market Bot sont affichées à titre informatif. Nous ne sommes pas responsables des
              transactions effectuées sur d'autres plateformes.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
