import { useEffect, useState } from 'react';
import Header from '../components/Header';
import styles from '../styles/Login.module.css';
import '../config/firebaseConfig'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { signOut } from 'firebase/auth';

export default function Login() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => (typeof window !== 'undefined' && window.localStorage.getItem('isLoggedIn') === 'true') || false
  );
  const [token, setToken] = useState('');

  useEffect(() => {
    const auth = getAuth(); 
    onAuthStateChanged(auth, (userCred) => { 
      if (userCred) {
        setIsLoggedIn(true);
        window.localStorage.setItem('isLoggedIn', 'true');
        userCred.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        setIsLoggedIn(false);
        window.localStorage.setItem('isLoggedIn', 'false');
      }
    });
  }, []);

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      window.localStorage.setItem('isLoggedIn', 'false');
    }).catch((error) => {
      console.error("Error al cerrar sesión: ", error);
    });
  }

  const loginWithGoogle = () => {
    const auth = getAuth(); 
    signInWithPopup(auth, new GoogleAuthProvider()).then((userCred) => {
      if (userCred.user) {
        setIsLoggedIn(true);
        window.localStorage.setItem('isLoggedIn', 'true');
      }
    }).catch((error) => {
      console.error("Google sign-in error:", error);
    });
  }

  return (
    <div>
      <Header />
      <div className={styles['form-container']}>
        <h1>Inicia sesión para comenzar a reservar tu pista.</h1>
        {isLoggedIn ? (
          <p>Usuario logueado</p>
        ) : (
          <button className={styles.signin} onClick={loginWithGoogle}>
  <svg
    viewBox="0 0 256 262"
    preserveAspectRatio="xMidYMid"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.svg}
  >
    <path
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      fill="#4285F4"
    ></path>
    <path
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      fill="#34A853"
    ></path>
    <path
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      fill="#FBBC05"
    ></path>
    <path
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      fill="#EB4335"
    ></path>
  </svg>
  Sign in with Google
</button>)}

      </div>
    </div>
  );
}
