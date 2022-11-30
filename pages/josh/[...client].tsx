import React, { useState, useEffect } from 'react'
import Head from "next/head";
import Script from 'next/script';
import { Button, Card, Col, Container, Form, NavLink, Row, Nav, Navbar } from "react-bootstrap";
import { useRouter } from 'next/router';

/**CSS module *//not working//*/I did it wrong
//import Landscape from './components/layout';

/**Custom Components */
import jsObjs from '../../components/ll/jsobjs';
import ClientInfoCard, { useClient, useInit } from '../../components/ll/client_info_card';
//import { NavBarSelect } from '../../components/ll/navigation/navigaton';
const jsObj = jsObjs();

/**GLOBALS *//does not work//**
export async function getStaticPaths() {
    /*const res = await fetch('https://aspectbridge.com/josh/staticpaths.json')
    const posts = await res.json()
    const paths = posts.map((post) => ({
        params: { id: post.id },
    }))*
    return {
        paths: [
          {params: { client: ['dashboard'], word: 'Obru' }},
          {params: { client: ['ashmore'] }},
          {params: { client: ['ashmore', 'yards'] }},
        ],
        fallback: false
    }
}
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://aspectbridge.com/josh/${params.client}`)
    const post = await res.json()
  
    // Pass post data to the page via props
    return {
        props: { post },
        // Re-generate the post at most once per second
        // if a request comes in
        revalidate: 1,
      }
  }*/

/**
 * This is the Primary function of the web site. All dunamic rendering is processed here
 * 
 * @returns This web site
 */
export default function Clients() {
    //{path: path,data: data}
    const i = useInit()
    //noReact();
    return <>
        <Headers />
        <Container className={'logan'}>
            <Row id="header">
                <ContainerHeader />
            </Row>
            <Row id="" className={"h80"}>
                <NavLeftDefault />
                <ClientInfoCard />
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
function NavLeftDefault(){  
    const [a, setA] = useState('false')
    const i = useInit()
    useEffect(()=>{
        if(i){
            setA('true')
        } return setA('false')
    }, [i])
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
 
 * 
 * @returns Client Info Box
 */

function noReact(client) {
    const router = useRouter();
    useEffect(() => {
        if(client || (client == 'noreact'))
            router.push('localhost:3000/public/josh/index.html')
    });
}