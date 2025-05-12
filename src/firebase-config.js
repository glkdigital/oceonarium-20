import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA01UIqGJd_umcui8D1MVVBoemw3q5garU",
  authDomain: "oceonarium-25-05.firebaseapp.com",
  projectId: "oceonarium-25-05",
  storageBucket: "oceonarium-25-05.firebasestorage.app",
  messagingSenderId: "822376120824",
  appId: "1:822376120824:web:670cf54ebe76216315960d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };