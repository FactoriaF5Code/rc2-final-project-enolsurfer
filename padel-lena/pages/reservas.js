import React from 'react';
import styles from '../styles/Reservas.module.css';
import Header from '../components/Header';
import Body from '../components/Body';

const ReservasPage = () => {
  return (
    <div>
      <Header />
      <Body>
        <div className={styles.container}>
          <h2>
              Para realizar una reserva mande un mensaje al 578362987 y le responderemos
              con la mayor brevedad posible indicandole las horas disponibles y si hay
              gente para jugar por si no vas con nadie.
          </h2>
          {/* Aquí puedes agregar un formulario de reserva u otro contenido relacionado con las reservas */}
        </div>
      </Body>
    </div>
  );
};

export default ReservasPage;
