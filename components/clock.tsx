'use client'
import { useEffect, useMemo, useRef, useState } from "react"

export default function Clock(props){
    const [time , setTime] = useState('00:00:00')
    //const clocktime = useMemo(()=>time.current.getHours() + ':' + time.current.getMinutes() +':'+ time.current.getSeconds(),[time.current])
    
    useEffect(()=>{
        const t = setInterval(()=>{
            let now = new Date()
            setTime((t)=>{return now.getHours() + ':' + now.getMinutes() +':'+ now.getSeconds()})
        },1000)
        return () => clearInterval(t)
    },[])
    
    return <div style={{
        color: 'white',
        background: 'gray',
        borderRadius: '15px',
        textAlign: 'center'
    }}>
        {time}
    </div>
}
    