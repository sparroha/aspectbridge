'use client'
import useUsers from "../../lib/util/^users";
import { ActiveUser, User, activateUser } from "../../pages/login/[userlogin]";
import Hello from "./client/hello";
import ActiveUsers from "../../lib/-activeusers-";
//import { headers } from "next/headers";

export type StdUserProps = {
    ip: string,
    user: User,
    activeUsers: ActiveUser[]
}

/*async function getUserProps(): Promise<StdUserProps>{
    const ip: string = await fetch('/api/getip').then((res)=>res.json()).then((data)=>typeof data==='string'?data:JSON.stringify(data))
    const user: User = await fetch('/api/getuser?ip='+ip).then((res)=>res.json())
    if(user.username)activateUser(user)
    const activeUsers: ActiveUser[] = await fetch('/api/getactiveusers').then((res)=>res.json())
    const res = {ip, user, activeUsers}
    return res
}*/
export default function Page({params}){
    const {user} = useUsers()
    return <div>
        <Hello/>
        {JSON.stringify(user)}
        <ActiveUsers/>
        </div>
}