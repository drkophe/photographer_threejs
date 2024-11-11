"use client";
import Model from "./components/Model";
import PageTest from "./components/PageTest";
import Photographer from "./components/Photographer";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden bg-[#504644]">
      <Model/>
      <PageTest/>
      <PageTest/>
      {/* <Photographer polaroid={'all'}/> */}
    </main>
  );
}

