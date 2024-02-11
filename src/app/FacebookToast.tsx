'use client';

import React, { useEffect } from 'react';

import { ToastAction } from '$/components/ui/toast';
import { Toaster } from '$/components/ui/toaster';
import { useToast } from '$/components/ui/use-toast';

function FacebookToast({}: {}) {
  const { toast } = useToast();

  useEffect(() => {
    const t = toast({
      description: (
        <div>
          <svg fill="currentColor" viewBox="0 0 24 24" className="size-8" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
          <p>Pensez à suivre la page Facebook pour être au courant des dernières évolutions !</p>
        </div>
      ),
      action: (
        <ToastAction altText="voir la page" asChild>
          <a href="https://www.facebook.com/people/Airsoft-Marketstore/61555490948439/" target="_blank">
            Voir
          </a>
        </ToastAction>
      ),
    });

    return () => {
      t.dismiss();
    };
  }, []);

  return <Toaster />;
}

export default FacebookToast;
