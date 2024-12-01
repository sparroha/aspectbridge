'use client';
import { useEffect, useMemo, useState } from 'react'
import periodicTable from '../PeriodicTableJSON.json'
const elements = periodicTable.elements
type Elements = typeof elements
type Element = Elements[number]
const getElBySymbol = (symbol)=>elements.filter((e,i)=>e.symbol==symbol)[0]
const getElByName = (name)=>elements.filter((e,i)=>e.name==name)[0]



export default function Molecules(){
    const [selectedElName, setSelectedElName] = useState<string>('Hydrogen')
    const selectedEl: Element | null = useMemo(()=>getElByName(selectedElName),[selectedElName])
    const [previousEl, setPreviousEl] = useState<Element>(getElByName(selectedElName))
    useEffect(
        ()=>setPreviousEl((p)=>selectedEl||p)
    ,[selectedEl])
    const image: string = useMemo(()=>previousEl?.image.url||'', [previousEl])




    const [elGrid, setElGrid] = useState<Element[][]>([])
    useEffect(()=>{
        let grid: Element[][] = []
        for(let i=0;i<10;i++){
            grid[i] = []
            for(let j=0;j<18;j++){
                grid[i][j] = elements.filter((e,index)=>(e.ypos==i+1&&e.xpos==j+1))[0]
            }
        }
        setElGrid(grid)
    },[])




    return <>
        <h1>Molecules</h1><br/>
        {JSON.stringify(draft_elements)}<br/><br/>
        <h1>Periodic Table</h1>


        <table style={{margin: 0, padding: 0}}>
            <tbody>
                {elGrid.map((row,i)=>{return <tr key={i}>
                    {row.map((el,i)=>{return <td key={i}>
                        <ElSquare i={i} element={el} set={setSelectedElName} />
                    </td>})}
                </tr>})}
            </tbody>
        </table>

        
        <input type="text" value={selectedElName} onChange={(e)=>setSelectedElName(e.target.value)} /><br/>
        <DisplayElement element={previousEl} />
    </>
}
function DisplayElement({element}){
    if(!element)return <div></div>
    return <div>
        <img src={element.image.url} width={'300px'} alt={element.name} />
        {Object.entries(element).map((a, i: number)=><>
            <div key={i}>{a[0]}:{JSON.stringify(a[1])}</div>
        </>)}
        {//<pre>{JSON.stringify(element)}</pre>
        }
    </div>
}

function ElSquare({element, i, set}){
    const Out = (element)=>element.name?<>
        <img src={element.image.url} width={'50px'} alt={element.name} />
        <div>{element.name}</div>
    </>:null
    return <div key={i}
        style={{
            width:'70px',
            alignItems:'center',
            border:element?'1px solid black':'none',
        }}
        onClick={()=>set(element.name)}
    >
        <Out {...element}/>
    </div>
}




const draft_elements = {
    hydrogen: ['H',{protoncount: getElBySymbol('H').number}],
    carbon: ['C',{protoncount:"6"}],
    oxegen: ['H',{protoncount:"8"}],
    nitrogen: ['N',{protoncount:"7"}],
    potassium: {protoncount:"19"},
    phosphorus: {protoncount:"15"},
//primary nutrients:  nitrogen,phosphorus,potassium

    sulferObj: {protoncount:"16"},
    magnesiumObj: {protoncount:"12"},
    calcium: ['Ca',{protoncount:"20"}],
//secondary

    ironObj: {protoncount:"26"},
    boronObj: {protoncount:"5"},
    manganeseObj: {protoncount:"25"},
    zincObj: {protoncount:"30"},
    molybdenumObj: {protoncount:"42"},
    copperObj: {protoncount:"29"},
    cobaltObj: {protoncount:"27"},
    chlorineObj: {protoncount:"17"},
    nickleObj: {protoncount:"28"},
//macro
}