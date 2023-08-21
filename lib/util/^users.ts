'use client'
import { useEffect, useState } from "react"
import { ActiveUser, StoredUser, User, activateUser } from "../../pages/login/[userlogin]"
import { useHashCookie } from "./^hashcookie"
import useActiveUsers from "./^activeusers"

export default function useUsers(): {ip?: string, user: User,  activeUsers: ActiveUser[]} {
    //const [ip, setIp] = useState(null)//DEPRICATED
    const [hash, setHash] = useHashCookie()
    const [user, setUser] = useState(null)
    const activeUsers: ActiveUser[] = useActiveUsers(5000)
    useEffect(()=>{
        if(hash)fetch('/api/getuser?hash='+hash)
        .then((res)=>res.json())
        .then((data)=>{setUser(data);if(data.username)activateUser(data)})
        .catch((err)=>console.log(err))
        //.then(()=>{let guest: Partial<StoredUser> = {id: 0, username: 'guest'+ip.split('.')[3], email: '', access: 0, ip: ip}; setUser(guest)})
    },[hash, user])
    return {ip: 'DEP.RIC.ATE.ED', user, activeUsers}
}


