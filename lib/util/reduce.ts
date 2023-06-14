import { useReducer } from "react";

export type Pld = { [key: string]: any }
export type Act = { type: string, payload: Pld }
export type Dsp = (action: Act)=>any
export type Rdc = (state: any, action: Act)=>[any, Dsp]

export const initial = {count: 0}
export default function useR(initialState?: any, reducerSub?: Rdc){
    const red: Rdc = reducerSub || reducer;
    const init: any = initialState || initial;
    const [state, dispatch] = useReducer(red ,init)
    return [state, dispatch]
}
export function reducer(state: any, action: Act): any{
    switch(action.type){
        case 'increment':
            return {count: state.count + 1}
        case 'decrement':
            return {count: state.count - 1}
        default:
            throw new Error();
    }
}