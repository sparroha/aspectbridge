import { useEffect, useState } from "react";
export function useDomainRoot(){
    const [domain, setDomain] = useState('')
    useEffect(() => {
        if(window.location.href=="http://localhost:3000/"){setDomain("localhost")}
        else setDomain(/:\/\/([^\.]+)/.exec(window.location.href)[1])
        console.log('@useDomainRoot('+domain+'||'+window.location.href+')')
    });
    return domain
}