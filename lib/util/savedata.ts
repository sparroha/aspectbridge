import { useCallback } from "react";
import useSWR from "swr";

export default function useSave(username: string){
    const {data, error} = useSWR(`/api/registry/growth${username}`, { refreshInterval: 1000 })
    const save = useCallback((data)=>fetch(`/api/registry/growth${username}`, {
        method: 'POST',
        body: JSON.stringify({
            registry_data: data
        })
    }).then(res => res.json())
    //.then(resdata => console.log('Save Successful:', resdata))
    .catch(error => {
        console.log('error saving:'+JSON.stringify(error));
    }),[username])
    return {data, error, save}
}
