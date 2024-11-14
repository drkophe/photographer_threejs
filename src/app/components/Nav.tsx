// import { MoveUpRight } from "lucide";
import clsx from "clsx";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function Nav() {
    return(
        <nav className="z-50 fixed top-0 left-0 w-screen h-1/6 flex items-center justify-center">
            <ul className={clsx(
                'font-space-mono text-sm',
                'w-5/6 flex justify-center space-x-72',
                
                '*:flex *:space-x-2 *:w-fit' // add styles for all children
            )}>
                <li>
                    <Link href="/pages/photographers">go directly check us socials medias</Link>
                    <MoveUpRightIcon />
                </li>
                <li>
                    <Link href="/">go check my portofolio</Link>
                    <MoveUpRightIcon />
                </li>
            </ul>
        </nav>
    )
}