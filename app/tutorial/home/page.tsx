'use client'
import React from 'react'
import { SWRConfig } from 'swr'
import jsonFetch from '../../../lib/,base/jsonFetch'
import UserProfile from '../../../lib/util/-userprofile-';
import useUser from '../../../lib/util/^user'

export default function Home({params, searchParams}){
    const user = useUser()

    return <SWRConfig value={{ fetcher: jsonFetch }}>
        <UserProfile/>
    </SWRConfig>
}