import { useEffect } from "react"

export default function useLog(obj){
    useEffect(()=>{console.log(obj)})
}