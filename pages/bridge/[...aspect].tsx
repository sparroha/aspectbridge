"use strict";
import React, { useState, useEffect } from 'react'
import Head from "next/head";
import Script from 'next/script';
import {Button, Card, Col, Container, Form, NavLink, Row, Nav, Navbar} from "react-bootstrap";
import { useRouter } from 'next/router';
import NavIndex from '../../components/ab/nav';
import navComponentObject from '../../components/ab/navigaton';
import { GetServerSideProps } from 'next';
import { ActiveUser } from '../login/[userlogin]';
import Calendar from 'react-calendar';
import 'components/calendar.module.css';
import 'react-calendar/dist/Calendar.css';
import SimpleNav from '../../components/simplenav';
import DiceWidget from '../../components/dice';
import TLiterator from '../../components/hebrew';

/**CSS module *//not working/
//TODO is working

/**Custom Components */


/*THERE'S A BETTER WAY THAN THIS*/
const componentObject = navComponentObject()

/**
 * This is the Primary function of the web site. All dunamic rendering is processed here
 * 
 * @returns This web site
 */
export default function AspectBridge(props: ActiveUser) {
    const [email, setEmail] = useState(props.email)
    const [username, setUsername] = useState(props.username)
    const [access, setAccess] = useState(props.access)
    const [message, setMessage] = useState(props.message)
    const router = useRouter()
    if(username){
    useEffect(() => {
        router.push('./'+username)
    }, [username])}
    return <>
        <Headers />
        <Container className={'aspect'}>
            <ContainerHeader username={username} access={access}/>
            <Row id="content" className={""}>
                <NavLeftDefault />
                    <DynamicInfo props={{username: username, access: access, message: message}}/>
                <NavRightDefault props={{username: username, access: access, message: message}}/>
            </Row>
            <Row>
                <CalendarTab />
            </Row>
            <Footer />
        </Container>
    </>
}
function CalendarTab(){
    const [date, setDate] = useState(new Date());

    return (
        <div className='calendar grey-back'>
            <h1 className='text-center'>React Calendar</h1>
            <div className='calendar-container'>
                <Calendar onChange={setDate} value={date} />
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
                <meta name="description" content="" />
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
function ContainerHeader(props: { username: any; access: any; }){
    return <Row id='header' className={"well-sm tcenter"}>
                <Col sm={12} className='tcenter navy_back title logo'>
                    <h1>Aspect Bridge</h1>
                    <NavIndex username={props.username} access={props.access} root={"bridge"}/>
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
    return <Col xs={12} sm={3} md={1} id="nav-left" className={"well-sm p0"} style={{position: 'relative'}}>
                <div className={'w100 h100'} style={{position: 'relative', zIndex: '5'}}>
                    <SimpleNav root={"bridge"} title={"aspects"} links={["air", "fire", "water", "earth"]} args={""}/>
                    <DiceWidget style={{position: 'absolute', zIndex: 10}}/>
                </div>
                <div className={"grey-back o4 w100 h100"} style={{position: 'absolute'}}></div>{/**translucent backdrop */}
            </Col>
}
function NavRightDefault(props){  
    const [hide, setHide] = useState('hidden')
    return <Col xs={12} sm={3} md={1} id="nav-right" className={"well-sm p0"} style={{position: 'relative'}}>
                <div style={{visibility: 'visible', position: 'relative', zIndex: '5'}}>{/**this error is invalid. visibility still works */}
                    Username: {props.props.username} <br />
                    Access: {props.props.access} <br />
                    Message: {props.props.message} <br />
                </div>
                <div className={"grey-back o4 w100 h100"} style={{position: 'absolute'}}></div>{/**translucent backdrop */}
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
                                Crossing lines no one considers crossing, not for lacking morality<br />
                                More has remained mystery that has ever been concieved of by mind.
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
function DynamicInfo(props){
    const router = useRouter()
    const { aspect } = router.query //query url props
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
                default: {setBridge(<Placeholder feed={dir}/>)}
                break;
            }//console.log('Client: '+dir+'|'+(aspect.length>1?aspect[0]:aspect)+' ./. Subdomain: '+sub+'|'+(aspect.length>1?aspect[1]:aspect))
        }
    }
    useEffect(() => {
        handleBridgePassage()
        return handleBridgePassage()
    }, [aspect])
    return <Col xs={12} sm={6} md={10} id='home' className={"well-sm white-back scroll"} style={{position: 'relative'}}>
                <h3 className={'img-banner'}>{props.username}</h3>
                User Notification: {props.props.message}
                <hr />
                {bridge/**page content */}
                <Row><Col sm={4}></Col><Col sm={4}><TLiterator /></Col><Col sm={4}></Col></Row>
            </Col>
}
function Placeholder(props){
    return <Row className={""}>
            <Col md={12} className={"tcenter black-font"}>
                <h1>{props.feed}</h1>
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

export const getServerSideProps: GetServerSideProps<ActiveUser> = async (context) => {
    //TODO: get user data from cookie
    const query = context.query
    const userProps: ActiveUser = {
        username: query.username!=undefined?query.username:null,
        email: query.email!=undefined?query.email:'',
        access: query.access!=undefined?query.access:'0',
        message: query.message!=undefined?query.message:'Do you need to login?',
        homepage: query.aspect!=undefined?query.aspect:""
    }
    return {props: userProps} 
}