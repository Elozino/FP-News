// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyAMmJb8s480zWdT1tFra_uJzNaG0Su46s4",
  authDomain: "fp-news-c3cbf.firebaseapp.com",
  projectId: "fp-news-c3cbf",
  storageBucket: "fp-news-c3cbf.appspot.com",
  messagingSenderId: "751970636669",
  appId: "1:751970636669:web:5b6a71b0a712a60af9b214",
  measurementId: "G-5G0XH86FD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
// export const remoteConfig = getRemoteConfig(app);
