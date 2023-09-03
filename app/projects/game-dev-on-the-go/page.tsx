'use client'
import { useReducer, useState, useEffect } from 'react'
import { Button, Col, Form, Row } from "react-bootstrap";
import { getDB, searchDB, setDB } from '../../../lib/util/@registry';
import useUser from '../../../lib/util/^user';
import Link from 'next/link';
import Image from 'next/image';

const portals = ['projects', 'bridge', 'cookbook', 'lexicon']
type Location = 'Mine' | 'Quary' | 'Forest' | 'River' | 'Port' | 'Shipyard' | 'Library' | 'Scripts' | 'Tower'
type LocationInfo = {name: string, zones: Location[]}
export default function Go(p){
    /**
     * CONSTANTS
     */
    /**APP STATE CONSTANTS**/
    const locations: {[key: string]: LocationInfo} = {
        island: {name: 'Island', zones: ['Mine', 'Quary', 'Forest', 'River', 'Library', 'Tower']},
        mainland: {name: 'Mainland', zones: ['Quary', 'Forest', 'Port', 'Shipyard', 'Library', 'Scripts']}
    }
    
    const initialState = {
        location: locations.mainland,
        coin: 0,
        income: 0,
        prestige: 0,
        ore: 0,
        metal: 0,
        wood: 0,
        lumber: 0,
        clay: 0,
        brick: 0,
        stone: 0,
        tile: 0,
        boat: 0,
        ship: 0,
        tablets: [],
    }
    const reducer = (state: any, action: {type: string, payload?: any})=>{
        let actionType = action.type.toLowerCase()
        switch(actionType){
            case 'teleport':
                return window.location.href = '/'+action.payload.destination
            case 'set':
                return action.payload != "default" ? action.payload : initialState
            case 'add'://{type: 'ore', count: 1}
                return {...state, [action.payload.type]: state[action.payload.type]?state[action.payload.type]+action.payload.count:action.payload.count}
            case 'remove'://{type: 'wood', count: 1}
                if(!state[action.payload.type]) {alert("strange; it seems you haven't discovered that yet"); return state}
                if(state[action.payload.type]<action.payload.count) {alert('not enough '+action.payload.type); return state}
                return {...state, [action.payload.type]: state[action.payload.type]-action.payload.count}
            case 'exchange'://{trade: 'ore', amount: 1, type: 'metal', count: 1}
                if(!state[action.payload.trade]) {alert("strange; it seems you haven't discovered that yet"); return state}
                if(!state[action.payload.type]) {alert("strange; it seems you haven't discovered that yet"); return state}
                if(state[action.payload.trade]<action.payload.amount) {alert('not enough '+action.payload.trade); return state}
                return {...state, [action.payload.trade]: state[action.payload.trade]-action.payload.amount, [action.payload.type]: state[action.payload.type]?state[action.payload.type]+action.payload.count:action.payload.count}
            case 'craft':
                let craftType = action.payload.type.toLowerCase()
                switch(craftType){
                    case 'metal':
                        if(state.ore<3) {alert('not enough ore'); return state}
                        if(state.wood<3) {alert('not enough wood'); return state}
                        return {...state, ore: state.ore-3, wood: state.wood-3, metal: state.metal?state.metal+2:2}
                    case 'brick':
                        if(state.clay<4) {alert('not enough clay'); return state}
                        if(state.wood<3) {alert('not enough wood'); return state}
                        return {...state, clay: state.clay-4, wood: state.wood-3, brick: state.brick?state.brick+2:2}
                    case 'lumber':
                        if(state.wood<1) {alert('not enough wood'); return state}
                        return {...state, wood: state.wood-1, lumber: state.lumber+3}
                    case 'tile':
                        if(state.stone<1) {alert('not enough stone'); return state}
                        if(state.lumber<4) {alert('not enough lumber'); return state}
                        return {...state, stone: state.stone-1, lumber: state.lumber-4, tile: state.tile?state.tile+4:4}
                    case 'boat':
                        if(state.lumber<30) {alert('not enough lumber'); return state}
                        return {...state, lumber: state.lumber-30, boat: state.boat?state.boat+1:1}
                    case 'ship':
                        if(state.lumber<40) {alert('not enough lumber'); return state}
                        if(state.brick<40) {alert('not enough brick'); return state}
                        if(state.metal<20) {alert('not enough metal'); return state}
                        return {...state, lumber: state.lumber-40, brick: state.brick-40, metal: state.metal-20, ship: state.ship?state.ship+1:1}
                    case 'flagship':
                        if(state.lumber<80) {alert('not enough lumber'); return state}
                        if(state.wood<40) {alert('not enough wood'); return state}
                        if(state.brick<80) {alert('not enough bick'); return state}
                        if(state.metal<60) {alert('not enough metal'); return state}
                        return {...state, lumber: state.lumber-80, wood: state.wood-40, brick: state.brick-80, metal: state.metal-60, flagship: state.flagship?state.flagship+1:1}
                    case 'raft':
                        if(state.wood<20) {alert('not enough wood'); return state}
                        return {...state, wood: state.wood-20, raft: state.raft?state.raft+1:1}
                }
            case 'write':
                if(state.brick<1 || state.lumber<1) {alert('not enough bricks or lumber'); return state}
                return {...state, brick: state.brick-1, lumber: state.lumber-1, tablets: state.tablets?[...state.tablets, action.payload.message]:[action.payload.message]}
            case 'sail'://{destination: 'Island', vessel: 'boat'}
                if(state.fish<20) {alert('not enough fish'); return state}
                let destination = action.payload.destination.toLowerCase()
                if(state.location.name==destination) {alert('this is your current location'); return state}
                let vessel = action.payload.vessel.toLowerCase()

                if(state[vessel]<1) {alert('no '+vessel+'s available'); return state}
                let durability = (vessel=='boat'?4:(vessel=='ship'?10:(vessel=='flagship'?20:2)))
                let loss = 0 + (Math.floor(Math.random()*durability+1)<2?1:0)
                if(loss>1) {alert('Your '+vessel+' was lost at sea!'); return {...state, [vessel]: state[vessel]-1, fish: state.fish-20}}
                return {...state, location: locations[destination], fish: state.fish-20}
            case 'hire'://{type: 'Mine'}
                if(state.fish<200) {alert('not enough fish'); return state}
                let type = action.payload.type.toLowerCase()
                return {...state, fish: state.fish-200, helpers: {...state.helpers, [type]:state.helpers[type]?state.helpers[type]+1:1}}
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    /**USER DATA CONSTANTS**/
    const [userLoaded, setUserLoaded] = useState(false)
    const [autoSaveInterval, setAutoSaveInterval] = useState(10)
    const user = useUser()
    const saveLoad = ()=>{
        if(!user)return
        try{
            setDB('on_the_go:'+user?.username, state)
        }catch(e){
            try{
                setDB('on_the_go:'+user?.username, state)
                console.log('New entry for on_the_go:'+user?.username, e)
            }catch(a){
                console.log('Failed to save on_the_go:'+user?.username, a)
            }
        }
    }
    const loadSave = ()=>{
        if(!user)return alert('loading user or user not logged in')
        try{
            getDB('on_the_go:'+user?.username).then((data)=>{
                dispatch({type: 'set', payload: JSON.parse(data)})
            })
            setUserLoaded(true)
        }catch(e){
            try{
                getDB('on_the_go:'+user?.username).then((data)=>{
                    dispatch({type: 'set', payload: JSON.parse(data)})
                })
                setUserLoaded(true)
                console.log('New entry for on_the_go:'+user?.username, e)
            }catch(a){
                console.log('Failed to save on_the_go:'+user?.username, a)
            }
        }
    }
    /**AUTO SAVE LOOP*/
    //auto save every n seconds
    useEffect(()=>{
        if(!user) return
        if(!userLoaded) return
        console.log('saveLoop')
        const saveInterval = setInterval(()=>{
            //console.log('saveAttempted')
            console.log('save interval', autoSaveInterval)
            saveLoad()
        }, autoSaveInterval*1000)
        return ()=>{
            console.log('saveLoopUnloaded')
            clearInterval(saveInterval)
        }
    },[user, userLoaded, state, autoSaveInterval])

    //game incriment loop
    useEffect(()=>{
        if(!user) return
        if(!userLoaded) return
        console.log('gameLoop')
        if(!state?.helpers) return
        const gameInterval = setInterval(()=>{
            Object.entries(state?.helpers).forEach(([key, value])=>{
                let helperType = key.toLowerCase()
                let helperCount: number = (typeof value === 'number') ? value : 0
                //TODO onrand() for helper success
                let roll = Math.random()*10
                let success: boolean = roll<=1+helperCount/10//rouphly 10% chance for income +1% per helper
                let income = Math.floor(Math.random()*helperCount)
                if(!success) return
                switch(helperType){
                    case 'mine':
                        dispatch({type: 'add', payload: {type: 'ore', count: income}})
                        break
                    case 'quary':
                        dispatch({type: 'add', payload: {type: 'stone', count: income}})
                        break
                    case 'forest':
                        dispatch({type: 'add', payload: {type: 'wood', count: income}})
                        break
                    case 'river':
                        dispatch({type: 'add', payload: {type: 'fish', count: income}})
                        break
                    case 'port':
                        dispatch({type: 'add', payload: {type: 'fish', count: income}})
                        break
                    case 'library':
                        dispatch({type: 'add', payload: {type: 'clay', count: income}})
                        break
                }
            });
        }, 2000)
        return ()=>{
            console.log('gameLoopUnloaded')
            clearInterval(gameInterval)
        }
    },[user, userLoaded, state])

    /**
     * APP RENDER
     */
    if(!userLoaded)return <div style={{marginTop: '40px'}}><Button onClick={loadSave}>Load User Data</Button></div>
    return <div style={{color: '#fff', marginTop: '40px'}}>
        <Row>
        <InfoHeader id="controls" bgColor={'#ddd'} state={state}>
            <Col xs={12} sm={6} md={3} lg={2}>
                <label>Save Interval:</label>
                <input type="number" value={autoSaveInterval} onChange={(e)=>{setAutoSaveInterval(()=>{
                        let inval = Number.parseInt(e.target.value)
                        if (inval<1) inval = 1
                        return inval
                    })}}/>
            </Col>
            <Col xs={12} sm={6} md={3} lg={2}><Link href={'https://writtenrealms.com/game'}>Written Realms</Link></Col>
            <Col xs={12} sm={6} md={3} lg={2}><Link href={'https://www.materiamagica.com'}>Materia Magica</Link></Col>
        </InfoHeader></Row>
        <Row><InfoHeader id="inventory_resources" bgColor={'#aaa'} state={state}>
            {['Resources', 'stone', 'wood', 'ore', 'clay', 'fish'].map((item, i)=>{
                return <Col key={i} xs={4} sm={3} md={2} lg={1} style={{textAlign: 'center'}}>
                    {(item=='Resources' || item=='Materials')?item:
                            <>{item}<br/>{state[item.toLowerCase()]}</>}
                </Col>
            })}
        </InfoHeader></Row>
        <Row><InfoHeader id="inventory_materials" bgColor={'#777'} state={state}>
            {['Materials', 'tile', 'lumber', 'metal', 'brick'].map((item, i)=>{
                return <Col key={i} xs={4} sm={3} md={2} lg={1} style={{textAlign: 'center'}}>
                    {(item=='Resources' || item=='Materials')?item:
                            <>{item}<br/>{state[item.toLowerCase()]}</>}
                </Col>
            })} 
        </InfoHeader></Row>
        <Row id="activities">
            <Zone id={"Mine"} bgColor={"#aa7"} state={state} dispatch={dispatch}>
                <MineOre state={state} dispatch={dispatch}/>
                <SmeltMetal state={state} dispatch={dispatch}/>
            </Zone>
            <Zone id={"Quary"} bgColor={"grey"} state={state} dispatch={dispatch}>
                <img src={'https://www.colonialmarble.net/wp-content/uploads/2021/08/shutterstock_523267222.jpg'} alt={'Colonial Marble & Granite'} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1, opacity: .8}}/>
            
                <QuaryStone state={state} dispatch={dispatch}/>
                <ChiselSlabs state={state} dispatch={dispatch}/>
            </Zone>
            <Zone id={"Forest"} bgColor={"green"} state={state} dispatch={dispatch}>
                <ChopWood state={state} dispatch={dispatch}/>
                <SawLumber state={state} dispatch={dispatch}/>
                <BuildRaft state={state} dispatch={dispatch}/>
            </Zone>
            <Zone id={"River"} bgColor={"blue"} state={state} dispatch={dispatch}>
                <Sail state={state} dispatch={dispatch}/>
                <Fish state={state} dispatch={dispatch}/>
                <DigClay state={state} dispatch={dispatch}/>
                <FireBricks state={state} dispatch={dispatch}/>
            </Zone>
            <Zone id={"Port"} bgColor={"blue"} state={state} dispatch={dispatch}>
                <Sail state={state} dispatch={dispatch}/>
                <Fish state={state} dispatch={dispatch}/>
            </Zone>
            <Zone id={"Shipyard"} bgColor={"blue"} state={state} dispatch={dispatch}>
                <BuildShip state={state} dispatch={dispatch}/>
            </Zone>
            <Zone id={"Library"} bgColor={"#79f"} state={state} dispatch={dispatch}>
                <ScribeTablet state={state} dispatch={dispatch}/>
            </Zone>
            <Zone id={"Scripts"} bgColor={"#79f"} state={state} dispatch={dispatch}>
                <ScriptDirectory state={state} dispatch={dispatch}/>
            </Zone>
            <Zone id={"Tower"} bgColor={"#79f"} state={state} dispatch={dispatch}>
                <img src={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'} alt={'NGC_1433'} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1, opacity: .8}}/>
                <Portal state={state} dispatch={dispatch}/>
            </Zone>
        </Row>
    </div>
}

/**
 * COMPONENTS
 */
//zone template
function InfoHeader({id, bgColor, state, children}:{id: string, bgColor: string, state: any, children: any}){
    return <Col id={id} xs={12} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: bgColor, opacity: '.7'}}></div>
        <Row style={{position: 'relative', zIndex: 1}}>
            {children}
        </Row>
    </Col>
}
function Zone({id, bgColor, state, dispatch, children}:{id: string, bgColor: string, state: any, dispatch: any, children: any}){
    if(!state.location?.zones?.includes(id))return
    return <Col id={id} xs={12} sm={6} md={4} lg={3} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: bgColor, opacity: '.7'}}></div>
        <Row style={{position: 'relative', zIndex: 1, width: '100%', textAlign: 'center'}}>
            <Col xs={4}><h4>{id}</h4></Col>
            <Col xs={8}>
                <Row>
                    <Col xs={5}>
                        <Button onClick={()=>{dispatch({type: 'hire', payload: {type: id.toLowerCase()}})}}>Hire:</Button>
                    </Col>
                    <Col xs={7}>
                        Helpers: {state.helpers?.[id.toLowerCase()]}<br/>
                        -200 Fish
                    </Col>
                </Row>
            </Col>
            {children}
        </Row>
    </Col>
}


