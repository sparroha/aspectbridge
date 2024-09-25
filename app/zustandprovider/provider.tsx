'use client'
import { createContext, useContext, useRef } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

export type StoreState = {
    [id: string]: any
    reset: (id?: string) => void
    increment: (id: string) => void
    decrement: (id: string) => void
}

const StoreContext = createContext(null)
export const useStoreInContext: any = (selector: { (state: StoreState): any; (state: StoreState): (id: string) => void; (state: StoreState): (id: string) => void; (state: StoreState): (id?: string) => void; (state: StoreState): (id: string) => void; (state: StoreState): (id: string) => void; (state: any): any; (state: StoreState): unknown }) => {
  const store: StoreApi<StoreState> = useContext(StoreContext)
  if (!store) {
    throw new Error('Missing StoreProvider')
  }
  return useStore(store, selector)
}

const StoreProvider = ({ children }) => {
    const storeRef: {current: StoreApi<StoreState>} = useRef()

    if (!storeRef.current) {
        storeRef.current = createStore((set) => ({
            reset: (id?: string) => set((state) => {
            if (id) return {...state, [id+'_count']: 0}
            let nextstate = {...state}
            for (let key in state) if (key.includes('_count')) nextstate[key] = 0
            return nextstate
            }),
            increment: (id: string) => set((state) => {
            if (!state[id+'_count']) return {...state, [id+'_count']: 1}
            return { ...state, [id+'_count']: state[id+'_count'] + 1 }
            }),
            decrement: (id: string) => set((state) => {
            if (!state[id+'_count']) return {...state, [id+'_count']: -1}
            return { ...state, [id+'_count']: state[id+'_count'] - 1 }
            }),
        }))
    }
    return (
      <StoreContext.Provider value={storeRef.current}>
        {children}
      </StoreContext.Provider>
    )
  }
  export default StoreProvider