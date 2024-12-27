import { useState } from 'react';
import type { Listing } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { HandshakeIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';

import { Button } from '$/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '$/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$/components/ui/select';

import { sellListingAction } from './action';

type Props = {
  recipientClerkId: string;
};

export function SellModal({ recipientClerkId }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<string>('');
  const { execute, status } = useAction(sellListingAction);

  const { data: listings = [] } = useQuery<Listing[]>({
    queryKey: ['listings'],
    queryFn: () => fetch('/api/users/me/listings').then((res) => res.json()),
    select: (data) => data.filter((listing) => !listing.sold),
  });

  const handleSell = () => {
    if (!selectedListing) return;

    execute({
      listingId: selectedListing,
      recipientClerkId,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="premium" size="icon">
          <HandshakeIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Vendre un article</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select value={selectedListing} onValueChange={setSelectedListing}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un article à vendre" />
            </SelectTrigger>
            <SelectContent>
              {listings.map((listing) => (
                <SelectItem key={listing.id} value={listing.id} className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    {listing.images[0] && (
                      <img src={listing.images[0]} alt={listing.title} className="object-cover rounded size-8" />
                    )}
                    <div>
                      <p className="font-medium">{listing.title}</p>
                      <p className="text-sm text-gray-500">{listing.price}€</p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSell} disabled={!selectedListing || status === 'executing'}>
            {status === 'executing' ? 'En cours...' : 'Confirmer la vente'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
