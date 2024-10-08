'use client'
import { useEffect, useState } from "react"
import { useHashCookie } from "./^hashcookie"
import { activateUser } from "./^activeusers"
import { User } from "../../app/login/[action]/page"

/**
 * GET User from hash cookie
 * @param searchParams 
 * @returns 
 */
export default function useUser(): User {
    const [hash, ] = useHashCookie()
    const [user, setUser] = useState(null)
    useEffect(()=>{
        if(hash)fetch('/api/users?hash='+hash)
        .then((res)=>res.json())
        .then((data)=>{setUser(data);if(data.username)activateUser(data)})
        .catch((err)=>console.log('/api/users?hash='+hash,err))
    },[hash])
    return user
}