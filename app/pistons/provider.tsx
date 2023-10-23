'use client'
import { createContext, useContext, useReducer } from "react"
import { piston } from "./util"

export const initialState = {}
const DynamicContext = createContext(null)
//IMPLEMENTATION: const {state, dispatch} = useDynamicContext()
export const useDynamicContext = ()=>{
    const context = useContext(DynamicContext)
    if(!context) throw new Error(
        "DynamicContext not available in scope"
    )
    return context
}

type Action = {type: string, payload?: any}
export const reActions = {
    set: (s: any, a: Action)=>{
        return a.payload != "default" ? a.payload : initialState
    },
    user: (s: any, a: Action)=>{
        return {...s, user: a.payload}
    },
    spawn: (s: any, a: Action)=>{
        return {...s, spawn: a.payload}
    },
    piston: (s: any, a: Action)=>{
        let {actions, work} = piston((s.piston?.work)?s.piston.work:0, a.payload.energy)
        return {...s, piston: {...s.piston, actions: actions + ((s.piston?.actions)?s.piston.actions:0), work: work }}
    },
    action: (s: any, a: Action)=>{
        switch(a.payload){
            case 'piston':
                if(s.piston?.actions < pActions[a.payload].cost) {alert('not enough action points'); return s}
                return {...s, piston: {...s.piston, actions: s.piston?.actions?(s.piston.actions - pActions[a.payload].cost):0}}
            default:
                return s
        }
    },
    new: (s: any, a: Action)=>{
        switch(a.payload.type){
            case 'piston':
                if(s.piston?.count>=11) {alert('you have unlocked all the pistons'); return s}
                if(s.piston?.actions<5) {alert('not enough action points: need 5'); return s}
                return {...s, piston: {...s.piston, count: 1+(s.piston?.count?s.piston.count:0), actions: s.piston.actions-5,}}
            default:
                return s
        }
    },
}
export const pActions = {
    piston: {
        cost: 5,
    }
}
//IMPLEMENTATION: return <DynamicContextProvider>{children}</DynamicContextProvider>
export default function DynamicContextProvider({children}){
    /** PROVIDED CONTENT **/
    /*custom actions*/
        //<
                
        //>
    /*end custom actions*/
    const reducer = (state: any, action: Action)=>{
        let actionType = action.type.toLowerCase()
        return reActions[actionType] ? reActions[actionType](state, action) : state
    }
    /** END PROVIDED CONTENT **/
    const [state, dispatch] = useReducer(reducer, initialState)
    return <DynamicContext.Provider value={{state, dispatch}}>
        {children}
    </DynamicContext.Provider>
}


//IMPLEMENTATION: const {state, dispatch} = useDynamicContext()
//IMPLEMENTATION: return <DynamicContextProvider>{children}</DynamicContextProvider>
/** provide custom actions **/