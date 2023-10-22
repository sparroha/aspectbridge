'use client'
import { useReducer, useState, useRef, useEffect, createContext, useContext } from 'react'
import { Button, Col, Form, Row } from "react-bootstrap";
import useUser from '../../lib/util/^user';
import { FormGroup, ContentPanel, 
    InfoPanel, ChatPanel, InterfacePanel, 
    DisplayGroup, InfoHeader, FG1, FG2, FG3, FG4, Piston, FGx } from './forms';
import { initialState, useDynamicContext } from './provider';
import { useUserSave } from '../../lib/util/^userSave';
import useLoop from '../../lib/util/^loop';
//----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------
export default function Go(p){
    /**CONSTANTS**/
    const {state, dispatch} = useDynamicContext()//40+ lines
    const user = useUser()//22 lines
    const [save, useLoad] = useUserSave('rdxtmpl', user?.username, state, (data)=>dispatch({type: 'set', payload: data}), (username)=>dispatch({type: 'user', payload: username}))//37 lines
    
    const [autoSaveInterval, setAutoSaveInterval] = useState(10)
    const loopCounter = useRef(0)
    useLoad()
    //game loop
    const loopf = ()=>{
        if(!user) return
        if(state && state == initialState) return
        //save loop
        if(loopCounter.current>=autoSaveInterval){
            console.log('autosaving...')
            save()
            loopCounter.current-=autoSaveInterval
        }
        if(loopCounter.current%2==0)dispatch({type: 'loop'})
        loopCounter.current++
    }
    useLoop(loopf,1000,[user, state, autoSaveInterval])
    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    /**
     * APP RENDER
     */
    if(!state) return <>Loading...</>
    if(state == initialState) return <>{'{}'}</>
    if(!state.user) return <>Initializing User Data...</>
    return <div style={{color: '#fff', marginTop: '40px'}}>
        <Row><InfoHeader id="controls" bgColor={'#ddd'}>
            <Col xs={12} sm={6} md={3} lg={2}>
                <label>Save Interval:</label>
                <input type="number" value={autoSaveInterval} onChange={(e)=>{setAutoSaveInterval(()=>{
                        let inval = Number.parseInt(e.target.value)
                        if (inval<1) inval = 1
                        return inval
                    })}}/>
            </Col>
        </InfoHeader></Row>
        {/**
         * All valid forms must be registered here in order to render to app page
         * This includes all FormGroup components and their children
         */}
        <Row id="display-group">
            <DisplayGroup id={"Display"} bgColor={"#aa7"} bgImage={''}>
                <ContentPanel/>
                <InfoPanel/>
            </DisplayGroup>
        </Row>
        <Row id="control-group">
            <FormGroup id={"Control"} bgColor={"#aa7"} bgAlt={''} bgImage={''}>
                <ChatPanel/>
                <Col xs={12} sm={12} md={6} lg={4}>CHATATAT</Col>
                <InterfacePanel/>
                <InfoPanel/>
            </FormGroup>
        </Row>
        <Row id="form-group-large">
            <FGx id={'id'} colx={1} bgColor={'#777'} global>
                <Piston/>
            </FGx>
            <FGx id={'id'} colx={2} bgColor={'purple'} global>
                <Piston/>
            </FGx>
            <FGx id={'id'} colx={2} bgColor={'purple'} global>
                <Piston/>
            </FGx>
        </Row>
        <Row id="form-group-medium">
            <FGx id={'3'} colx={3} bgColor={'red'} global>
                <Piston/>
            </FGx>
            <FGx id={'3'} colx={3} bgColor={'red'} global>
                <Piston/>
            </FGx>
            <FGx id={'3'} colx={3} bgColor={'red'} global>
                <Piston/>
            </FGx>
            <FGx id={'4'} colx={4} bgColor={'green'} global>
                <Piston/>
            </FGx>
            <FGx id={'4'} colx={4} bgColor={'green'} global>
                <Piston/>
            </FGx>
            <FGx id={'4'} colx={4} bgColor={'green'} global>
                <Piston/>
            </FGx>
            <FGx id={'4'} colx={4} bgColor={'green'} global>
                <Piston/>
            </FGx>
        </Row>
        <Row id="form-group-small">
            <FGx id={'6'} colx={6} bgColor={'orange'} global>
                <Piston/>
            </FGx>
            <FGx id={'6'} colx={6} bgColor={'orange'} global>
                <Piston/>
            </FGx>
            <FGx id={'6'} colx={6} bgColor={'orange'} global>
                <Piston/>
            </FGx>
            <FGx id={'6'} colx={6} bgColor={'orange'} global>
                <Piston/>
            </FGx>
            <FGx id={'6'} colx={6} bgColor={'orange'} global>
                <Piston/>
            </FGx>
            <FGx id={'6'} colx={6} bgColor={'orange'} global>
                <Piston/>
            </FGx>
        </Row>
        <Row id="form-group-xsmall">
            <FGx id={'121'} colx={12} bgColor={'blue'} global>
                <Piston/>
            </FGx>
            <FGx id={'122'} colx={12} bgColor={'blue'} global>
                <Piston/>
            </FGx>
            <FGx id={'123'} colx={12} bgColor={'blue'} global>
                <Piston/>
            </FGx>
            <FGx id={'124'} colx={12} bgColor={'blue'} global>
                <Piston/>
            </FGx>
            <FGx id={'125'} colx={12} bgColor={'blue'} global>
                <Piston/>
            </FGx>
            <FGx id={'126'} colx={12} bgColor={'blue'} global>
                <Piston/>
            </FGx>
            <FGx id={'127'} colx={12} bgColor={'blue'} global>
                <Piston/>
            </FGx>
            <FGx id={'128'} colx={12} bgColor={'blue'} global>
                <Piston/>
            </FGx>
            <FGx id={'129'} colx={12} bgColor={'blue'} global>
                <Piston/>
            </FGx>
            <FGx id={'1210'} colx={12} bgColor={'blue'} global>
                <Piston/>
            </FGx>
            <FGx id={'1211'} colx={12} bgColor={'blue'} global>
                <Piston/>
            </FGx>
            <FGx id={'1212'} colx={12} bgColor={'blue'} global>
                <Piston/>
            </FGx>
        </Row>
        <Row id="form-groups">
            <FormGroup id={"Tower"} bgColor={"#79f"} bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                
            </FormGroup>
        </Row>
    </div>
}
