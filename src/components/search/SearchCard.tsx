'use client';

import { usePocketbase } from '$/app/pocketbase-provider';
import UserAvatar from '$/components/UserAvatar';
import { Badge } from '$/components/ui/badge';
import { Button } from '$/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$/components/ui/tooltip';
import { getMarketBotDisabledMessage, isMarketBot } from '$/utils/market-bot';
import {
  SearchCategoryOptions,
  SearchConditionOptions,
  SearchResponse,
  UsersResponse,
} from '$/utils/pocketbase/pocketbase-types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AlertCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// Map category options to French labels
const categoryLabels: Record<SearchCategoryOptions, string> = {
  aeg: 'AEG',
  aep: 'AEP',
  gbb: 'GBB',
  gbbr: 'GBBR',
  hpa: 'HPA',
  ptw: 'PTW',
  gear: 'Équipement',
  sniper: 'Sniper',
  shotgun: 'Fusil à pompe',
  other: 'Autre',
};

// Map condition options to French labels
const conditionLabels: Record<SearchConditionOptions, string> = {
  new: 'Neuf',
  like_new: 'Comme neuf',
  very_good: 'Très bon état',
  good_acceptable: 'Bon état / Acceptable',
  any: 'Tous états',
};

interface SearchCardProps {
  search: SearchResponse<string[]> & {
    expand?: {
      user: UsersResponse;
    };
  };
}

export default function SearchCard({ search }: SearchCardProps) {
  const { pb } = usePocketbase();
  const user = search.expand?.user;
  const isBot = user ? isMarketBot(user.id) : false;

  // Format date to French locale
  const formattedDate = search.created ? format(new Date(search.created), 'dd MMMM yyyy', { locale: fr }) : '';

  // Get reference image if available
  const referenceImage =
    search.reference_images && Array.isArray(search.reference_images) && search.reference_images.length > 0
      ? pb.files.getUrl(search, search.reference_images[0], { thumb: '300x300' })
      : null;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column with image if available */}
          {referenceImage && (
            <div className="w-full md:w-1/4">
              <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                <img src={referenceImage} alt={search.title || 'Image de référence'} className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {/* Right column with search details */}
          <div className={`w-full ${referenceImage ? 'md:w-3/4' : ''}`}>
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-semibold">
                <Link href={`/recherches/${search.id}`} className="hover:text-primary">
                  {search.title || 'Recherche sans titre'}
                </Link>
              </h2>

              {search.budget_max && (
                <div className="text-lg font-bold text-primary">
                  Budget: {search.budget_max}€
                  {search.budget_low && <span className="text-sm text-gray-500"> (min: {search.budget_low}€)</span>}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {search.category && (
                <Badge variant="outline" className="bg-gray-100">
                  {categoryLabels[search.category]}
                </Badge>
              )}

              {search.condition &&
                Array.isArray(search.condition) &&
                search.condition.map((cond) => (
                  <Badge key={cond} variant="outline" className="bg-gray-100">
                    {conditionLabels[cond as SearchConditionOptions]}
                  </Badge>
                ))}

              {search.location && (
                <Badge variant="outline" className="bg-gray-100">
                  {search.location}
                </Badge>
              )}
            </div>

            {search.description && (
              <div className="mb-4 text-gray-700 line-clamp-3">{search.description.replace(/<[^>]*>/g, ' ')}</div>
            )}

            <div className="flex justify-between items-center mt-4">
              {/* User info */}
              {user && (
                <div className="flex items-center gap-2">
                  <UserAvatar user={user} size="sm" />
                  <div>
                    <div className="font-medium">{user.name || 'Utilisateur'}</div>
                    <div className="text-xs text-gray-500">Publié le {formattedDate}</div>
                  </div>
                </div>
              )}

              {/* Contact button */}
              {isBot ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Button size="sm" disabled className="flex items-center gap-1 opacity-70">
                          <AlertCircle size={16} />
                          <span>Contacter</span>
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{getMarketBotDisabledMessage('search')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Button size="sm" className="flex items-center gap-1">
                  <MessageSquare size={16} />
                  <span>Contacter</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
