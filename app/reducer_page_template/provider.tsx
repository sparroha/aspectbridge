'use client'
import React from "react"

//boiler plate reducer
function reducer(state: any, action: any) {
    switch(action.type) {
        case 'ADD_CASE':
            return {...state, cases: [...state.cases, action.payload]}
        case 'REMOVE_CASE':
            return {...state, cases: state.cases.filter((c: any) => c.name !== action.payload)}
        default:
            return state
    }
}
const initialState = {cases: []}

//boiler plate provider
export const StateContext = React.createContext(null)
export default function StateProvider({children}: {children: any}) {
    const R = React.useReducer(reducer, initialState)
    return <StateContext.Provider value={R}>{children}</StateContext.Provider>
}