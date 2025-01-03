import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { MessageCircleIcon, ShieldCheckIcon, TimerIcon, ZapIcon } from 'lucide-react';

const features = [
  {
    name: 'Messagerie intégrée',
    description: 'Discutez directement avec les vendeurs depuis la plateforme, sans avoir à partager vos coordonnées.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Réponse rapide',
    description: 'Posez vos questions et obtenez des réponses rapidement pour ne pas manquer une opportunité.',
    icon: ZapIcon,
  },
  {
    name: 'Historique conservé',
    description: 'Retrouvez facilement vos conversations et les détails des transactions passées.',
    icon: TimerIcon,
  },
  {
    name: 'Environnement sécurisé',
    description: 'Échangez en toute sécurité avec des utilisateurs vérifiés dans un cadre modéré.',
    icon: ShieldCheckIcon,
  },
];

export default function MessagingSection() {
  return (
    <div className="py-24 sm:py-32" id="messaging">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Messagerie intégrée</h2>
          <p className="mt-2 font-brand text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Communiquez en toute simplicité
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Notre système de messagerie intégré vous permet de communiquer facilement avec les vendeurs, de négocier et de
            finaliser vos transactions en toute sécurité, directement depuis la plateforme.
          </p>
        </div>

        {/* Example */}
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-muted/50 p-8 ring-1 ring-muted sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="mx-auto max-w-xl lg:mx-0 lg:flex-auto">
            <div className="flex items-center gap-x-2">
              <MessageCircleIcon className="size-5 text-amber-500" />
              <span className="font-semibold text-foreground">Conversation avec AirsoftPro92</span>
            </div>
            <div className="mt-6 space-y-6 text-base leading-7 text-muted-foreground">
              <div className="space-y-4 rounded-lg bg-background/50 p-4">
                <p className="text-sm">
                  <span className="font-semibold text-foreground">Vous :</span> Bonjour, est-ce que la M4 VFC est toujours
                  disponible ?
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-foreground">AirsoftPro92 :</span> Oui, elle est disponible. Je peux vous
                  envoyer plus de photos si vous voulez.
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-foreground">Vous :</span> Ce serait parfait, merci ! Est-ce que le prix est
                  négociable ?
                </p>
              </div>
              <p className="text-sm">
                <span className="font-semibold text-foreground">Dernière activité :</span> Il y a 5 minutes
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <feature.icon className="size-5 flex-none text-amber-500" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
