// import { MoveUpRight } from "lucide";
import clsx from "clsx";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function Nav() {
    return(
        <nav className="z-50 fixed top-0 left-0 w-screen">
            <ul className={clsx(
                'font-space-mono text-sm',
                
                '*:flex *:space-x-2' // add styles for all children
            )}>
                <Link href="/pages/photographers">go directly check us socials medias</Link><MoveUpRightIcon />
                <Link href="/">go check my portofolio</Link><MoveUpRightIcon />
            </ul>
        </nav>
    )
}