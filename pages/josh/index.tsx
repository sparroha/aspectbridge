import { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Main() {
    const router = useRouter();
    useEffect(() => {
        router.push({pathname: '/josh/dashboard', query: router.query})
    });
    if (router.isFallback) {
        return <div>Josh Loading...</div>
    }else return <>Josh Not Loading?</>
}

