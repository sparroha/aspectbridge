'use client'
import { useReducer, useState, useEffect } from 'react'
import { Button, Col, Row } from "react-bootstrap";
import { getDB, searchDB, setDB } from '../../../lib/util/@registry';
import useUser from '../../../lib/util/^user';


export default function Go(p){
    
    const initialState = {
        coin: 0,
        income: 0,
        prestige: 0,
        ore: 0,
        metal: 0,
        wood: 0,
        lumber: 0,
        clay: 0,
        brick: 0,
    }
    const reducer = (state: any, action: {type: string, payload?: any})=>{
        switch(action.type){
            case 'set':
                return action.payload != "default" ? action.payload : initialState
            case 'add'://{type: 'ore', count: 1}
                return {...state, [action.payload.type]: state[action.payload.type]+action.payload.count}
            case 'remove'://{type: 'wood', count: 1}
                return {...state, [action.payload.type]: state[action.payload.type]-action.payload.count}
            case 'exchange'://{trade: 'ore', amount: 1, type: 'metal', count: 1}
                if(state[action.payload.trade]<action.payload.amount) return state
                return {...state, [action.payload.trade]: state[action.payload.trade]-action.payload.amount, [action.payload.type]: state[action.payload.type]+action.payload.count}
            case 'craft':
                switch(action.payload.type){
                    case 'metal':
                        if(state.ore<3 || state.wood<3) return state
                        return {...state, ore: state.ore-3, wood: state.wood-3, metal: state.metal+2}
                    case 'brick':
                        if(state.clay<3 || state.wood<3) return state
                        return {...state, clay: state.clay-3, wood: state.wood-3, brick: state.brick+2}
                    case 'lumber':
                        if(state.wood<1) return state
                        return {...state, wood: state.wood-1, lumber: state.lumber+3}
                }



            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)
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
        if(!user)return
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

    if(!userLoaded)return <><Button onClick={loadSave}>Load User Data</Button></>
    return <div style={{color: '#9af'}}>
    <Row id="controls">
        <Col sm={2}>
            <label>Save Interval:</label>
            <input type="number" value={autoSaveInterval} onChange={(e)=>{setAutoSaveInterval(()=>{
                    let inval = Number.parseInt(e.target.value)
                    if (inval<1) inval = 1
                    return inval
                })}}/>
        </Col>
        <Col sm={2}></Col>
        <Col sm={2}></Col>
        <Col sm={2}></Col>
        <Col sm={2}></Col>
        <Col sm={2}></Col>
    </Row>
    <Row id="activities">
        <Col id="mine" sm={3}>
            <Row>
                <Col sm={12}>
                    +Ore: {state.ore}
                    <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'ore', count: 1}})}}>Mine</Button>
                </Col>
                <Col sm={12} style={{color: '#9af'}}>
                    -Ore: {state.ore} | -Wood: {state.wood} | +Metal: {state.metal}
                    <Button onClick={()=>{dispatch({type: 'craft', payload: {type: 'metal'}})}}>Smelt</Button>
                </Col>
            </Row>
        </Col>
        <Col id="forest" sm={3}>
            <Col sm={12}>
                +Wood: {state.wood}
                <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'wood', count: 1}})}}>Chop</Button>
            </Col>
            <Col sm={12} style={{color: '#9af'}}>
                -Wood: {state.wood} | +Lumber: {state.metal}
                <Button onClick={()=>{dispatch({type: 'craft', payload: {type: 'lumber'}})}}>Saw</Button>
            </Col>
        </Col>
        <Col sm={4}></Col>
    </Row>
    </div>
}