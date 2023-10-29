import { useEffect } from "react";

export function useAutoSave(save: ()=>void, loading: boolean, deps?: any[]){
    useEffect(()=>{if(loading) return;save()},[...(deps || [])])
}