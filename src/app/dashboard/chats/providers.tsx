'use client';

import { getFirestore } from 'firebase/firestore';
import { FirebaseAppProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';

import { firebaseConfig } from './firebase';
import type { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Firestore>{children}</Firestore>
    </FirebaseAppProvider>
  );
}

function Firestore({ children }: PropsWithChildren) {
  const firestoreInstance = getFirestore(useFirebaseApp());

  return <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>;
}
