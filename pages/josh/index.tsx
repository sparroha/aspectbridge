import React, { useState, useEffect } from 'react'
import NavIndex from './navigation/nav';
import NavClient from './navigation/nav_client';
import Head from "next/head";
import Script from 'next/script';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

var activePage = "Home";
var displayClient = 'Lorem Ipsum'
export default function Main() {
    const cards = {
        header:
        <Card className={'text-white'}>
            <Card.Body className={'mgrass'}>
                <Card.Title className={'banner text-secondary'}>Sunrise Landscapes</Card.Title>
                <NavIndex />
            </Card.Body>
        </Card>
        ,navclient:
        <Card className={'text-secondary'}>
            <Card.Body className={'farm'}>
                <NavClient />
            </Card.Body>
        </Card>
        ,about:
        <Card className={'text-white'}>
            <Card.Body className={'mgrass'}>
                <Card.Title className={'banner text-secondary'}>About</Card.Title>
                <Card.Text>about text</Card.Text>
            </Card.Body>
        </Card>
        ,banner:
        <Card className={'text-white'}>
            <Card.Body className={'specles'}>
                <Card.Title>Banner</Card.Title>
                <Card.Text>banner text</Card.Text>
            </Card.Body>
        </Card>
        ,grass:
        <Card className={'text-white'}>
            <Card.Body className={'grass'}>
                <Card.Title className={'banner text-secondary'}>Grass</Card.Title>
                <Card.Text>grass text</Card.Text>
            </Card.Body>
        </Card>
        ,clientDynamic:
        <Card className={'text-white h100'}>
            <Card.Body className={'terrace'}>
                <Card.Title className={'banner text-secondary'}>What is {displayClient}?</Card.Title>
                <hr className="white" />
                <Card.Text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.
                </Card.Text>
            </Card.Body>
        </Card>

    }
    const pages = {
        jam: {
            title: "Jam",
            html: <>
                <Col md={3}  id="nav1" className={'h100'}>
                    {cards.banner}
                    {cards.grass}
                </Col>
                <Col md={7} id="client-content" className={'h100'} >{cards.clientDynamic}
                </Col>
                <Col md={2} id="nav2" className={'h100'}><NavClient />
                </Col>
            </>
        },
        about: {
            title: "About",
            html: <>
                {cards.about}
            </>
        },
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
        <Container className={'logan'}>
            <Row id='header' className='h20'>
                <Col sm={12}>
                    {cards.header}
                </Col>
            </Row>
            <Row id="content" className={"h70"}>
                {pages.jam.html}
            </Row>
            <Row id="footer" className={"h10"}>
                <Col sm={4} >
                    {cards.about}
                </Col>
                <Col sm={4} >
                    {cards.about}
                </Col>
                <Col sm={4} >
                    {cards.about}
                </Col>
            </Row>
        </Container>
    </>
}

