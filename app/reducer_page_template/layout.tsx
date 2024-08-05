import StateProvider from "./provider";

//boiler plater layout export
export default function Layout({ children }) {
    
  return <StateProvider>
      <h1>Switch Case Register</h1>
      <hr/>
      {children}
    </StateProvider>
}