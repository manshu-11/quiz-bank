import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC13j7W8hu1ELa8TF7XRlxaDpDxCmUmE50",
  authDomain: "quiz-data-e8967.firebaseapp.com",
  databaseURL: "https://quiz-data-e8967-default-rtdb.firebaseio.com",
  projectId: "quiz-data-e8967",
  storageBucket: "quiz-data-e8967.firebasestorage.app",
  messagingSenderId: "730033720868",
  appId: "1:730033720868:web:01d07ef45bcf63a21dd2b1",
  databaseURL: "https://quiz-data-e8967-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
