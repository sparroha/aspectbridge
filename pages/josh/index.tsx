import React, { useState, useEffect } from 'react'
import NavIndex from './navigation/nav';
import NavClient from './navigation/nav_client';
import Head from "next/head";
import Script from 'next/script';
import {Button, Card, Col, Container, Form, NavLink, Row, Nav, Navbar} from "react-bootstrap";
import jsObjs from './jsobjs';

var jsobj = jsObjs();
var activePage = "Home";
export default function Main() {
    function getSetPage(page: String){
        useEffect(() => {
            
        })
    }
    return <>
        <Head>
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
        <Container className={'logan h100'}>
            <Row id='header' className={"h20"}>
                <Col sm={12}>
                    {jsobj.card.header}
                </Col>
            </Row>
            <Row id="content" className={"h70"}>
                {jsobj.page.home.html}
            </Row>
            <Row id="footer" className={"h10"}>
                <Col sm={4} >
                    {jsobj.card.contact}
                </Col>
                <Col sm={4} >
                    {jsobj.card.about}
                </Col>
                <Col sm={4} >
                    {jsobj.card.news}
                </Col>
            </Row>
        </Container>
    </>
}

