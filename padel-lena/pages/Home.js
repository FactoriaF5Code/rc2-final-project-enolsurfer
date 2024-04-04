import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Body from "../components/Body";
import firebaseApp from '../config/firebaseConfig'; 
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router'; 

const HomePage = () => {
  const router = useRouter();
  const auth = getAuth(firebaseApp); 

  useEffect(() => {
    auth.onAuthStateChanged((user) => { 
      if (user) {
        router.push('/reservas');
      }
    });
  }, []);

  const handleReservarClick = () => {
    const user = auth.currentUser;
    if (user) {
      router.push('/reservas');
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
