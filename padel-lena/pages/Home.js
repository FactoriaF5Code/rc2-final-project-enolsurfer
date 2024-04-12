import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Body from "../components/Body";
import  '../config/firebaseConfig'; 
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router'; 

const HomePage = () => {
  const router = useRouter();
  const auth = getAuth(); 

  useEffect(() => {
    auth.onAuthStateChanged((user) => { 
      if (user) {
        router.push('/reservation');
      }
    });
  }, []);

  const handleReservarClick = () => {
    const user = auth.currentUser;
    if (user) {
      router.push('/reservation');
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <Header />
      <Body>
        <div className={styles.container}>
          <h2>
            ¡Bienvenido a Padel Lena! Donde la pasión por el pádel se encuentra
            con la excelencia en cada juego. Empieza a jugar reservando tu pista
            y descubre la emoción de competir en un ambiente único.
          </h2>
          <button className={styles.button} onClick={handleReservarClick}>
            Reservar ahora
          </button>
        </div>
      </Body>
    </>
  );
};

export default HomePage;
