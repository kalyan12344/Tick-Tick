import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6E092umarIDjoFb-lm5IOpLzh5TAYF-I",
  authDomain: "todo-6b22a.firebaseapp.com",
  projectId: "todo-6b22a",
  storageBucket: "todo-6b22a.appspot.com",
  messagingSenderId: "42309838398",
  appId: "1:42309838398:web:18474b047afceb24ea136f",
  measurementId: "G-RSN1R4YNGF",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
