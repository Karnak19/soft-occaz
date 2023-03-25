'use client';

import { Record, RecordAuthResponse } from 'pocketbase';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { pb as _pb } from '$/utils/pocketbase';
import { Collections, UsersRecord } from '$/utils/pocketbase-types';

type PocketContextType = {
  pb: typeof _pb;
  token: string | null;
  user: Record;
  register: (data: { email: string; password: string; passwordConfirm: string; name: string }) => Promise<UsersRecord>;
  login: (email: string, password: string) => Promise<RecordAuthResponse<UsersRecord>>;
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
      const reg = await pb.collection(Collections.Users).create<UsersRecord>(data);
      toast(
        `Welcome ${reg.name} 👋
      Check your emails to validate your account !`,
        {
          className: 'bg-zinc-800 border-lime-300 border',
        },
      );
      return reg;
    },
    [pb],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const log = await pb.collection(Collections.Users).authWithPassword<UsersRecord>(email, password);

      toast(`Hello ${log.record.name} 👋`, {
        className: 'bg-zinc-800 border-lime-300 border',
      });

      return log;
    },
    [pb],
  );

  const logout = useCallback(() => {
    toast(`Goodbye ${user?.name} 👋`, {
      className: 'bg-zinc-800 border-red-300 border',
    });
    pb.authStore.clear();
  }, [pb]);

  return (
    <PocketContext.Provider value={{ register, login, logout, user: user as Record, token, pb }}>
      {children}
    </PocketContext.Provider>
  );
}

export const usePocket = () => useContext(PocketContext);
