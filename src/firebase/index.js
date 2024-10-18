import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbpB_0BTahJ1OovRzryX4PjCjuTHmJ3Yk",
  authDomain: "week7-shekah.firebaseapp.com",
  projectId: "week7-shekah",
  storageBucket: "week7-shekah.appspot.com",
  messagingSenderId: "705789426432",
  appId: "1:705789426432:web:fd6d6f2d3c0dd86b3bd1e5"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
export { db, auth };