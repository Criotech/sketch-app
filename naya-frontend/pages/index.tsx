import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import googleIcon from '../public/images/google.svg';
import Header from '../components/Header';
import Input from '../components/Input';
import useLogin from '../hooks/useLogin';

const Home: NextPage = () => {
  const { login, isLoading, error } = useLogin();
  const [userData, setUserData] = useState<{ email: string; password: string }>(
    {
      email: '',
      password: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Head>
        <title>Sketch App / Sign in</title>
        <meta name='description' content='Sketch App / Sign in' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <section className='h-screen overflow-hidden'>
          <Header isAuthenticated={false} />
          <div className='h-screen flex pt-[150px] justify-center'>
            <div className='w-[309px]'>
              <h1 className='text-3xl text-primary'>Log in to continue</h1>
              <div>
                {error && (
                  <p className='text-sm p-2 text-center bg-red-200 my-2'>
                    {error}
                  </p>
                )}
                <div className='mt-5'>
                  <Input
                    type={'email'}
                    placeholder={'Email'}
                    handleChange={handleChange}
                    name='email'
                  />
                </div>
                <div className='mt-5'>
                  <Input
                    type={'password'}
                    placeholder={'Password'}
                    handleChange={handleChange}
                    name='password'
                  />
                </div>
                <p className='text-xs text-center mt-3'>Forgot password?</p>
                <button
                  onClick={() => login(userData.email, userData.password)}
                  className='mt-3 w-full bg-primary h-10 rounded-md text-white text-sm'>
                  {isLoading ? 'Loading...' : 'Log in'}
                </button>
                <p className='mt-3 text-xs text-center'>
                  Don&apos;t have an account?{' '}
                  <span className='text-primary'>
                    <Link href='/signup'>Sign up</Link>
                  </span>
                </p>
                <p className='mt-3 text-xs text-center'>or</p>
                <button className='mt-5 w-full border-gray-200 border-2 h-10 rounded-md text-sm flex items-center justify-center'>
                  <Image src={googleIcon} alt='google icon' />
                  <span className='ml-2'>Log in with Google</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
