import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Determines the root domain and redirects to the appropriate page
 * @param props 
 */
export default function useDomainRoot(props){
    const router = useRouter()
    const [domain, setDomain] = useState('')
    const [username, ] = useState(props.username?props.username:'')
    useEffect(() => {
        setDomain(/:\/\/([^\.]+)/.exec(window.location.href)[1])
        console.log('@useDomainRoot('+domain+'||'+window.location.href+')')
        if(domain != 'localhost:3000/'){
            //if loading from 'aspectbridge.' or 'www.' then redirect to [...aspect]
            if(domain == "aspectbridge" || domain == "www"){router.push('/bridge/'+(username?username:'')+'?domain='+domain)}
            //if loading from 'logan.' then redirect to [josh/[...client]...aspect]
            else if(domain == "logan"){router.push('/josh/'+(username?username:(domain?domain:'')))}
            else if(domain == "dev"){router.push('/'+(username?username:(domain?domain:'')))}
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
