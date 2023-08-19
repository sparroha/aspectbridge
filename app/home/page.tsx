'use client'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { SWRConfig } from 'swr'
import { ActiveUser, LoginNav, User } from '../../pages/login/[userlogin]'
import jsonFetch from '../../lib/,base/jsonFetch'
import UserProfile from '../userprofile';

export default function Home({params, searchParams}: {params: {any}, searchParams: {any}}){
    const [ip, setIp]: [string, Dispatch<SetStateAction<string>>] = React.useState('')
    useEffect(()=>{
        fetch('/api/getip').then((res)=>res.json()).then((ip)=>setIp(ip))
    }, [])
	const [user, setUser]: [Partial<User>, Dispatch<SetStateAction<Partial<User>>>] = React.useState({})
	const [activeUsers, setActiveUsers]:[ActiveUser[], Dispatch<SetStateAction<ActiveUser[]>>] = React.useState([])

    return <SWRConfig value={{ fetcher: jsonFetch }}>
        <UserProfile ip={ip} setUser={setUser} setActiveUsers={setActiveUsers}/>
        <LoginNav user={user} homepage={'home'}/>
        <hr/>
        Active Users:<br/>
        {activeUsers.map((u, i)=>{
            return <div key={i}>{u.name}: last active {Math.floor((new Date().getTime()-u.time)/60000)} min ago</div>
        })}
        <hr/>
    </SWRConfig>
}