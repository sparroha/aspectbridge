
import { Context, createContext, useContext, useReducer } from "react"

class Dispatcher{
    private id: string
    private context: Context<any>

    constructor(id: string, initialState, setter ) {
        this.id = id
        this['context'] = createContext(initialState || null)
    }

    //IMPLEMENTATION: dispatcher = new Dispatcher(id,context)
    //IMPLEMENTATION: const context = dispatcher.context
    //IMPLEMENTATION: dispatcher = new Dispatcher('name',{state, dispatch})
    //IMPLEMENTATION: const {state, dispatch} = dispatcher.context
    useDispatcher = ()=>{
        const context = useContext(this.context)
        if(!context) throw new Error(
            "DynamicContext not available in scope"
        )
        return context
    }
    

}



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

//IMPLEMENTATION: return <DynamicContextProvider>{children}</DynamicContextProvider>
export default function DynamicContextProvider({children}){
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
                    },
                }
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