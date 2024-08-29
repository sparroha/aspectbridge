'use client'
import { useMemo } from "react";
import { RegistryEntry } from "../api/registry/route";
import { parsedRegistryData } from "./parsedregistry";

export default function RegistryItem({registry}: {registry: RegistryEntry}){
    const data = useMemo(()=>{if(!registry) return null; return parsedRegistryData(registry.registry_data)}, [registry])
    if(!registry) return <>Loading...</>
    return <div style={{wordWrap: 'break-word', border: '1px solid black', borderRadius: '15px', height: '100%', padding: '5px'}}>
        <div className={'row'}>
            <div className={'col-2'}><h1>{registry.id}:</h1></div>
            <div className={'col-10'}><h2><a href={'/registry/'+registry.name}>{registry.name}</a></h2></div>
        </div>
        <div className={'row'}>
            <div className={'col'}>{JSON.stringify(data)}</div>
        </div>
        <div className={'row'}>
            <RegistryData data={data} id={registry.id}/>
        </div>
    </div>
}
function RegistryData({data, id}){
    if(!data) return <>diabled</>
    if(typeof data === 'string') return <div className={'col-12'}>{data}</div>
    if(typeof data === 'object') return <>{Object.entries(data).map((a,i)=>{
        return <div key={data.id+'_'+i} className={'col-12'}>
            {a[0]}: {JSON.stringify(a[1])}
        </div>
    })}</>
    if(data instanceof Array) return <> {data.map((a,i)=>{
        return <div key={id+'_'+i} className={'col-12'}>
            {a[0]}: {a[1]}
        </div>
    })}</>
}