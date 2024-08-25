'use client'
import { useEffect, useMemo, useState } from "react";

export type Position = {left: number, top: number}
export type MouseProps = {mousepos: Position, clickpos: Position, lastClickpos: Position, trate: number | string}
export type MouseHookProps = {
    screenid?: string,
    mDown?: (e: Event, mousepos: Position)=>void,
    click?: (e: Event, mousepos: Position)=>void,
    mUp?: (e: Event, mousepos: Position)=>void,
    context?: (e: Event, mousepos: Position)=>void,
}
/**
 * 
 * @param props id, setMouse
 * @returns 
 */
export default function Mouse(props) {
    const {id, mouseProps, children} = props
    const {mousepos, clickpos, lastClickpos, trate} = mouseProps || useMousePosition({});
    useEffect(() => {//DEPRICATED
        //if(setMouse) setMouse({mousepos, clickpos, lastClickpos, trate})//infinite loop
        //console.log('setMouse', mousepos, clickpos)
    }, [mousepos, clickpos]);
    const [marketToggle, setMarkerToggle] = useState(false)
    
    return <div id={'mouse-'+id}>
            <div id={'mousepos-'+id} hidden={!props.debug}>{Math.floor(mousepos?mousepos.left:0)+'/'+Math.floor(mousepos?mousepos.top:0)}</div>
            <div id={'clickpos-'+id} hidden={!props.debug}>Click: {Math.floor(clickpos?clickpos.left:0)+'/'+Math.floor(clickpos?clickpos.top:0)}</div>
            <div id={'clickpos-'+id} hidden={!props.debug}>Last Click: {Math.floor(lastClickpos?lastClickpos.left:0)+'/'+Math.floor(lastClickpos?lastClickpos.top:0)}</div>
            <div id={'clickpos-'+id+'-marker'} hidden={!marketToggle} style={{position: 'absolute', left: clickpos.left, top: clickpos.top, transition: 'left '+trate+'ms linear, top '+trate+'ms linear', width: 5, height: 5, borderRadius: '50px', backgroundColor: 'blue'}}>marker: {trate+'s'}</div>
            <input type={'checkbox'} id={'clickpos-'+id+'-marker-toggle'} style={{position: 'absolute', right: 0, top: 0, width: 10, height: 10, borderRadius: '50px', backgroundColor: 'blue'}} value={marketToggle?'true':'false'} onChange={(e)=>{setMarkerToggle(!marketToggle)}}/>
            {children?children:null}
        </div>
        
}
/**
 * 
 * @param screenid selector
 * @param mDown
 * @param click
 * @param mUp 
 * @param context
 * @returns MouseProps
 */
export function useMousePosition(mouseHook: MouseHookProps): MouseProps {
    const [hook,] = useState(mouseHook)   
    const {screenid, mDown, click, mUp, context} = useMemo(()=>{console.log('hook changed to:',hook);return hook}, [hook])
    const [screen, setScreen]: [HTMLMapElement, any] = useState(null)
    const [mousepos, setMousepos] = useState({left: 0, top: 0});
    const [clickpos, setClickpos] = useState({left: 0, top: 0});
    const [lastClickpos, setLastClickpos] = useState({left: 0, top: 0});
    const stepDistance = 500
    const [trate, setTrate] = useState(1)
    useEffect(()=>{//set Transition Rate based on distance from last clickpos
        if(!screen)return
        setTrate((lt)=>{//completely not what is intended. Error in logic
            let pos = (mousepos.left == 0 && mousepos.top == 0)?lastClickpos:mousepos
            let marker = objOffset(document.querySelector('#clickpos-'+screenid+'-marker'));
            let vctr = {left: pos.left - marker.left, top: pos.top - marker.top}
            let vctrlen = Math.sqrt(vctr.left*vctr.left+vctr.top*vctr.top)
            let t = vctrlen/stepDistance
            return t!=0?t:lt
        })
    },[mousepos])
    useEffect(() => {//Event Listeners
        console.log('screen', screen?.id,'screenid', screenid)
        if(screen && screen.id!= screenid){//if screenid changes after screen is initialized
            //let scr: Element = document.querySelector(screenid?'#'+screenid:'html>body')
            console.log('screenid', screenid)
            let scr: HTMLMapElement = document.querySelector('#'+screenid)
            console.log('scr.id', scr.id)
            setScreen(scr);
        }

        window.onmousemove = (event) => {
            let offset = objOffset(screen);
            setMousepos({
                left: event.clientX-offset.left,
                top: event.clientY-offset.top
            });
        }
        window.onclick = (event) => {
            setMousepos((mousepos) => {//used as mousepos getter
                console.log('click', mousepos)
                setClickpos((clickpos)=>{//used as clickpos getter
                    setLastClickpos(clickpos)
                    return mousepos
                });
                if(click != null)click(event, mousepos)//not calling?
                return mousepos
            });
        }
        window.oncontextmenu = function handleContextMenue(event) {
            setMousepos((mousepos) => {
                console.log('context', mousepos)
                setClickpos((clickpos)=>{
                    setLastClickpos(clickpos)
                    return mousepos
                });
                if(context)context(event, mousepos)
                return mousepos
            });
        };

        return () => {
            window.onmousemove = null;
            window.onclick = null;
            window.oncontextmenu = null;
        }
    }, [screenid]);
    return {mousepos, clickpos, lastClickpos, trate: (trate*1000).toFixed(2)};
}
export function objOffset(obj: HTMLMapElement){
    var left = 0;
    var top = 0;
    if (obj?.offsetParent) {
        left += obj.getBoundingClientRect().left;
        top  += obj.getBoundingClientRect().top;
        return {
            left : left,
            top : top
        };
        //obj = obj.offsetParent;
        //console.log("@engine-100{left: "+$(obj).offset().left+", top: "+top+", obj: "+obj+"}")
    } 
    
    return {
        left : left,
        top : top
    };
}