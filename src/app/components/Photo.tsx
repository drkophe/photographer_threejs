// Photo.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useHover } from "./HoverContext";

export default function Photo({ photographer, color, position1, position2 }) {
    const { setHovered, setHoveredColor, setHoveredPosition1, setHoveredPosition2 } = useHover();

    const handleHoverStart = () => {
        setHovered(true);
        setHoveredColor(color);
        setHoveredPosition1(position1);
        setHoveredPosition2(position2);
    };

    const handleHoverEnd = () => {
        setHovered(false);
    };

    return (
        <motion.div
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            whileHover={{
                scale: 1.1,
                y: -200,
                transition: { duration: 0.3 }
            }}
        >
            <motion.div
                whileHover={{ filter: "blur(0px)" }}
                initial={{ filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
            >
                <Image 
                    src={`/img/${photographer}.png`} 
                    alt={photographer} 
                    width={400} 
                    height={400}
                    className="object-cover z-50"
                />
            </motion.div>
        </motion.div>
    );
}
