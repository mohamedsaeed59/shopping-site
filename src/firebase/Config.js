import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBPE_PB0zq9P0ZSlaKDHneHhBMDyAWAVzs",
  authDomain: "shopping-site-955af.firebaseapp.com",
  projectId: "shopping-site-955af",
  storageBucket: "shopping-site-955af.appspot.com",
  messagingSenderId: "946934535328",
  appId: "1:946934535328:web:970161f9b27bcbbaa6a5c5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;