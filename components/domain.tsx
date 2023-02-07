import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useDomainRoot(props){
    const router = useRouter()
    const [domain, setDomain] = useState('')
    const [username, setUsername] = useState(props.username?props.username:'')
    useEffect(() => {
        setDomain(/:\/\/([^\.]+)/.exec(window.location.href)[1])
        console.log('@useDomainRoot('+domain+'||'+window.location.href+')')
        if(domain != 'localhost:3000/'){
            //if loading from 'aspectbridge.' or 'www.' then redirect to [...aspect]
            if(domain == "aspectbridge" || domain == "www"){router.push({pathname: '/bridge/'+(username?username:(domain?domain:'')), query: router.query})}
            //if loading from 'logan.' then redirect to [josh/[...client]...aspect]
            else if(domain == "logan"){router.push({pathname: '/josh/'+(username?username:(domain?domain:'')), query: router.query})}
        }
        return ()=> {
            /**
             * In this configuration, the only accessable pages are the root [...slug] pages
             */
        }
    }, [domain]);
}
export function getDomain(){
    const [domain, setDomain] = useState('')
    useEffect(() => {
        setDomain(/:\/\/([^\.]+)/.exec(window.location.href)[1])
    })
    return domain
}
