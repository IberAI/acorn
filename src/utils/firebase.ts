
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  logEvent(analytics, 'sign_up', { method: 'email' });
  return userCredential;
};

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  logEvent(analytics, 'login', { method: 'email' });
  return userCredential;
};

export const logOut = async () => {
  await signOut(auth);
  logEvent(analytics, 'logout');
};

export const addEmailToFirestore = async (email: string) => {
  const docRef = await addDoc(collection(db, 'newsletterSubscribers'), {
    email,
    subscribedAt: new Date(),
  });
  logEvent(analytics, 'newsletter_subscribed', { email });
  return docRef.id;
};

export { auth, db };

