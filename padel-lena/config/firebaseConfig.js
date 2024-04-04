// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgM_DggijQO6ZXS6pRvO5aTBE3bzM-Kgk",
  authDomain: "padel-lena.firebaseapp.com",
  projectId: "padel-lena",
  storageBucket: "padel-lena.appspot.com",
  messagingSenderId: "499893322525",
  appId: "1:499893322525:web:3c7d209a5f101477ddd7f4",
  measurementId: "G-RD3FK0467P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;