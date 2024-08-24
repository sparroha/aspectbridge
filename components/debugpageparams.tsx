'use client'
import { useEffect, useMemo, useState } from "react"
import Mouse, { useMousePosition } from "./mouse";

export default function DebugParams({params, searchParams}){
    const queryObject = searchParams
    const queryArray: [string, string][] = Object.entries(queryObject);

    const [state, setState] = useState({left: 0, top: 0, dragging: false, drop: false})
    
    const [drop, setDrop] = useState(false)
    
    const _up = (e, mousepos) => {
        console.log('upAdd')
        setState((s)=>{
            let news={...s}
            news.dragging = false
            news.drop = true
            news.left = mousepos.left
            news.top = mousepos.top
            return news
        })
        setDrop(true)
    }
    const _down = (e) => {
        console.log('downAdd')
        setState((s)=>{
            let news={...s}
            news.dragging = true
            return news
        })
    }
    const {mousepos, clickpos, lastClickpos, trate} = useMousePosition({screenid: 'debug', mUp: _up});
    
    const [debug, setDebug] = useState(false)
    const toggleDebug = ()=>setDebug(!debug)
    const ToggleDebug = ()=> <button style={{width: 'auto', zIndex: 10}} onClick={toggleDebug}>Toggle Debug</button>

    const Dragable = useMemo(()=>({children})=>{
        return <div style={{position: 'absolute', left: state.left, top: state.top, width: 100, height: 100, backgroundColor: 'blue'}} onMouseDown={_down} draggable>
            <p>Drag me</p>
            {children}
        </div>
    },[state.left, state.top])

    useEffect(()=>{
        if(state.dragging) return
        if(!state.drop) return
        setDrop(false)

    } ,[state.dragging])

    if(!debug) return <Dragable><ToggleDebug/>
        <Mouse id={'debug'} debug={true}/></Dragable>
    return <Dragable><ToggleDebug/>
        <Mouse id={'debug'} debug={true}/>
        <p>params: {JSON.stringify(params)}</p>
        <p>searchParams: {JSON.stringify(searchParams)}</p>
        <br/>
        <p>
            page: {params.id.map(
                (s)=>'/'+s
            )}<br/>
        </p>
        <p>
            query: {queryArray.map(
                ([id,value])=>id+'='+value
            ).join('&')}
        </p>
        {/*<ul>
            {queryArray.map(([id,value], key) => {
                return <li id={id} key={key}>{id+' '+value}</li>
            })}
        </ul>*/}
    </Dragable>
}