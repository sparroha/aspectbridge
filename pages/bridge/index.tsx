import { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Main(props) {
    const router = useRouter();
    useEffect(() => {
        router.push('/bridge/'+(router?.query?.username || 'guest'))
    },[]);
    if (router.isFallback) {
        return <div>Bridge Loading...</div>
    }else return <>Bridge Not Loading?</>
}

