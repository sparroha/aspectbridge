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
type CropFarm = [[Crop,Crop,Crop],[Crop,Crop,Crop],[Crop,Crop,Crop]]
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
    const {data, error, save} = useSave('growth'+user?.username)
    const safeToInit: boolean = useMemo(()=> data && user && !init,[data, user, init])

    
    /**
     * Local State
     */
    const [resource, setResource]: [Storehouse, Dispatch<SetStateAction<Storehouse>>] = useState({fruit: 0, herb: 0, grain: 0})
    const [grid, dispatch]: [CropFarm, Dispatch<any>] = useReducer((state, action)=>{
        switch(action.type){
            case 'init':
                let i = action.payload
                setInit(true)
                return i
            case 'plant'://dispatch({type: 'plant', payload: [0,0]})
                let newState = state.map((a,i)=>
                    a.map((b,j)=>{
                        if(i==action.payload.location[0]&&j==action.payload.location[1]&&b.planted==false){
                            console.log('planted')
                            return {...b, planted: true, plantedAt: Date.now(), resource: action.payload.resource, growth: 1}
                        }
                        return b
                    })
                )
                return newState
            case 'harvest':
                let r = state.map((a,i)=>
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
                return r
            case 'grow':
                let g = state.map((a,i)=>
                    a.map((b,j)=>{
                        if(b.growth>0 && b.growth<100){
                            return {...b, growth: b.growth+1}
                        }
                        return b
                    })
                )
                return g
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
            dispatch({type: 'grow', payload: null})
        }, 1000); 
        return () => clearInterval(f);
    }, [safeToSave])
    const NOW = Date.now()
    
    /**
     * RENDER
     */
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
            </Col><Col>
                <div style={{float: 'left'}}>Fruit:</div>
                <div style={{float: 'left', width: '25px', height: 25+'px', borderRadius: '50%',backgroundColor: 'red', textAlign: 'center', verticalAlign: 'middle'}}>{resource.fruit}</div>
            </Col><Col>
                <div style={{float: 'left'}}>Herb:</div>
                <div style={{float: 'left', width: '25px', height: 25+'px', borderRadius: '50%',backgroundColor: 'lightgreen', textAlign: 'center', verticalAlign: 'middle'}}>{resource.herb}</div>
            </Col><Col>
                <div style={{float: 'left'}}>Grain:</div>
                <div style={{float: 'left', width: '25px', height: 25+'px', borderRadius: '50%',backgroundColor: 'tan', textAlign: 'center', verticalAlign: 'middle'}}>{resource.grain}</div>
            </Col>
        </Row>
        {grid.map((row, i)=>{return <Row key={-i}>
            {row.map((cell, j)=>{return <Col key={i+j}>
                <div id={'growth_cell'} style={{position: 'relative', width: '100px', height: '100px', background: 'grey'}}>
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