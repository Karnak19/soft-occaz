'use client';

import { useQueryState } from 'nuqs';

import { Input } from '$/components/ui/input';
import { Label } from '$/components/ui/label';

export function DepartementInput() {
  const [departement, setDepartement] = useQueryState('departement');

  return (
    <div className="grid gap-2">
      <Label htmlFor="departement">Votre département</Label>
      <Input
        id="departement"
        type="number"
        placeholder="75"
        value={departement ?? ''}
        min={1}
        max={999}
        onChange={(e) => setDepartement(e.target.value || null)}
        className="font-mono"
      />
    </div>
  );
}
