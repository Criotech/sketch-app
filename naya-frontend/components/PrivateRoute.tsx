import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { get } from '../services/rest_service';

const PrivateRoute = (Component: any) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const checkToken = async (): Promise<void> => {
        const token = localStorage.getItem('token');

        if (!token) {
          router.replace('/');
        } else {
          try {
            let resp = await get('/users/auth');

            if (!resp.data) {
              localStorage.removeItem('token');
              router.replace('/');
            } else {
              setUser(resp.data.data);
              setAuthenticated(true);
            }
          } catch (err) {
            router.replace('/');
          }
        }
      };

      checkToken();
    }, [router]);

    if (!authenticated) {
      return <div />;
    }

    return <Component {...props} user={user} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default PrivateRoute;
