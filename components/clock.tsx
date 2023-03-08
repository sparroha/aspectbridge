import { useEffect, useState } from "react"

export function Clock(){
    const [time, setTime] = useState(new Date())
    
    useEffect(()=>{
        const t = setInterval(()=>setTime(new Date()),1000)
        return () => clearInterval(t)
    },[time])
    
    return <div style={{color: 'white', background: 'gray', borderRadius: '15px'}}>{time.getHours() + ':' + time.getMinutes() +':'+ time.getSeconds()}</div>
}
    