'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function Main({params}) {
    //ROOT INACCESSIBLE: REDIRECT IMENENT
    const router = useRouter();
    useEffect(() => { router.push('/bridge/'+(params.name || 'guest')) },[]);
    return <div>Bridge Loading...</div>
}

