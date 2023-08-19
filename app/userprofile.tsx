'use client'

import { Profile } from "../pages/login/[userlogin]"

export default function UserProfile({ip, setUser, setActiveUsers}){
    return <Profile ip={ip} setUser={setUser} setActiveUsers={setActiveUsers}/>
}