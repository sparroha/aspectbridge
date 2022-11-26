import React, { useState, useEffect } from 'react'
import NavIndex from './navigation/nav';
import NavClient from './navigation/nav_client';
import Head from "next/head";
import Script from 'next/script';
import Image from "next/image";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

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
            <Row id='header' className='well-sm row p1 tcenter black-back h20'>
                <Col sm={12} className={'text-warning tcenter grass'}>
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
    jam: {
        title: "Jam",
        html: <>
            <Col xs={6} sm={2} md={2} lg={2}  id="nav1" className={"well-sm"}>
                <Row className="">
                    <Col sm={12} className="h100">
                        <Card className={'text-white'}>
                            <Card.Body className={'specles'}>
                                <Card.Title>Banner</Card.Title>
                                <Card.Text>banner text</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="">
                    <Col sm={12} className="h100">
                        <Card className={'text-white'}>
                            <Card.Body className={'grass'}>
                                <Card.Title className={'banner text-secondary'}>Grass</Card.Title>
                                <Card.Text>banner text</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>

            <Col xs={6} sm={8} md={9} lg={9} id="client-content" className="terrace">
                        <h3 className="title">Client Content</h3>
            </Col>

            <Col xs={6} sm={2} md={1} lg={1}  id="nav2" className={"well-sm"}>
                <NavClient />
            </Col>
        </>
    },
    about: {
        title: "About",
        html: <>
            <Card className={'text-white'}>
                <Card.Body className={'mgrass'}>
                    <Card.Title className={'banner text-secondary'}>About</Card.Title>
                    <Card.Text>about text</Card.Text>
                </Card.Body>
            </Card>
        </>
    },
    nav: {
        html: {
        }
    }
}
