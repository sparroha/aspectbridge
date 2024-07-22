'use client'

import { useReducer, useState } from "react"

export default function Page(){
    const defaultState = []
    const reducer = (state, action) => {
        switch(action.type){
            case 'ADD': return [...state, action.payload]
            case 'REMOVE':
                return state.filter((item, i) => i !== action.payload)
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, defaultState)
    
    return <>
        <button onClick={() => dispatch({type: 'ADD', payload: 'while'})}>While Loop</button>
        <button onClick={() => dispatch({type: 'ADD', payload: 'if'})}>If Statement</button>
        <div>{state.map((item, i) => <div>
            {//item === 'while' ? <WHILE value={0} compare={'=='} check={10} itterate={()=>{}}/> : item === 'if' ? <IF bool={true} callback={()=>{}}/> : 'Unknown'}
            }{item}
            <button onClick={() => dispatch({type: 'REMOVE', payload: i})}>x</button>
        </div>)}</div>
    </>
}

type IF = {bool: boolean, callback: Function}
type WHILE = {value: any | Function, compare: string, check: any | Function, itterate: Function}
function callIf(args:IF){
    if(args.bool)args.callback()
}
function FormIf({bool, callback}:IF){
    return <div>
        
        <button onClick={() => callIf({bool, callback})}>Run</button>
    </div>
}
function callWhile({value, compare, check, itterate}:WHILE){
    switch(compare){
        case '<': 
            while(value < check){
                itterate()
            }break;
        case '>':
            while(value > check){
                itterate()
            }break;
        case '==':
            while(value == check){
                itterate()
            }break;
        case '!=':
            while(value != check){
                itterate()
            }break;
        default: break;
    }
}