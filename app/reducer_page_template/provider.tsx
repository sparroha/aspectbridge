'use client'
import React from "react"

//boiler plate reducer
export function reducer(state: any, action: any) {
    switch(action.type) {
        case 'ADD_CASE':
            return {...state, cases: [...state.cases, action.payload]}
        case 'REMOVE_CASE':
            return {...state, cases: state.cases.filter((c: any) => c.name !== action.payload)}
        default:
            return state
    }
}

//boiler plate provider
export const StateContext = React.createContext(null)
export default function StateProvider({children}: any) {
    const [state, dispatch] = React.useReducer(reducer, {cases: []})
    return <StateContext.Provider value={{state, dispatch}}>{children}</StateContext.Provider>
}