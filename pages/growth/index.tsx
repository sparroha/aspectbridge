import { relative } from "path";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { LoginNav, Profile } from "../login/[userlogin]";
import { GetServerSideProps } from "next";
import useSave from "../../lib/util/savedata";

type Storehouse = {[key: string]: number}

type Crop = {
    planted: boolean,
    resource: string,
    growth: number,
    plantedAt: number
}
type CropFarm = Crop[][]
const initialGrid: CropFarm = [//spread deep
    [//shallow
        {planted: false, resource: '', growth: 0, plantedAt: null},
        {planted: false, resource: '', growth: 0, plantedAt: null},
        {planted: false, resource: '', growth: 0, plantedAt: null},
    ],
    [
        {planted: false, resource: '', growth: 0, plantedAt: null},
        {planted: false, resource: '', growth: 0, plantedAt: null},
        {planted: false, resource: '', growth: 0, plantedAt: null},
    ],
    [
        {planted: false, resource: '', growth: 0, plantedAt: null},
        {planted: false, resource: '', growth: 0, plantedAt: null},
        {planted: false, resource: '', growth: 0, plantedAt: null},
    ]
]
export default function Growth(props){

    /**
     * Initialize user specific and data
     */
    const [init, setInit] = useState(false)
    const [user, setUser] = useState(null)
    const {data, error, save} = useSave('growth'+user?.username, 10000)
    const safeToInit: boolean = useMemo(()=> data && user && !init,[data, user, init])

    
    /**
     * Local State
     */
    const [resource, setResource]: [Storehouse, Dispatch<SetStateAction<Storehouse>>] = useState({fruit: 0, herb: 0, grain: 0})
    const [grid, dispatch]: [CropFarm, Dispatch<any>] = useReducer((state: CropFarm, action)=>{
        switch(action.type){
            case 'init':
                let i = action.payload
                setInit(true)
                return i
            case 'newPlot':
                if(resource.fruit<7||resource.herb<7||resource.grain<7){
                    alert('You need 7 or each resource to purchase a new plot!')
                    return state
                }
                //let vacantFound = false
                let rows = state.length
                let rOw = state[rows-1]
                let cols = rOw.length
                //let cOl = rOw[cols-1]
                let newPlotState 
                if(rows < 12 && cols >= 12){
                    newPlotState = [...state, [{planted: false, resource: '', growth: 0, plantedAt: null}]]
                    setResource((f)=>{return {fruit: f.fruit-7, herb: f.herb-7, grain: f.grain-7}})
                }
                else if(cols < 12) {
                    newPlotState = state.map((row,i)=>{
                        if(i!=rows-1) return row
                        return [...row, {planted: false, resource: '', growth: 0, plantedAt: null}]
                    })
                    setResource((f)=>{return {fruit: f.fruit-7, herb: f.herb-7, grain: f.grain-7}})
                }
                else {
                    newPlotState = state
                    console.log('You have reached the maximum number of plots!')
                }
                return newPlotState

                /*if(rows>=12){
                    console.log('You have reached the maximum number of rows!')
                    if(cols>=12){
                        console.log('You have reached the maximum number of plots!')
                        return state
                    }else return state.map((row,i)=>{
                        if(vacantFound) return row
                        if(row.length<12) {
                            vacantFound = true
                            setResource((f)=>{return {fruit: f.fruit-7, herb: f.herb-7, grain: f.grain-7}})
                            return [...row, {planted: false, resource: '', growth: 0, plantedAt: null}]
                        }
                        return row
                    })
                }else if(cols>=12){
                        console.log('You have reached the maximum number of plots for row '+rows+'!')
                        setResource((f)=>{return {fruit: f.fruit-7, herb: f.herb-7, grain: f.grain-7}})
                        return [...state, [{planted: false, resource: '', growth: 0, plantedAt: null}]]
                }*/
                //console.log('something went wrong adding plots.')
                //return state
                /*let newPlotState = state.map((row,i)=>{
                    if(vacantFound) return row
                    if(row.length<12) {
                        vacantFound = true
                        let newRow = [...row, {planted: false, resource: '', growth: 0, plantedAt: null}]
                        setResource((f)=>{return {fruit: f.fruit-2, herb: f.herb-2, grain: f.grain-2}})
                        return newRow
                    }
                    return row
                })*/
                //return newPlotState
            case 'plant'://dispatch({type: 'plant', payload: [0,0]})
                let plantState = state.map((a,i)=>
                    a.map((b,j)=>{
                        if(i==action.payload.location[0]&&j==action.payload.location[1]&&b.planted==false){
                            console.log('planted')
                            return {...b, planted: true, plantedAt: Date.now(), resource: action.payload.resource, growth: 1}
                        }
                        return b
                    })
                )
                return plantState
            case 'harvest':
                let harvestState = state.map((a,i)=>
                    a.map((b,j)=>{
                        if(b.planted){
                            if(b.growth>=100){
                                console.log('harvested')
                                setResource((f)=>{
                                    let newresource = {...f}
                                    newresource[b.resource]++
                                    return newresource
                                })
                                return {...b, planted: false, plantedAt: null, resource: '', growth: 0}
                            }
                        }
                        return b
                    })
                )
                return harvestState
            case 'grow':
                let growState = state.map((a,i)=>
                    a.map((b,j)=>{
                        if(b.growth>0 && b.growth<100){
                            return {...b, growth: b.growth+action.payload}
                        }
                        return b
                    })
                )
                return growState
            default:
                return state
        }
    }, initialGrid)
    const safeToSave: boolean = useMemo(()=> data && grid && init && user,[data, grid, init, user])

    /**
     * Load initial data to local state
     */
    useEffect(()=>{
        if(!safeToInit) return
        //console.log('loadedData', data)
        //console.log('loadedGrid', grid)
        dispatch({type: 'init', payload: data?.grid || initialGrid})
        setResource((r) => data.resource || r)
    },[safeToInit])

    /**
     * Save local state to data
     */
    useEffect(()=>{
        if(!safeToSave) return
        //console.log('Saveing grid to data')
        save({grid: [...grid], resource: {...resource}})
    },[grid])
    
    /**
     * App Logic
     */
    useEffect(() => {
        if(!safeToSave) return
        const f = setInterval(() => {
            //setProgress((p)=>p<100?p+1:0)
            dispatch({type: 'grow', payload: 5})
        }, 5000); 
        return () => clearInterval(f);
    }, [safeToSave])
    const NOW = Date.now()
    
    /**
     * RENDER
     */
    if(!user) return <div style={{position: 'relative'}}>
        Login to tend to your crops!
        <div style={{position: 'relative', textAlign: 'center'}}>
            <Profile ip={props.ip} setUser={setUser}/>
            <LoginNav user={user} homepage={'growth'}/>
        </div>
        <div style={{position: 'absolute', left: '50vw', top: '50vh'}}>
            <CropPlot cell={grid[0][0]} dispatch={dispatch} i={0} j={0}/>
        </div>
    </div>
    if(!data || !init) return <>

        DATA:{JSON.stringify(data)}<br/>
        UID:{JSON.stringify(user?.username)}<br/>
        Loading...<hr/>
        INIT:{JSON.stringify(init)}<br/>
        GRID_DATA:{JSON.stringify(grid)}<br/>

        <div style={{position: 'relative', textAlign: 'center'}}>
            <Profile ip={props.ip} setUser={setUser}/>
            <LoginNav user={user} homepage={'growth'}/>
        </div>
    </>
    
    return <Container style={{margin: '20px', position: 'relative'}}>
        {//'DATA:'+JSON.stringify(data)
        }<br/>
        <div style={{position: 'relative', textAlign: 'center'}}>
            <Profile ip={props.ip} setUser={setUser}/>
            <LoginNav user={user} homepage={'growth'}/>
        </div>
        <Row>
            <Col>
                <button onClick={
                    (e)=>{dispatch({type: 'harvest', payload: null})}
                }>harvest</button>
            </Col>
            <Col>
                <button onClick={
                    (e)=>{dispatch({type: 'newPlot', payload: null})}
                }>newPlot</button>
            </Col>
            {Object.entries(resource).map((a,i)=>{
                return <Col key={i}>
                    <div style={{float: 'left'}}>{a[0]}:</div>
                    <div style={{float: 'left', width: '25px', height: 25+'px', borderRadius: '50%',backgroundColor: a[0]=='fruit'?'red':a[0]=='herb'?'lightgreen':a[0]=='grain'?'tan':'#777', textAlign: 'center', verticalAlign: 'middle'}}>{a[1]}</div>
                </Col>
            })}
        </Row>
        {grid.map((row, i)=>{return <Row key={-i}>
            {row.map((cell, j)=>{return <Col key={i+j}>
                    <CropPlot cell={cell} dispatch={dispatch} i={i} j={j}/>
                </Col>})}
        </Row>})}
        {//'GRID DATA:'+JSON.stringify(grid)
        }<br/>
        {//'RESOURCE:'+JSON.stringify(resource)
        }
    </Container>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const ip = context.req.headers['x-forwarded-for'] || context.req.connection.remoteAddress;
    return { props: { ip: ip } }
}

