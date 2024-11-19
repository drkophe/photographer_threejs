import clsx from "clsx";
import { motion } from "framer-motion";

export default function Hero() {
    return(
        <section 
            id="hero"
            className={clsx(
                'w-full h-screen',
                'flex justify-center items-center',
                'overflow-hidden absolute top-0 left-0 z-10 m-0 p-0'
            )}
        >
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-1/2 blur-3xl bg-black/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 2 }}
            ></motion.div>

            <div className="relative h-fit flex items-center justify-center flex-col space-y-4">
                <div className="overflow-hidden relative h-fit flex items-center justify-center flex-col">

                    <motion.h1 
                    className={clsx(
                        "font-space-mono font-bold text-[350px] leading-none whitespace-nowrap",
                        "drop-shadow-xl uppercase text-white"
                    )}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ 
                        duration: 4, 
                        ease: "easeInOut",
                        delay: 2.5 
                    }}
                    >
                        Jason
                    </motion.h1>
                </div>

                <div className="overflow-hidden relative h-auto flex items-center justify-center flex-col">
                    <motion.h2 
                    className={clsx(
                        "font-space-mono font-thin text-3xl leading-tight whitespace-nowrap",
                        "drop-shadow-xl text-white"
                    )}
                    initial={{ y: "100%" }}
                    animate={{ y: "-25%" }}
                    transition={{ 
                        duration: 2, 
                        ease: "easeInOut",
                        delay: 2.9 
                    }}
                    >
                        @jason.febrissy
                    </motion.h2>
                </div>
            </div>
        </section>
    )
}