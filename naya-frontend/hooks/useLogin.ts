import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { post } from '../services/rest_service';
import { catchAxiosError } from '../services/error_service';

interface UseLogin {
  login: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

const useLogin = (): UseLogin => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      let res = await post('/users/login', { email, password });
      if (res) {
        localStorage.setItem('token', res.data.token);
        router.push(`/sketch/${res.data.sketches[0]}`);
        setLoading(false);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        setError(catchAxiosError(error));
      }
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
