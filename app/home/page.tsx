'use client'
import React from 'react'
import { SWRConfig } from 'swr'
import { LoginNav } from '../../pages/login/[userlogin]'
import jsonFetch from '../../lib/,base/jsonFetch'
import UserProfile from '../userprofile';
import useUsers from '../../lib/util/^users'

export default function Home({params, searchParams}){
    const {ip, user, activeUsers} = useUsers()

    return <SWRConfig value={{ fetcher: jsonFetch }}>
        <UserProfile/>
    </SWRConfig>
}