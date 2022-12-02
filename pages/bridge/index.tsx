import { useEffect } from 'react'
import { useRouter } from 'next/router';

/*function useInitialPage() {
    const router = useRouter();
    useEffect(() => {
        router.push('/josh/dashboard')
    });
}*/
export default function Main() {
    const router = useRouter();
    useEffect(() => {
        router.push('/bridge/dashboard')
    });
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    //useInitialPage()
}

