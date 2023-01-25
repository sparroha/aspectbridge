import React, { useState, useEffect, useMemo } from 'react'
import Head from "next/head";
import Script from 'next/script';
import { Button, Card, Col, Container, Form, NavLink, Row, Nav, Navbar } from "react-bootstrap";

/**CSS module *//not working//*/I did it wrong
//import Landscape from './components/layout';

/**Custom Components */
import jsObjs from '../../components/ll/jsobjs';
import ClientInfoCard, { useInit } from '../../components/ll/client_info_card';
import SimpleNav from '../../components/simplenav';
import { GetServerSideProps } from 'next';
import { ActiveUser } from '../login/[userlogin]';
//import { NavBarSelect } from '../../components/ll/navigation/navigaton';

//const i = {path: {dir: '', sub : '', nest: ''}, data: {info: [], nav: [], subnav: []}}
const jsObj = jsObjs();
/**
 * This is the Primary function of the web site. All dunamic rendering is processed here
 * 
 * @returns This web site
 */
export default function Clients(props) {
    const [email, setEmail] = useState(props.email)
    const [username, setUsername] = useState(props.username)
    const [access, setAccess] = useState(props.access)
    const [message, setMessage] = useState(props.message)
    //const i = {path: {dir: '', sub : '', nest: ''}, data: {info: <></>, nav: <></>, subnav: <></>}}
    const pageInfo = useInit()
    return <>
        <Headers />
        <Container className={'logan'}>
            <Row id="header" className={'tcenter'}>
                <ContainerHeader />
            </Row>
            <Row id="">
                <NavLeftDefault {...props}/>
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
function NavLeftDefault({username}){
    const i = useInit();
    return <Col md={2} id="nav-client">
                {i.data.nav}
                <SimpleNav {...{root: "josh", title: "dashboard", links: [], args: '?'}}/>
                <SimpleNav {...{root: "login", title: username?username:"login", links: [], args: "?homepage=josh"}}/>
            </Col>
}


export const getServerSideProps: GetServerSideProps<ActiveUser> = async (context) => {
    const userProps: ActiveUser = {
        username: context.query.username?context.query.username.toString():'login',
        email: context.query.email?context.query.email.toString():'',
        access: context.query.access?context.query.access.toString():'0',
        message: context.query.message?context.query.message.toString():'Do you need to login?',
        homepage: context.query.client?context.query.client.toString():"/",
        ip: context.query.ip?context.query.ip.toString():"/"
    }
    return {props: userProps}
}