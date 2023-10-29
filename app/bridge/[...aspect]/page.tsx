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
import CodeNotes from '../../../lib/util/-codenotes-';
import { Position, useMousePosition } from '../../../components/mouse';
import Navi, { useProphet } from '../../../components/navi';
import ColorPicker, { useColors } from '../../../lib/util/-colorpicker-';

interface pageProps{params: {aspect: string[]}, searchParams}

/**
 * ENTRY POINT
 * @param param0 
 * @returns 
 */
const Page: FC<pageProps> = ({params, searchParams})=>{
    const router = useRouter()
    const {aspect} = params
	const user = useUser()
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
    return <AspectBridge {...{user, currentUsername, aspect}}/>
}
export default Page

/**
 * PAGE CONTENT
 * @param props 
 * @returns 
 */
function AspectBridge(props){
	const {user, aspect} = props
    const [colors, setColors] = useColors(1)
    const [colorz, setColorz] = useColors(1)

    const prophet = useProphet()
    //const mouse = useMousePosition('navi', (e: Event, mousepos: Position)=>{prophet.setNavipos({left: mousepos.left-50, top: mousepos.top-50})})

    function Anchors(){
        return <Row style={{textAlign: 'center'}}>
                    <Col>
                        <Link href={'/bridge/profile'}><button>Profile</button></Link>
                        <Link href={'/bridge/frameworks'}><button>Frameworks</button></Link>
                        <Link href={'/bridge/games'}><button>Games</button></Link>
                        <Link href={'/bridge/chat'}><button>Chat</button></Link>
                        <Link href={'/bridge/tips'}><button>Tips</button></Link>
                    </Col>
            </Row>
    }
    const swtc = ()=>{switch(aspect[0]){
        case 'about':
            return <>
                    <h4>Aspect Bridge</h4>
                    <p>Aspect Bridge is a platform for experimentation with ideas and design principals.</p>
                    <p>Aspect Bridge is a collection of projects and fragments that are not intrensicly related.</p>
                    <p>Aspect Bridge is a place to explore the possibilities of the web.</p>
                </>
        case 'profile':
            return <UserMenu user={user} homepage={'bridge'}/>
        case 'frameworks':
            return <Row>
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
        case 'tips':
            return <CodeNotes/>
        case 'games':
            return <Row>
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
                        <Col xs={12} sm={12} md={6}>
                            <h4>Chess</h4>
                            <p>This speaks for itself.</p>
                            <Link href={'/projects/chess'}>Chess</Link><br/>
                            <img src={'/assets/chess.png'} style={{width: '100%'}}/>
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <h4>Pistons</h4>
                            <p>This speaks for itself.</p>
                            <Link href={'/pistons'}>Chess</Link><br/>
                            <img src={'/assets/pistons.png'} style={{width: '100%'}}/>
                        </Col>
                    </Row>
        case 'chat':
            return <div style={{
                        backgroundImage: 'linear-gradient(to bottom, #777, #fff)' , maxHeight: '40vh'
                    }}>
                    <Chat user={user} homepage={'bridge'} ip={null}/>
                </div>
        default:
            return <>
                    <h4>Disclaimer:</h4>
                    <p>This site is a collection of projects and fragments that are not intrensicly related. The purpose of this site is experimentation with ideas and design principals.</p>
                </>
    }}

    return <div id={'navi'}>
        <Row id={aspect[0]} className={'justify-content-md-center'} style={{position: 'relative'}}>
            
            <Col xs={12} style={{backgroundColor: colors[0] || 'grey', transition: 'background-color 1s eas-in-out'}}>
                <ColorPicker id={'headercolor'} username={user?.username || props.currentUsername} colors={colors} setColors={setColors}>
                    <Anchors/>
                </ColorPicker>
            </Col>

            <Col xs={12} style={{backgroundColor: colorz[0] || 'white', transition: 'background-color 1s linear'}}>
                <ColorPicker id={'headercolorz'} username={user?.username || props.currentUsername} colors={colorz} setColors={setColorz}>
                    {swtc()}
                </ColorPicker>
            </Col>

        </Row>
        
        {//<Navi {...{prophet, mouseClickPos: mouse.clickpos, message: 'this is a message'}}/>
}
        </div>
}