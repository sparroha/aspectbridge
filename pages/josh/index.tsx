import React, { useState, useEffect } from 'react'
import NavIndex from './navigation/nav';
import NavClient from './navigation/nav_client';
import Head from "next/head";
import Script from 'next/script';
import Image from "next/image";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Images, { Grass, Banner, Sunrise, Blue } from '../../components/images';

var activePage = "Home";
export default function Main() {
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
        <Container className={'logan'}>
            <Row id='header' className='well-sm row p1 tcenter black-back h10'>
                <Col sm={12} className={'text-warning tcenter h20 loganLogo'}>
                    <h1>Sunrise Landscapes</h1>
                    <NavIndex />
                </Col>
            </Row>
            <Row id="content" className={"h70"}>
                {pageObj.jam.html}
            </Row>
            <Row id="footer" className={"h10"}>
                <Col sm={5} >
                    {pageObj.about.html}
                </Col>
                <Col sm={2} >
                    {pageObj.about.html}
                </Col>
                <Col sm={5} >
                    {pageObj.about.html}
                </Col>
            </Row>
        </Container>
    </>
}
const pageObj = {
    home: {
        title: "Home",
        html: <>
            <Col md={1} id="nav1" className={"well-sm grey-back o5"}>
            </Col>
            <Col md={10} id='home' className={"well-sm white-back scroll"}>
                <Row className={""}>
                    <Col sm={12} id="content"></Col>
                </Row>
                <Row className={""}>
                    <Col md={12} id="homeContent" className={"tcenter black-font"}>
                        <iframe id="homeContent" className={"scroll"} height="100%" width="100%" src ="" frameBorder={"0"}></iframe>
                    </Col>
                </Row>
                <Row className={""}>
                    <Col sm={3}></Col>
                    <Col sm={6} id="content">
                        <Form id="tLit" className="vcenter tcenter">
                            <Form.Group>
                                <Form.Label>Input</Form.Label>
                                <Form.Control  type="text" id="word" name="word" placeholder="Enter word" />
                                <Form.Text className="text-muted"><h2>transliteration: </h2></Form.Text>
                                <Form.Text className="text-muted"><h1 id="hbru"></h1></Form.Text>
                            </Form.Group>
                        
                        </Form>
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            </Col>
            <Col md={1} id="nav2" className={"well-sm grey-back o5"}>
            </Col>
        </>
    },
    jam: {
        title: "Jam",
        html: <>
            <Col xs={6} sm={1} md={1} lg={1}  id="nav1" className={"well-sm grey-back o5"}>
                <Row className="h30">
                    <Col sm={12} className="h100 grey-back p5">
                        <Banner />
                    </Col>
                </Row>
                <Row className="h70">
                    <Col sm={12} className="h100 grey-back p5">
                        <Grass />
                    </Col>
                </Row>
            </Col>
            <Col xs={6} sm={8} md={8} lg={9} id="client-content" className="p5 grey-back o8">
                        <h3 className="title">Client Content</h3>
            </Col>
            <Col xs={6} sm={1} md={1} lg={1}  id="nav2" className={"well-sm grey-back o5"}>
                <NavClient />
            </Col>
        </>
    },
    about: {
        title: "About",
        html: <>
            <Row id='about' className='row m5'>
                About Page
            </Row>
        </>
    },
    nav: {
        html: {
        }
    }
}
