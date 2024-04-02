import React from "react";
import Link from "next/link"; // Importa el componente Link
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Body from "../components/Body";

const HomePage = () => {
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
          <Link href="/reservas" className={styles.button}>
            Reservar ahora
          </Link>
        </div>
      </Body>
    </>
  );
};

export default HomePage;
