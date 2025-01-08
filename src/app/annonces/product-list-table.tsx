import { ChatBubbleBottomCenterIcon, EyeIcon } from '@heroicons/react/24/solid';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

import Badge from '$/components/Badge';
import UserAvatar from '$/components/UserAvatar';
import AnimatedPrice from '$/components/product/AnimatedPrice';
import { Button } from '$/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$/components/ui/table';
import { imgKitUrlThumbnail } from '$/utils/imgKitUrl';
import { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

export async function ProductListTable({ annonces }: { annonces: ListingsResponse<string[], { user: UsersResponse }>[] }) {
  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="w-full rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]" />
              <TableHead>Titre</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Vendeur</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[100px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {annonces.map((props) => {
              const firstImage = props.images?.[0];
              const firstImageUrl = imgKitUrlThumbnail(firstImage);

              const createdRelative = formatDistance(new Date(props.created), new Date(), { addSuffix: true, locale: fr });

              return (
                <TableRow key={props.id} className="relative rounded-lg">
                  <TableCell className="min-w-[100px]">
                    <img
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="80"
                      src={firstImageUrl}
                      width="80"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{props.title}</TableCell>
                  <TableCell>
                    <AnimatedPrice price={props.price} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {props.expand?.user && <UserAvatar user={props.expand?.user} size="md" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={props.type} />
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
                      <Button size="sm" variant="outline" disabled>
                        <ChatBubbleBottomCenterIcon className="mr-1 size-4" />
                        Chat
                      </Button>
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
