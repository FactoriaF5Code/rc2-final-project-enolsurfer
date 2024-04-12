import React from 'react';
import '../src/app/globals.css';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


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
const auth = getAuth(app);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} auth={auth}/>
}

export default MyApp;