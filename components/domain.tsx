import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function useDomainRoot(){
    const router = useRouter()
    const [domain, setDomain] = useState('')
    useEffect(() => {
        setDomain(/:\/\/([^\.]+)/.exec(window.location.href)[1])
        console.log('@useDomainRoot('+domain+'||'+window.location.href+')')
        if(domain != 'localhost:3000'){
            if(domain == "aspectbridge" || "www"){router.push('/dashboard')}
            else if(domain == "logan"){router.push('/josh/dashboard')}
        }
    });
    return domain
}
export function getDomain(){
    const [domain, setDomain] = useState('')
    useEffect(() => {
        setDomain(/:\/\/([^\.]+)/.exec(window.location.href)[1])
    })
    return domain
}