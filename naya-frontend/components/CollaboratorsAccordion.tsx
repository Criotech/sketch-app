import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import doubleCaret from '../public/images/double-caret.svg';

interface CollaboratorsAccordionProps {
  title: string;
  accordionChildren: { name: string; color: string }[];
}
const CollaboratorsAccordion: FC<CollaboratorsAccordionProps> = ({
  title,
  accordionChildren,
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
            <li key={index} className='p-2 flex items-center'>
              <div
                className='w-3 h-3 rounded-full mr-3'
                style={{ backgroundColor: item.color }}
              />{' '}
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CollaboratorsAccordion;
