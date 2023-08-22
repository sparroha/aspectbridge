

'use client'
import { useEffect, useState } from "react"
import { ActiveUser, User, activateUser } from "../../pages/login/[userlogin]"
import { useHashCookie } from "./^hashcookie"
import useActiveUsers from "./^activeusers"

export default function useUsers(searchParams?): {user: User,  activeUsers: ActiveUser[]} {
    const [hash, ] = useHashCookie(searchParams)
    const [user, setUser] = useState(null)
    const activeUsers: ActiveUser[] = useActiveUsers(5000)
    useEffect(()=>{
        if(hash)fetch('/api/getuser?hash='+hash)
        .then((res)=>res.json())
        .then((data)=>{setUser(data);if(data.username)activateUser(data)})
        .catch((err)=>console.log('/api/getuser?hash='+hash,err))
    },[hash, user])
    return {user, activeUsers}
}

