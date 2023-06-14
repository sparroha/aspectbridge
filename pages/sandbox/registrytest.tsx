import useRegister from "../../lib/util/registry"

export default function Registry(props){
    const [test, setTest] = useRegister('test', 'off')

    return <>
        <div id={'test'}>{test}</div>
        <button onClick={()=>{setTest(test=='off'?'on':'off')}}>Toggle</button>

    </>

}