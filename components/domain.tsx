import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useDomainRoot(){
    const router = useRouter()
    const [domain, setDomain] = useState('')
    useEffect(() => {
        setDomain(/:\/\/([^\.]+)/.exec(window.location.href)[1])
        //console.log('@useDomainRoot('+domain+'||'+window.location.href+')')
    }, []);
    return ()=> {
        /**
         * In this configuration, the only accessable pages are the root [...slug] pages
         */
        if(domain != 'localhost:3000'){
            //if loading from 'aspectbridge.' or 'www.' then redirect to [...aspect]
            if(domain == "aspectbridge" || "www"){
                useEffect(() => {
                    router.push({pathname: '/bridge/dashboard', query: router.query})
                }, []);
            }
            //if loading from 'logan.' then redirect to [josh/[...client]...aspect]
            else if(domain == "logan"){
                useEffect(() => {
                    router.push({pathname: '/josh/dashboard', query: router.query})
                }, []);
            }
        }
    }
}
export function getDomain(){
    const [domain, setDomain] = useState('')
    useEffect(() => {
        setDomain(/:\/\/([^\.]+)/.exec(window.location.href)[1])
    })
    return domain
}
