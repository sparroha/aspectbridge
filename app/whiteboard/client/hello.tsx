'use client'

import { useEffect } from "react"

export default function Hello(){
    useEffect(()=>{
        console.log('Hello')
    },[])
    
    return <div>{'Hello'}</div>
}