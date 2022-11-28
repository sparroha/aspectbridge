import { useEffect } from 'react'
import { useRouter } from 'next/router';

function useInitialPage() {
    const router = useRouter();
    useEffect(() => {
        router.push('/josh/dashboard')
    });
}
export default function Main() {
    useInitialPage()
}

