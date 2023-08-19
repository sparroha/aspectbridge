import { type } from "os"
import React, { useEffect } from "react"
export type Vector = {x: number, y: number}
export type Position = {left: number, top: number}
export type Bounds = {left: number, right: number, top: number, bottom: number}
export type Behavior = {bounce: boolean, wrap: boolean, gravity: boolean}
export type VectorObject = {
	id: string,
	style?: {},
	//speed?: number,
	//turn?: number,
	delta?: number,
	position?: Position,
	vector?: Vector,
	bounds?: Bounds,
	behavior?: Behavior
	setProps?: Function
}
export type VectorTransition = {
	center: Position,
	bounds: Bounds,
	nextVector: Vector,
	nextPosition: Position,
	setNextVector: Function,
	setNextPosition: Function,
}

export function useBehaviorCircle(vo: VectorObject, clockwise: boolean = true, rate: number = Math.random()*2){
	
	let d = clockwise ? 1 : -1
	let v = vo?.vector
	let speed = 0
	if(v && v.x==0&&v.y==0)speed = 1
	v = {x: 1, y: 1}
	speed = Math.sqrt(v.x*v.x+v.y*v.y)

	let a = (v.x + v.y)/2
	useEffect(()=>{
		if(vo?.setProps)vo.setProps((p: VectorObject)=>{return{
			...p,
			vector: {
				x: p.vector.x + p.delta-p.delta/2,
				y: p.vector.y + p.delta-p.delta/2
			},
		}}
	)}, [vo?.position])
}

export default function VecObj(props: VectorObject){
	const {id, style, position, vector, bounds, behavior, delta, setProps} = props
    const [center, setCenter] = React.useState(null)
	const [currentBounds, setBounds] = React.useState(bounds || null)
	const [nextPosition, setNextPosition] = React.useState(position || {left: 0, top: 0})
	const [nextVector, setNextVector] = React.useState(vector || {x: 1, y: 1})
	const [deltaRate, setDeltaRate] = React.useState(delta || 200)
	//--------------------------------------------------------
	useEffect(()=>{
		if(setProps)setProps((p)=>{return{
			...p,
			id: id,
			//style: style,
			position: nextPosition,
			vector: nextVector,
			bounds: currentBounds,
			behavior: behavior,
			delta: deltaRate,
			setProps: setProps
		}})
	}, [id, style, nextPosition, nextVector, currentBounds, behavior, deltaRate])
	useEffect(()=>{
		if(!center)setCenter({left: window.innerWidth/2, top: window.innerHeight/2})
		if(!bounds)setBounds({left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight})
	}, [])
	useEffect(()=>{
		setNextPosition(position || {left: 5, top: 5})
		setNextVector(vector || {x: 1, y: 1})
	}, [position, vector])
	//---------------------------------------------
	useEffect(()=>{
		if(!nextPosition)return
		if(!nextVector)return
		if(!currentBounds)return
		let f = ()=>setNextPosition((last)=>{
			let nextX = last.left+nextVector.x
			let nextY = last.top+nextVector.y
			if(nextX<currentBounds.left||nextX>currentBounds.right)nextVector.x*=-1
			if(nextY<currentBounds.top||nextY>currentBounds.bottom)nextVector.y*=-1
			return {left: nextX, top: nextY}
		})
		const interval = setInterval(f, deltaRate)
		return ()=>clearInterval(interval)
	}, [nextVector])
	useEffect(()=>{//INITIALIZE
		let mutate = ()=>{
			setNextPosition(position || {left: 5, top: 5})
			setNextVector(vector || {x: 1, y: 1})
		}
		const interval = setInterval(mutate, deltaRate)
		return ()=>clearInterval(interval)
	}, [])
	//-----------------------------

    return <div id={id} style={{...style, position: 'absolute', ...nextPosition, transition: 'left 1s, top 1s', transitionTimingFunction: 'linear'}}>
		{JSON.stringify(nextVector)}
	</div>
}

/**
 * 
 * @param vectorFunction (last: Vector)=>Vector
 * @returns 
 */
export function useVectorTransition(vectorFunction?: (lastv: Vector, lastp?: Position)=>Vector): VectorTransition{
    const [center, setCenter] = React.useState({left: 0, top: 0})
	const [bounds, setBounds] = React.useState({left: 0, right: 0, top: 0, bottom: 0})
	const [nextPosition, setNextPosition] = React.useState({left: 0, top: 0})
	const [nextVector, setNextVector] = React.useState({x: 0, y: 0})
	useEffect(()=>{
		setCenter({left: window.innerWidth/2, top: window.innerHeight/2})
		setBounds({left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight})
	}, [])

	//VECTOR TRANSITION
	useEffect(()=>{//position + vector
		if(!nextVector)return
		let f = ()=>setNextPosition((last)=>{
			let nextX = last.left+nextVector.x
			let nextY = last.top+nextVector.y
			if(nextX<bounds.left||nextX>bounds.right)nextVector.x*=-1
			if(nextY<bounds.top||nextY>bounds.bottom)nextVector.y*=-1
			return {left: nextX, top: nextY}
		})
		const interval = setInterval(f, 200)
		return ()=>clearInterval(interval)
	}, [nextVector])

	
	useEffect(()=>{
		if(!vectorFunction)return
		let f = ()=>setNextVector(
			vectorFunction?
			(last: Vector)=>{return {...vectorFunction(last, nextPosition)}}:
			(last: Vector)=>{
				let nextX = last.x+(Math.random()*10-5)
				let nextY = last.y+(Math.random()*10-5)
				return {x: nextX, y: nextY}
			}
		)
		
		const interval = setInterval(f, 200)
		return ()=>clearInterval(interval)
	}, [vectorFunction])

    return {center, bounds, nextVector, nextPosition, setNextVector, setNextPosition}
}

export function calculateSlope(){}

export function calculateVector(lastPosition: Position, destination: Position){
	let v: Vector = {x: destination.left - lastPosition.left, y: destination.top - lastPosition.top}
	return v
}
export function calculateVectordirectionAngle(v: Vector){
	return Math.atan(v.y/(v.x!=0?v.x:1))
}
//since speed is represented by the vector distance, speed = hypotinuse of vector, also vector magnitude
//aka vector hypotinuse path length
export function calculateSpeedMagnitude(v: Vector){//pathagorian
	return Math.sqrt(v.x*v.x+v.y*v.y)
}
export function vectorTargetPosition(v: Vector): Position{
	return {left: v?.x || 0, top: v?.y || 0}
}
export function targetPositionVector(p: Position): Vector{
	return {x: p.left, y: p.top}
}

/**
 * click2move: Call this function by passing max speed as the magnitude in order to determine the final vector of click2move
 * 
 * magnitude is the length of a vector
 * theta angle is the direction of a vector
 */
export function vectorFromMagnitudeAngle(magnitude: number, theta: number): Vector{
	let x = Math.floor(magnitude*Math.cos(theta))
	let y = Math.floor(magnitude*Math.sin(theta))
	return {x: x, y: y}
}
export function conservePosNeg(v: Vector, newv: Vector){
	let xsig = v.x < 0 ? -1 : 1
	let ysig = v.y < 0 ? -1 : 1
	//console.log('conversion A: '+JSON.stringify({x: xsig, y: ysig}))
	let x = newv.x*xsig
	let y = newv.y*ysig
	//console.log('conversion B: '+JSON.stringify({x: x, y: y}))
	return {x: x, y: y}
}