import { useState } from "react"
import CssSlidersWrapper from "../../components/sliders"
import useRegister from "../../lib/util/registry"

export default function Registry(props){
    const [test, setTest] = useRegister('test', 'off')
    const [testobject, setTestobject] = useRegister('testobject', {toggle: 'off'})
    const [nostyle, setNostyle] = useState({})
    //const [nostyle, setNostyle] = useRegister('nostyle', {width: '100px', height: '100px'})

    return <>
        <div id={'test'}>{test}</div>
        <button onClick={()=>{setTest(test=='off'?'on':'off')}}>Toggle</button>

        <div id={'testobject'}>{testobject.toggle}</div>
        <button onClick={()=>{setTestobject({toggle: testobject.toggle=='off'?'on':'off'})}}>Toggle</button>

        <CssSlidersWrapper id={'nostyle'} style={nostyle} setStyle={setNostyle}>
            <div>Sliders Save Data</div>
        </CssSlidersWrapper>
    </>
}