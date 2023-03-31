'use client';

import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { PocketProvider } from '$/components/PocketContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PocketProvider>
        {children}

        <ToastContainer
          {...{
            position: 'bottom-right',
            hideProgressBar: true,
            closeButton: false,
            theme: 'dark',
            toastClassName: 'bg-rg-darkest border-rg-light text-rg-light border',
          }}
        />
      </PocketProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
