import { useEffect, useRef, useState } from "react";
import useLog from "../../components/conlog";

export default function useRegister(registry: string, reg: any){
    useLog('@useRegister://REGISTRY_NAME: '+registry+' :: REGISTRY: '+JSON.stringify(reg))
    const [,setState] = useState({})//updates state for rerender of refs
    const [dataChange, setDataChanged] = useState(false)
    const register: {current: any} = useRef(reg || 0)//initialize register
    const setRegister = (rgs)=>{if (rgs !== register.current) {register.current = rgs; setDataChanged(true)}}//register setter and render function
    const [registryLoaded, setRegistryLoaded] = useState(false)
    useLog('@useRegister://REGISTER: '+JSON.stringify(register.current)+' :: LOADED: '+registryLoaded)
    
    //INIT
    //initialize register from database
    async function loadDataOnce(registry){
        return getDB(registry).then(data=>{
            console.log('@useRegister.loadDataOnce://fetch data for '+registry+': '+JSON.stringify(data))
            setRegister(data)
            console.log('@useRegister.loadDataOnce://fetch data for register.current: '+JSON.stringify(register.current))
            setRegistryLoaded(true)
        })
    }
    useEffect(()=>{loadDataOnce(registry)},[])//load registry
    //END INIT

    //UPDATE ONCHANGE
    useEffect(()=>{
        if(registryLoaded && dataChange) setDB(registry, register.current)
    },[register.current, dataChange])
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
        console.log('@getDB://fetch res: '+JSON.stringify(res))
        return res.json()
    })
}