'use client'
import { useEffect, useState } from "react"

export default function useIP(props){
    const [ip, setIp] = useState(null)
    useEffect(()=>{
        if(!ip)fetch('/api/getip').then((res)=>res.json()).then((ip)=>setIp(ip))
    },[])
    return ip
}