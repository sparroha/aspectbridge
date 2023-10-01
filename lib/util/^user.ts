'use client'
import { useEffect, useState } from "react"
import { User } from "../../pages/login/[userlogin]"
import { useHashCookie } from "./^hashcookie"
import { activateUser } from "./^activeusers"

/**
 * GET User from hash cookie
 * @param searchParams 
 * @returns 
 */
export default function useUser(): User {
    const [hash, ] = useHashCookie()
    const [user, setUser] = useState(null)
    useEffect(()=>{
        if(hash)fetch('/api/getuser?hash='+hash)
        .then((res)=>res.json())
        .then((data)=>{setUser(data);if(data.username)activateUser(data)})
        .catch((err)=>console.log('/api/getuser?hash='+hash,err))
    },[hash])
    return user
}