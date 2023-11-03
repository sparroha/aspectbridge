'use client'
import { createContext, useContext, useReducer } from "react"

export const initialState = {
    selectedEntity: 'test0',
    mobileEntity: {id: 'test0', left: 0, top: 0}
}
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