const { useState } = require("react")

const sandObj = ["1Si","2O"]
const siltObj = ["nutrients"]
const clayObj = ['1Si', '1Al', '1Mag']


const [humidity, setHumidity] = useState(0)

function Water(flow){
    return <H2O>
        <div><img src="raindrop" /></div>
        {flow}
    </H2O>
}
function Flow(meets){
    return <hydration>
        <div><img src="collection" /></div>
        {meets}
    </hydration>
}
function Meets(threeObj){
    return <retention>
        {threeObj}
    </retention>
}

export default function Drainage(){
    return <>
        <Water flow={<Flow meets={<Meets threeObj={<></>} />} />} />
    </>
}