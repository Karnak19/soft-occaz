'use client';

import { Bot, SlidersHorizontal, X } from 'lucide-react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useEffect } from 'react';

import { DepartmentCombobox } from '$/components/DepartmentCombobox';
import { Badge } from '$/components/ui/badge';
import { Button } from '$/components/ui/button';
import { Card, CardContent, CardHeader } from '$/components/ui/card';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '$/components/ui/drawer';
import { Input } from '$/components/ui/input';
import { Label } from '$/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '$/components/ui/toggle-group';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';

type ProductsListFilterProps = {
  minPrice: number;
  maxPrice: number;
};

const DEFAULT_FILTERS = {
  MIN_PRICE: 0,
  MAX_PRICE: 10000,
  SORT: 'created-desc',
  LAYOUT: 'list',
  Q: '',
  TYPE: '',
} as const;

const TYPE_OPTIONS = Object.values(ListingsTypeOptions).map((type) => ({
  label: type.toUpperCase(),
  value: type,
}));

function FiltersContent({ minPrice, maxPrice }: ProductsListFilterProps) {
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

  const [q, setQ] = useQueryState(
    'q',
    parseAsString.withDefault(DEFAULT_FILTERS.Q).withOptions({
      history: 'push',
      throttleMs: 1000,
    }),
  );

  const [department, setDepartment] = useQueryState(
    'department',
    parseAsString.withOptions({
      history: 'push',
      throttleMs: 1000,
    }),
  );

  const [hideBot, setHideBot] = useQueryState(
    'hideBot',
    parseAsString.withDefault('false').withOptions({
      history: 'replace',
      shallow: false,
    }),
  );

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const type = params.type as ListingsTypeOptions;
  const setType = (newType: ListingsTypeOptions) => {
    router.push(`/annonces/${newType}?${searchParams.toString()}`);
  };

  // Load layout preference from localStorage on component mount
  useEffect(() => {
    const savedLayout = localStorage.getItem('annonces-layout');
    if (savedLayout && (savedLayout === 'grid' || savedLayout === 'list')) {
      setLayout(savedLayout);
    }
  }, [setLayout, pathname]);

  // Custom handler for layout change to save to localStorage
  const handleLayoutChange = (newLayout: string | null) => {
    if (newLayout) {
      localStorage.setItem('annonces-layout', newLayout);
      setLayout(newLayout);
    } else {
      // If null is passed (which shouldn't happen with ToggleGroup), use the default
      localStorage.setItem('annonces-layout', DEFAULT_FILTERS.LAYOUT);
      setLayout(DEFAULT_FILTERS.LAYOUT);
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between ">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="min-price">Prix min</Label>
          <Input
            id="min-price"
            type="number"
            className="w-24"
            placeholder="0"
            min={minPrice}
            max={maxPrice}
            value={minPriceFilter}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              const min = isNaN(value) ? 0 : value;
              setMinPriceFilter(min);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="max-price">Prix max</Label>
          <Input
            id="max-price"
            type="number"
            className="w-24"
            placeholder="10000"
            min={minPrice}
            max={maxPrice}
            value={maxPriceFilter}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              const max = isNaN(value) ? 0 : value;
              setMaxPriceFilter(max);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="search">Recherche</Label>
          <Input
            id="search"
            type="text"
            className="w-48"
            placeholder="Rechercher..."
            value={q}
            onChange={(e) => {
              const value = e.target.value;
              // Only trim if the value ends with a space and it's not actively being typed
              const shouldTrim = value.endsWith(' ') && value.length > 1 && value[value.length - 2] === ' ';
              setQ(shouldTrim ? value.replace(/\s+$/, ' ') : value);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="department">Département</Label>
          <div className="flex items-center gap-2">
            <DepartmentCombobox
              value={department ?? undefined}
              onValueChange={(value) => setDepartment(value ?? null)}
              className="lg:w-[300px]"
            />
            {department && (
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setDepartment(null)}>
                <X className="size-4" />
                <span className="sr-only">Effacer le département</span>
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={hideBot === 'true' ? 'premium' : 'outline'}
            size="sm"
            className={`relative flex items-center gap-2 border-2 ${hideBot === 'true' ? 'ring-2 ring-amber-400' : ''}`}
            onClick={() => setHideBot(hideBot === 'true' ? 'false' : 'true')}
            aria-pressed={hideBot === 'true'}
          >
            <Bot className="size-4 mr-1" />
            {hideBot === 'true' ? 'Annonces Market Bot masquées' : 'Masquer les annonces Market Bot'}
            <Badge variant="default" size="xs" className="absolute -right-5 -top-3">
              Nouveau
            </Badge>
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ToggleGroup type="single" value={type ?? ''} onValueChange={setType}>
            {TYPE_OPTIONS.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                className="data-[state=on]:bg-primary hover:bg-primary/60 hover:text-white"
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created-desc">Plus récentes</SelectItem>
            <SelectItem value="created-asc">Plus anciennes</SelectItem>
            <SelectItem value="price-desc">Les plus chers</SelectItem>
            <SelectItem value="price-asc">Les moins chers</SelectItem>
          </SelectContent>
        </Select>
        <ToggleGroup type="single" value={layout} onValueChange={handleLayoutChange}>
          <ToggleGroupItem value="grid">Grille</ToggleGroupItem>
          <ToggleGroupItem value="list">Liste</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

function ProductsListFilter(props: ProductsListFilterProps) {
  const [q, setQ] = useQueryState(
    'q',
    parseAsString.withDefault(DEFAULT_FILTERS.Q).withOptions({
      history: 'push',
      throttleMs: 1000,
    }),
  );

  return (
    <>
      {/* Desktop version */}
      <Card className="sticky top-0 z-10 hidden lg:block">
        <CardHeader className="pb-0" />
        <CardContent>
          <FiltersContent {...props} />
        </CardContent>
      </Card>

      {/* Mobile version */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-background p-4 lg:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="size-4" />
              <span className="sr-only">Filtres</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filtres</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <FiltersContent {...props} />
            </div>
          </DrawerContent>
        </Drawer>
        <Input
          type="text"
          className="flex-1"
          placeholder="Rechercher..."
          value={q}
          onChange={(e) => {
            const value = e.target.value;
            // Only trim if the value ends with a space and it's not actively being typed
            const shouldTrim = value.endsWith(' ') && value.length > 1 && value[value.length - 2] === ' ';
            setQ(shouldTrim ? value.replace(/\s+$/, ' ') : value);
          }}
        />
      </div>
    </>
  );
}

export default ProductsListFilter;
