'use client'
import { useEffect, useState } from "react"
export default function useActiveUsers(delay: number = 2000){
    const [activeUsers, setActiveUsers] = useState(null)
    useEffect(()=>{
        const f = setInterval(()=>{
            fetch('/api/getactiveusers').then((res)=>res.json()).then((data)=>setActiveUsers(data))
        }, delay)
        return ()=>clearInterval(f)
    },[])
    return activeUsers
}