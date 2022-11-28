import React, { useState, useEffect } from 'react'
import Head from "next/head";
import Script from 'next/script';
import {Button, Card, Col, Container, Form, NavLink, Row, Nav, Navbar} from "react-bootstrap";
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavIndex from '../components/nav';

/**CSS module *//not working/

/**Custom Components */


/**/
const componentObject = {
    navcards: {
        mowing: 
            <Card className={'img-grey-back'}>
                <Card.Body>
                    <Card.Title className={'img-banner'}>Mowing</Card.Title>
                    <hr />
                    <Card.Text>
                        {buttons.a.mowing.yards}
                        {buttons.a.mowing.trimming}
                        {buttons.a.mowing.hardees}
                    </Card.Text>
                </Card.Body>
            </Card>
        ,ashmore: 
            <Card className={'img-grey-back'}>
                <Card.Body>
                    <Card.Title className={'img-banner'}>{buttons.a.ashmore}</Card.Title>
                    <hr />
                    <Card.Text>
                        {buttons.a.mowing.yards}
                        {buttons.a.mowing.trimming}
                        {buttons.a.mowing.hardees}
                    </Card.Text>
                </Card.Body>
            </Card>
    }
    ,clientDynamic:
        <Card className={'img-terrace'}>
            <Card.Body>
                <Card.Title className={'img-banner'}>Unknown</Card.Title>
                <hr />
                <Card.Text>
                    
                </Card.Text>
                <hr />
            </Card.Body>
        </Card>
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
            </Row>
            <Row id="footer" className={"h10"}>
                <Col sm={4} >
                    .contact.
                </Col>
                <Col sm={4} >
                    .about.
                </Col>
                <Col sm={4} >
                    .news.
                </Col>
            </Row>
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
                    .header.
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
    return <Col md={2} id="nav-side">
            <NavIndex />
            </Col>
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
        switch(aspect){
            case 'q': {
                if(bridge){
                    switch(bridge){
                        case 'q': return <></>
                        default: return <></>
                    }
                }
            }
            case 'dashboard': return <></>
            case 'dashboard': return <></>
            default: return <></>
        }
    }
    return <Col md={10} id="content">
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