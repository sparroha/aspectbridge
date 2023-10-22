'use client'
import { useState, useRef } from 'react'
import { Col, Row } from "react-bootstrap";
import useUser from '../../lib/util/^user';
import { ContentPanel, InfoPanel, InterfacePanel, 
    DisplayGroup, InfoHeader, Piston, FGx, ChatForm } from './forms';
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
        <Row id="display-group" style={{justifyContent: 'center'}}>
            <DisplayGroup id={"Display"} bgColor={"#aa7"} bgImage={''}>
                <ContentPanel/>
                <InfoPanel/>
            </DisplayGroup>
        </Row>
        <Row id="control-group" style={{justifyContent: 'center'}}>
            <FGx id={"Control"} colx={1} bgColor={"#aa7"} bgAlt={''} bgImage={''} global>
                <InterfacePanel/>
                <InfoPanel/>
            </FGx>
        </Row>
        <br/>
        <Row id="form-group-large" style={{justifyContent: 'center'}}>
            <FGx id={'id'} colx={1} bgColor={'#777'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'id'} colx={2} bgColor={'purple'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'id'} colx={2} bgColor={'purple'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
        </Row>
        <Row id="form-group-medium">
            <FGx id={'3'} colx={3} bgColor={'red'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'3'} colx={3} bgColor={'red'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'3'} colx={3} bgColor={'red'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'4'} colx={4} bgColor={'green'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'4'} colx={4} bgColor={'green'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'4'} colx={4} bgColor={'green'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'4'} colx={4} bgColor={'green'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
        </Row>
        <Row id="form-group-small">
            <FGx id={'6'} colx={6} bgColor={'orange'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'6'} colx={6} bgColor={'orange'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'6'} colx={6} bgColor={'orange'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'6'} colx={6} bgColor={'orange'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'6'} colx={6} bgColor={'orange'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'6'} colx={6} bgColor={'orange'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
        </Row>
        <Row id="form-group-xsmall">
            <FGx id={'121'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'122'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'123'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'124'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'125'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'126'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'127'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'128'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'129'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'1210'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'1211'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            <FGx id={'1212'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
        </Row>
        <br/>
        <Row id="footer-group">
            <FGx id={"Control"} colx={2} bgColor={"blue"} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <ChatForm user={user}/>
            </FGx>
            <FGx id={"Control"} colx={2} bgColor={"red"} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                
            </FGx>
        </Row>
    </div>
}
