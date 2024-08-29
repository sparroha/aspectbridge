'use client'
import { useEffect, useState } from "react"
import { RegistryEntry } from "../api/registry/route"
import RegistryItem from "./registryitem"

//const ftd = [{order: 0, name: '', type:'', subtype:'', children:<></>, img: wikiImg+'', href: wiki+''},]

export default function Page({params, searchParams}){
    
    const search = searchParams.search
    const [registries, setRegistries]: [RegistryEntry[], any] = useState(null)
    useEffect(()=>{
        fetch('/api/registry')
        .then(res=>res.json())
        .then((data: RegistryEntry[])=>setRegistries(data.filter(a=>search ? a.name.includes(search) : true)))
    }, [])
    useEffect(()=>{
        if(registries) console.log('Registries:', registries)
    }, [registries])

    return <div style={{backgroundColor: 'white'}}>
        <div className={'row'}>
            <form action={'/registry'} method={'get'} className={'col-xs-12 col-sm-12 col-md-6 col-lg-4'} style={{padding: '10px'}}>
                <input type={'text'} name={'search'}></input>
                <button type={'submit'}>Search</button>
            </form>
        </div>
        <div className={'row'}>
            {registries?.map((registry, i)=>{
                return <div key={i} className={'col-xs-12 col-sm-12 col-md-6 col-lg-4'} style={{padding: '10px'}}>
                    <RegistryItem registry={registry}/>{/*BROKEN acoording to VERCEL: works locally*/}
                </div>
            })}
        </div>
    </div>
}