export function CropPlot({cell, dispatch, i, j}){
    return <div id={'growth_cell'} style={{position: 'relative', width: '100px', height: '100px', background: 'grey'}}>
        <select style={{position: 'absolute', right: '0px', top: '0px'}} value={cell.resource} onChange={
            (e)=>{e.target.value && dispatch({type: 'plant', payload: {location: [i,j], resource: e.target.value}})}
        }>
            <option></option>
            <option>fruit</option>
            <option>herb</option>
            <option>grain</option>
        </select>
        
        <div id={'growth_progress'} style={{position: 'absolute', left: '0px', bottom: '0px', width: '10px', height: '100px', backgroundImage: 'linear-gradient(to top, red, orange, yellow, yellow, lightgreen, lightgreen, lightgreen, green, green, green, green, green, green, green, blue, purple, white)'}}>
            <div id={'growth_progress'} style={{position: 'absolute', left: '0px', top: '0px', width: '10px', height: 100-cell.growth+'px', backgroundColor: '#777'}}></div>
        </div>
        <div id={'growth_resource'} style={{position: 'absolute', left: 50-20+'px', top: 50-20+'px', width: '40px', height: 40+'px', borderRadius: '50%',backgroundColor: cell.resource=='fruit'?'red':cell.resource=='herb'?'lightgreen':cell.resource=='grain'?'tan':'#777', textAlign: 'center', verticalAlign: 'middle'}}><div style={{textAlign: 'center', verticalAlign: 'middle',marginTop: '6px'}}>{cell.resource}</div></div>
    </div>
}