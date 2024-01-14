'use client';

import type { PropsWithChildren } from 'react';
import { getFirestore } from 'firebase/firestore';
import { AuthProvider, FirebaseAppProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';

import { firebaseConfig } from './firebase';
import { getAuth } from 'firebase/auth';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Firestore>{children}</Firestore>
    </FirebaseAppProvider>
  );
}

function Firestore({ children }: PropsWithChildren) {
  const firestoreInstance = getFirestore(useFirebaseApp());
  const auth = getAuth(useFirebaseApp());

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
    </AuthProvider>
  );
}
