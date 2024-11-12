// page.tsx
"use client";

import Photo from "@/app/components/Photo";
import { HoverProvider, useHover } from "@/app/components/HoverContext";

export default function PhotographersPages() {
    return (
        <HoverProvider>
            <PhotographersContent />
        </HoverProvider>
    );
}

function PhotographersContent() {
    const { isHovered, hoveredColor, hoveredPosition1, hoveredPosition2 } = useHover();

    return (
        <main
            className={` flex w-screen min-h-screen flex-col items-center justify-between overflow-hidden ease-in-out duration-500 transform ${
                isHovered ? "bg-[#171717]" : "bg-[#504644]"
            } relative`}
        >
            <div
                className={`rounded-full w-3/6 aspect-square scale-150 blur-3xl z-20 absolute ease-in-out duration-500 transform opacity-30`}
                style={{
                    backgroundColor: isHovered ? hoveredColor : "#504644",
                    top: hoveredPosition1.top,
                    left: hoveredPosition1.left,
                    bottom: hoveredPosition1.bottom,
                    right: hoveredPosition1.right,
                    transition: "top 0.5s ease-in-out, left 0.5s ease-in-out, right 0.5s ease-in-out, bottom 0.5s ease-in-out", // Transition sur les positions
                }}
            />

            <div
                className={`rounded-full w-1/6 aspect-square scale-150 blur-3xl z-20 absolute ease-in-out duration-500 transform opacity-20`}
                style={{
                    backgroundColor: isHovered ? hoveredColor : "#504644",
                    top: hoveredPosition2.top,
                    left: hoveredPosition2.left,
                    bottom: hoveredPosition2.bottom,
                    right: hoveredPosition2.right,
                    transition: "top 0.5s ease-in-out, left 0.5s ease-in-out, right 0.5s ease-in-out, bottom 0.5s ease-in-out", // Transition sur les positions
                }}
            />

            <div className="absolute -bottom-52 flex flex-end z-30 ">
                <Photo
                    photographer="kim"
                    color="#facc15"
                    position1={{ top: "20%", left: "0%" }}
                    position2={{ top: "10%", right: "0%" }}
                />
                <Photo
                    photographer="jason"
                    color="#fb923c"
                    position1={{ top: "10%", left: "15%" }}
                    position2={{ top: "50%", right: "0%" }}
                />
                <Photo
                    photographer="vadim"
                    color="#3357FF"
                    position1={{ top: "30%", left: "40%" }}
                    position2={{ top: "5%", right: "80%" }}
                />
            </div>
        </main>
    );
}
