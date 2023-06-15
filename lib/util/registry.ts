import { useEffect, useRef, useState } from "react";

export default function useRegister(registry: string, reg: any){
    const [,setState] = useState({})//updates state for rerender of refs
    const register: {current: any} = useRef(reg || 0)//initialize register
    const setRegister = (rgs)=>{register.current = rgs; setState({})}//register setter and render function
    const [registryLoaded, setRegistryLoaded] = useState(false)
    
    //INIT
    //initialize register from database
    async function loadDataOnce(registry){
        return getDB(registry).then(data=>{
            console.log('fetch data for '+registry+': '+JSON.stringify(data))
            setRegister(data)
            console.log('fetch data for register.current: '+JSON.stringify(register.current))
            setRegistryLoaded(true)
        })
    }
    useEffect(()=>{loadDataOnce(registry)},[])//load registry
    //END INIT

    //UPDATE ONCHANGE
    useEffect(()=>{
        if(registryLoaded) setDB(registry, register.current)
    },[register.current])
    //END UPDATE

    return [register.current, setRegister]
}

//updates database with current register ref
export async function setDB(name: string, data: any){
    await fetch(`/api/registry/${name}`, {
        method: 'POST',
        body: JSON.stringify({
            registry_data: data
        })
    }).then(res => console.log(res.json()))
}

export async function getDB(name: string){
    return fetch(`/api/registry/${name}`)
    .then(res=>{
        console.log('fetch res: '+res)
        return res.json()
    })
}