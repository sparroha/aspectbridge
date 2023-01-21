import { useEffect } from "react"
import useLog from "../../../components/conlog"

const { useState } = require("react")

const sandObj = ["1Si","2O"]
const siltObj = ["nutrients"]
const clayObj = ['1Si', '1Al', '1Mag']
//comment
/**com */
const jsxObject = <>
    //not comment
    /**not com */
</>
const [humidity, setHumidity] = useState(0)


function Flow(meets){
    return <>{/**hydration */}
        <div><img src="collection" /></div>
        {meets}
    </>
}
function Meets(soil){//rerender self on update
    return <>{/**retention */}
        {soil.sand[0]}{soil.silt}{soil.clay}
    </>
}
function meets(soil){//rerender parent on update
    return <>{/**retention */}
        {soil.sand[0]}{soil.silt}{soil.clay}
    </>
}

export default function Drainage(){
    const [flow, setFlow] = useState(0)
    return <>
        <Water flow={flow} setFlow={setFlow} />
        <Flow meets={<></>} />
        <Meets soil={{sand: ['beach','shahara'], silt: 'Nile Delta', clay: 'Georgia Red'}} /> 
    </>
}
function Water(flow){
    useEffect(()=>{console.log(flow);return},[])
    useLog(flow)
    let newFlow = ++flow

    return <>{/**H2O */}
        <div><img src="raindrop" /></div>
        {newFlow}
    </>
}