'use client'
import { useState } from "react"
export default function WhiteboardNav(){
    const [focus, setFocus] = useState(false)
    return <div id="nav-whiteboard" className={"row p0"}>
        <div className={"col-12 p0 m0"} 
            style={{
                border: '1px outset green', 
                borderBottom: '4px solid black', 
                height: '10em',
                backgroundImage: `linear-gradient(to bottom right, ${focus?'#eee':'#ccc'}, #fff)`
            }}
            onClick={()=>{window.location.href='/whiteboard'}}
            onMouseEnter={()=>{setFocus(true)}}
            onMouseLeave={()=>{setFocus(false)}}
        >
            {//<NavLink href="/whiteboard" className={'white-font'}>Whiteboard</NavLink>
            }
        </div>
    </div>
}