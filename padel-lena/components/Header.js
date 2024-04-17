import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import '../config/firebaseConfig';
import { getAuth } from 'firebase/auth'; 
import styles from '../styles/Header.module.css';
import { signOut } from 'firebase/auth';

const Header = ({app}) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = getAuth(app); 
  const showReservasLink = !['/Home'].includes(router.pathname);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleReservarClick = () => {
    const user = auth.currentUser;
    if (user) {
      router.push('/reservation');
    } else {
      alert('Debes iniciar sesión para hacer una reserva');
      router.push('/login');
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push('/Home'); 
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
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
        {router.pathname === '/myReservations' && (
                    <Link href="/reservation" className={styles.link}>Reservar</Link>
                )}

        {user ? (
          <div className={styles.dropdown}>
            <button className={styles.username} onClick={handleMenuToggle}>{user.displayName}</button>
            {menuOpen && (
              <div className={styles.dropdownContent}>
                <Link href="/myReservations" className={styles.reservationLink}>Mis Reservas</Link>
                <button onClick={handleSignOut} className={styles.button}>Cerrar Sesión</button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className={styles.link}>Iniciar sesión</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
