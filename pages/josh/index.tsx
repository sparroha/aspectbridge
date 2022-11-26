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
        <Card className={'mgrass'}>
            <Card.Body>
                <Card.Title className={'banner'}>Lorem Ipsum</Card.Title>
                <hr />
                <NavIndex />
            </Card.Body>
        </Card>
        ,navclient:
        <Card className={'farm'}>
            <Card.Body>
                <hr />
                <NavClient />
            </Card.Body>
        </Card>
        ,contact:
        <Card className={'mgrass'}>
            <Card.Body>
                <Card.Title className={'banner'}>Contact Us</Card.Title>
                <hr />
                <Card.Text>"Lorem ipsum dolor sit amet,</Card.Text>
            </Card.Body>
        </Card>
        ,about:
        <Card className={'mgrass'}>
            <Card.Body>
                <Card.Title className={'banner'}>About</Card.Title>
                <hr />
                <Card.Text>consectetur adipiscing elit,</Card.Text>
            </Card.Body>
        </Card>
        ,news:
        <Card className={'mgrass'}>
            <Card.Body>
                <Card.Title className={'banner'}>News Feed</Card.Title>
                <hr />
                <Card.Text>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</Card.Text>
            </Card.Body>
        </Card>
        ,banner:
        <Card className={'specles'}>
            <Card.Body>
                <Card.Title>Banner</Card.Title>
                <hr />
                <Card.Text>banner text</Card.Text>
            </Card.Body>
        </Card>
        ,grass:
        <Card className={'grass'}>
            <Card.Body>
                <Card.Title className={'banner'}>Grass</Card.Title>
                <hr />
                <Card.Text>grass text</Card.Text>
            </Card.Body>
        </Card>
        ,clientDynamic:
        <Card className={'terrace'}>
            <Card.Body>
                <Card.Title className={'banner'}>What is {displayClient}?</Card.Title>
                <hr />
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
        home: {
            title: "Dashboard",
            html: <>
                <Col md={3}  id="nav1" className={''}>
                    <Row>
                        <Col sm={6}>{cards.banner}</Col>
                        <Col sm={6}>{cards.grass}</Col>
                        <Col sm={6}>{cards.grass}</Col>
                        <Col sm={6}>{cards.grass}</Col>
                    </Row>
                </Col>
                <Col md={7} id="client-content h100" className={'md-well h100 scroll'} >
                    <Row>
                        <Col sm={12} md={12} lg={6}>{cards.clientDynamic}</Col>
                        <Col sm={12} md={12} lg={6}>{cards.clientDynamic}</Col>
                        <Col sm={12} md={12} lg={6}>{cards.clientDynamic}</Col>
                        <Col sm={12} md={12} lg={6}>{cards.clientDynamic}</Col>
                    </Row>
                </Col>
                <Col md={2} id="nav2" className={''}><NavClient />
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
            <Row id='header' className={"h20"}>
                <Col sm={12}>
                    {cards.header}
                </Col>
            </Row>
            <Row id="content" className={"h70 scroll"}>
                {pages.home.html}
            </Row>
            <Row id="footer" className={"h10"}>
                <Col sm={4} >
                    {cards.contact}
                </Col>
                <Col sm={4} >
                    {cards.about}
                </Col>
                <Col sm={4} >
                    {cards.news}
                </Col>
            </Row>
        </Container>
    </>
}

