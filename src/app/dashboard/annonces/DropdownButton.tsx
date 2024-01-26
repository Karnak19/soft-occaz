'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Cog6ToothIcon } from '@heroicons/react/20/solid';
import type { Listing, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import Spinner from '$/components/Spinner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
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
            <DropdownMenuSubTrigger>Vendre</DropdownMenuSubTrigger>
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
  if (!selected) {
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={onOnpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Vendre {annonce.title}</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de vendre <span className="text-foreground">{annonce.title}</span> à{' '}
            <span className="text-foreground">{selected}</span>.
          </AlertDialogDescription>
          <AlertDialogDescription>Il va recevoir un email lui permettant de vous laisser une évaluation.</AlertDialogDescription>
          <AlertDialogDescription>
            Cette action est irréversible. Vous ne pourrez plus modifier cette annonce.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction disabled>Vendre (coming soon)</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DropdownButton;
