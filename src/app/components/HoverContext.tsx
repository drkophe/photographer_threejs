// HoverContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface Position {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
}

interface HoverContextType {
    isHovered: boolean;
    hoveredColor: string;
    hoveredPosition1: Position;
    hoveredPosition2: Position;
    setHovered: (value: boolean) => void;
    setHoveredColor: (color: string) => void;
    setHoveredPosition1: (position: Position) => void;
    setHoveredPosition2: (position: Position) => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export function HoverProvider({ children }: { children: ReactNode }) {
    const [isHovered, setHovered] = useState(false);
    const [hoveredColor, setHoveredColor] = useState("#504644");
    const [hoveredPosition1, setHoveredPosition1] = useState<Position>({ top: "1/3", left: "0" });
    const [hoveredPosition2, setHoveredPosition2] = useState<Position>({ top: "1/3", right: "0" });

    return (
        <HoverContext.Provider
            value={{
                isHovered,
                hoveredColor,
                hoveredPosition1,
                hoveredPosition2,
                setHovered,
                setHoveredColor,
                setHoveredPosition1,
                setHoveredPosition2,
            }}
        >
            {children}
        </HoverContext.Provider>
    );
}

export function useHover() {
    const context = useContext(HoverContext);
    if (!context) {
        throw new Error("useHover must be used within a HoverProvider");
    }
    return context;
}
