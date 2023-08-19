'use client'

import React from 'react'
import ElementContext from '../../pages/element/element_context_provider'

export const TutorialContext = React.createContext(false)//recieves elementContext
export const TutorialContextToggle: React.Context<any> = React.createContext(null)//recieves toggleElementContext

export default function TutorialContextProvider(props){
    const [elementContext, setElementContext] = React.useState(false)

    return <>
        <TutorialContext.Provider value={elementContext}>
            <TutorialContextToggle.Provider value={setElementContext}>
                {props.children}
                <ToggleContext/>
                <DisplayContext/>
            </TutorialContextToggle.Provider>
        </TutorialContext.Provider>


        <br/><ElementContext title={'Element'}/>
    </>
}

//Context user
//Context Component
//Component with useContext
export function ToggleContext(props){
    const toggleElementContext = React.useContext(TutorialContextToggle)
    return  <>
        <input type={'checkbox'} checked={React.useContext(TutorialContext) || false} onChange={(e)=>toggleElementContext((bool)=>!bool)}/>
        <button onClick={()=>toggleElementContext((bool)=>!bool)}>Toggle Element Context</button>
    </>
}
//Context user
//Context Component
//Component with useContext
export function DisplayContext(props){
    const elementContext = React.useContext(TutorialContext)
    return  <>{JSON.stringify(elementContext) || 'no context'}</>
}