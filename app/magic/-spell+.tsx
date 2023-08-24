'use client'
import { useEffect, useState } from "react"
import { Magic } from "./c_magic"
import useRegister, { useCustomRegistry } from "../../lib/util/^register"
import { useRouter } from "next/navigation"

export default function Spell({logos}: {logos: string[]}){
    const router = useRouter()
    const customloader = (logos: string[])=>new Magic(logos)
    const customSaver = (spell: Magic)=>spell.logos
    const [spell, save] = useCustomRegistry('logos:'+logos[0], logos, false, customloader, customSaver )
    /*********************************************\
     * const logos: string[]
     * const [spell, save]: [Magic, (Magic)=>void] = convolutedSetState()
    \*********************************************/
    useEffect(()=>{
        switch(logos[0]){
            case 'delete':
                fetch(`/api/registry/logos:${logos[1]}?command=delete`).then((res)=>res.json()).then((data)=>console.log(data))
                break
            case 'overright':
                fetch(`/api/registry/logos:${logos[1]}?command=delete`).then((res)=>res.json()).then((data)=>{
                    let spell = logos.filter((l,i)=>i>0).toString().replaceAll(',','/')
                    //alert("Redirectiong to ... /"+spell+' :: Deleted:'+JSON.stringify(data))
                    router.push('/magic/'+spell)
                })
                break
            default:
                break
        }
    },[spell?.name])



    //RENDER
    if(!spell)return<>Silence...</>
    if(logos[0]=='overright')return<>Overrighting::{logos[1]} ...</>
    return <div>
        {JSON.stringify(spell)}<br/>
    </div>
}