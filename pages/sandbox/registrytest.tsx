import useRegister from "../../lib/util/registry"

export default function Registry(props){
    const [register, setRegister] = useRegister('test', true)

    return <>
        <div id={'registry'}>{register}</div>
        <button onClick={()=>{setRegister(!register)}}>Toggle</button>
    </>

}