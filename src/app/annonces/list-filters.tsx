'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ListBulletIcon, TableCellsIcon } from '@heroicons/react/24/solid';

import { Badge } from '$/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '$/components/ui/card';
import { Input } from '$/components/ui/input';
import { Label } from '$/components/ui/label';
import { Slider } from '$/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '$/components/ui/toggle-group';

type ProductsListFilterProps = {
  minPrice: number;
  maxPrice: number;
  total: number;
  current: number;
};
function ProductsListFilter({ minPrice, maxPrice, total, current }: ProductsListFilterProps) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const [price, setPrice] = useState({
    min: params.get('min') ? parseInt(params.get('min') as string) : minPrice,
    max: params.get('max') ? parseInt(params.get('max') as string) : maxPrice,
  });

  const commit = (val: number[]) => {
    const [min, max] = val;

    const current = new URLSearchParams(Array.from(params.entries()));

    current.set('min', min.toString());
    current.set('max', max.toString());

    const search = current.toString();

    const query = search ? `?${search}` : '';

    router.push(pathname + query);
  };

  const debounce = (fn: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const debounceCommit = debounce(commit, 500);

  return (
    <Card className="bg-background">
      <CardHeader>
        <p>
          {total} annonces trouvées - {current} affichées
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Prix</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="min">Min</Label>
                <Input
                  id="min"
                  type="number"
                  value={price.min}
                  min={0}
                  max={maxPrice}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    const min = isNaN(value) ? 0 : value;
                    setPrice({ ...price, min });
                    debounceCommit([min, price.max]);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="max">Max</Label>
                <Input
                  id="max"
                  type="number"
                  value={price.max}
                  min={0}
                  max={maxPrice}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    const max = isNaN(value) ? 0 : value;
                    setPrice({ ...price, max });
                    debounceCommit([price.min, max]);
                  }}
                />
              </div>
              <div className="col-span-full">
                <Slider
                  defaultValue={[minPrice, maxPrice]}
                  value={[price.min, price.max]}
                  min={0}
                  max={maxPrice + 100}
                  onValueChange={(value) => {
                    setPrice({ min: value[0], max: value[1] });
                  }}
                  onValueCommit={commit}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle>
                Layout
                <Badge className="ml-2" size="xs" color="primary">
                  new
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid place-items-center gap-3">
              <ToggleGroup
                defaultValue={params.get('layout') ?? 'grid'}
                type="single"
                onValueChange={(value) => {
                  const current = new URLSearchParams(Array.from(params.entries()));
                  current.set('layout', value);
                  const search = current.toString();
                  const query = search ? `?${search}` : '';
                  router.push(pathname + query);
                }}
              >
                <ToggleGroupItem size="lg" value="list">
                  <ListBulletIcon className="size-6" />
                </ToggleGroupItem>
                <ToggleGroupItem size="lg" value="grid">
                  <TableCellsIcon className="size-6" />
                </ToggleGroupItem>
              </ToggleGroup>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductsListFilter;
