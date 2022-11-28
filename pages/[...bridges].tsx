import React, { useState, useEffect } from 'react'
import Head from "next/head";
import Script from 'next/script';
import {Button, Card, Col, Container, Form, NavLink, Row, Nav, Navbar} from "react-bootstrap";
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavIndex from '../components/nav';

/**CSS module *//not working/

/**Custom Components */


/*THERE'S A BETTER WAY THAN THIS*/
const componentObject = {
    navcards: {
        aspects: 
            <Card className={'img-grey-back'}>
                <Card.Body>
                    <Card.Title className={'img-banner'}>
                        <Link href='/aspects'>Aspects</Link>
                    </Card.Title>
                    <hr />
                    <Card.Text>
                        <Link href='/air'>Aspect of Air</Link>
                        <Link href='/fire'>Aspect of Fire</Link>
                        <Link href='/water'>Aspect of Water</Link>
                        <Link href='/earth'>Aspect of Earth</Link>
                    </Card.Text>
                </Card.Body>
            </Card>,
        air:
            <Card className={'img-grey-back'}>
                <Card.Body>
                    <Card.Title className={'img-banner'}>
                        <Link href='/air'>Air</Link>
                    </Card.Title>
                    <hr />
                    <Card.Text>
                        <Link href='/light'>Aspect of Spirit</Link>
                        <Link href='/spirit'>Aspect of breath</Link>
                        <Link href='/water'>Aspect of wind</Link>
                        <Link href='/earth'>Aspect of wand</Link>
                    </Card.Text>
                </Card.Body>
            </Card>,
    }
}

/**
 * This is the Primary function of the web site. All dunamic rendering is processed here
 * 
 * @returns This web site
 */
export default function Clients() {
    return <>
        <Headers />
        <Container className={'logan h100'}>
            <ContainerHeader />
            <Row id="" className={"h70"}>
                <NavLeftDefault />
                    <DynamicInfo />
                <NavRightDefault />
            </Row>
            <Footer />
        </Container>
    </>
}

/**
 * The Head section contains all the complicated important stuff.
 * The brains if you will.
 * 
 * @returns <Head>{els}</Head>
 */
function Headers(){
    return <Head>
                <title>Sunrise Landscapes</title>
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
function ContainerHeader(){
    return <Row id='header' className={"h20"}>
                <Col sm={12}>
                    <Card className={'img-mgrass'}>
                        <Card.Body>
                            <Card.Title className={'img-banner'}>Aspect Bridge</Card.Title>
                            <hr />
                            <NavIndex />
                        </Card.Body>
                    </Card>
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
    return <Col md={2} id="nav-left">
            {componentObject.navcards.aspects}
            </Col>
}
function NavRightDefault(){  
    return <Col md={2} id="nav-right">
            {componentObject.navcards.air}
            </Col>
}
function Footer(){
    return <Row id="footer" className={"h10"}>
                <Col sm={4} >
                    <Card className={'gray-back'}>
                        <Card.Body>
                            <Card.Title className={'img-banner'}>Contact Us</Card.Title>
                            <hr />
                            <Card.Text>Somehow</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4} >
                    <Card className={'gray-back'}>
                        <Card.Body>
                            <Card.Title className={'img-banner'}>About...Upon</Card.Title>
                            <hr />
                            <Card.Text><p>
                                Crossing lines no one considers crossing, not for lacking morality.<br />
                                More has remained mystery that has ever been concieved of by mind.
                             </p></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4} >
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
 * {() => {switch(client){
 *             case 'ashmore': {
 *                 if(client){
 *                     switch(sub){
 *                         case 'yards': return YardsAshmore();
 *                         case 'trimmings': return TrimmingsAshmore();
 *                         case 'hardees': return HardeesAshmore();
 *                         default: return Ashmore();
 *                     }}}
 *             case 'bill': {return Bill();}
 *             default: {return <></>;}
 *         }}}
 * 
 * @returns Client Info Box
 */
function DynamicInfo(){
    const router = useRouter()
    const { aspect, bridge } = router.query
    function BridgePassage(){
        if(aspect)
        switch(aspect){
            case 'q': {
                if(bridge){
                    switch(bridge){
                        case 'q': return <>QQ</>
                        default: return <></>
                    }
                }
            }
            case 'dashboard': return <></>
            default: return <></>
        }
        return <></>
    }
    return <Col md={8} id="content">
                <Card className={'img-terrace'}>
                    <Card.Body>
                        <Card.Title className={'img-banner'}>{aspect}</Card.Title>
                        <hr />
                        <Card.Text>
                            <BridgePassage />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
}