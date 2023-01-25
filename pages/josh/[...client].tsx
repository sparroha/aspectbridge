import React, { useState, useEffect, useMemo } from 'react'
import Head from "next/head";
import Script from 'next/script';
import requestIp from 'request-ip';
import { Button, Card, Col, Container, Form, NavLink, Row, Nav, Navbar } from "react-bootstrap";

/**CSS module *//not working//*/I did it wrong
//import Landscape from './components/layout';

/**Custom Components */
import jsObjs from '../../components/ll/jsobjs';
import ClientInfoCard, { useInit } from '../../components/ll/client_info_card';
import SimpleNav from '../../components/simplenav';
import { GetServerSideProps } from 'next';
import { ProfileByIp } from '../login/[userlogin]';
//import { NavBarSelect } from '../../components/ll/navigation/navigaton';

//const i = {path: {dir: '', sub : '', nest: ''}, data: {info: [], nav: [], subnav: []}}
const jsObj = jsObjs();
/**
 * This is the Primary function of the web site. All dunamic rendering is processed here
 * 
 * @returns This web site
 */
export default function Clients({ip}) {

    const [user, setUser] = useState(null)
    //const i = {path: {dir: '', sub : '', nest: ''}, data: {info: <></>, nav: <></>, subnav: <></>}}
    const pageInfo = useInit()
    return <>
        <ProfileByIp ip={ip} setUser={setUser}/>
        <Headers />
        <Container className={'logan'}>
            <Row id="header" className={'tcenter'}>
                <ContainerHeader />
            </Row>
            <Row id="">
                <NavLeftDefault user={user}/>
                <ClientInfoCard {...pageInfo}/>
            </Row>
            <Row id="footer">
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
function ContainerHeader(i){
    return <Col sm={12}>
                {jsObj.card.header}
            </Col>
}

/**
 * This is the left side navigation meue
 * Note: we maybe could make variations of this function for alternate uses
 * 
 * @returns Client Navs
 */
function NavLeftDefault({user}){
    const i = useInit();
    return <Col md={2} id="nav-client">
                {i.data.nav}
                <SimpleNav {...{root: "josh", title: "dashboard", links: [], args: '?'}}/>
                <SimpleNav {...{root: "login", title: user?'logout '+user.username:"login", links: [], args: "?homepage=josh"}}/>
            </Col>
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const ip = await requestIp.getClientIp(context.req)
    return {props: {ip: ip}} 
}