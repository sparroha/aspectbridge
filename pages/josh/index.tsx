import { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Main() {
    const router = useRouter();
    useEffect(() => {
        router.push('/josh/dashboard')
    });
    if (router.isFallback) {
        return <div>Josh Loading...</div>
    }else return <>Josh Not Loading?</>
}

