'use client';

import { useQueryState } from 'nuqs';

import { Input } from '$/components/ui/input';
import { Label } from '$/components/ui/label';

export function ReferralCodeInput() {
  const [code, setCode] = useQueryState('code');

  return (
    <div className="grid gap-2">
      <Label htmlFor="referral_code">Code de parrainage (optionnel)</Label>
      <Input
        id="referral_code"
        type="text"
        placeholder="abc123"
        value={code ?? ''}
        onChange={(e) => setCode(e.target.value || null)}
        className="font-mono"
      />
    </div>
  );
}
