'use client'

import { Dispatch, Fragment, useEffect, useReducer, useState } from "react"
import { rules } from "./rules"
import { D2, D3, Map, Tile } from "./types"

//const day = movement + activity
//const night = activity * 2
//const cycle = day + night
//const turn = day

//turn = movement + activities * 3
const gridsize = 22
export default function BridgeOfAspects(){
    const [showRules, toggleRules] = useState(false)
    const RuleSwitch = ()=> {return <button onClick={()=>toggleRules((r)=>!r)}>{showRules?'Close':'Rules'}</button>}
    const Rlz = rules.split('/n')

    const map = []//expWIP

    //initial filler function for grid
    const gridgen = (): Map=>{
        let empgrid: Map = []
        for(let y = 0;y<gridsize;y++){
            let emprow: D2 = []
            for(let x = 0;x<gridsize;x++){
                let tile: Tile = {x: x, y: y}
                emprow.push(tile)
                map.push(tile)//expWIP
            }
            empgrid.push(emprow)
        }
        return empgrid
    }
    //grid state
    const [grid, setGrid] = useState(null)

    //populate grid with initial state
    function populateGrid(){
        let newGrid: Map = gridgen()
        /** */
        newGrid[7][12] = {
            ...newGrid[7][12],
            image: 'assets/binary2.png',
            f: ()=>{
                let xrand = Math.floor(Math.random()*(grid?.length|1))
                let yrand = Math.floor(Math.random()*(grid?.[0]?.length|1))
                setGrid((g)=>{console.log('attempt action')
                    let ng = [...g]
                    ng[xrand][yrand] = {...ng[7][12]}
                    //ng[7][12] = {x: 7, y: 12}
                    return ng
                })
                map.forEach((t)=>{
                    if(t.x === 7 && t.y === 12)console.log(t)
                    if(t.x === xrand && t.y === yrand){
                        t = grid?.[7]?.[12] || {x: 7, y: 12}
                        console.log(t)
                    }
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
        <RuleSwitch/><br/>{
            showRules?<div style={{fontSize: '1.5rem'}}>{Rlz.map((l,i)=>{return <p key={'rules_'+i}>{l}<br/></p>})}</div>:null
        }
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
