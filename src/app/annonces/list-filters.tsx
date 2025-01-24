'use client';

import { BarsArrowDownIcon, BarsArrowUpIcon, CalendarIcon, ListBulletIcon, TableCellsIcon } from '@heroicons/react/24/solid';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';

import { Button } from '$/components/ui/button';
import { Card, CardContent, CardHeader } from '$/components/ui/card';
import { Input } from '$/components/ui/input';
import { Label } from '$/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$/components/ui/select';
import { Separator } from '$/components/ui/separator';
import { Slider } from '$/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '$/components/ui/toggle-group';
import { ListRestartIcon } from 'lucide-react';

type ProductsListFilterProps = {
  minPrice: number;
  maxPrice: number;
  total: number;
  current: number;
  totalPages: number;
};

function ProductsListFilter({ minPrice, maxPrice, total, current, totalPages }: ProductsListFilterProps) {
  const [localPriceRange, setLocalPriceRange] = useState([minPrice, maxPrice]);

  const DEFAULT_FILTERS = {
    MIN_PRICE: minPrice,
    MAX_PRICE: maxPrice,
    SORT: 'created-desc',
    LAYOUT: 'grid',
    PER_PAGE: 24,
    PAGE: 1,
    Q: '',
  };

  const [minPriceFilter, setMinPriceFilter] = useQueryState(
    'min',
    parseAsInteger.withDefault(DEFAULT_FILTERS.MIN_PRICE).withOptions({
      history: 'replace',
      throttleMs: 500,
      shallow: false,
    }),
  );

  const [maxPriceFilter, setMaxPriceFilter] = useQueryState(
    'max',
    parseAsInteger.withDefault(DEFAULT_FILTERS.MAX_PRICE).withOptions({
      history: 'replace',
      throttleMs: 500,
      shallow: false,
    }),
  );

  const [sort, setSort] = useQueryState(
    'sort',
    parseAsString.withDefault(DEFAULT_FILTERS.SORT).withOptions({
      history: 'replace',
      shallow: false,
    }),
  );

  const [layout, setLayout] = useQueryState(
    'layout',
    parseAsString.withDefault(DEFAULT_FILTERS.LAYOUT).withOptions({
      history: 'replace',
      shallow: false,
    }),
  );

  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(DEFAULT_FILTERS.PAGE).withOptions({
      history: 'replace',
      shallow: false,
    }),
  );

  const [itemsPerPage, setItemsPerPage] = useQueryState(
    'perPage',
    parseAsInteger.withDefault(DEFAULT_FILTERS.PER_PAGE).withOptions({
      history: 'replace',
      shallow: false,
    }),
  );

  const [q, setQ] = useQueryState(
    'q',
    parseAsString.withDefault(DEFAULT_FILTERS.Q).withOptions({
      history: 'push',
      throttleMs: 1000,
      shallow: false,
    }),
  );

  const handlePriceChange = (value: number[]) => {
    const [min, max] = value;
    setLocalPriceRange(value);
    setMinPriceFilter(min);
    setMaxPriceFilter(max);
    // Reset to page 1 when filters change
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    if (!value) return;
    setSort(value);
    // Reset to page 1 when sorting changes
    setCurrentPage(1);
  };

  const handlePerPageChange = (value: string) => {
    const newPerPage = parseInt(value);
    if (isNaN(newPerPage)) return;
    setItemsPerPage(newPerPage);
    // Reset to page 1 when items per page changes
    setCurrentPage(1);
  };

  return (
    <Card className="bg-background sm:sticky sm:top-0 sm:z-10">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <p>
            {total} annonces trouvées - {current} affichées
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={
                sort === DEFAULT_FILTERS.SORT &&
                itemsPerPage === DEFAULT_FILTERS.PER_PAGE &&
                minPriceFilter === DEFAULT_FILTERS.MIN_PRICE &&
                maxPriceFilter === DEFAULT_FILTERS.MAX_PRICE &&
                q === DEFAULT_FILTERS.Q
                  ? 'outline'
                  : 'destructive'
              }
              size="icon"
              onClick={() => {
                setSort('created-desc');
                setItemsPerPage(24);
                setCurrentPage(1);
                setMinPriceFilter(minPrice);
                setMaxPriceFilter(maxPrice);
                setLocalPriceRange([minPrice, maxPrice]);
                setQ('');
              }}
              title="Réinitialiser les filtres"
            >
              <ListRestartIcon className="size-4" />
              <span className="sr-only">Réinitialiser les filtres</span>
            </Button>
            <Select value={itemsPerPage.toString()} onValueChange={handlePerPageChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Par page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 par page</SelectItem>
                <SelectItem value="24">24 par page</SelectItem>
                <SelectItem value="48">48 par page</SelectItem>
                <SelectItem value="96">96 par page</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>
                ←
              </Button>
              <span className="min-w-12 text-center">
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                →
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col gap-2">
            <Label>Prix</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={minPriceFilter}
                min={0}
                max={maxPrice}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  const min = isNaN(value) ? 0 : value;
                  setMinPriceFilter(min);
                  setCurrentPage(1);
                }}
                className="w-24"
              />
              <span>-</span>
              <Input
                type="number"
                value={maxPriceFilter}
                min={0}
                max={maxPrice}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  const max = isNaN(value) ? 0 : value;
                  setMaxPriceFilter(max);
                  setCurrentPage(1);
                }}
                className="w-24"
              />
            </div>
            <Slider
              defaultValue={[minPrice, maxPrice]}
              value={localPriceRange}
              min={0}
              max={maxPrice + 100}
              onValueChange={setLocalPriceRange}
              onValueCommit={handlePriceChange}
              className="w-72"
            />
          </div>

          <Separator orientation="vertical" className="h-12" />

          <div className="flex flex-col gap-2">
            <Label>Tri</Label>
            <ToggleGroup
              type="single"
              value={sort || undefined}
              onValueChange={handleSortChange}
              className="grid grid-cols-2 gap-1"
            >
              <ToggleGroupItem value="created-desc" size="sm" className="gap-2">
                <CalendarIcon className="size-4" />
                Plus récentes
              </ToggleGroupItem>
              <ToggleGroupItem value="price-asc" size="sm" className="gap-2">
                <BarsArrowUpIcon className="size-4" />
                Prix croissant
              </ToggleGroupItem>
              <ToggleGroupItem value="created-asc" size="sm" className="gap-2">
                <CalendarIcon className="size-4 opacity-50" />
                Plus anciennes
              </ToggleGroupItem>
              <ToggleGroupItem value="price-desc" size="sm" className="gap-2">
                <BarsArrowDownIcon className="size-4" />
                Prix décroissant
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <Separator orientation="vertical" className="h-12" />

          <div className="flex flex-col gap-2">
            <Label>Layout</Label>
            <ToggleGroup
              type="single"
              value={layout || undefined}
              onValueChange={(value) => {
                if (!value) return;
                localStorage.setItem('listings-layout', value);
                setLayout(value);
              }}
            >
              <ToggleGroupItem size="sm" value="list">
                <ListBulletIcon className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem size="sm" value="grid">
                <TableCellsIcon className="size-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <Separator orientation="vertical" className="h-12" />
          <div className="flex flex-col gap-2">
            <Label>Recherche</Label>
            <Input
              type="text"
              placeholder="Filtrer..."
              value={q}
              onChange={(e) => {
                const value = e.target.value;
                // Only trim if the value ends with a space and it's not actively being typed
                const shouldTrim = value.endsWith(' ') && value.length > 1 && value[value.length - 2] === ' ';
                setQ(shouldTrim ? value.replace(/\s+$/, ' ') : value);
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductsListFilter;
