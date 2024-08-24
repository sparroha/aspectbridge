import DebugParams from "../../components/debugpageparams";

export default function Page({params, searchParams}){
    //URL extracts
    const queryObject = searchParams
    const queryArray: [string, string][] = Object.entries(queryObject);
    const Title = ()=>{return <h1>Page</h1>}
    const debug = false
    

    return <>
        <Title/>
        <DebugParams params={params} searchParams={searchParams}/>
    </>
}