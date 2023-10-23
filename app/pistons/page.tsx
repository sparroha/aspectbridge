'use client'
import { useState, useRef, Fragment } from 'react'
import { Col, Row } from "react-bootstrap";
import useUser from '../../lib/util/^user';
import { ContentPanel, InfoPanel, InterfacePanel, 
    DisplayGroup, InfoHeader, Piston, FGx, ChatForm } from './forms';
import { initialState, useDynamicContext } from './provider';
import { useUserSave } from '../../lib/util/^userSave';
import useLoop from '../../lib/util/^loop';
import Grid from './tileset';
//----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------
export default function Go(p){
    /**CONSTANTS**/
    const {state, dispatch} = useDynamicContext()//40+ lines
    const user = useUser()//22 lines
    const [save, useLoad] = useUserSave('pistons', user?.username, state, (data)=>dispatch({type: 'set', payload: data}), (username)=>dispatch({type: 'user', payload: username}))//37 lines
    
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
            <FGx id={"Control"} colx={12} bgColor={"#aa7"} bgAlt={''} bgImage={''} global>
                <InterfacePanel/>
            </FGx>
        </Row>
        <br/>
        <Row id="piston-group">
            <FGx id={'piston'} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Piston/>
            </FGx>
            {
                state.piston?.count && [...Array(state.piston.count)].map((e, i)=>{
                    return <Fragment key={'piston'+i}><FGx id={'piston-'+i} colx={12} bgColor={'blue'} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                        <Piston power={(i+2)*2}/>
                    </FGx></Fragment>
                }) || null
            }
        </Row>
        <Row id="grid-group">
            {/*<FGx id={'piston'} colx={12} bgColor={'blue'} style={{width: (20*50)+'px'}} global bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Grid/>
        </FGx>*/}
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
