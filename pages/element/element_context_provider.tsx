import { SetStateAction, createContext, useContext, useState } from "react"

export const EContext = createContext('')
export const EsetContext = createContext((value: SetStateAction<string>)=>{})

export const useEContext = ()=> useContext(EContext)
export const useEsetContext = ()=> useContext(EsetContext)

/**
 * Provides elementContext & setElementContext() to children
 * @param param0 
 * @returns 
 */
export function ElContextprovider({children}){
    const [elementContext, setElementContext] = useState('')
    
    return <EContext.Provider value={elementContext}>
        <EsetContext.Provider value={setElementContext}>
            {children}
        </EsetContext.Provider>
    </EContext.Provider>
}
export function ElDisplayContext(props){
    const elementContext = useEContext()
    return  <>{elementContext || ''}</>
}
export function ElSetContext(props){
    const setElementContext = useContext(EsetContext)
    return  <input type={'text'} value={useEContext()} onChange={(e)=>setElementContext((value: string)=>e.target.value)}/>
}
export default function ElementContext(props){
    const {title} = props
    return <ElContextprovider>
        {title}: <ElDisplayContext/><br/>
        <ElSetContext/><br/>
    </ElContextprovider>
}
