'use client'
import { useState } from "react";
import { getDB, setDB } from "./@registry"

//TODO: replace dispatch with callback and handle dspatch in app. use callbeck to fetch response only
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
                if(!data.data)return
                dispatch({type: 'set', payload: JSON.parse(data.data)})
            })
            //setUserLoaded(loaded)
        }catch(e){
            alert('trying again. this happens on first load')
            try{
                //second attempt before error
                getDB(host+':'+username).then((data)=>{
                    if(!data.data)return
                    dispatch({type: 'set', payload: JSON.parse(data.data)})
                })
                //setUserLoaded(true)
                console.log('New entry for '+host+':'+username, e)
            }catch(a){
                console.log('Failed to load '+host+':'+username, a)
            }
        }
    }
    return [save, load, userLoaded]
}