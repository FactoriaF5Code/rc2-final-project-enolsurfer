import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import firebaseApp from '../config/firebaseConfig';
import { getAuth } from 'firebase/auth'; 
import styles from '../styles/Header.module.css';

const Header = () => {
  const router = useRouter();
  const auth = getAuth(firebaseApp); 
  const showReservasLink = !['/Home', '/reservas'].includes(router.pathname);


  const handleReservarClick = () => {
    const user = auth.currentUser;
    if (user) {
      router.push('/reservas');
    } else {
      router.push('/login');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles['logo-title']}>
        <Link href="/">
          <Image
            id='logo'
            src="/Padel-lena.png" 
            alt="Descripción de la imagen" 
            width={50} 
            height={50} 
          />
        </Link>
        <Link href="/">
          <h1 className={styles.title}>Pádel Lena</h1>
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/contact" className={styles.link}>Contacto</Link>
        <Link href="/login" className={styles.link}>Iniciar sesión</Link>
        {showReservasLink && <li><Link href="/reservas" className={styles.link}>Reservas</Link></li>}
      </nav>
    </header>
  );
};

export default Header;
