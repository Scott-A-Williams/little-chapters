/**
 * Little Chapters - Firebase Service Configuration Layer
 *
 * In accordance with project architecture:
 * 1. Credentials are never hard-coded.
 * 2. Loaded exclusively via environment variables (VITE_FIREBASE_*).
 * 3. Gracefully reports unconfigured state during the shell/offline development phase.
 */

import { env } from './env';

export interface FirebaseClientConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

export const firebaseConfig: FirebaseClientConfig = {
  apiKey: env.firebase.apiKey,
  authDomain: env.firebase.authDomain,
  projectId: env.firebase.projectId,
  storageBucket: env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId: env.firebase.appId,
  measurementId: env.firebase.measurementId,
};

/**
 * Checks whether the minimum required Firebase configuration is provided.
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
}

/**
 * Diagnostic status for settings/admin inspection
 */
export function getFirebaseStatus(): {
  configured: boolean;
  projectId?: string;
  authDomain?: string;
  statusText: string;
} {
  const configured = isFirebaseConfigured();
  return {
    configured,
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    statusText: configured
      ? `Connected to Firebase project: ${firebaseConfig.projectId}`
      : 'Running in Local/Offline Shell mode (Firebase env vars not configured yet)',
  };
}
