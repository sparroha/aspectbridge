'use client'
import { useEffect, useState } from "react";
import { getDB, setDB } from "./@registry"
import { RegistryEntry } from "../../app/api/registry/route"

//TODO: replace dispatch with callback and handle dspatch in app. use callbeck to fetch response only
export function useUserSave(host: string, username: string, state: any, callback: (any)=>void, updateUsername?: (string)=>void): [()=>void, boolean, ()=>void]{
    const [loading, setLoading] = useState(true)
    const [un, setUn] = useState('')
    const save = (force = false)=>{//save
        if(!force){
            if(un!=username)return
            if(loading)return
        }
        if(!username)return
        try{
            setDB(host+':'+username, state)
        }catch(e){
            try{
                setDB(host+':'+username, state)
                console.log('New entry for '+host+':'+username, e)
            }catch(a){
                console.log('Failed to save '+host+':'+username, a)
            }
        }
    }
    const load = ()=>{//load
        if(!username)return// console.log('loading user or user not logged in')
        getDB(host+':'+username).then((data: RegistryEntry)=>{
                if(data == undefined)return
                if(!data) return save(true)//DOTEST
                /*initializer callback*/
                callback(JSON.parse(data.registry_data))
                setLoading(false)
                setUn(username)
               //how is this ^ different than this v? clerify

if(updateUsername)updateUsername(username)
        })
    }
    useEffect(()=>{
        setLoading(true)
    },[username])
    useEffect(()=>{//If user changes after load
        //if(un!=username)return
        if(!loading)return
        load()
    },[loading])
    return [save, loading, load]
}