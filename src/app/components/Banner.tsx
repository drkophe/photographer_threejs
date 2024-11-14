import clsx from "clsx";

export default function Banner() {
    return(
        <div className={clsx(
            'absolute w-screen h-screen top-0 z-0 flex items-center',
            // Flexbox
            "inline-flex flex-nowrap",
            // Dimensions & Blocks
            "w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]",
            // Hover
            "",
            // Animation transition
            "transition-all duration-1000 ease-in-out",
            

        )}>
            <ul className={clsx(
                "font-space-mono font-bold tracking-[-0.13em] text-[350px] whitespace-nowrap text-nowrap",
                "flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
            )}>
                <li>
                    <p>
                        WHAT IS YOUR FAVORITE ??
                    </p>
                </li>
                
            </ul>
            <ul className={clsx(
                "font-space-mono font-bold tracking-[-0.13em] text-[350px] whitespace-nowrap text-nowrap",
                "flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
            )} aria-hidden="true">
                <li>
                    <p>
                        WHAT IS YOUR FAVORITE ??
                    </p>
                </li>
                
            </ul>

        </div>
    )
}

// BANNER.JSX
// import { useState } from "react";
// import BannerWord from "./BannerWord";
// import clsx from "clsx";
// import useIsPhone from "../Hook/useIsPhone";


// export default function Banner() {
//     // state
//     const isPhone = useIsPhone();
//     // 8 words - not too long
//     const [words, setWords] = useState(['Front', 'End', 'Dev', 'Junior', 'Name', 'Is', 'Lorenzo', 'Bosi']);

//     const loop = words.map((word) => 
//         <BannerWord key={word} word={word} />
//     );

//     const containerLoopCSS = "flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll";

//     // comportement
//     // render
//     return (
//         <div className= {clsx(
//             // Flexbox
//             "inline-flex flex-nowrap",
//             // Dimensions & Blocks
//             "w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]",
//             // Position
//             "-z-0 absolute top-[25vh]",
//             // isPhone ? "top-[15vh]" : "top-[25vh]",
//         )}>

//                 <ul className={containerLoopCSS}>
//                     {loop}      
//                 </ul>                

//                 <ul className={containerLoopCSS} aria-hidden="true">
//                     {loop}
//                 </ul>                
//         </div>
//     );
// }

// BANNERWORD.JSX
// import clsx from "clsx";
// import { Diamond } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function BannerWord({word}) {
//     // state
//     const [isPhone, setIsPhone] = useState(window.innerWidth <= 768);

//     // Effect to update isPhone when window width changes
//     useEffect(() => {
//         const handleResize = () => {
//             setIsPhone(window.innerWidth <= 768);
//         };

//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // comportement
//     // render
//     return (
//         <li className={clsx(
//             // Flexbox
//             "flex items-center",
//         )}>
//             <p className={clsx(
//                 // Font
//                 "uppercase font-trispace font-semibold text-9xl text-white dark:text-black tracking-tight",
//                 isPhone ? "text-8xl" : "text-9xl",
//                 // Spacing
//                 "mr-16",
//             )}>
//                 {word}
//             </p>
            
//             <Diamond className="text-indigo-400 stroke-2 fill-indigo-400" />
//         </li>
//     )
// }