import { useEffect, useState } from "react"
import CssSlidersWrapper from "../../components/sliders"
import useRegister from "../../lib/util/^register"

export default function Registry(props){
    const [test, setTest] = useRegister('test', 'off')
    const [testobject, setTestobject] = useRegister('testobject', {toggle: 'off'})
    //const [nostyle, setNostyle] = useRegister('',{width: '100px', height: '100px', left: '10vw', top: '10vh'})
    //const [nostyle, setNostyle] = useRegister('csswrapper_nostyle', {width: '100px', height: '100px', left: '10vw', top: '10vh'})
    useEffect(()=>{console.log(testobject)},[testobject])
    return <>
        <div id={'test'}>{JSON.parse(test)}</div>
        <button onClick={()=>{setTest(JSON.parse(test)=='off'?'on':'off')}}>Toggle</button>

        <div id={'testobject'}>{JSON.parse(testobject).toggle}</div>
        <button onClick={()=>{setTestobject({toggle: JSON.parse(testobject).toggle=='off'?'on':'off'})}}>Toggle</button>
        
        <CssSlidersWrapper id={'nostyle'}>
            <div>Wrapper</div>
        </CssSlidersWrapper>{/*
        <CssSlidersWrapper id={'nostyle2'}>
            <div>Wrapper</div>
        </CssSlidersWrapper>
        <CssSlidersWrapper id={'nostyle3'}>
            <div>Wrapper</div>
        </CssSlidersWrapper>*/}
    </>
}
