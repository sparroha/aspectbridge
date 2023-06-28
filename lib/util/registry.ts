import { useEffect, useReducer, useRef, useState } from "react";
import useLog from "../../components/conlog";

export default function useRegister(registry: string, defaultValue: any){
    
    //useLog('@useRegister://REGISTRY_NAME: '+registry+' :: REGISTRY: '+JSON.stringify(reg))
    const [registryLoaded, setRegistryLoaded] = useState(false)
    const [register, setRegister] = useState(defaultValue)//register setter and render function
    //useLog('@useRegister://REGISTER: '+JSON.stringify(register.current)+' :: LOADED: '+registryLoaded)
    
    //INIT
    //initialize register from database
    async function loadDataOnce(registry){
        //if(register)return//overguard
        return getDB(registry).then(data=>{
            console.log('@useRegister.loadDataOnce://fetch data for '+registry+': '+JSON.stringify(data))
            setRegister(data)
            console.log('@useRegister.loadDataOnce://fetch data for register.current: '+JSON.stringify(register))
            setRegistryLoaded(true)
        }).catch(err=>console.log('@useRegister.loadDataOnce://fetch error: '+err))
    }
    useEffect(()=>{loadDataOnce(registry)},[])//load registry
    //END INIT

    return [register, (data) => {//works and tested
        setRegister(data)
        console.log('@useRegister.saveRegister://set register '+JSON.stringify(registry)+': '+JSON.stringify(data))
        setDB(registry, data)
    }]
}

//updates database with current register ref
export async function setDB(name: string, data: any){
    console.log('@setDB://set '+name+' to '+JSON.stringify(data))
    await fetch(`/api/registry/${name}`, {
        method: 'POST',
        body: JSON.stringify({
            registry_data: data
        })
    }).then(res => console.log('@setDB://res: '+res.json()))
}

export async function getDB(name: string){
    return fetch(`/api/registry/${name}`)
    .then(res=>{
        console.log('@getDB://fetch res: '+JSON.stringify(res))
        return res.json()
    })
}