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
        <Container>
            <Row id='header' className='well-sm row p1 tcenter black-back h10'>
                <Col sm={12} className='tcenter navy_back title logo'>
                    <h1>Aspect Bridge</h1>
                    <p>Nav goes here</p>
                </Col>
            </Row>
            <Row id="nav" className={"h10"}>
                <NavIndex />
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
            <Row className="h10">
                <Col sm={1} className="h100 p5"><Blue />
                </Col>
                <Col sm={11} className="h100 p5">
                        <Sunrise />
                </Col>
            </Row>
            <Row className="h60">
                <Col xs={6} sm={1} md={1} lg={1} className="h100">
                    <Row className="h30">
                        <Col sm={12} className="h100 p5">
                            <Banner />
                        </Col>
                    </Row>
                    <Row className="h70">
                        <Col sm={12} className="h100 p5">
                            <Grass />
                        </Col>
                    </Row>
                </Col>
                <Col xs={6} sm={8} md={8} lg={9} className="h100">
                    <Row className="h100">
                        <Col id="client-content" className="col-sm-28 h100 p5 grey-back o8">
                            <h3 className="title">Client Content</h3>
                        </Col>
                    </Row>
                </Col>
                <Col xs={6} sm={3} md={2} lg={1} className="h100">
                    <Row className="h100">
                        <NavClient />
                    </Row>
                </Col>
            </Row>
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
