'use client';

import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/img/jason/global01.jpg",
  "/img/jason/global02.jpg",
  "/img/jason/global03.jpg",
  "/img/jason/global04.jpg",
  "/img/jason/global05.jpg", // Arrive au milieu
  "/img/jason/global06.jpg",
  "/img/jason/global07.jpg",
  "/img/jason/global08.jpg",
  "/img/jason/global09.jpg",
];

export default function PhotoRoll({ directionUp }) {
  const [isSecondAnimation, setIsSecondAnimation] = useState(false);
  setTimeout(() => setIsSecondAnimation(true), 2000);

  return (
      <motion.div
        className={clsx(
          "space-y-6 relative w-fit h-fit flex",
          directionUp ? "flex-col" : "flex-col-reverse",
          // isSecondAnimation ? "w-screen h-screen transform ease-in-out duration-1000 transition-all" : null
        )}
        // initial={{ y: "0%" }}
        initial={{ y: directionUp ? "0%" : "-20%" }}
        animate={{ 
          y: directionUp ? "-20%" : "0%",
          // scale: isSecondAnimation ? 1.2 : 1, 
        }}
        // animate={{ y: "-20%" }} // La div monte légèrement
        transition={{
          duration: 10, // Synchronisation avec les images
          ease: "easeInOut",
        }}
      >
        {images.map((src, index) => (
          <motion.div
            key={index}
            className={clsx(
              "relative w-80 h-48 overflow-hidden",
              index === 4 ? "z-10" : null,
              // index === 4 && isSecondAnimation ? "w-screen h-screen transform ease-in-out duration-1000 transition-all" : null
            )}
            initial={{
              // y: "0vh",
              y: directionUp ? "160vh" : "-120vh",
              width: "320px",
              height: "192px",
            }}
            animate={{
              // y: "-120vh",
              y: directionUp ? "30vh" : "0vh",
              width: isSecondAnimation ? "640px" : "320px",
              height: isSecondAnimation ? "384px" : "192px",
            }}
            transition={{
              duration: index === 4 && isSecondAnimation ? 2 : 3,
              // delay: index * 0.5,
              delay: isSecondAnimation ? 0 : index * 0.5,
              ease: "easeInOut",
            }}
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className=""
            />
          </motion.div>
        ))}
      </motion.div>
  );
}
