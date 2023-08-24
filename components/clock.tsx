'use client'
import { useEffect, useMemo, useState } from "react"

export default function Clock(props){
    const [time , setTime] = useState('00:00:00')
    //const clocktime = useMemo(()=>time.current.getHours() + ':' + time.current.getMinutes() +':'+ time.current.getSeconds(),[time.current])
    
    useEffect(()=>{
        const t = setInterval(()=>{
            let now = new Date()
            let h = now.getHours()
            let m = now.getMinutes()
            let s = now.getSeconds()
            let clk = [h,m,s].map((t)=>{return t<10?'0'+t:t}).join(':')
            //`${h<0&&'0'}${h}:${m<0&&'0'}${m}:${s<0&&'0'}${s}`
            setTime((t)=>clk)
        },1000)
        return () => clearInterval(t)
    },[])
    
    function Hand({time, h, m, s}: Partial<any>){
        const rotation = Number.parseInt(time)*6-90
        const hourRotation = Number.parseInt(time)*30-90
        const handlen = [1, 1.5, 2.5]
        const shift = [.5, .25, 0]
        const size = [2, 1.5, 1]
        if(!time) return <></>
        return <div style={{
            position: 'absolute',
            color: 'none',
            background: 'none',
            backgroundColor: 'none',
            transform: `rotate(${h?hourRotation:rotation}deg)`,
            left: '1em',
            width: '4em',
        }}>
            <hr id={'hand-silver'} style={{
                position: 'absolute',
                margin : 'auto',
                right: shift[h?0:m?1:2]+'em',
                border: `${size[h?0:m?1:2]}px outset ${h?'#444':m?'#888':'#ccc'}`, 
                width: handlen[h?0:m?1:2]+'em',
            }}/>
            <hr id={'hand-gold'} style={{
                position: 'absolute',
                margin : 'auto',
                right: shift[h?0:m?1:2]+'em',
                border: `${size[h?0:m?1:2]}px outset ${h?'#662':m?'#aa4':'#dd6'}`, 
                width: handlen[h?0:m?1:2]/1.5+'em',
            }}/>
            <hr id={'hand-color'} style={{
                position: 'absolute',
                margin : 'auto',
                right: shift[h?0:m?1:2]+'em',
                border: `${size[h?0:m?1:2]}px outset ${h?'#ff0000':m?'#00ff00':'#0000ff'}`, 
                width: handlen[h?0:m?1:2]/3+'em',
            }}/>
        </div>
    }
    return <div style={{
        position: 'relative',
        display : 'flex',
        alignItems : 'center',
        textAlign : 'center',
        color: 'white',
        background: 'gray',
        borderRadius: '3em',
        border: '.1em outset #999',
        width: '6em',
        height: '6em',
    }}>
        <hr id={'12and6'} style={{
                position: 'absolute',
                margin : 'auto',
                transform: 'rotate(90deg)',
                border: '.1em outset #ccc',
                opacity: '.5',
                width: '6em',
        }}/>
        <hr id={'9and3'} style={{
            position: 'absolute',
            margin : 'auto',
            border: '.1em outset #ccc',
            opacity: '.5',
            width: '6em',
        }}/>
        <Hand time={time?.split(':')[0]} h />
        <Hand time={time?.split(':')[1]} m />
        <Hand time={time?.split(':')[2]} s />
        <div style={{position: 'absolute', margin: 'auto', left: '1.25em'}}>{time}</div>
        
    </div>
}
    