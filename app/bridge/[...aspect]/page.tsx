'use client'
import React, { useState, useEffect, Dispatch, useMemo, SetStateAction, FC } from 'react'
import Head from "next/head";
import Script from 'next/script';
import {Button, Card, Col, Container, Form, NavLink, Row, Nav, Navbar} from "react-bootstrap";
import { useRouter } from 'next/navigation';
import NavIndex from '../nav';
import navComponentObject from '../navigaton';
//import Calendar from 'react-calendar';
import 'components/calendar.module.css';
import 'react-calendar/dist/Calendar.css';
import SimpleNav from '../../../components/simplenav';
import DiceWidget, { diceInitProps, useDiceRoll } from '../../../components/dice';
import TLiterator from '../../../components/hebrew';
import Clock from '../../../components/clock';
import Chat from '../../../pages/chat';
import UserMenu from '../usermenu';
import UserProfile from '../../userprofile';
import useUsers from '../../../lib/util/^users';
import { ActiveUser, User } from '../../../pages/login/[userlogin]';



/**CSS module *//not working/
//TODO is working

/**Custom Components */


/*THERE'S A BETTER WAY THAN THIS*/
const componentObject = navComponentObject()

interface pageProps{params: {aspect: string[]}}
/**
 * This is the Primary function of the web site. All dunamic rendering is processed here
 * 
 * @returns This web site
 */
const page: FC<pageProps> = ({params})=>{
    const router = useRouter()
    const {aspect} = params
	const users = useUsers()
    const currentUsername = useMemo(()=>users?.user?.username || 'guest',[users.user])

    useEffect(() => { 
        if(!users.user) return
        if(currentUsername != aspect[0]){
          router.push(`/bridge/${currentUsername}${aspect.length>1?'/'+aspect[1]:''}${aspect.length>2?'/'+aspect[2]:''}`)
        }
    },[users.user])
    return <>
        {aspect.map((a,i)=><p key={i} style={{color: 'white', float: 'left', margin: '2px'}}>{a}</p>)}<br/>
        <hr style={{border: '1px solid white'}}/>
        <UserProfile />
        <AspectBridge {...users}/>
    </>
}
export default page
function AspectBridge(props){
	const {ip, user, activeUsers} = props
    return <>
        <Headers />
        <Container className={'aspect'}>
            <ContainerHeader user={user?user:null}/>
            <Row id="content" className={""}>
                <NavLeftDefault />
                <Col xs={12} sm={9} md={8} style={{background: 'white'}}>
                    <UserMenu user={user} homepage={'bridge'}/>
                </Col>
                {//<DynamicInfo user={user} aspect={user?.username}/>
                }
                <NavRightDefault user={user}/>
            </Row>
            <Row className={'justify-content-md-center'}>
                {//<Col sm={5}><CalendarTab /></Col>
                }
                <NavRightDefault />
                <Col xs={12} sm={12} md={8} style={{background: '#eee'}}>Bridge Chat:<br/><Chat user={user} homepage={'bridge'} ip={ip} /></Col>
                <NavRightDefault activeUsers={activeUsers}/>
            </Row>
            {//<Footer />
            }
        </Container>
    </>
}
function CalendarTab(){
    const [date, setDate] = useState(new Date());

    return (
        <div className='calendar grey-back' style={{borderRadius: '15px'}}>
            <h1 className='text-center'>React Calendar</h1>
            <div className='calendar-container'>
                {//<Calendar onChange={setDate} value={date} />
                }
            </div>
            <p className='text-center'>
                <span className='bold'>Selected Date:</span>{' '}
                {date.toDateString()}
            </p>
        </div>
    );
}

/**
 * The Head section contains all the complicated important stuff.
 * The brains if you will.
 * 
 * @returns <Head>{els}</Head>
 */
function Headers(){
    return <Head>
                <title>Aspect Bridge</title>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="keywords" content="" />
                <meta name="description" content="Building bridges of understanding" />
                <link rel="shortcut icon" href="assets/binary2.png" type="image/x-icon" />
                <Script src="js/script.js"></Script>
                <Script src="js/hebrew.js"></Script>
            </Head>
}

/**
 * This is an optional segment that simply contains the top main bar
 * 
 * @returns Title bar and Navbar
 */
function ContainerHeader({ user }){
    return <Row id='header' className={"well-sm tcenter"}>
                <Col sm={12} className='tcenter navy_back title logo'>
                    <h1>Aspect Bridge</h1>
                    {<NavIndex user={user} root={"bridge"}/>
                    }
                </Col>
            </Row>
}

/**
 * This is the left side navigation meue
 * Note: we maybe could make variations of this function for alternate uses
 * 
 * @returns Client Navs
 */
