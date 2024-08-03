'use client'
import { createContext, useContext, useReducer } from "react"

export const initialState = {}
const StateRegisterContext = createContext(null)
//IMPLEMENTATION: const {state, dispatch} = useStateRegisterContext()
export const useStateRegisterContext = ()=>{
    const context: any = useContext(StateRegisterContext)
    if(!context) throw new Error(
        "DynamicContext not available in scope"
    )
    return context
}

//IMPLEMENTATION: return <StateRegisterContextProvider>{children}</StateRegisterContextProvider>
export default function StateRegisterContextProvider({children}){
    type Action = {type: string, payload?: any}
    /** PROVIDED CONTENT **/
    /*custom actions*/
        //<
                const reActions = {
                    set: (s: any, a: Action)=>{
                        return a.payload != "default" ? a.payload : initialState
                    },
                    user: (s: any, a: Action)=>{
                        return {...s, user: a.payload}
                    }
                }
        //>
    /*end custom actions*/
    const reducer = (state: any, action: Action)=>{
        let actionType = action.type.toLowerCase()
        return reActions[actionType] ? reActions[actionType](state, action) : state
    }
    /** END PROVIDED CONTENT **/
    const [state, dispatch] = useReducer(reducer, initialState)
    return <StateRegisterContext.Provider value={{state, dispatch}}>
        {children}
    </StateRegisterContext.Provider>
}


//IMPLEMENTATION: const {state, dispatch} = useDynamicContext()
//IMPLEMENTATION: return <DynamicContextProvider>{children}</DynamicContextProvider>
/** provide custom actions **/