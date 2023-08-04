import React, { useContext, useRef } from "react"

export const SiteContext = React.createContext(null)
export default function Site(props){
    
    const siteProps: {current: any} = useRef({key: 'value'})
    return <SiteContext.Provider value={siteProps.current}>
        <Context/>
    </SiteContext.Provider>
}
export function Context(){
    const context = useContext(SiteContext)
    return <div id={'context'}>CONTEXT: {JSON.stringify(context)}</div>
}