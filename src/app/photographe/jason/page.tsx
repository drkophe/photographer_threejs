'use client';

import PhotoRollTest from "@/app/components/PhotoRollTest";
import PhotoRoll from "../../components/PhotoRoll";
import Hero from "./Hero";
import { useEffect, useState } from "react";
import { i } from "framer-motion/client";

export default function PageJason() {
  document.body.style.overflow = "hidden";

  return (
    <main className="flex flex-col items-center justify-center bg-zinc-900 w-full">

      {/* <div className="h-screen w-full overflow-hidden flex flex-row space-x-6 items-center justify-center">
      <PhotoRoll directionUp={true} middle={false} selectImage={'lovely_beauty'}/>
      <PhotoRoll directionUp={false} middle={false} selectImage={'beaubien'}/>
      <PhotoRoll directionUp={true} middle={true} selectImage={'global'}/>
      <PhotoRoll directionUp={false} middle={false} selectImage={'sneakandvet'}/>
      <PhotoRoll directionUp={true} middle={false} selectImage={'excklusive_shop'}/>
      </div> */}
      <div className="h-screen w-full overflow-hidden flex flex-row space-x-6 items-center justify-center">
      <PhotoRollTest directionUp={true} middle={false} selectImage={'lovely_beauty'}/>
      <PhotoRollTest directionUp={false} middle={false} selectImage={'beaubien'}/>
      <PhotoRollTest directionUp={true} middle={true} selectImage={'global'}/>
      <PhotoRollTest directionUp={false} middle={false} selectImage={'sneakandvet'}/>
      <PhotoRollTest directionUp={true} middle={false} selectImage={'excklusive_shop'}/>
      </div>

      <Hero/>

      <div className="h-screen w-full overflow-hidden">

      </div>
    </main>
  );
}
