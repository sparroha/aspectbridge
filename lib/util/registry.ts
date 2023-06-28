import { useEffect, useReducer, useRef, useState } from "react";
import useLog from "../../components/conlog";

export default function useRegister(registry: string, defaultValue: any){
    
    //useLog('@useRegister://REGISTRY_NAME: '+registry+' :: REGISTRY: '+JSON.stringify(reg))
    const [currentsave, setCurentSave] = useState(registry)//current save
    const [registryLoaded, setRegistryLoaded] = useState(false)
    const [register, setRegister] = useState(defaultValue)//register setter and render function
    //useLog('@useRegister://REGISTER: '+JSON.stringify(register.current)+' :: LOADED: '+registryLoaded)
    
    //INIT
    //initialize register from database
    async function loadDataOnce(registry){
        if(registryLoaded) return
        if(!registry) {console.log('registry: '+registry); return}
        if(registry ==  null) {console.log('registry: '+registry); return}
        //if(register)return//overguard
        return getDB(registry).then(data=>{
            //console.log('@useRegister.loadDataOnce://fetch data to replace default register: '+JSON.stringify(register))
            //console.log('@useRegister.loadDataOnce://fetch data for '+registry+': '+JSON.stringify(data))
            setRegister(data)
            setRegistryLoaded(true)
        }).catch(err=>console.log('@useRegister.loadDataOnce://fetch error: '+err))
    }
    //load saved data once and if data name changes
    useEffect(()=>{
        if(!registry)return
        if(registry != currentsave){
            setRegistryLoaded(false)
        }
        loadDataOnce(registry)
    },[registry])//load registry
    //END INIT

    return [register, (data) => {//works and tested
        setRegister(data)
        //console.log('@useRegister.saveRegister://set register '+JSON.stringify(registry)+': '+JSON.stringify(data))
        setDB(registry, data)
    },registryLoaded]
}

//updates database with current register ref
export async function setDB(name: string, data: any){
    //console.log('@setDB://set '+name+' to '+JSON.stringify(data))
    await fetch(`/api/registry/${name}`, {
        method: 'POST',
        body: JSON.stringify({
            registry_data: data
        })
    }).then(res => {
        //console.log('@setDB://res: '+JSON.stringify(res))//always {}
        return res.json()
    })
}

export async function getDB(name: string){
    return fetch(`/api/registry/${name}`)
    .then(res=>{
        console.log('@getDB://fetch res: '+JSON.stringify(res))//always {}
        return res.json()
    })
}