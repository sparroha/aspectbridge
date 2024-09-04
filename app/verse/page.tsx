'use client'
import { useState, useRef, useEffect, createContext, useContext } from 'react'
import { Col, Row } from "react-bootstrap";
import useUser from '../../lib/util/^user';
import Link from 'next/link';
import { BuildRaft, BuildShip, ChiselSlabs, 
    Choice_experimental as Choice, ChopWood, 
    DigClay, FireBricks, Fish, InfoHeader, 
    MineOre, Portal, QuaryStone, Sail, 
    SawLumber, ScribeTablet, ScriptDirectory, 
    SmeltMetal, FormGroup, ContentPanel, 
    InfoPanel, ChatPanel, InterfacePanel, 
    DisplayGroup, Beginning, Grid5x5, Grid5x5Info } from './forms';
import { initialState, useVerseContext } from './provider';
import { useUserSave } from '../../lib/util/^userSave';
//----------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------
export default function Go({params, searchParams}){
    /**CONSTANTS**/
    const {state, dispatch} = useVerseContext()//138 lines
    const user = useUser()//22
    
    const dataFun = (data)=>dispatch({type: 'set', payload: data})
    const userFun = (username)=>dispatch({type: 'user', payload: username})
    const [save, loading, load] = useUserSave('verse', /*searchParams.session?searchParams.session:*/user?.username, state, dataFun, userFun)//40 lines
    useEffect(()=>{//If user changes after load
        if(!user)return
        load()
    },[user])
    const [autoSaveInterval, setAutoSaveInterval] = useState(10)
    const loopCounter = useRef(0)
    //----------------------------------------------------------------------------------------------------------------------------------

    //game loop
    useEffect(()=>{
        if(!user) return
        //console.log('gameLoopReloaded')
        if(!state?.helpers) return

        const gameInterval = setInterval(()=>{
            
            if(!user) return
            if(state == initialState) return
            //console.log('gameLoopAttempted')
            //save loop
            if(loopCounter.current>=autoSaveInterval){
                if(loading) return console.log('loading...')
                save()
                loopCounter.current-=autoSaveInterval
                //console.log('saving with interval in seconds', autoSaveInterval)
            }
            if(loopCounter.current%2==0)dispatch({type: 'loop'})
            loopCounter.current++
        }, 1000)

        return ()=>{
            //console.log('gameLoopUnloaded')
            clearInterval(gameInterval)
        }
    },[user, state, autoSaveInterval])
    //----------------------------------------------------------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------------------------------------------------------
    /**
     * APP RENDER
     */
    //if(state && state == initialState) return <>{JSON.stringify({...user, ...state})}</>
    if(!state.user) return <>Initializing User Data...Please log in</>/*<br/>{JSON.stringify(state)}<br/>loading={loading?'true':'false'}*/
    //if(!userLoaded)return <div style={{marginTop: '40px'}}><Button onClick={loadSave}>Load User Data</Button></div>
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
            <FormGroup id={"Aurical"} bgGradient={'radial-gradient(#fff, #fff 50%, #90a0f088 52%, #90a0f088 60%, #00000000 70%)'} bgAlt={'Orb'}>
                <Beginning/>
            </FormGroup>
            <FormGroup id={"Grid"} bgGradient={'radial-gradient(#fff, #fff 50%, #f0a09088 52%, #f0a09088 60%, #00000000 70%)'} bgAlt={'Orb'}>
                <Grid5x5/>
            </FormGroup>
            <FormGroup id={"GridInfo"} bgGradient={'radial-gradient(#fff, #fff 50%, #a0f09088 52%, #a0f09088 60%, #00000000 70%)'} bgAlt={'Orb'}>
                <Grid5x5Info/>
            </FormGroup>
            <FormGroup id={"Mine"} bgColor={"#aa7"} bgAlt={'Gold Mine'} helper bgImage={'https://www.automation.com/getmedia/f4d4cca4-3167-4426-803a-de780ccefab9/Gold-mine-feature-July-29-2021-web.png?width=500&height=313&ext=.png'}>
                <MineOre/>
                <SmeltMetal/>
            </FormGroup>
            <FormGroup id={"Quary"} bgColor={"grey"} bgAlt={'Colonial Marble & Granite'} helper bgImage={'https://static.ffx.io/images/$zoom_1%2C$multiply_0.373%2C$ratio_1.777778%2C$width_1984%2C$x_16%2C$y_120/t_crop_custom/q_86%2Cf_auto/4f601bf0c6c5d979b084fa373012c26777db276f'}>
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
