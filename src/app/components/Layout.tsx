import Link from 'next/link';
import React from 'react';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Contenu de la scène Three.js */}
        <div className="absolute inset-0">
            {children}
        </div>

        {/* <div className='relative h-screen w-screen overflow-hidden'> */}

            <div className='absolute -top-40 -left-40 w-80 blur-3xl h-80 rounded-full bg-slate-900/20 '></div>
            <div className='absolute -top-40 -right-40 w-80 blur-3xl h-80 rounded-full bg-slate-900/20 '></div>
            <div className='absolute -bottom-40 -left-40 w-80 blur-3xl h-80 rounded-full bg-slate-900/20 '></div>
            <div className='absolute -bottom-40 -right-40 w-80 blur-3xl h-80 rounded-full bg-slate-900/20'></div>

            <Link href="./pages/ModelMoove" className='absolute bottom-[17vh] left-[25vw] text-white font-space-mono text-sm'>
            go see my favorite photographer
            </Link>

            {/* <p className='absolute bottom-[15vh] left-[20vw] text-white text-3xl'>GELOOO</p> */}
        {/* </div> */}


        {/* Point central */}
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full z-10" /> */}

        {/* Ligne horizontale */}
        {/* <div className="absolute top-1/2 left-0 w-full h-px bg-black z-5" /> */}

        {/* Ligne verticale */}
        {/* <div className="absolute top-0 left-1/2 w-px h-full bg-black z-5" /> */}
    </div>
  );
};

export default Layout;

