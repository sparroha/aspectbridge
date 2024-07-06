import { useEffect } from "react"

export default function UseLog(log: any){
    useEffect(()=>{console.log(log)},[])
    return <>Log:{log}</>
}
export function useLog(log: any){
    useEffect(()=>{console.log(log)},[])
}