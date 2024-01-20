'use client'

import { Dispatch, Fragment, useEffect, useState } from "react"
import { rules } from "./rules"

//const day = movement + activity
//const night = activity * 2
//const cycle = day + night
//const turn = day

//turn = movement + activities * 3
type C = any
type R = C[]
type G = R[]
const gridsize = 22
export default function Page(){
    const [showRules, toggleRules] = useState(false)
    const RuleSwitch = ()=> {return <button onClick={()=>toggleRules((r)=>!r)}>{showRules?'Close':'Rules'}</button>}
    const R = rules.split('/n')
    const gridgen = ()=>{
        let empgrid: G = []
        for(let y = 0;y<gridsize;y++){
            let emprow: R = []
            for(let x = 0;x<gridsize;x++){
                emprow.push({x: x, y: y})
            }
            empgrid.push(emprow)
        }
        return empgrid
    }
    const [grid, setGrid] = useState(null)
    if(showRules)return <div style={{fontSize: '1.5rem'}}>
        <RuleSwitch/><br/>
        {R.map((l,i)=>{return <>{l}<br/></>})}
    </div>
    function populateGrid(){
        let newGrid = gridgen()
        /** */
        newGrid[7][12] = {
            ...newGrid[7][12],
            image: 'assets/binary2.png',
            f: ()=>{
                setGrid((g)=>{
                    let ng = g
                    ng[Math.floor(Math.random())*g.length][Math.floor(Math.random())*g[0].length] = ng[7][12]
                    ng[7][12] = {x: 7, y:12}
                    return ng
                })
            }
        }
        /** */
        setGrid(newGrid)
    }
    useEffect(()=>{//call once
        populateGrid()
    },[])
    return <>
        <RuleSwitch/><br/>
        <div>AB BoA</div>
        <Temple grid={grid}/>
    </>
}
function MainDisplayWindow(){
    
}
function Temple({grid}){
    if(!grid)return <>No Grid Loaded</>

    return <table><tbody>
    {
        grid.map((row, y)=>{
            return <tr key={(y*-1)-1}>
                {
                    row.map((cell, x)=>{
                        return <td key={y*x+x} style={{margin:0, padding:0}}><div onMouseOver={()=>{}} onClick={()=>{}} style={{border: '1px solid #777', width: '40px', height: '40px', backgroundColor: `rgb(${255/22*x},${255/44*(x+y)},${255/22*y})`}}>
                            <button onClick={()=> cell.f?.()} style={{height: '100%', width: '100%', backgroundColor: `rgb(${255/22*x},${255/44*(x+y)},${255/22*y})`}}>{cell.image?<img src={cell.image} style={{height: '100%', width: '100%'}}/>:cell.x+'/'+cell.y}</button>
                        </div></td>
                    })
                }
            </tr>
        })
    }
    </tbody></table>
}



const activities = {
    swords: [
        'S1. Dance',
        'S2. Paint',
        'S3. Engineer',
    ],
    cups:[
        'L1. River(bonus to crop harvest)',
        'L2. Mine(bonus to exchange value)',
        'L3. Market(allows exchange)',
        'L4. Mountain(impassable location)',
        'L5. Forest(bonus to exchange value)',
        'L6. Farm(provides resource)'
    ],
    wands:[
        'C1. wheat'
    ],
    discs:[
        'P1. tower'
    ]
}
const landmarks = []
