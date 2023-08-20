'use client'
import { useEffect, useState } from "react"
import { ActiveUser, User, activateUser } from "../../pages/login/[userlogin]"

export default function useUsers(): {ip: string, user: User, activeUsers: ActiveUser[]} {
    const [ip, setIp] = useState(null)
    const [user, setUser] = useState(null)
    const [activeUsers, setActiveUsers] = useState(null)
    useEffect(()=>{
        if(!ip)fetch('/api/getip').then((res)=>res.json()).then((ip)=>setIp(ip))
        if(ip && !user)fetch('/api/getuser?ip='+ip).then((res)=>res.json()).then((data)=>{setUser(data);activateUser(data)})
        if(user) {
            const f = setInterval(()=>{
                fetch('/api/getactiveusers').then((res)=>res.json()).then((data)=>setActiveUsers(data))
            }, 1000)
            return ()=>clearInterval(f)
        }
    },[ip, user])
    return {ip, user, activeUsers}
}