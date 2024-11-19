'use client';

import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

// const images = [
//   "/img/jason/global01.jpg",
//   "/img/jason/global02.jpg",
//   "/img/jason/global03.jpg",
//   "/img/jason/global04.jpg",
//   "/img/jason/global05.jpg", 
//   "/img/jason/global06.jpg", // Arrive au milieu
//   "/img/jason/global07.jpg",
//   "/img/jason/global08.jpg",
//   "/img/jason/global09.jpg",
// ];

export default function PhotoRollTest({ directionUp, middle, selectImage }) {
  const [isSecondAnimation, setIsSecondAnimation] = useState(false);
  setTimeout(() => setIsSecondAnimation(true), 1500);

  const [isFinalAnimation, setIsFinalAnimation] = useState(false);
  if (isSecondAnimation){
    setTimeout(() => setIsFinalAnimation(true), 1500);
  }

  const images = [
    `/img/jason/${selectImage}01.jpg`,
    `/img/jason/${selectImage}02.jpg`,
    `/img/jason/${selectImage}03.jpg`,
    `/img/jason/${selectImage}04.jpg`,
    `/img/jason/${selectImage}05.jpg`, 
    `/img/jason/${selectImage}06.jpg`, // Arrive au milieu
    `/img/jason/${selectImage}07.jpg`,
    `/img/jason/${selectImage}08.jpg`,
    `/img/jason/${selectImage}09.jpg`,
    // "/img/jason/global01.jpg",
    // "/img/jason/global02.jpg",
    // "/img/jason/global03.jpg",
    // "/img/jason/global04.jpg",
    // "/img/jason/global05.jpg", 
    // "/img/jason/global06.jpg", // Arrive au milieu
    // "/img/jason/global07.jpg",
    // "/img/jason/global08.jpg",
    // "/img/jason/global09.jpg",
  ];

  return (
      <motion.div
        className={clsx(
          "space-y-6 relative w-fit h-fit flex items-center justify-center",
          directionUp ? "flex-col" : "flex-col-reverse",
        )}
        initial={{ y: directionUp ? "0%" : "-20%" }}
        animate={{ 
          // y: directionUp ? "-17%" : "0%",
          y: directionUp ? "-17.115%" : "0%",
        }}
        transition={{
          duration: 5, // Synchronisation avec les images
          ease: "easeInOut",
        }}
      >
        {images.map((src, index) => (
          <motion.div
            key={index}
            className={clsx(
              "overflow-hidden",
              index === 4 ? "z-10" : null,
              // index === 4 && isSecondAnimation ? "w-screen h-screen transform ease-in-out duration-1000 transition-all" : null
            )}
            initial={{
              // y: "0vh",
              y: directionUp ? "180vh" : "-130vh",
              // width: "320px",
              // height: "192px",
              width: "390px",
              height: "240px",
            }}
            animate={{
              // y: "-120vh",
              y: directionUp ? "55vh" : "-25vh",
              // width: middle && isFinalAnimation ? "100vw" : isSecondAnimation ? "950px" : "390px",
              // height: middle && isFinalAnimation ? "100vh" : isSecondAnimation ? "570px" : "240px",
              width: isSecondAnimation ? "100vw" : "390px",
              height: isSecondAnimation ? "100vh" : "240px",
              // width: isSecondAnimation ? "950px" : "390px",
              // height: isSecondAnimation ? "570px" : "240px",
              top: 0,
              left: 0,
            }}
            transition={{
              duration: isSecondAnimation ? 4 : 1.8,
              // delay: index * 0.5,
              delay: isSecondAnimation ? 0 : index * 0.3,
              ease: "easeInOut",
            }}
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              layout="fill"
              // width= "2048"
              // height= "1152"
              objectFit="cover"
              objectPosition="center"
              className=""
            />
          </motion.div>
        ))}
      </motion.div>
  );
}