function NavLeftDefault(){  
    const dip: diceInitProps = {
        sides: 6,
        speed: 5
    }
    return <Col xs={12} sm={3} md={2} id="nav-left" className={"p0 'w100 h100'"}>
                <Row className={'w100 h100'} style={{position: 'relative'}}>
                    <Col xs={12} sm={12} style={{zIndex: '5'}}><SimpleNav root={"bridge"} page={"aspect"} links={["air", "fire", "water", "earth"]}/></Col>
                    <Col xs={2} sm={6} md={8} lg={6}><Clock /></Col>
                    <Col xs={12} sm={12} md={12} style={{zIndex: '5'}}><DiceWidget udr={()=> useDiceRoll(dip)}/></Col>
                    <div className={'grey-back o4 w100 h100'} style={{position: 'absolute'}}></div>{/**translucent backdrop */}
                </Row>
            </Col>
}
function NavRightDefault({user, activeUsers}: {user?: User, activeUsers?: ActiveUser[]}){  
    const [hide, setHide] = useState('hidden')
    return <Col xs={0} sm={0} md={2} id="nav-right" className={"p0"}>
                {user?<Row className={'w100 h100'} style={{visibility: 'visible', position: 'relative', zIndex: '5', color: 'white'}}>{/**this error is invalid. visibility still works */}
                    <Col style={{zIndex: '5'}}>
                        Username: {user?.username} <br />
                        Access: {user?.access} <br />
                        Message: {user?.message} <br />
                    </Col>
                    <div className={"grey-back o4 w100 h100"} style={{position: 'absolute'}}></div>{/**translucent backdrop */}
                </Row>:null}
                {activeUsers?<Row>
                    {activeUsers?.map((user, i)=>{
                        return <div key={i} style={{color: 'white'}}>{user.name}{' (active '}{Math.floor((new Date().getTime()-new Date(user.time).getTime())/60000)}{' m ago)'}</div>
                    })}
                </Row>:null}
            </Col>
}
function Footer(){
    return <Row id="footer" className={""}>
                <Col xs={6} sm={4} md={3} style={{position: 'relative'}}>
                    <Card className={'gray-back'}>
                        <Card.Body>
                            <Card.Title className={'img-banner'}>Contact Us</Card.Title>
                            <hr />
                            <Card.Text>Somehow</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} sm={4} md={6} style={{position: 'relative'}}>
                    <Card className={'gray-back'}>
                        <Card.Body>
                            <Card.Title className={'img-banner'}>About...Upon</Card.Title>
                            <hr />
                            <Card.Text>
                                Building bridges of understanding.<br />
                                More has remained mystery than has ever been concieved of by mind.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={4} md={3} style={{position: 'relative'}}>
                    <Card className={'gray-back'}>
                        <Card.Body>
                            <Card.Title className={'img-banner'}>News</Card.Title>
                            <hr />
                            <Card.Text>"Lorem ipsum dolor sit amet,</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
}

/**
 * This is where all the magic happens.
 * Observe...
 * 
 * This section between the <Card.Text> tags chooses what Page loads determined by the url
 * 
 * @returns DynamicInfo
 */
function DynamicInfo({aspect, user}){
    //const router = useRouter()
    //const { aspect } = router.query //query url props
    const [bridge, setBridge] = useState(<></>)
    //these 3 are redundant useage because they are contained within args(props).query
    const [dir, setDir] = useState('')
    const [sub, setSub] = useState('')
    const [nest, setNest] = useState('')
    function handleBridgePassage(){
        if(aspect){
            let dir = (aspect.length>1?aspect[0]:aspect).toString() //"/:dir/:sub/:nest"
            let sub = (aspect.length>1?aspect[1]:'').toString()
            let nest = (aspect.length>2?aspect[2]:'').toString()
            setDir(dir) 
            setSub(sub)
            setNest(nest)            
            switch(dir){
                case 'login': setBridge(<></>)
                break;
                case 'q': {
                    switch(sub){
                        case 'q': setBridge(<>QQ</>)
                        break;
                        default: setBridge(<>Q not Q</>)
                        break;
                    }
                } break;
                default: {setBridge(<Placeholder user={user}/>)}
                break;
            }//console.log('Client: '+dir+'|'+(aspect.length>1?aspect[0]:aspect)+' ./. Subdomain: '+sub+'|'+(aspect.length>1?aspect[1]:aspect))
        }
    }
    useEffect(() => {
        handleBridgePassage()
        return handleBridgePassage()
    }, [aspect])
    return <Col xs={12} sm={6} md={8} id='home' className={"white-back scroll"}>
                <h3 className={'img-banner'}>{user?user.username:'No user'}</h3>
                User Notification: {user?user.message:'No message'}
                <hr />
                {bridge/**page content */}
                <Row><Col md={4}></Col><Col sm={12} md={4}><TLiterator /></Col><Col md={4}></Col></Row>
            </Col>
}
function Placeholder({user}){
    return <Row className={""}>
            <Col md={12} className={"tcenter black-font"}>
                <p>14. The race of the dwarfs | in Dvalin's throng</p>
                <p>Down to Lofar | the list must I tell;</p>
                <p>The rocks they left, | and through wet lands</p>
                <p>They sought a home | in the fields of sand.</p>
            </Col>
            <Col md={12} className={"tcenter black-font"}>
                <h3>Eye, Theou, Soul</h3>
                <p>Egh: "I" live for 'Your' breath is in "me"</p>
                <p>Tuh: "You" breathe life into 'me'</p>
                <p>Swe: "Self" is 'Your' breath becoming 'me'</p>
            </Col>
            <Col md={12} className={"tcenter black-font"}>
                <h3>Egg, Two, Schwa</h3>
                <p>Egh: Add 1 egg</p>
                <p>Tuh: Add another egg</p>
                <p>Swe: Stir</p>
            </Col>
        </Row>
}
