import { useObservable, observer, useComputed } from '@legendapp/state/react'
import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const ObservableContext = createContext(null)
export const useObservableContext = ()=> useContext(ObservableContext)!
export default function ObserverContextProvider(props){
    const {children, watchable} = props
    return <ObservableContextWithChildren watchable={watchable || {value: ''}}>
        <ObservableContextDisplay/>
        <ObservableContextSet/>
        {children}
    </ObservableContextWithChildren>
}

const ObservableContextWithChildren = ({children, watchable})=>{
    const ObservableContextProvider = observer(()=>{
        const observable = useObservable(watchable)
        return <ObservableContext.Provider value={observable}>
            {children}
        </ObservableContext.Provider>
    })
    return <ObservableContextProvider/>
}
const ObservableContextDisplay = observer(()=>{
    const observable = useObservableContext()
    return <>
        ObservableObject: {JSON.stringify(observable.get())}<br/>
        {observable.value.get()}<br/>
    </>
})
const ObservableContextSet = observer(()=>{
    const {value} = useObservableContext()
    return  <input type={'text'} value={value.get()} onChange={(e)=>{value.set(e.target.value)}}/>
})
export const ObservableContextUser = observer(()=>{
    const observable = useObservableContext()
    return <>
        ObservableObject: {JSON.stringify(observable.get())}<br/>
        {observable.value.get()}<br/>
        <input type={'text'} value={observable.value.get()} onChange={(e)=>{observable.value.set(e.target.value)}}/>
    </>
})

