'use client'
import { useEffect, useMemo, useState } from "react"
import { RegistryEntry } from "../api/registry/route"
import RegistryItem from "./registryitem"

//const ftd = [{order: 0, name: '', type:'', subtype:'', children:<></>, img: wikiImg+'', href: wiki+''},]

export default function AllRegistries({params, searchParams}){
    
    const app = searchParams.app
    const [registries, setRegistries]: [RegistryEntry[], any] = useState(null)
    useEffect(()=>{
        fetch('/api/registry')
        .then(res=>res.json())
        .then((data: RegistryEntry[])=>setRegistries(data.filter(a=>app ? a.name.includes(app) : true)))
    }, [])
    useEffect(()=>{
        if(registries) console.log('Registries:', registries)
    }, [registries])

    return <div style={{backgroundColor: 'white'}}>
            <div className={'row'}>
                {registries?.map((registry, i)=>{
                return <div key={i} className={'col-xs-12 col-sm-12 col-md-6 col-lg-4'} style={{padding: '10px'}}>
                    <RegistryItem registry={registry}/>
                </div>
            })}
            </div>
    </div>
}