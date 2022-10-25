import React, { FC, useRef, useState } from 'react';
import Image from 'next/image';
import logo from '../public/images/logo.png';
import { patch } from '../services/rest_service';

interface Iprops {
  name?: string;
  isAuthenticated: boolean;
  user?: any;
}

const Header: FC<Iprops> = ({ name, isAuthenticated, user }) => {
  const avatar =
    (user && user.dp.url) ||
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png';
  const inputFile = useRef<HTMLInputElement>(null);
  const [dp, setDp] = useState<string>(avatar);

  const selectFile = () => {
    inputFile.current?.click();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files!;

    const data = new FormData();
    data.append('image', file[0]);

    let res = await patch('/users/dp', data);

    if (res.data) {
      setDp(res.data.data.dp.url);
      alert('File uploaded successfully');
    }
  };

  return (
    <nav
      className='px-10 h-14 flex items-center justify-between border-b-2'
      style={{ borderBottomColor: '#E2E2E2' }}>
      <Image src={logo} alt='logo' />

      {isAuthenticated && (
        <div className='flex items-center'>
          <p className='text-sm mr-3'>{name && name}</p>
          <div className='w-8 h-8 rounded' onClick={selectFile}>
            <Image
              src={dp ? dp : avatar}
              width='100%'
              height='100%'
              alt='avatar'
              className='rounded-full'
            />
          </div>
          <input
            type='file'
            id='file'
            ref={inputFile}
            className='hidden'
            onChange={handleFile}
            name='image'
            accept='image/png, image/jpeg'
          />
        </div>
      )}
    </nav>
  );
};

export default Header;
