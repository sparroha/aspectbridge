'use client'
import React from "react"
import ElementContext from "../../pages/element/element_context_provider"
import useIP from "../../lib/util/^ip"

export const TutorialContext = React.createContext(false)//recieves elementContext
export const TutorialContextToggle: React.Context<any> = React.createContext(null)//recieves toggleElementContext
export default function ContextBlock(props){
    const ip = useIP()
    const [elementContext, setElementContext] = React.useState(false)
    return <TutorialContext.Provider value={elementContext}>
        <TutorialContextToggle.Provider value={setElementContext}>
            <ToggleContext/>
            <DisplayContext/>
            <hr/>
            <ElementContext title={'Element'}/>
            <hr/>
            {props.children}
        </TutorialContextToggle.Provider>
    </TutorialContext.Provider>
}

export function ToggleContext(){
    const toggleElementContext = React.useContext(TutorialContextToggle)
    return  <>
        <input type={'checkbox'} checked={React.useContext(TutorialContext) || false} onChange={(e)=>toggleElementContext((bool)=>!bool)}/>
        <button onClick={()=>toggleElementContext((bool)=>!bool)}>Toggle Element Context</button>
    </>
}

export function DisplayContext(){
    const elementContext = React.useContext(TutorialContext)
    return  <>{JSON.stringify(elementContext) || 'no context'}</>
}