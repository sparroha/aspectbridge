'use client'
import { createContext, useContext, useRef } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'

type StoreState = {
  [key: string]: any
  count: number
  increment: () => void
  decrement: () => void
}

const StoreContext = createContext(null)
const useStoreInContext: any = (selector) => {
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
      // ...
      count: 0,
      reset: () => set({ count: 0 }),
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }))
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

const ResetStore = () => {
  const reset = useStoreInContext((state: StoreState) => state.reset)
  return <button onClick={reset}>reset</button>
}
const IncrementState = () => {
  const increment: () => void = useStoreInContext((state: StoreState) => state.increment)
  return <button onClick={increment}>count +1</button>
}
const DecrementState = () => {
  const decrement: () => void = useStoreInContext((state: StoreState) => state.decrement)
  return <button onClick={decrement}>count -1</button>
}
const DisplayPreformattedStore = () => {
  const state = useStoreInContext((state) => state)
  return <pre>StoreState: {JSON.stringify(state, null, 2)}</pre>
}

export default function Page(){
  return <StoreProvider>
    <div style={{color: 'white'}}>
      <ResetStore/><IncrementState/><DecrementState/>
      <DisplayPreformattedStore/>
    </div>
  </StoreProvider>
}