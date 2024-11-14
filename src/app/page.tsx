"use client";

import clsx from "clsx";
import Model from "./components/Model";
import PageTest from "./components/PageTest";
import PhotographersPages from "./pages/photographers/page";
import { HoverProvider, useHover } from "@/app/components/HoverContext"; // Assure-toi d'importer HoverProvider
import { useEffect } from "react";
import Layout from "./components/Layout";
import Nav from "./components/Nav";
import Banner from "./components/Banner";

export default function Home() {

  return (
    <HoverProvider>
      <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden bg-[#504644] relative">
        <Nav/>
        <Banner/>
        <Layout />
        <Model />
        <PageTest />
        <PageTest />
        <PhotographersPages />
      </main>
    </HoverProvider>
  );
}
