'use client';

import { Cog6ToothIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '$/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '$/components/ui/dropdown-menu';
import { ListingsResponse } from '$/utils/pocketbase/pocketbase-types';

function DropdownButton({ annonce }: { annonce: ListingsResponse<string[]> }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownButton;