//activities
function ChopWood({state, dispatch}){
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'wood', count: 1}})}}>Chop</Button><br/>
        +Wood: {state.wood}
    </Col>
}
function SawLumber({state, dispatch}){
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'craft', payload: {type: 'lumber'}})}}>Saw</Button><br/>
        -1 Wood<br/>+Lumber: {state.lumber}
    </Col>
}
function BuildRaft({state, dispatch}){
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'craft', payload: {type: 'raft'}})}}>Raft</Button><br/>
        -20 Wood<br/>+Raft: {state.raft}
    </Col>
}
function MineOre({state, dispatch}){
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'ore', count: 1}})}}>Mine</Button><br/>
        +Ore: {state.ore}
    </Col>
}
function SmeltMetal({state, dispatch}){
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'craft', payload: {type: 'metal'}})}}>Smelt</Button><br/>
        -3 Ore<br/>-3 Wood<br/>+Metal: {state.metal}
    </Col>
}
function QuaryStone({state, dispatch}){
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'stone', count: 1}})}}>Quary</Button><br/>
        +Stone: {state.stone}
    </Col>
}
function ChiselSlabs({state, dispatch}){
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'craft', payload: {type: 'tile'}})}}>Chisel</Button><br/>
        -1 Stone<br/>-4 Lumber<br/>+Tile: {state.tile}
    </Col>
}
function DigClay({state, dispatch}){
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'clay', count: 1}})}}>Dig</Button><br/>
        +Clay: {state.clay}
    </Col>
}
function FireBricks({state, dispatch}){
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'craft', payload: {type: 'brick'}})}}>Kiln</Button><br/>
        -4 Clay<br/>-3 Wood<br/>+Brick: {state.brick}
    </Col>
}
function ScribeTablet({state, dispatch}){
    const [script, setScript] = useState('')
    return <>
        <Col xs={12}>
            <Form>
                <Form.Control type="text" maxLength={33} placeholder="Message" value={script} onChange={(e)=>{setScript(e.target.value)}}/>
            </Form>
        </Col>
        <Col xs={4}>
            <Button onClick={()=>{dispatch({type: 'write', payload: {message: script}})}}>Scribe</Button><br/>
            -1 Bricks<br/>-1 Lumber<br/>+Scripts: {state.tablets?.length || 0}
        </Col>
        <Col xs={8}>
            <label>Last 3 scripts</label>
            <div style={{maxHeight: '100%', overflow: 'auto', color: 'black'}}>
                {state.tablets?.map((t, i)=>{
                    if(i<state.tablets.length-2) return
                    return <div key={i}>{t}<hr style={{margin: 0, padding: 0}}/></div>
                }
                )}
            </div>
        </Col>
    </>
}
function ScriptDirectory({state, dispatch}){
    return <Col xs={12}>
        <div style={{maxHeight: '100%', overflow: 'auto', color: 'black'}}>
            {state.tablets?.map((t, i)=>{
                return <div key={i}>{t}<hr style={{margin: 0, padding: 0}}/></div>
            }
            )}
        </div>
    </Col>
}
function Fish({state, dispatch}){
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'fish', count: 1}})}}>Fish</Button><br/>
        +Fish: {state.fish}
    </Col>
}
function Sail({state, dispatch}){
    const [destination, setDestination] = useState(state.location.name)
    const [vessel, setVessel] = useState('boat')
    return <Col xs={12}>
        <Form>
            <Row>
                <Col xs={4}>
                    <Button onClick={()=>{dispatch({type: 'sail', payload: {destination: destination, vessel: vessel}})}}>Sail To</Button><br/>
                    {vessel}s {state[vessel.toLowerCase()] || 0}<br/>
                    -20 fish
                </Col>
                <Col xs={8}>
                    <select className={'form-control'} value={destination} onChange={(e)=>{setDestination(e.target.value)}}>
                        <option>Island</option>
                        <option>Mainland</option>
                    </select>
                    By
                    <select className={'form-control'} value={vessel} onChange={(e)=>{setVessel(e.target.value)}}>
                        <option>boat</option>
                        <option>ship</option>
                        <option>flagship</option>
                        <option>raft</option>
                    </select>
                </Col>
            </Row>
        </Form>
    </Col>
}
function BuildShip({state, dispatch}){
    const [vessel, setVessel] = useState('Boat')
    return <Col xs={12}>
        <Row>
            <Col xs={4}>
                <Button onClick={()=>{dispatch({type: 'craft', payload: {type: vessel.toLowerCase()}})}}>Build</Button><br/>
            </Col>
            <Col xs={8}>
                <select className={'form-control'} value={vessel} onChange={(e)=>{setVessel(e.target.value)}}>
                    <option>Raft</option>
                    <option>Boat</option>
                    <option>Ship</option>
                    <option>Flagship</option>
                </select>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                Boats: {state.boat || 0}
            </Col>
            <Col xs={4}>
                Ships: {state.ship || 0}
            </Col>
            <Col xs={4}>
                Flagships: {state.flagship || 0}
            </Col>
            <Col xs={4}>
                Rafts: {state.raft || 0}
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                {vessel=='Raft' && <>Raft: -20 Wood<br/></>}
                {vessel=='Boat' && <>Boat: -30 Lumber<br/></>}
                {vessel=='Ship' && <>Ship: -40 Lumber, -40 Brick, -20 Metal</>}
                {vessel=='Flagship' && <>Ship: -80 Lumber, -40 Wood, -80 Brick, -60 Metal</>}
            </Col>
        </Row>
    
    </Col>
}

function Portal({state, dispatch}){
    const [destination, setDestination] = useState('projects')
    return <Col xs={12}>
        <Form>
            <Row>
                <Col xs={12}>Teleport to another realm</Col>
                <Col xs={4}>
                    <Button onClick={()=>{dispatch({type: 'teleport', payload: {destination: destination}})}}>bLink</Button><br/>
                </Col>
                <Col xs={8}>
                    <select className={'form-control'} value={destination} onChange={(e)=>{setDestination(e.target.value)}}>
                        {
                            portals.map((p, i)=>{
                                return <option key={i}>{p}</option>
                            })
                        }
                    </select>
                </Col>
            </Row>
        </Form>
    </Col>
}

