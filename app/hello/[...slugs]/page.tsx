'use client'
import { useEffect, useState } from "react";
import { getESpreadSlugs } from "../../api/util/params";

export default function Page({params, searchParams}: {params: any, searchParams: URLSearchParams}){
    const [data, setData] = useState(null);
    //SEARCH
    const queryArray: [string, string][] = Object.entries(searchParams)
    const urlsearch: string = queryArray.map(([key, value])=>`${key}=${value}`).join('&')

    //SLUGS
    let slugs = getESpreadSlugs(params, 'slugs');//gets empty
    const urlslugs = slugs.join('/')


    const url = `/api/hello/${urlslugs}?${urlsearch}`
    useEffect(()=>{
        fetch(url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            //body: JSON.stringify(searchParams),
        }
    ).then(res => res.json()).then(setData)
    },[params, searchParams])
    return <div style={{color: 'white'}}>
        <br/>
        URL: {url}
        <br/>
        Data: {JSON.stringify(data)}
    </div>
}