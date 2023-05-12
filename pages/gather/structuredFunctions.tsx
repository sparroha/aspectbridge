import { Dispatch, useEffect, useReducer, useRef, useState } from "react"
import { Button } from "react-bootstrap"

export type Entity = {
    id: any,
    name: string,
    type: string,
    position: {x: number, y: number},
    vector: {x: number, y: number},
    pathing?: Function,
}
export type ActiveState = {
    key: number,
    init: boolean,
    gameloop: any
    environment: any,
    entities: Entity[],
}

const reducer = (
    state: ActiveState,
    action: {
        type: string, 
        payload: {
            id?: any,
            target?: any, 
            name?: string,
            type?: string,
            x?: number, 
            y?: number,
            pathing?: Function,
        }
    }
)=>{
    let [actionTarget] = action.payload?.target?state.entities.filter((e)=>{return e.id==action.payload.target}):(action.payload?.name?state.entities.filter((e)=>{return e.name==action.payload.name}):[null])
    let index = state.entities.indexOf(actionTarget)
    //console.log(JSON.stringify(actionTarget))
    switch(action.type){
        case 'move':
            if(actionTarget){
                let ArE = state.entities
                actionTarget.position.x+=action.payload.x
                actionTarget.position.y+=action.payload.y
                ArE.splice(index, 1, actionTarget)
                return {...state, 
                    entities: ArE
                }
            }
            break
        case 'vec':
            if(actionTarget){
                let ArE = state.entities
                if(action.payload.x)actionTarget.vector.x=action.payload.x
                if(action.payload.y)actionTarget.vector.y=action.payload.y
                if(action.payload.x==0)actionTarget.vector.x=0
                if(action.payload.y==0)actionTarget.vector.y=0
                ArE.splice(index, 1, actionTarget)
                return {...state,
                    entities: ArE
                }
            }
            break
        case 'addEntity':
            let E: Entity = {
                id: action.payload.id||state.key,
                name: action.payload.name||'Mob',
                type: action.payload.type||'',
                position: {
                    x: action.payload.x,
                    y: action.payload.y,
                },
                vector: {
                    x: 0,
                    y: 0,
                },
                pathing: action.payload.pathing||function(){console.log('no pathing')},
            }
            return {...state,
                key: state.key+1,
                entities: [...state.entities, E]
            }
        case 'removeEntity':
            return {...state,
                entities: state.entities.splice(index, 1)
            }
        case 'init':
            return {...state,
                init: true,
                environment: document.getElementById('environment')}
        default:
            return state
    }
}
const initialState = {
    key: 1,
    init: false,
    gameloop: null,
    environment: null,
    entities: [
        {
            id: 0,
            name: 'player',
            type: 'player',
            position: {
                x: 0,
                y: 0,
            },
            vector: {
                x: 0,
                y: 0,
            }
        },
    ],
}
export default function PSX(){
    const [state, dispatch]: [ActiveState, Function] = useReducer(reducer, initialState)
    const speed = 1;
    const keysDown = useRef({u: false, d: false, l: false, r: false})
    
    useEffect(()=>{
        if(!state.init)dispatch({type: 'init'})
        const loop = setInterval(()=>{
            //console.log('tick')
            state.entities.forEach((e)=>{
                //console.log(e.name+': '+e.vector.x+', '+e.vector.y)
                if(e.vector.x!=0||e.vector.y!=0)dispatch({type: 'move', payload: {name: e.name, x: e.vector.x, y: e.vector.y}})
                if(e.pathing)e.pathing()
                console.log(e.name+' '+e.pathing)
            })
        }
        , 100)
        return ()=>{clearInterval(loop)}
    }, [])
    useEffect(()=>{
        window.onkeydown = (event)=>{
            switch(event.key){
                case 'ArrowUp':
                    if(!keysDown.current.u){
                        console.log('keyDown: '+event.key)
                        dispatch({type: 'vec', payload: {name: 'player', y: -speed}})
                        keysDown.current.u = true}
                    break
                case 'ArrowDown':
                    if(!keysDown.current.d){
                        console.log('keyDown: '+event.key)
                        dispatch({type: 'vec', payload: {name: 'player', y: speed}})
                        keysDown.current.d = true}
                    break
                case 'ArrowLeft':
                    if(!keysDown.current.l){
                        console.log('keyDown: '+event.key)
                        dispatch({type: 'vec', payload: {name: 'player', x: -speed}})
                        keysDown.current.l = true}
                    break
                case 'ArrowRight':
                    if(!keysDown.current.r){
                        console.log('keyDown: '+event.key)
                        dispatch({type: 'vec', payload: {name: 'player', x: speed}})
                        keysDown.current.r = true}
                    break
            }
        }
        window.onkeyup = (event)=>{
            switch(event.key){
                case 'ArrowUp':
                    if(keysDown.current.u){
                        console.log('keyUp: '+event.key)
                        dispatch({type: 'vec', payload: {name: 'player', y: 0}})
                        keysDown.current.u = false}
                    break
                case 'ArrowDown':
                    if(keysDown.current.d){
                        console.log('keyUp: '+event.key)
                        dispatch({type: 'vec', payload: {name: 'player', y: 0}})
                        keysDown.current.d = false}
                    break
                case 'ArrowLeft':
                    if(keysDown.current.l){ 
                        console.log('keyUp: '+event.key) 
                        dispatch({type: 'vec', payload: {name: 'player', x: 0}})
                        keysDown.current.l = false}
                    break
                case 'ArrowRight':
                    if(keysDown.current.r){
                        console.log('keyUp: '+event.key)
                        dispatch({type: 'vec', payload: {name: 'player', x: 0}})
                        keysDown.current.r = false}
                    break
            }
        }
    }, [])


    return <div id='environment' style={{position: 'relative'}}>
        <Button onClick={()=>{dispatch({type: 'addEntity', payload: {name: 'Mob', type: 'mob', x: 0, y: 0, pathing: function(){console.log('pathing Mob Bob')}}})}}>Add Mob</Button>
        {state.entities.map(
            (e: any, i: number)=>{
                return <div key={i} id={e.name} style={{
                    position: 'absolute',
                    top: e.position.y+'px',
                    left: e.position.x+'px',
                }}>{e.type}
                </div>
            }
        )}
    </div>
}

