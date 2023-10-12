import Link from "next/link";

export default function Index(p){
    return <>
        <Link href="/projects/chess">Chess</Link><br/>
        <Link href="/projects/cost">Cost Idle Clicker</Link><br/>
        <Link href="/projects/canvas">Canvas</Link><br/>
        <Link href="/projects/story">Story Board</Link><br/>
    </>
}