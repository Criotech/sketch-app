import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import Head from 'next/head';
import Image from 'next/image';
import googleIcon from '../public/images/google.svg';
import Header from '../components/Header';
import Input from '../components/Input';
import { post } from '../services/rest_service';
import { catchAxiosError } from '../services/error_service';

interface Iuser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const Home: NextPage = () => {
  const [userData, setUserData] = useState<Iuser>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const postData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return await post('/users', userData);
  };

  const { mutate, isLoading, isError, error } = useMutation(postData, {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  return (
    <div>
      <Head>
        <title>Sketch App / Sign up</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <section className='h-screen overflow-hidden'>
          <Header isAuthenticated={false} />
          <div className='h-screen flex pt-[150px] justify-center'>
            <div className='w-[309px]'>
              <h1 className='text-3xl text-primary'>Create an account</h1>

              {isError && (
                <p className='text-sm p-2 text-center bg-red-200 my-2'>
                  {catchAxiosError(error)}
                </p>
              )}
              {isSuccess && (
                <p className='text-sm p-2 text-center bg-green-200 my-2'>
                  Account created successfully; please log in
                </p>
              )}
              <form>
                <div className='flex items-center mt-5 gap-x-2'>
                  <Input
                    type={'text'}
                    placeholder={'First name'}
                    handleChange={handleChange}
                    name='firstName'
                  />
                  <Input
                    type={'text'}
                    placeholder={'Last name'}
                    handleChange={handleChange}
                    name='lastName'
                  />
                </div>
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
                <button
                  onClick={mutate}
                  className='mt-5 w-full bg-primary h-10 rounded-md text-white text-sm'>
                  {isLoading ? 'Loading...' : 'Create Account'}
                </button>
                <p className='mt-3 text-xs text-center'>
                  Already have an account?{' '}
                  <span className='text-primary cursor-pointer'>
                    <Link href='/'>Sign in</Link>
                  </span>
                </p>
                <p className='mt-3 text-xs text-center'>or</p>
                <button className='mt-5 w-full border-gray-200 border-2 h-10 rounded-md text-sm flex items-center justify-center'>
                  <Image src={googleIcon} alt='google icon' />
                  <span className='ml-2'>Sign up with Google</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
