import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import doubleCaret from '../public/images/double-caret.svg';
import add from '../public/images/add.svg';

interface SketchAccordionProps {
  title: string;
  accordionChildren: string[];
  activeChild: string;
  createNewSketchFile: () => Promise<void>;
}
const SketchAccordion: FC<SketchAccordionProps> = ({
  title,
  accordionChildren,
  activeChild,
  createNewSketchFile,
}) => {
  const router = useRouter();
  const [toggleAccordion, setToggleAccordion] = useState<boolean>(true);

  const openSketchFile = (path: string) => {
    router.push(`/sketch/${path}`);
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  return (
    <div
      className='w-[264px] bg-gray-50 rounded-md border-2 text-xs'
      style={{ borderColor: '#E2E2E2' }}>
      <div
        onClick={() => setToggleAccordion(!toggleAccordion)}
        className='p-2 bg-gray-50 border-b flex justify-between items-center'
        style={{ borderColor: '#E2E2E2' }}>
        <p>{title}</p>
        <Image src={doubleCaret} alt='double caret' />
      </div>
      {toggleAccordion && (
        <ul>
          {accordionChildren.map((item, index) => (
            <li
              className={
                activeChild === item
                  ? 'p-3 cursor-pointer text-indigo-600'
                  : 'p-3 cursor-pointer'
              }
              key={index}
              onClick={() => openSketchFile(item)}>
              Sketch {index + 1}
            </li>
          ))}
        </ul>
      )}

      <div
        className='p-2 flex items-center cursor-pointer'
        onClick={createNewSketchFile}>
        <Image src={add} alt='add' />
        <p className='ml-2'>Add a new sketch</p>
      </div>
    </div>
  );
};

export default SketchAccordion;
