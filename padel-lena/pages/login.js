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
        <h1>Login</h1>
        {isLoggedIn ? (
          <p>Usuario logueado</p>
        ) : (
          <button onClick={loginWithGoogle}>Iniciar sesión con Google</button>)}
      </div>
    </div>
  );
}
