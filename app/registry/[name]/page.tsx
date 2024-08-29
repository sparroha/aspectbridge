'use client'
import { useEffect, useState } from "react"
import { RegistryEntry } from "../../api/registry/route"
import { getESlug } from "../../api/util/params"
import { RegistryItem } from "../page"

export default function Select({params, searchParams}){
    const [registry, setRegistry]: [RegistryEntry, any] = useState(null)
    
    const name = getESlug(params, 'name')
    useEffect(()=>{
        fetch('/api/registry/'+name)
        .then(res=>res.json())
        .then((data: RegistryEntry)=>setRegistry(data))
    }, [])
    useEffect(()=>{
        if(registry) console.log('Registry:', registry)
    }, [registry])

    return <div style={{backgroundColor: 'white'}}><RegistryItem registry={registry}/></div>
}