/**
 * Environment Configuration
 * Safe accessor for Vite environment variables with validation and defaults.
 * Firebase credentials are deliberately optional at this initial shell stage.
 */

export interface AppEnv {
  mode: string;
  isDev: boolean;
  isProd: boolean;
  firebase: {
    apiKey?: string;
    authDomain?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
    measurementId?: string;
  };
}

export const env: AppEnv = {
  mode: import.meta.env.MODE || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || undefined,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || undefined,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || undefined,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || undefined,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || undefined,
    appId: import.meta.env.VITE_FIREBASE_APP_ID || undefined,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
  },
};
