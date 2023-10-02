'use client'
import { useReducer, useState, useEffect, createContext, useContext } from 'react'
import { Button, Col, Form, Row } from "react-bootstrap";
import useUser from '../../lib/util/^user';
import Link from 'next/link';
import { BuildRaft, BuildShip, ChiselSlabs, Choice_experimental as Choice, ChopWood, DigClay, FireBricks, Fish, InfoHeader, MineOre, Portal, QuaryStone, Sail, SawLumber, ScribeTablet, ScriptDirectory, SmeltMetal, FormGroup, ContentPanel, InfoPanel, ChatPanel, InterfacePanel, DisplayGroup } from './forms';
import { initialState, useVerseContext } from './provider';
import { useUserSave } from '../../lib/util/^userSave';
//----------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------
export default function Go(p){
    /**CONSTANTS**/
    const {state, dispatch} = useVerseContext()//138 lines
    const user = useUser()//22
    const [saveLoad, loadSave, userLoaded] = useUserSave('verse', user?.username, state, dispatch)//40 lines
    
    const [autoSaveInterval, setAutoSaveInterval] = useState(10)
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------
    /**AUTO SAVE LOOP*/
    //auto save every n seconds
    useEffect(()=>{
        if(!user) return
        if(!userLoaded) return
        console.log('saveLoopReloaded')
        const saveInterval = setInterval(()=>{
            if(!user) return
            if(!userLoaded) return
            if(state == initialState) return//untested. looking for save reset error.
            //console.log('saveAttempted')
            console.log('save interval', autoSaveInterval)
            saveLoad()
        }, autoSaveInterval*1000)
        return ()=>{
            console.log('saveLoopUnloaded')
            clearInterval(saveInterval)
        }
    },[user, userLoaded, state, autoSaveInterval])
    //----------------------------------------------------------------------------------------------------------------------------------
    //game incriment loop
    useEffect(()=>{
        if(!user) return
        if(!userLoaded) return
        console.log('gameLoopReloaded')
        if(!state?.helpers) return
        const gameInterval = setInterval(()=>{
            if(!user) return
            if(!userLoaded) return
            if(state == initialState) return//untested. looking for save reset error.
            //console.log('gameLoopAttempted')
            dispatch({type: 'loop'})
        }, 2000)
        return ()=>{
            console.log('gameLoopUnloaded')
            clearInterval(gameInterval)
        }
    },[user, userLoaded, state])
    //----------------------------------------------------------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------------------------------------------------------
    /**
     * APP RENDER
     */
    if(!userLoaded)return <div style={{marginTop: '40px'}}><Button onClick={loadSave}>Load User Data</Button></div>
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
            <Col xs={12} sm={6} md={3} lg={2}><Link href={'https://writtenrealms.com/game'}>Written Realms</Link></Col>
            <Col xs={12} sm={6} md={3} lg={2}><Link href={'https://www.materiamagica.com'}>Materia Magica</Link></Col>
            <Col xs={12} sm={6} md={3} lg={2}><Link href={'/registry/on_the_go:'+user?.username+'?id=true&name=true&data=true'}>{user?.username}'s raw data'</Link></Col>
        </InfoHeader></Row>
        {/*<Row><InfoHeader id="inventory_resources" bgColor={'#aaa'}>
            {['Resources', 'stone', 'wood', 'ore', 'clay', 'fish'].map((item, i)=>{
                return <Col key={i} xs={4} sm={3} md={2} lg={1} style={{textAlign: 'center'}}>
                    {(item=='Resources' || item=='Materials')?item:
                            <>{item}<br/>{state[item.toLowerCase()]}</>}
                </Col>
            })}
        </InfoHeader></Row>
        <Row><InfoHeader id="inventory_materials" bgColor={'#777'}>
            {['Materials', 'tile', 'lumber', 'metal', 'brick'].map((item, i)=>{
                return <Col key={i} xs={4} sm={3} md={2} lg={1} style={{textAlign: 'center'}}>
                    {(item=='Resources' || item=='Materials')?item:
                            <>{item}<br/>{state[item.toLowerCase()]}</>}
                </Col>
            })} 
        </InfoHeader></Row>*/}
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
                <InterfacePanel/>
                <InfoPanel/>
            </FormGroup>
        </Row>
        <Row id="form-groups">
            <FormGroup id={"Aurical"} bgGradient={'radial-gradient(#fff, #fff 50%, #90a0f088 52%, #90a0f088 60%, #00000000 70%)'} bgAlt={'NGC 1433'}>
                <Choice/>
            </FormGroup>
            <FormGroup id={"Mine"} bgColor={"#aa7"} bgAlt={'Gold Mine'} helper bgImage={'https://www.automation.com/getmedia/f4d4cca4-3167-4426-803a-de780ccefab9/Gold-mine-feature-July-29-2021-web.png?width=500&height=313&ext=.png'}>
                <MineOre/>
                <SmeltMetal/>
            </FormGroup>
            <FormGroup id={"Quary"} bgColor={"grey"} bgAlt={'Colonial Marble & Granite'} helper bgImage={'https://www.colonialmarble.net/wp-content/uploads/2021/08/shutterstock_523267222.jpg'}>
                <QuaryStone/>
                <ChiselSlabs/>
            </FormGroup>
            <FormGroup id={"Forest"} bgColor={"green"} bgAlt={'Deposit Photos copyright'} helper bgImage={'https://st4.depositphotos.com/11328482/31492/i/450/depositphotos_314925876-stock-photo-summer-green-fir-forest-landscape.jpg'}>
                <ChopWood/>
                <SawLumber/>
                <BuildRaft/>
            </FormGroup>
            <FormGroup id={"River"} bgColor={"blue"} bgAlt={'River'} helper bgImage={'https://static.toiimg.com/photo/msid-101267463,width-96,height-65.cms'}>
                <Sail/>
                <Fish/>
                <DigClay/>
                <FireBricks/>
            </FormGroup>
            <FormGroup id={"Port"} bgColor={"blue"} bgAlt={'Harbor'} helper bgImage={'https://i.ytimg.com/vi/ZznX01ViFTc/maxresdefault.jpg'}>
                <Sail/>
                <Fish/>
            </FormGroup>
            <FormGroup id={"Shipyard"} bgColor={"blue"} bgAlt={'Shipyard'} bgImage={'https://thebridgebk.com/wp-content/uploads/2018/02/20170512-Z74A1290-2-e1519352429367.jpg'}>
                <BuildShip/>
            </FormGroup>
            <FormGroup id={"Library"} bgColor={"#79f"} bgAlt={'Library'} helper bgImage={'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=700'}>
                <ScribeTablet/>
            </FormGroup>
            <FormGroup id={"Scripts"} bgColor={"#79f"} bgAlt={'Library'} bgImage={'https://i.insider.com/5720d775dd0895167d8b468b?width=700'}>
                <ScriptDirectory/>
            </FormGroup>
            <FormGroup id={"Tower"} bgColor={"#79f"} bgAlt={'NGC 1433'} bgImage={'https://stsci-opo.org/STScI-01GS6A1YR1W0CXGTPG0VX1FTZA.png'}>
                <Portal/>
            </FormGroup>
        </Row>
    </div>
}
