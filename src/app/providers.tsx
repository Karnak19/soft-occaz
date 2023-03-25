'use client';

import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { PocketProvider } from '$/components/PocketContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PocketProvider>
        {children}

        <ToastContainer
          {...{
            position: 'bottom-center',
            hideProgressBar: true,
            closeButton: false,
            theme: 'dark',
          }}
        />
      </PocketProvider>
    </QueryClientProvider>
  );
}
