import Photographer from "@/app/components/Photographer";

export default function Photographers() {
    return(
        <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
            <Photographer polaroid={'jason_polaroid'}/>
            <Photographer polaroid={'kim_polaroid'}/>
            <Photographer polaroid={'vadim_polaroid'}/>
            <Photographer polaroid={'all'}/>
        </main>
    )
}