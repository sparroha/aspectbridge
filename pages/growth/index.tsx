import { relative } from "path";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { LoginNav, Profile } from "../login/[userlogin]";
import { GetServerSideProps } from "next";
import useSave from "../../lib/util/^save";
import { TLitter, alephbeth, getTLitter } from "../../components/hebrew";
import useUsers from "../../lib/util/^user";
import UserProfile from "../../lib/util/-userprofile-";

type Storehouse = {[key: string]: number}

type Crop = {
    planted: boolean,
    resource: string,
    growth: number,
    plantedAt: number
}
type Mana = {[key: number]: TLitter}

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
    const {ip, user, activeUsers} = useUsers()
    const [initState, setInitState] = useState({})

    /**
     * Initialize user specific and data
     */
    const [init, setInit] = useState(false)
    const {data, error, save} = useSave('growth'+user?.username, 10000)
    const safeToInit: boolean = useMemo(()=> data && user && !init,[data, user, init])

    
    /**
     * Local State
     */
    const [resource, setResource]: [Storehouse, Dispatch<SetStateAction<Storehouse>>] = useState({})
    const [grid, dispatch]: [CropFarm, Dispatch<any>] = useReducer((state: CropFarm, action)=>{
        switch(action.type){
            case 'init':
                let i = action.payload
                setInit(true)
                return i
            case 'newPlot':
                if(resource.keth<8){
                    alert('You need 8 or walls plot!')
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
                    setResource((f)=>{return {...f, keth: f.keth-8}})
                }
                else if(cols < 12) {
                    newPlotState = state.map((row,i)=>{
                        if(i!=rows-1) return row
                        return [...row, {planted: false, resource: '', growth: 0, plantedAt: null}]
                    })
                    setResource((f)=>{return {...f, keth: f.keth-8}})
                }
                else {
                    newPlotState = state
                    console.log('You have reached the maximum number of plots!')
                }
                return newPlotState
            case 'plant':
                let crop: Crop = {planted: true, resource: action.payload.resource, growth: 1, plantedAt: Date.now()}
                let loc = action.payload.location
                
                //setResource((f)=>{return {fruit: f.fruit-7, herb: f.herb-7, grain: f.grain-7}})
                let plantState = state.map((a,i)=>
                    a.map((b,j)=>{
                        if(i==loc[0]&&j==loc[1]&&b.planted==false){
                            switch(action.payload.resource){
                                case 'aleph':
                                    if(resource.nun<7){
                                        alert('You need 7 nun to attract an aleph!')
                                        return b
                                    }else{
                                        setResource((f)=>{return {...f, nun: f.nun-7}})
                                        //console.log('planted')
                                        return {...b, ...crop}
                                    }
                                case 'beth':
                                    if(resource.aleph<7 || resource.nun<7*7){
                                        alert('You need 7 aleph and 7*7 nun to build a beth!')
                                        return b
                                    }else{
                                        setResource((f)=>{return {...f, aleph: f.aleph-7, nun: f.nun-7*7}})
                                        //console.log('planted')
                                        return {...b, ...crop}
                                    }
                                case 'nun':
                                    if(resource.nun<alephbeth['nun'].order){
                                        alert('You need '+alephbeth['nun'].order+' nun to plant nun!')
                                        return b
                                    }else{
                                        setResource((f)=>{return {...f, nun: f.nun-alephbeth['nun'].order}})
                                        //console.log('planted')
                                        return {...b, ...crop}
                                    }
                                default:
                                    return {...b, ...crop}
                            }
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
                                console.log('harvested '+b.resource)
                                setResource((f)=>{
                                    let newresource = {...f}
                                    switch(b.resource){
                                        case 'aleph':
                                            newresource.aleph = (newresource.aleph || 0)+1
                                            newresource.nun = (newresource.nun || 0)+1
                                            break
                                        case 'beth':
                                            newresource.aleph = (newresource.aleph || 0)+5
                                            newresource.beth = (newresource.beth || 0)+1
                                            break
                                        case 'nun':
                                            newresource.nun = (newresource.nun || 0)+alephbeth.nun.order*alephbeth.nun.order
                                        default:
                                            newresource[b.resource] = (newresource[b.resource] || 0)+1
                                            break
                                    }
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
    const safeToSave: boolean = useMemo(()=> data!=undefined && grid!=undefined && init!=undefined && user!=undefined,[data, grid, init, user])

    /**
     * Load initial data to local state
     */
    /*useEffect(()=>{
        setInitState((state)=> {
            let s = state
            Object.keys(alephbeth).forEach((element) => {
                s[element] = 0
            });
            setResource(s)
            return s
        })
    },[])*/
    useEffect(()=>{
        if(!safeToInit) return
        //console.log('loadedData', data)
        //console.log('loadedGrid', grid)
        setInitState((state)=> {
            let s = state
            Object.keys(alephbeth).forEach((element) => {
                s[element] = 0
            });
            setResource({...s, ...data.resource})
            return s
        })
        dispatch({type: 'init', payload: data?.grid || initialGrid})
        //setResource((r) => data.resource || r)
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
            setResource((f)=>{
                let newresource = {...f}
                Object.entries(newresource).forEach((element) => {
                    switch(element[0]){
                        case 'aleph':
                            break
                        case 'beth':
                            let alp = 0
                            for(let x=0;x<element[1];x++){
                                alp += (Math.floor(Math.random()*22))==2?1:0
                            }
                            newresource.aleph = (newresource.aleph || 0)+alp
                            break
                        default:
                            break
                    }
                });
                return {...f, ...newresource}
            })
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
            <UserProfile/>
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
            <UserProfile/>
            <LoginNav user={user} homepage={'growth'}/>
        </div>
    </>
    
    return <Container style={{margin: '20px', position: 'relative'}}>
        {//'DATA:'+JSON.stringify(data)
        }<br/>
        <div style={{position: 'relative', textAlign: 'center'}}>
            <UserProfile/>
            <LoginNav user={user} homepage={'growth'}/>
        </div>
        <Row>
            <Col>
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
                </Row>
                <Row>{Object.entries(resource).map((a,i)=>{
                    try{
                        return (alephbeth[a[0]].order<=22)?<Col xs={4} sm={3} md={2} lg={1} key={i} >
                            <div style={{float: 'left'}}>{a[0]}:</div>
                            <div style={{float: 'left', width: '25px', height: 25+'px', borderRadius: '50%', border: '1px solid black',
                                backgroundColor:
                                    alephbeth[a[0]]?.order%7==1?'red':
                                    alephbeth[a[0]]?.order%7==2?'orange':
                                    alephbeth[a[0]]?.order%7==3?'yellow':
                                    alephbeth[a[0]]?.order%7==4?'green':
                                    alephbeth[a[0]]?.order%7==5?'skyblue':
                                    alephbeth[a[0]]?.order%7==6?'violet':
                                    alephbeth[a[0]]?.order%7==0?'white':
                                    '#777',
                                textAlign: 'center', verticalAlign: 'middle'}}
                            >{a[1]}</div>
                        </Col>:null
                    }catch(e){
                        console.log(e)
                        console.log(a[0])
                        return null
                    }
                })}</Row>
            </Col>
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

export function CropPlot({cell, dispatch, i, j}){
    return <div id={'growth_cell'} style={{position: 'relative', width: '100px', height: '100px', background: 'grey'}}>
        <select style={{position: 'absolute', right: '0px', top: '0px'}} value={cell.resource} onChange={
            (e)=>{e.target.value && dispatch({type: 'plant', payload: {location: [i,j], resource: e.target.value}})}
        }>
            <option></option>
            {Object.entries(alephbeth).map((a,i)=>{
                return(a[1].order<=22)?<option key={i}>{a[0]}</option>:null
            })}
        </select>
        
        <div id={'growth_progress'} style={{position: 'absolute', left: '0px', bottom: '0px', width: '10px', height: '100px', backgroundImage: 'linear-gradient(to top, red, orange, yellow, yellow, lightgreen, lightgreen, lightgreen, green, green, green, green, green, green, green, blue, violet, white)'}}>
            <div id={'growth_progress'} style={{position: 'absolute', left: '0px', top: '0px', width: '10px', height: 100-(cell.growth<100?cell.growth:100)+'px', backgroundColor: '#777'}}></div>
        </div>
        <div id={'growth_resource'} style={{position: 'absolute', left: 50-20+'px', top: 50-20+'px', width: '40px', height: 40+'px', borderRadius: '50%',
            backgroundColor:
                alephbeth[cell.resource]?.order%7==1?'red':
                alephbeth[cell.resource]?.order%7==2?'orange':
                alephbeth[cell.resource]?.order%7==3?'yellow':
                alephbeth[cell.resource]?.order%7==4?'green':
                alephbeth[cell.resource]?.order%7==5?'blue':
                alephbeth[cell.resource]?.order%7==6?'purple':
                alephbeth[cell.resource]?.order%7==0?'white':
                '#777',
            textAlign: 'center', verticalAlign: 'middle'}}
        ><div style={{textAlign: 'center', verticalAlign: 'middle',marginTop: '6px'}}>{cell.resource}</div></div>
    </div>
}
/*

1,8,15,22



*/