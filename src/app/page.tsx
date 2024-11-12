"use client";

import Model from "./components/Model";
import PageTest from "./components/PageTest";
import PhotographersPages from "./pages/photographers/page";
import { HoverProvider } from "@/app/components/HoverContext"; // Assure-toi d'importer HoverProvider

export default function Home() {
  return (
    <HoverProvider>
      <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden bg-[#504644] relative">
        <Model />
        <PageTest />
        <PageTest />
        <PhotographersPages />
      </main>
    </HoverProvider>
  );
}
