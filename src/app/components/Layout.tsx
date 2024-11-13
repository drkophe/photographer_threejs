import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

const Layout: React.FC = ({  }) => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-30">
      <Link href="./pages/ModelMoove" className='absolute bottom-[17vh] left-[25vw] text-white font-space-mono text-sm'>
      go see my favorite photographer
      </Link>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[915px] h-[500px] bg-[black]'></div>
    </div>
  );
};

export default Layout;

