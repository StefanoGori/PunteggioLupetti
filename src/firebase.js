// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUKBpAiJcTeXs78qAsJbK-KLVn4vM6veM",
  authDomain: "punteggiscout.firebaseapp.com",
  databaseURL: "https://punteggiscout-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "punteggiscout",
  storageBucket: "punteggiscout.appspot.com",
  messagingSenderId: "753608102579",
  appId: "1:753608102579:web:03dc186d5adb0e465516c6",
  measurementId: "G-3C3CL2R057"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app);
export default app;