'use client'
import { useEffect, useState } from "react"
import { ActiveUser, StoredUser, User, activateUser } from "../../pages/login/[userlogin]"

export default function useUsers(): {ip: string, user: User, activeUsers: ActiveUser[]} {
    const [ip, setIp] = useState(null)
    const [user, setUser] = useState(null)
    const [activeUsers, setActiveUsers] = useState(null)
    useEffect(()=>{
        //console.log('@useUsers:useEffect(): ip_'+ip+' user_'+JSON.stringify(user || {})+' activeUsers_'+JSON.stringify(activeUsers || []))
        if(!ip)fetch('/api/getip').then((res)=>res.json()).then((ip)=>setIp(ip))
        if(ip && !user)fetch('/api/getuser?ip='+ip)
        .then((res)=>res.json())
        .then((data)=>{setUser(data);if(data.username)activateUser(data)})
        .catch((err)=>console.log(err))
        //.then(()=>{let guest: Partial<StoredUser> = {id: 0, username: 'guest'+ip.split('.')[3], email: '', access: 0, ip: ip}; setUser(guest)})
    },[ip, user])
    useEffect(()=>{
        const f = setInterval(()=>{
            fetch('/api/getactiveusers').then((res)=>res.json()).then((data)=>setActiveUsers(data))
        }, 1000)
        return ()=>clearInterval(f)
    },[])
    return {ip, user, activeUsers}
}