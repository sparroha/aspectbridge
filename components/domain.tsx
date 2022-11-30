import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export function useDomainRoot(){
    const router = useRouter()
    const [domain, setDomain] = useState('')
    useEffect(() => {
        if(window.location.href=="http://localhost:3000/"){setDomain("localhost")}
        else setDomain(/:\/\/([^\.]+)/.exec(window.location.href)[1])
        console.log('@useDomainRoot('+domain+'||'+window.location.href+')')
        if(domain == "aspectbridge" || "www"){router.push('/dashboard')}
        else if(domain == "logan" || "localhost"){router.push('/josh/dashboard')}
    });
    return domain
}