import clsx from 'clsx';
import { MoveUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Layout: React.FC = ({  }) => {

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;

    // isBottomScroll = scrollProgress >= 1;

    // quand on scroll vers le bas en haut de la page
    
    if (scrollProgress < 0.1) {
      // la div devient transparente
      document.querySelector('#blur-bg')?.classList.remove('opacity-0');
    } else {
      // la div devient opaque
      document.querySelector('#blur-bg')?.classList.add('opacity-0');
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-20">

      <div id='blur-bg' className={clsx(
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[990px] h-[570px] bg-[#504644] blur-md transition-all duration-[1000ms] ease-in-out',
      )}>
      </div>

      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[970px] h-[550px]'>
        <div className='absolute bottom-6 left-10 flex items-center space-x-2' >
          <Link href="./pages/ModelMoove" className=' text-white font-space-mono text-sm'>
          go see my favorite photographer
          </Link>
          <MoveUpRightIcon />
        </div>
        <svg className={clsx(
          'w-2 h-96 absolute top-1/2 right-2 transform -translate-y-1/2',
        )} width="8" height="389" viewBox="0 0 8 389" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.64643 388.354C3.84169 388.549 4.15827 388.549 4.35354 388.354L7.53552 385.172C7.73078 384.976 7.73078 384.66 7.53552 384.464C7.34025 384.269 7.02367 384.269 6.82841 384.464L3.99998 387.293L1.17156 384.464C0.976294 384.269 0.659711 384.269 0.464449 384.464C0.269187 384.66 0.269187 384.976 0.464449 385.172L3.64643 388.354ZM3.5 -2.18557e-08L3.49998 388L4.49998 388L4.5 2.18557e-08L3.5 -2.18557e-08Z" fill="white"/>
        </svg>

      </div>
    </div>
  );
};

export default Layout;

