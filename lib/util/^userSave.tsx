'use client'
import { useState } from "react";
import { getDB, setDB } from "./@registry"

export function useUserSave(host: string, username: string, state: any, dispatch: any): [()=>void, ()=>void, boolean]{
    const [userLoaded, setUserLoaded] = useState(false)
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
        try{
            getDB(host+':'+username).then((data)=>{
                dispatch({type: 'set', payload: JSON.parse(data.data)})
            })
            setUserLoaded(true)
        }catch(e){
            try{
                getDB(host+':'+username).then((data)=>{
                    dispatch({type: 'set', payload: JSON.parse(data.data)})
                })
                setUserLoaded(true)
                console.log('New entry for '+host+':'+username, e)
            }catch(a){
                console.log('Failed to save '+host+':'+username, a)
            }
        }
    }
    return [save, load, userLoaded]
}