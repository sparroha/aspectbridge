'use client'
import DebugParams from "../../components/debugpageparams";
import { grid, Grid, GridContextProvider } from "./grid";


/**
 * DO NEW STUFF
 */






/**
 * END DO NEW STUFF
 */



export default function Page({params, searchParams}){
    //URL extracts
    const queryObject = searchParams
    const queryArray: [string, string][] = Object.entries(queryObject);
    const Title = ()=>{return <h1>Page</h1>}
    const debug = false
    

    return <GridContextProvider>
        <Title/>
        {//<DebugParams params={params} searchParams={searchParams}/>
        }
        <Grid grid={grid(10,10)}/>
    </GridContextProvider>
}