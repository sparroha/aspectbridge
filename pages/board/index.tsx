import { createContext, use, useContext, useEffect, useState } from "react";
import Mouse from "../../components/mouse";
import { create } from "domain";

export const ClickTargetContext = createContext(null)
export default function Board(props){
    const [center, setCenter] = useState({x: 0, y: 0})
    useEffect(()=>{setCenter({x: window.innerWidth/2, y: window.innerHeight/2})},[])
    const [{mousepos, clickpos, lastClickpos}, setMouse] = useState({mousepos: null, clickpos: null, lastClickpos: null})

    
    const [clickTarget, setClickTarget] = useState(null)//ClickTargetContext
    
    useEffect(()=>{
        //click handler
        if(!clickTarget)return
        const clicker = (e)=>{
            e.target.style.left = mousepos.left-e.target.offsetWidth/2+'px'
            e.target.style.top = mousepos.top-e.target.offsetHeight/2+'px'
            e.target.style.backgroundColor = 'gray'
        }
        clickTarget.style.backgroundColor = 'green'
        clickTarget.addEventListener('click', clicker)
        return clickTarget.removeEventListener('click', clicker)
    },[clickTarget])
    
    return <ClickTargetContext.Provider value={[clickTarget, setClickTarget]}>
        <Mouse id={'pointer'} setMouse={setMouse} debug marker>
            <ZoneDisplay/>
        </Mouse>
    </ClickTargetContext.Provider>
}

const ZoneDisplay = (props)=>{
    const [clickTarget, setClickTarget] = useContext(ClickTargetContext)
    return <div style={{position: 'absolute', width: 20, height: 20, backgroundColor: 'gray', transition: 'left linear 1s, top linear 1s, color 1s linear 1s'}} onClick={(e)=>setClickTarget(e.target)}>

    </div>
}