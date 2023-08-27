import { useRouter } from "next/navigation"

export default function Book(props){
    const router = useRouter()
    const title = props?.params?.book[0] || ''
    
    return <>
        {title}
        <Chapter {...props}/>
    </>
}
export function Chapter(props){
    const title = props?.params?.book[1] || ''
    return <>
        {title}
        <Verse {...props}/>
    </>
}
export function Verse(props){
    const title = props?.params?.book[2] || ''
    return <>
    </>
}
