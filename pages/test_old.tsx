import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import Mouse, { MouseProps, objOffset } from '../components/mouse'
import VecObj, { Position, Vector, VectorObject, VectorTransition, calculateSpeedMagnitude, calculateVector, calculateVectordirectionAngle, conservePosNeg, targetPositionVector, useBehaviorCircle, useVectorTransition, vectorFromMagnitudeAngle, vectorTargetPosition } from '../components/vectortransition'
export default function Auto(props){
    const speedModifyer = 1.5
    const hp = React.useRef(100)
    const stopV = {x:0, y:0}
    const stopP = {left:0, top:0}
    const [mouse, setMouse]: [MouseProps, Function] = React.useState(null)
    //<B>
    const vfunB = useCallback((last: Vector)=>{
        if(!last) return {x: 7, y: 7}
        let nextX = last.x+(Math.random()*10-5)
        let nextY = last.y+(Math.random()*10-5)
        return {x: nextX, y: nextY}
    },[])
    const vectorB = useVectorTransition(vfunB)
    //</B>
    const [targetM, setTarget] = React.useState({left: 0, top: 0})
    //
    const docBounds = React.useRef(null)
    useEffect(()=>{
        if(!document)return
        let h = document.querySelector('body').clientHeight
        let w = document.querySelector('body').clientWidth
        docBounds.current = {h, w}
    },[])
    //
    useEffect(()=>{
        const f = ()=>{
            let p = objOffset(document.querySelector('#rawr'))
            setTarget((last)=>{
                if(Math.abs(last.left - p.left) < 10 && Math.abs(last.top - p.top) < 10){hp.current=hp.current>=10?hp.current-10:0}
                return objOffset(document.querySelector('#mouse'))
            })
        }
        const i = setInterval(f, 500)
        return ()=>clearInterval(i)
    },[])
    
    return <>
        <input type={'range'} min={0} max={100} value={hp.current} readOnly/>
        <h1>{hp.current==0?'RAWR':''}</h1>
        <Mouse id={'nest'} setMouse={setMouse}>
            <div id={'mouse'} style={{position: 'absolute', ...mouse?.clickpos, transition: 'left '+(+mouse?.trate*speedModifyer || 0)+'ms linear, top '+(+mouse?.trate*speedModifyer || 0)+'ms linear', width: 22, height: 22, borderRadius: '50px', backgroundColor: 'red'}}></div>
        </Mouse>
        <div id={'vectorB'} style={{position: 'absolute', ...vectorB.nextPosition, transition: 'left linear 1s, top linear 1s', border: '1px solid black'}}>Wanderer</div>
        <VO target={targetM} rate={+mouse?.trate || 0}/>{/**Not Working??? */}
        <div id={'shop'} className={'shelter'} style={{position: 'absolute', width: '100px', height: '100px', border: '1px solid black', borderRadius: '25px', background: 'radial-gradient(#00f, #fff)', left: docBounds?.current?.w/2-200 || 0, top: docBounds?.current?.h/2-200 || 0}}></div>
    </>
}

/**
 * 
 * click target is marked by Mouse
 * seeker object should update position = target.position && transitionSpeed = (position, target.position)=>{return {x: target.position.left - position.left, y: target.position.top - position.top}}
 * 
 * if target change
 * seeker.left&top:target:left&top, seeket.transitionSpeed: target:left&top-seeker.left&top
 * 
 * 
 * 
 * 
 * 
 * 
 */
export function VO(props: {position?: Position, target?: Position, rate?: number}){
    const ratemod = 1.5
    const {position, target, rate} = props
    useEffect(()=>{

        objOffset(document.querySelector('#mouse'))
    },[])
    return <div id={'rawr'} style={{position: 'absolute',
        ...target,
        transition: 'left '+(rate*ratemod).toFixed(2)+'ms linear, top '+(rate*ratemod).toFixed(2)+'ms linear'}}>
            RAWR
    </div>
}