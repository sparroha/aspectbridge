import useRegister from "../../lib/util/registry"

export default function Registry(props){
    const [test, setTest] = useRegister('test', 'off')
    const [testobject, setTestobject] = useRegister('testobject', {toggle: 'off'})

    return <>
        <div id={'test'}>{test}</div>
        <button onClick={()=>{setTest(test=='off'?'on':'off')}}>Toggle</button>

        <div id={'testobject'}>{testobject.toggle}</div>
        <button onClick={()=>{setTestobject({toggle: testobject.toggle=='off'?'on':'off'})}}>Toggle</button>
    </>
}