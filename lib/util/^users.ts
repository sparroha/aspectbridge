import { useEffect, useState } from "react"
import { ActiveUser, User } from "../../pages/login/[userlogin]"

export default function useUsers(): {ip: string, user: User, activeUsers: ActiveUser[]} {
    const [ip, setIp] = useState(null)
    const [user, setUser] = useState(null)
    const [activeUsers, setActiveUsers] = useState(null)
    useEffect(()=>{
        if(!ip)fetch('/api/getip').then((res)=>res.json()).then((ip)=>setIp(ip))
        if(!user)fetch('/api/getuserdetails?ip='+ip).then((res)=>res.json()).then((data)=>setUser(data))
        if(!activeUsers)fetch('/api/getactiveusers').then((res)=>res.json()).then((data)=>setActiveUsers(data))
    },[ip])
    return {ip, user, activeUsers}
}