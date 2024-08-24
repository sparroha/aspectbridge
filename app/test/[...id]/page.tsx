import { useMemo } from "react"
import DebugParams from "../../../components/debugpageparams";

export default function Page({params, searchParams}){

    const slug: [any] = params.id;
    const queryObject = searchParams
    const queryArray: [string, string][] = Object.entries(queryObject);

    const Title = ()=>{return <h1>Page {slug.map((s)=>s+' ')}</h1>}
    /**
     * Content
     */
    const CONTENT_MAP: { [viewId: string]: JSX.Element } = useMemo(() => {return {
        ah: <h2>Page</h2>,
        a: <p>{slug.map((s)=>'/'+s)}</p>,
        af: <></>,
        bh: <h2>Variables</h2>,
        b: <div>{queryArray.map(
            ([id,value])=>{ return <>{id}={value}<br/></>}
        )}</div>,
        bf: <></>,
    }}, [params, searchParams])
    const ContentUnmap = ([id, value], key)=>{
        return <li id={id} key={key}>{value}</li>
    }
    const ShowContent = ()=>{
        return <ul>{Object.entries(CONTENT_MAP).map(ContentUnmap)}</ul>
    }
    /**End Content */

    return <>
        <Title/>
        <DebugParams params={params} searchParams={searchParams}/>
        <ShowContent/>
    </>
}