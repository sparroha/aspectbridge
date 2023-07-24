import { useEffect, useRef } from "react"

export function Clock(){
    const time = useRef(new Date())
    
    useEffect(()=>{
        const t = setInterval(()=>time.current = new Date()),1000)
        return () => clearInterval(t)
    },[time.current])
    
    return <div style={{color: 'white', background: 'gray', borderRadius: '15px', textAlign: 'center'}}>{time.current.getHours() + ':' + time.current.getMinutes() +':'+ time.current.getSeconds()}</div>
}
    