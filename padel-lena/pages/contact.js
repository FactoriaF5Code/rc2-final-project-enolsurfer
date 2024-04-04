import React from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import styles from '../styles/Contact.module.css';

const ContactoPage = () => {
  return (
    <>
      <Header />
      <Body>
        <div className={styles.container}>
          <h1>Contacto</h1>
          <h2>Si aún no te has registrado, puedes hacer reservas llamando al siguiente número:</h2>
          <h2>Número de contacto: 123-456-789</h2>
        </div>
      </Body>
    </>
  );
};

export default ContactoPage;
