// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// API URLs
const NEXT_PUBLIC_FIREBASE_CONFIG = process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '';
export const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || '';
export const NEXT_PUBLIC_WS_URL = process.env.NEXT_PUBLIC_WS_URL || '';

const app = initializeApp(JSON.parse(NEXT_PUBLIC_FIREBASE_CONFIG));
const auth = getAuth(app);

export { auth };
export default app;
