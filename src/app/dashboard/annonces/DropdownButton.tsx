'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Cog6ToothIcon } from '@heroicons/react/20/solid';
import type { Listing, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useFormStatus } from 'react-dom';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '$/components/ui/alert-dialog';
import { Button } from '$/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '$/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '$/components/ui/dropdown-menu';
import { useToast } from '$/components/ui/use-toast';
import Spinner from '$/components/Spinner';

import { sellListingAction } from './action';

function DropdownButton({ annonce }: { annonce: Listing }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (alertOpen) setDropdownOpen(false);
    else setSelected(null);
  }, [alertOpen]);

  useEffect(() => {
    if (selected) setAlertOpen(true);
    else setDropdownOpen(false);
  }, [selected]);

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Cog6ToothIcon className="size-4 text-muted-foreground" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/annonces/${annonce.id}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Editer
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              className="data-[disabled]:cursor-not-allowed data-[disabled]:text-muted-foreground"
              disabled={annonce.sold}
            >
              Vendre
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <UsersList setSelected={setSelected} />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      {alertOpen && <ConfirmationAlert selected={selected} annonce={annonce} open={alertOpen} onOnpenChange={setAlertOpen} />}
    </>
  );
}

function UsersList({ setSelected }: { setSelected: React.Dispatch<React.SetStateAction<string | null>> }) {
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ['my-contacts'],
    queryFn: () => fetch('/api/users/me/chats/users').then((res) => res.json() as Promise<User[]>),
    enabled: !!user,
  });

  return (
    <Command>
      <CommandInput placeholder="à qui ?" autoFocus />
      <CommandList>
        <CommandEmpty>Personne ne correspond à votre recherche</CommandEmpty>
        {isLoading && (
          <CommandItem disabled className="py-3">
            <Spinner className="size-4 text-foreground" />
            <span className="ml-2">Loading...</span>
          </CommandItem>
        )}
        {data?.map((user) => (
          <CommandItem
            key={user.id}
            value={user.username ? user.username : `${user.firstName} ${user.lastName}`}
            onSelect={(value) => {
              setSelected(value);
            }}
          >
            {user.username ? user.username : `${user.firstName} ${user.lastName}`}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}

function ConfirmationAlert({
  selected,
  annonce,
  open,
  onOnpenChange,
}: {
  selected: string | null;
  annonce: Listing;
  open: boolean;
  onOnpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const { data } = useQuery<User[]>({
    queryKey: ['my-contacts'],
    queryFn: undefined,
  });

  const recipient = data?.find((u) => u.username?.toLowerCase() === selected);

  if (!selected || !recipient) {
    return null;
  }

  const action = sellListingAction.bind(null, {
    listingId: annonce.id,
    recipientId: recipient.id,
  });

  const bindedServerAction = async (fd: FormData) => {
    await action();

    toast({
      variant: 'success',
      title: 'Vendu !',
      description: `L'annonce est désormais marquée comme vendue. ${recipient.username} va recevoir un email afin de vous laisser une évaluation !`,
      duration: 15000,
    });

    onOnpenChange(false);

    router.replace('/dashboard/annonces');
  };

  return (
    <AlertDialog open={open} onOpenChange={onOnpenChange}>
      <AlertDialogContent asChild>
        <form action={bindedServerAction}>
          <AlertDialogHeader>
            <AlertDialogTitle>Vendre {annonce.title}</AlertDialogTitle>
            <AlertDialogDescription>
              Vous êtes sur le point de vendre <span className="text-foreground">{annonce.title}</span> à{' '}
              <span className="text-foreground">{selected}</span>.
            </AlertDialogDescription>
            <AlertDialogDescription>
              Il va recevoir un email lui permettant de vous laisser une évaluation.
            </AlertDialogDescription>
            <AlertDialogDescription>
              Cette action est irréversible. Vous ne pourrez plus modifier cette annonce.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="secondary" type="button">
              Annuler
            </Button>
            <SubmitButtonWithFormStatus />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function SubmitButtonWithFormStatus() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending && <Spinner className="mr-1 size-4" />}
      Vendre
    </Button>
  );
}

export default DropdownButton;
