import { useEffect, useMemo, useRef } from "react"

export default function Clock(props){
    const time = useRef(new Date())
    const clocktime = useMemo(()=>time.current.getHours() + ':' + time.current.getMinutes() +':'+ time.current.getSeconds(),[time.current])
    
    useEffect(()=>{
        const t = setInterval(()=>time.current = new Date(),1000)
        return () => clearInterval(t)
    },[time.current])
    
    return <div style={{
        color: 'white',
        background: 'gray',
        borderRadius: '15px',
        textAlign: 'center'}}
    >
        {clocktime}
    </div>
}
    