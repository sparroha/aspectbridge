'use client'
import { createContext, useContext, useReducer } from "react"
import { piston, rand } from "./util"

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

/*custom actions*/
//<             
type Action = {type: string, payload?: any}
export const reActions = {
    set: (s: any, a: Action)=>{
        return a.payload != "default" ? a.payload : initialState
    },
    user: (s: any, a: Action)=>{
        return {...s, user: a.payload}
    },
    switch: (s: any, a: Action)=>{ 
        return {...s, switch: {...s.switch, [a.payload.id]: a.payload.value}}
    },
    cooldown: (s: any, a: Action)=>{
        return {...s, cooldown: {...s.cooldown, [a.payload.id]: a.payload.value}}
    },
    spawn: (s: any, a: Action)=>{
        return {...s, spawn: a.payload}
    },
    piston: (s: any, a: Action)=>{
        let {actions, work} = piston((s?.piston?.work)?s.piston.work:0, a.payload.energy)
        return {...s, piston: {...s?.piston, actions: actions + ((s?.piston?.actions)?s.piston.actions:0), work: work }}
    },
    action: (s: any, a: Action)=>{
        let f = (actionId)=>{
            if(s[actionId]?.count>=pActions[actionId].maxcount) {alert('you have unlocked all the '+actionId); return s}
            if(s[actionId]?.actions < pActions[actionId].cost) {alert('not enough action points'); return s}
            return {...s, [actionId]: {...s[actionId], actions: s[actionId]?.actions?(s[actionId].actions - pActions[actionId].cost):0}}
            //OOP broke something
        }
        f(a.payload)
    },
    new: (s: any, a: Action)=>{
        switch(a.payload.type){
            default:
                return s
        }
    },
    ore: (s: any, a: Action)=>{
        let actionType = a.type.toLowerCase()
        let type = a.payload.type
        
        if(s.piston?.actions < pActions[actionType].cost) {alert('not enough action points'); return s}
        return {...s, 
            [actionType]: {...s[actionType], 
                [type]: {...s[actionType]?.[type], 
                    count: rand(3)+((s[actionType]?.[type]?.count)?s[actionType][type].count:0)
                }
            },
            piston: {...s.piston, actions: s.piston?.actions?(s.piston?.actions - pActions[actionType].cost):0}
        }
    }
}
export const pActions = {
    piston: {
        cost: 7,
        maxcount: 11
    },
    mine: {
        cost: 6,
        maxcount: 8
    },
    ore: {
        cost: 7
    }
}
//>
/*end custom actions*/
//IMPLEMENTATION: return <DynamicContextProvider>{children}</DynamicContextProvider>
export default function DynamicContextProvider({children}){
    /** PROVIDED CONTENT **/
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