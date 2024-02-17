import Link from 'next/link';
import { ChatBubbleBottomCenterIcon, EyeIcon, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Prisma } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

import { cn } from '$/utils/cn';
import { imgKitUrlThumbnail } from '$/utils/imgKitUrl';
import { Avatar, AvatarFallback, AvatarImage } from '$/components/ui/avatar';
import { Button } from '$/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$/components/ui/table';
import Badge from '$/components/Badge';
import AnimatedPrice from '$/components/product/AnimatedPrice';

export async function ProductListTable({
  annonces,
}: {
  annonces: Prisma.ListingGetPayload<{
    include: { user: { include: { ratings: true } } };
  }>[];
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
              <TableHead>Vendeur</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[100px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {annonces.map((props) => {
              const firstImage = props.images[0];
              const firstImageUrl = imgKitUrlThumbnail(firstImage);

              const role = props.user.sub;

              const average = props.user.ratings.reduce((acc, { rating }) => acc + rating, 0) / props.user.ratings.length;

              const createdRelative = formatDistance(new Date(props.createdAt), new Date(), { addSuffix: true, locale: fr });

              return (
                <TableRow
                  key={props.id}
                  className={cn('relative rounded-lg', {
                    'bg-gradient-to-r from-violet-500/20': role === 'GEARDO',
                    'bg-gradient-to-r from-amber-400/40': role === 'PREMIUM',
                  })}
                >
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
                      <Avatar className="size-8">
                        {props.user.avatar && <AvatarImage alt="Seller Avatar" src={props.user.avatar} />}
                        <AvatarFallback>{props.user.firstName[0]}</AvatarFallback>
                      </Avatar>
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIconSolid
                          key={rating}
                          className={cn('size-4 shrink-0', rating < average ? 'text-yellow-400' : 'text-gray-400')}
                          aria-hidden="true"
                        />
                      ))}
                      <div className="flex items-center gap-1">
                        {/* <StarIcon className="size-4 fill-primary" />
                          <StarIcon className="size-4 fill-primary" />
                          <StarIcon className="size-4 fill-primary" />
                          <StarIcon className="size-4 fill-primary" />
                          <StarIcon className="size-4 fill-primary" /> */}
                      </div>
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
