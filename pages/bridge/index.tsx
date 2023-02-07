import { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Main() {
    const router = useRouter();
    useEffect(() => {
        router.push('/bridge/dashboard')
    });
    if (router.isFallback) {
        return <div>Bridge Loading...</div>
    }else return <>Bridge Not Loading?</>
}

