'use client'
import { useMemo } from "react"
import { Mosaic } from "react-mosaic-component";

export default function Page({params, searchParams}){

    const ELEMENT_MAP: { [viewId: string]: JSX.Element } = useMemo(() => {return {
        a: <div>Left Window</div>,
        b: <div>Top Right Window</div>,
        c: <div>Bottom Right Window</div>,
      }}, [params, searchParams])

    const queryObject = searchParams
    const queryArray = Object.entries(queryObject);
    const queryMap = new Map(queryArray);
    const queryArrayRedundant = Array.from(queryMap) || queryArray;

    return <>
        <h1>Page</h1>
        <p>params: {JSON.stringify(params)}</p>
        <p>searchParams: {JSON.stringify(searchParams)}</p>
        <ul>
            {
                queryArray.map(
                    (value, key) => {return <li key={key}>{JSON.stringify(value)}</li>}
                )
            }
        </ul>
        {/**NOt working properly */}
        <Mosaic<string>
            renderTile={(id) => ELEMENT_MAP[id]}
            initialValue={{
                direction: 'row',
                first: 'a',
                second: {
                    direction: 'column',
                    first: 'b',
                    second: 'c',
                },
                splitPercentage: 40,
            }}
        />
    </>
}
/*<p>queryMap: {queryMap..map((k,i)=>{
            return <div key={i}>{k}</div>
        })}</p>*/

        //<p>queryMap: {queryMap.forEach((value, key) => JSON.stringify([key, value]))}</p>

        
        //<p>queryMapKeys: {JSON.stringify(queryMap.keys().next() && queryMap.keys().next())}</p>
        //<p>queryMapValues: {JSON.stringify(queryMap.keys().next())}</p>


        /*<div className={'row h100 w100'}>
            <h1>Page</h1>
            <p>params: {JSON.stringify(params)}</p>
            <p>searchParams: {JSON.stringify(searchParams)}</p>
            <ul>
                {
                    queryArray.map(
                        (value, key) => {return <li key={key}>{JSON.stringify(value)}</li>}
                    )
                }
            </ul>
        </div>*/