'use client'
import React, { useEffect, useMemo, FC, useState } from 'react'
import {Col, Row} from "react-bootstrap";
import { useRouter } from 'next/navigation';
import UserMenu from '../usermenu';
import UserProfile from '../../../lib/util/-userprofile-';
import useUser from '../../../lib/util/^user';
import Chat from '../../chat/chat';
import useActiveUsers from '../../../lib/util/^activeusers';
import Link from 'next/link';

interface pageProps{params: {aspect: string[]}, searchParams}

/**
 * ENTRY POINT
 * @param param0 
 * @returns 
 */
const page: FC<pageProps> = ({params, searchParams})=>{
    const router = useRouter()
    const {aspect} = params
	const user = useUser()
	const activeUsers = useActiveUsers(10000)
    const currentUsername = useMemo(()=>user?.username || 'guest',[user])

    useEffect(() => { //too verbose imo
        if(!user) return
        if(currentUsername != aspect[aspect.length-1]){
            let as1 = aspect && aspect[0] != currentUsername ? aspect[0] : null
            as1 = as1!='guest'?as1:null
            let as2 = aspect?.length > 1 && aspect[1] != currentUsername ? aspect[1] : null
            as2 = as2!='guest'?as2:null
            let as3 = aspect?.length > 2 && aspect[2] != currentUsername ? aspect[2] : null
            as3 = as3!='guest'?as3:null
            router.replace(`/bridge/${as1?as1+'/':''}${as2?as2+'/':''}${as3?as3+'/':''}${currentUsername}`)
        }
    },[user])
    return <AspectBridge {...{user, activeUsers, aspect}}/>
}
export default page

/**
 * PAGE CONTENT
 * @param props 
 * @returns 
 */
function AspectBridge(props){
	const {user, activeUsers, aspect} = props
    const [p, setP] = useState(false)
    const [c, setC] = useState(false)
    const [g, setG] = useState(false)
    const [f, setF] = useState(false)
    return <>
        <Row id={'disclaimer'} className={""}>
            <Col xs={12}style={{background: 'white'}}>
                <h4>Disclaimer:</h4>
                <p>This site is a collection of projects and fragments that are not intrensicly related. The purpose of this site is experimentation with ideas and design principals.</p>
            </Col>
        </Row>
        <Row id={'profile_editor'}>
            <Col xs={2}><button onClick={(e)=>setP((p)=>!p)}>Profile</button></Col>
            <Col xs={10}></Col>
            <Col xs={12}style={{background: 'white', position: p?'relative':'absolute', visibility: p?'visible':'collapse'}}>
                <UserMenu user={user} homepage={'bridge'}/>
            </Col>
        </Row>
        {aspect[0] == 'about' && <Row id={'about'} className={'justify-content-md-center'}>
            <Col xs={12} style={{background: 'white'}}>
                <h4>Aspect Bridge</h4>
                <p>Aspect Bridge is a platform for experimentation with ideas and design principals.</p>
                <p>Aspect Bridge is a collection of projects and fragments that are not intrensicly related.</p>
                <p>Aspect Bridge is a place to explore the possibilities of the web.</p>
            </Col>
        </Row>}
        <Row id={'games'}>
            <Col xs={2}><button onClick={(e)=>setG((g)=>!g)}>Games</button></Col>
            <Col xs={10}></Col>
            <Col xs={12}style={{background: 'white', position: g?'relative':'absolute', visibility: g?'visible':'collapse'}}>
                <Row>
                    <Col xs={12} sm={12} md={6}>
                        <h4>Cost: Idle Clicker</h4>
                        <p>This project represents the backbone of any idle clicker game. It is a functional "incremental gain" simulator with prestige. This game could have essence if given a little art.</p>
                        <Link href={'/projects/cost'}>Cost</Link><br/>
                        <img src={'/assets/cost_game.png'} style={{width: '100%'}}/>
                        <br/><br/>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <h4>Verse: Gamified Forms Project</h4>
                        <p>This project utilizes form management as a structural analog to game regions. All new form aspects can be integrated seamlessly into the state manager to expend game content.</p>
                        <p>This project can also be utilized as a web page builder in future implementations.</p>
                        <Link href={'/verse'}>Verse</Link><br/>
                        <img src={'/assets/verse_game.png'} style={{width: '100%'}}/>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <h4>Growth: initial farming sim concept</h4>
                        <p>This project explores progress bars and grid based resource accumulator systems that can be integrated intoohr game platforms.</p>
                        <p>The purpose of this side project is to explore the possibilities of scaleable process ittertion.</p>
                        <Link href={'/growth'}>Growth</Link><br/>
                        <img src={'/assets/growth_game.png'} style={{width: '100%'}}/>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row id={'backend'}>
            <Col xs={2}><button onClick={(e)=>setF((f)=>!f)}>Frameworks</button></Col>
            <Col xs={10}></Col>
            <Col xs={12}style={{background: 'white', position: f?'relative':'absolute', visibility: f?'visible':'collapse'}}>
                <Row>
                    <Col xs={12}>
                        <h4>User Api:</h4>
                        <p>User login is fully implemented accoss all aspectbridge web pages. Accessing user information from any page only requires a simple hook.</p>
                        <code>
                            {"const user = useUser()  //22 code lines incorporated"}<br/>
                        </code>
                    </Col>
                    <Col xs={12}>
                        <h4>Registry Api:</h4>
                        <p>Registry is a proprietary data handling tool. It is siply a way to store state information to a database as a hash map.</p>
                        <p>This is an example implementation. The page name is 'verse'</p>
                        <code>
                            {"const {state, dispatch} = useVerseContext()  //138 code lines incorporated"}<br/>
                            {"const user = useUser()  //22 code lines incorporated"}<br/>
                            {"const [saveLoad, loadSave,] = useUserSave('verse', user?.username, state, (data)=>dispatch({type: 'set', payload: data}))  //40 code lines incorporated"}<br/>
                        </code>
                    </Col>
                </Row>
            </Col> 
        </Row>
        <Row id={'chat'} className={'justify-content-md-center'} style={{maxHeight: '50%'}}>
            <Col xs={2}><button onClick={(e)=>setC((c)=>!c)}>Chat</button></Col>
            <Col xs={10}></Col>
            <Col xs={12} style={{
                    backgroundImage: 'linear-gradient(to bottom, #777, #fff)' , maxHeight: '40vh',
                    position: c?'relative':'absolute', visibility: c?'visible':'collapse'
                }}>
                <Chat user={user} homepage={'bridge'} ip={null}/>
            </Col>
        </Row>
    </>
}