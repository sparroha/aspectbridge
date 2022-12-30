import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLog from "./conlog";
import { useClient, usePath } from "./ll/client_info_card";
import getClientInfo from "./ll/navigation/clientinfo";
export default function useDomainRoot(){
    const router = useRouter()
    const [domain, setDomain] = useState('')
    const client = useClient()
    const path = usePath(client)
    useEffect(() => {
        setDomain(/:\/\/([^\.]+)/.exec(window.location.href)[1])
        console.log('@useDomainRoot('+domain+'||'+window.location.href+')')
        
        return ()=> {
            /**
             * In this configuration, the only accessable pages are the root [...slug] pages
             */
            if(domain != 'localhost:3000'){
                //if loading from 'aspectbridge.' or 'www.' then redirect to [...aspect]
                if(domain == "aspectbridge" || "www"){router.push({pathname: '/bridge/dashboard', query: router.query})}
                //if loading from 'logan.' then redirect to [josh/[...client]...aspect]
                else if(domain == "logan"){router.push({pathname: '/josh/dashboard', query: router.query})}
            }
        }
    }, [domain]);
}
export function getDomain(){
    const [domain, setDomain] = useState('')
    const [path, setPath] = useState({dir: ' ', sub: ' ', nest: ' '});
    useEffect(() => {
        setDomain(/:\/\/([^\.]+)/.exec(window.location.href)[1])
    })
    return domain
}



//**TODO: Test on multiple sources
//const query = useRQuery()
//get path from client
//const path = useRelPath(query)
//get data from path
//const data = useDataObj(path)
export function useRQuery(){
    const router = useRouter()
    const { q } = router.query
    useEffect(()=>{

    },[])
    useLog('@useClient('+q+')')
    return q;
}
/*export function useRelPath(client){
    const [path, setPath] = useState({dir: ' ', sub: ' ', nest: ' '});
    useEffect(()=>{
        function p(){
            if(client){
                let dir = (client.length>1?client[0]:client).toString()
                let sub = (client.length>1?client[1]:client).toString()
                let nest = (client.length>2?client[2]:(client.length>1?client[1]:client)).toString()
                setPath({dir: dir, sub: sub, nest: nest})
            }
        } p()
        return p()
    }, [client])
    //useLog('@usePath(/'+path.dir+'/'+path.sub+'/'+path.nest+')')
    return path;
}
export function useDataObj(path){
    const [data, setData] = useState({ info: <></>, nav: <></>, subnav: <></> })
    useEffect(()=>{
        function p(){
            if(path){
                let d = getClientInfo(path)
                setData(d)
            }
        } p()
        return p()
    }, [path])
    return data
}*/
