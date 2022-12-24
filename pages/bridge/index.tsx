import { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Main() {
    const router = useRouter();
    useEffect(() => {
        router.push('/bridge/dashboard')
    });
    if (router.isFallback) {
        return <div>Loading...</div>
    }else return <>Not Loading?</>
}

