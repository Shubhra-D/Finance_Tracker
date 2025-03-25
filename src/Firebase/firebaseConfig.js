// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth , GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR0l3c8M8wCN40-Lyu_GBqDXDipEHf7a4",
  authDomain: "finance-tracker-a4a36.firebaseapp.com",
  projectId: "finance-tracker-a4a36",
  storageBucket:"finance-tracker-a4a36.firebasestorage.appspot.com",
  messagingSenderId: "329712276120",
  appId:"1:329712276120:web:661ecb81a89484a6bc76ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);