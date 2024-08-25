'use client'
import { useEffect, useMemo, useState } from "react"
//import Mouse, { useMousePosition } from "./mouse";

export default function DebugParams({params, searchParams}){
    const queryObject = searchParams
    const queryArray: [string, string][] = Object.entries(queryObject);

    const [debug, setDebug] = useState(false)
    const toggleDebug = ()=>setDebug(!debug)
    const ToggleDebug = ()=> <button style={{width: 'auto'}} onClick={toggleDebug}>Toggle Debug</button>

    const [state, setState] = useState({left: 200, top: 200})
    function Dragable({state, setState, children}){
        return <div style={{position: 'absolute', left: state.left, top: state.top, width: 'auto', height: 'auto', backgroundColor: 'blue'}}
                    onDragEnd={(e)=>{console.log('drag',e);setState((s)=>{return {left: e.pageX, top:e.pageY}})}}
                    onTouchEnd={(e)=>{console.log('drag',e);setState((s)=>{return {left: e.targetTouches[length-1].pageX, top: e.targetTouches[length-1].pageY}})}}
                    >
            <p>Drag me</p>
            {children}
        </div>
    }

    return <Dragable state={state} setState={setState}><ToggleDebug/>
        <div style={{height: 'auto', width: 'auto', visibility: (debug?'visible':'collapse')}}>
            <p>params: {JSON.stringify(params)}</p>
            <p>searchParams: {JSON.stringify(searchParams)}</p>
            <br/>
            <p>
                query: {queryArray.map(
                    ([id,value])=>id+'='+value
                ).join('&')}
            </p>
        </div>
    </Dragable>
}