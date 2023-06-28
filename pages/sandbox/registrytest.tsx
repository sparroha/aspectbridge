import { useState } from "react"
import CssSlidersWrapper from "../../components/sliders"
import useRegister from "../../lib/util/registry"

export default function Registry(props){
    const [test, setTest] = useRegister('test', 'off')
    const [testobject, setTestobject] = useRegister('testobject', {toggle: 'off'})
    //const [nostyle, setNostyle] = useRegister('',{width: '100px', height: '100px', left: '10vw', top: '10vh'})
    //const [nostyle, setNostyle] = useRegister('csswrapper_nostyle', {width: '100px', height: '100px', left: '10vw', top: '10vh'})

    return <>
        <div id={'test'}>{JSON.stringify(test)}</div>
        <button onClick={()=>{setTest(test=='off'?'on':'off')}}>Toggle</button>

        <div id={'testobject'}>{JSON.stringify(testobject.toggle)}</div>
        <button onClick={()=>{setTestobject({toggle: testobject.toggle=='off'?'on':'off'})}}>Toggle</button>
        
        <CssSlidersWrapper id={'nostyle'}>
            <div>Wrapper</div>
        </CssSlidersWrapper>
    </>
}