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

function grid(width,height,cell): any[][]{
    let arr = []
    ler row = 0
    for(let y=height;y>0;y--){
        arr.push([])
        let col = 0
        for(let x=0;x<width;x++){
            arr[row].push(<cell row={row} col={col}/>)
            col++
        }
        row++
    }
    return arr
}