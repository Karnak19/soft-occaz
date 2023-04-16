'use client';

import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

function Warning() {
  const [opened, setOpened] = useState(true);

  if (!opened) {
    return null;
  }

  return (
    <div className="mx-auto w-1080 py-5">
      <div className="rounded-2xl bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className=" font-medium text-yellow-800">Attention</h3>
            <div className="mt-2  text-yellow-700">
              <p>
                Bonjour et bienvenue sur Airsoft-Market ! Nous sommes actuellement en cours de développement pour vous offrir la
                meilleure expérience possible. Nous travaillons dur pour rendre notre plateforme disponible dans les plus brefs
                délais. Merci de votre patience et n&apos;hésitez pas à nous contacter si vous avez des questions ou des
                suggestions.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button onClick={() => setOpened(false)}>
              <XMarkIcon className="h-5 w-5 text-yellow-800" aria-hidden="true" />
              <span aria-hidden className="sr-only">
                close
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Warning;
