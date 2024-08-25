'use client'
import { useState } from "react"

export default function DebugParams({params, searchParams}){
    const queryObject = searchParams
    const queryArray: [string, string][] = Object.entries(queryObject);

    const [debug, setDebug] = useState(false)
    const toggleDebug = ()=>setDebug(!debug)
    const ToggleDebug = ()=> <button style={{width: 'auto', zIndex: 10}} onClick={toggleDebug}>Toggle Debug</button>

    const [state, setState] = useState({left: 200, top: 200})
    function Dragable({id, state, setState, children}){
        return <div id={'dragObj_'+id} style={{position: 'absolute', left: state.left, top: state.top, width: 'auto', height: 'auto', backgroundColor: 'blue'}}
                    onDragEnd={(e)=>{console.log('drag',e);setState((s)=>{return {left: e.pageX, top:e.pageY}})}}
                    onTouchEnd={
                        (e)=>{
                            console.log('touch',e.changedTouches, e.changedTouches.item(0).pageX);
                            let drgobj: HTMLMapElement = document.querySelector('#dragObj_'+id);
                            let width: number = drgobj.clientWidth;
                            let height: number = drgobj.clientHeight;
                            console.log('dragObj_'+id, drgobj, width, height);
                            setState((s)=>{
                            return {
                                left: e.changedTouches.item(0).pageX-width/2,
                                top: e.changedTouches.item(0).pageY-height/2
                            }})}}>
            <p>Drag me</p>
            {children}
        </div>
    }

    return <Dragable id={'1'} state={state} setState={setState}>
        <ToggleDebug/>
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