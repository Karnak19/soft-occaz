import { EyeIcon } from '@heroicons/react/24/solid';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

import Badge from '$/components/Badge';
import StarsDisplayer from '$/components/StarsDisplayer';
import UserAvatar from '$/components/UserAvatar';
import AnimatedPrice from '$/components/product/AnimatedPrice';
import { Button } from '$/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$/components/ui/table';
import { imgKitUrlThumbnail } from '$/utils/imgKitUrl';
import { ListingsResponse, UsersAverageRatingResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import ChatButton from '../profile/[userId]/chat-button';

type ExpandedUser = UsersResponse<{
  users_average_rating_via_user: UsersAverageRatingResponse<number>[];
}>;

export async function ProductListTable({
  annonces,
}: {
  annonces: ListingsResponse<string[], { user: ExpandedUser }>[];
}) {
  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="w-full rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]" />
              <TableHead>Titre</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Vendeur</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[100px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {annonces.map((props) => {
              const firstImage = props.images?.[0];
              const firstImageUrl = imgKitUrlThumbnail(firstImage);
              const createdRelative = formatDistance(new Date(props.created), new Date(), { addSuffix: true, locale: fr });

              const userRating = props.expand?.user?.expand?.users_average_rating_via_user?.[0]?.average_rating ?? 0;

              return (
                <TableRow key={props.id} className="relative rounded-lg h-[100px] md:h-[200px]">
                  <TableCell className="min-w-[100px] md:min-w-[200px]">
                    <img alt="Product image" className="aspect-square rounded-md object-cover" src={firstImageUrl} />
                  </TableCell>
                  <TableCell className="font-medium md:text-lg">{props.title}</TableCell>
                  <TableCell>
                    <AnimatedPrice price={props.price} />
                  </TableCell>
                  <TableCell>
                    <Badge variant={props.type} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {props.expand?.user && <UserAvatar user={props.expand?.user} size="md" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">{userRating > 0 && <StarsDisplayer average={userRating} size="sm" />}</div>
                  </TableCell>
                  <TableCell>{createdRelative}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button asChild size="sm">
                        <Link href={`/annonces/details/${props.id}`}>
                          <span className="absolute inset-0" />
                          <span className="sr-only" aria-hidden>
                            Voir l&apos;annonce
                          </span>
                          <EyeIcon className="size-4" />
                        </Link>
                      </Button>
                      {props.expand?.user && <ChatButton recipientId={props.expand?.user?.id} />}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
