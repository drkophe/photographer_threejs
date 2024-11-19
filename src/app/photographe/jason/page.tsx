'use client';

import PhotoRollTest from "@/app/components/PhotoRollTest";
import PhotoRoll from "../../components/PhotoRoll";

export default function PageJason() {

  return (
    <main className="h-screen w-full overflow-hidden flex flex-row space-x-6 items-center justify-center bg-gray-100">
      {/* <PhotoRoll directionUp={false}/>
      <PhotoRoll directionUp={true}/>
      <PhotoRoll directionUp={false}/>
      <PhotoRoll directionUp={true}/>
      <PhotoRoll directionUp={false}/>
      <PhotoRoll directionUp={true}/>
      <PhotoRoll directionUp={false}/> */}
      <PhotoRollTest directionUp={true}/>
      <PhotoRollTest directionUp={false}/>
      <PhotoRollTest directionUp={true} middle={true}/>
      <PhotoRollTest directionUp={false}/>
      <PhotoRollTest directionUp={true}/>
    </main>
  );
}
