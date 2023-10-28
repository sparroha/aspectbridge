'use client'
import { useEffect } from "react";
import { getDB, setDB } from "./@registry"

//TODO: replace dispatch with callback and handle dspatch in app. use callbeck to fetch response only
export function useUserSave(host: string, username: string, state: any, callback: (any)=>void, updateUsername?: (string)=>void): [()=>void, ()=>void]{
    const save = ()=>{//save
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
        if(!username)return alert('loading user or user not logged in')
        getDB(host+':'+username).then((data)=>{
                if(!data.data)return
                callback(JSON.parse(data.data))
        })
    }
    const useLoad = ()=>{
        useEffect(()=>{
            if(!username)return
            load()
            if(!updateUsername)return
            setTimeout(()=>{
                updateUsername(username)
            }, 333)
        },[username])
    }
    //useLoad()
    return [save, useLoad]
}