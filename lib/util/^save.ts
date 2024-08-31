'use client'
import { useCallback, useRef } from "react";
import useSWR from "swr";

/**
 * 
 * DEPRICATED??? ^register.ts
 */
export default function useSave(uuid: string, interval?: number): {data: any, error: any, save: (data: any)=>Promise<any>}{
    const {data, error} = useSWR(`/api/registry/${uuid}`, { refreshInterval: interval || 1000 })
    const parseData = useRef(data)//CONFLICTING PARSESR
    try{
        parseData.current = JSON.parse(data)
    }catch(e){
        parseData.current = data
    }
    const save = useCallback((data)=>fetch(`/api/registry/${uuid}`, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(res => res.json())
    //.then(resdata => console.log('Save Successful:', resdata))
    .catch(error => {
        console.log('error saving:'+JSON.stringify(error));
    }),[uuid])
    return {data: parseData.current, error, save}
}
