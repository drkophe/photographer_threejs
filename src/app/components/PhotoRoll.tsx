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

export default function PhotoRoll({ directionUp, middle, selectImage }) {
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
      // container vertical
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
            )}
            initial={{
              y: directionUp ? "180vh" : "-130vh",
              width: "100vw",
              height: "100vh",
              scale: 0.1,
            }}
            animate={{
              y: directionUp ? "55vh" : "-25vh",
              scale: isSecondAnimation ? 1 : 0.1,
            }}
            transition={{
              duration: isSecondAnimation ? 4 : 1.8,
              delay: isSecondAnimation ? 0 : index * 0.3,
              ease: "easeInOut",
            }}
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className=""
            />
          </motion.div>
        ))}
      </motion.div>
  );
}
