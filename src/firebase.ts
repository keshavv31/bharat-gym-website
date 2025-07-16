import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYBkHziMTh2hfVyMfVE6zZQjkZH7CFCe8",
  authDomain: "bharatgym-afc2a.firebaseapp.com",
  projectId: "bharatgym-afc2a",
  storageBucket: "bharatgym-afc2a.appspot.com",
  messagingSenderId: "932183102019",
  appId: "1:932183102019:web:7fe7bb412519fd7754baf6",
  measurementId: "G-9EXCGNC58L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; 