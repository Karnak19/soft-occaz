'use client';

import { Record, RecordAuthResponse } from 'pocketbase';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { pb as _pb } from '$/utils/pocketbase';
import { Collections } from '$/utils/pocketbase-types';

type PocketContextType = {
  pb: typeof _pb;
  token: string | null;
  user: Record;
  register: (data: { email: string; password: string; passwordConfirm: string; name: string }) => Promise<Record>;
  login: (email: string, password: string) => Promise<RecordAuthResponse<Record>>;
  logout: () => void;
};

const PocketContext = createContext<PocketContextType>({} as PocketContextType);

export function PocketProvider({ children }: { children: React.ReactNode }) {
  const pb = useMemo(() => _pb, []);

  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const register = useCallback(
    async (data: Parameters<PocketContextType['register']>[0]) => {
      return await pb.collection(Collections.Users).create(data);
    },
    [pb],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      return await pb.collection(Collections.Users).authWithPassword(email, password);
    },
    [pb],
  );

  const logout = useCallback(() => {
    pb.authStore.clear();
  }, [pb]);

  return (
    <PocketContext.Provider value={{ register, login, logout, user: user as Record, token, pb }}>
      {children}
    </PocketContext.Provider>
  );
}

export const usePocket = () => useContext(PocketContext);
