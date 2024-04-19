import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const Router = useRouter();
    const auth = getAuth();

    useEffect(() => {
      const checkAuth = async () => {
        const user = auth.currentUser;
        if (!user) {
          Router.replace('/login');
        }
      };
      checkAuth();
    }, []);

    return <Component {...props} />;
  };
}