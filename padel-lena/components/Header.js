import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles['logo-title']}>
        <Link href="/"><Image id='logo'
        src="/Padel-lena.png" 
        alt="Descripción de la imagen" 
        width={50} 
        height={50} 
        /></Link>
        <h1 className={styles.title}>Pádel Lena</h1>
      </div>
      <nav className={styles.nav}>
        <Link href="/contact" className={styles.link}>Contacto</Link>
        <Link href="/login" className={styles.link}>Iniciar sesión</Link>
      </nav>
    </header>
  );
};

export default Header;