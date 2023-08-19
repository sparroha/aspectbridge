import { useEffect } from "react"

export default function useLog(log: any){
    useEffect(()=>{console.log(log)})
}