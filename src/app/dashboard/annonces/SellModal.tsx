import { useQuery } from '@tanstack/react-query';
import { HandshakeIcon } from 'lucide-react';
import { useState } from 'react';

import { usePocketbase, useUser } from '$/app/pocketbase-provider';
import { Button } from '$/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '$/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$/components/ui/select';
import { toast } from '$/components/ui/use-toast';
import { useServerActionMutation } from '$/hooks/zsa';
import { ListingsResponse } from '$/utils/pocketbase/pocketbase-types';

import { sellListingAction } from './actions';

type Props = {
  recipientId: string;
};

export function SellModal({ recipientId }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<string>('');
  const { pb } = usePocketbase();
  const user = useUser();
  const { mutate, status } = useServerActionMutation(sellListingAction, {
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Votre article a été vendu',
        description: 'Vous pouvez maintenant voir le statut de votre vente dans votre profil',
      });
    },
  });

  const { data: listings = [] } = useQuery({
    queryKey: ['listings'],
    queryFn: () =>
      pb.collection('listings').getFullList<ListingsResponse<string[]>>({
        filter: `user = "${user.id}"`,
      }),
  });

  const handleSell = () => {
    if (!selectedListing) return;

    mutate({
      listingId: selectedListing,
      recipientId,
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
                    {listing.images?.[0] && (
                      <img src={listing.images[0]} alt={listing.title} className="size-8 rounded object-cover" />
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
          <Button onClick={handleSell} disabled={!selectedListing || status === 'pending'}>
            {status === 'pending' ? 'En cours...' : 'Confirmer la vente'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
