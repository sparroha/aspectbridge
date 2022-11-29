import React, { useState, useEffect } from 'react'
import Head from "next/head";
import Script from 'next/script';
import { Button, Card, Col, Container, Form, NavLink, Row, Nav, Navbar } from "react-bootstrap";
import { useRouter } from 'next/router';

/**CSS module *//not working/
//import Landscape from './components/layout';

/**Custom Components */
import jsObjs from '../../components/jsobjs';
import ClientInfoCard from '../../components/ll/client_info_card';
const jsObj = jsObjs();
/**
 * This is the Primary function of the web site. All dunamic rendering is processed here
 * 
 * @returns This web site
 */
export default function Clients() {
    //noReact();
    return <>
        <Headers />
        <Container className={'logan h100'}>
            <ContainerHeader />
            <Row id="" className={"h70"}>
                <NavLeftDefault />
                <ClientInfoCard />
            </Row>
            <Row id="footer" className={"h10"}>
                <Col sm={4} >
                    {jsObj.card.contact}
                </Col>
                <Col sm={4} >
                    {jsObj.card.about}
                </Col>
                <Col sm={4} >
                    {jsObj.card.news}
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
                    {jsObj.card.header}
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
    return <Col md={2} id="nav-client">
            {jsObj.card.navcards.ashmore}
            {jsObj.card.navcards.mowing}
            {jsObj.card.navcards.mowing}
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

function noReact() {
    const router = useRouter();
    const { client } = router.query
    useEffect(() => {
        if(client || (client == 'noreact'))
            router.push('localhost:3000/public/josh/index.html')
    });
}