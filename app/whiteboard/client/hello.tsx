'use client'

import { useEffect } from "react"

export default async function Hello(){
    useEffect(()=>{
        console.log('Hello')
    },[])
    
    return <div>{'Hello'}</div>
}