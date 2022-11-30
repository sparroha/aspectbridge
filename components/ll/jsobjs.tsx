import React, { useState, useEffect, useRef } from 'react'
import { Nav, Button, Card, Col, Row } from 'react-bootstrap'
import NavIndex from './navigation/nav'
import NavClient from './navigation/nav_client'
//const [client, setClient] = useState('');

const filler = {
    title: 'Lorem Ipsum',
    body: <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book. It has survived not only five centuries, but also the leap into 
            electronic typesetting, remaining essentially unchanged. It was popularised in 
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
            and more recently with desktop publishing software like Aldus PageMaker including 
            versions of Lorem Ipsum.</p>
}
const buttons = {
    a: {
        mowing: {
            yards: <Nav.Link href="/josh/ashmore/yards">Yards</Nav.Link>,
            trimming: <Nav.Link href="/josh/ashmore/trimmings">Trimmings</Nav.Link>,
            hardees: <Nav.Link href="/josh/ashmore/hardees">Hardees</Nav.Link>
        },
        ashmore: <Nav.Link href="/josh/ashmore">Ashmore</Nav.Link>
    }
}
const cards = {
    header:
        <Card className={'img-mgrass'}>
            <Card.Body>
                <h1 className={'img-banner'}>Lorem Ipsum</h1>
                <hr />
                <NavIndex />
            </Card.Body>
        </Card>
    ,navclient:
        <Card className={'img-farm'}>
            <Card.Body>
                <hr />
                <NavClient />
            </Card.Body>
        </Card>
    ,contact:
        <Card className={'img-mgrass'}>
            <Card.Body>
                <Card.Title className={'img-banner'}>Contact Us</Card.Title>
                <hr />
                <Card.Text>"Lorem ipsum dolor sit amet,</Card.Text>
            </Card.Body>
        </Card>
    ,about:
        <Card className={'img-mgrass'}>
            <Card.Body>
                <Card.Title className={'img-banner'}>About</Card.Title>
                <hr />
                <Card.Text>consectetur adipiscing elit,</Card.Text>
            </Card.Body>
        </Card>
    ,news:
        <Card className={'img-mgrass'}>
            <Card.Body>
                <Card.Title className={'img-banner'}>News Feed</Card.Title>
                <hr />
                <Card.Text>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</Card.Text>
            </Card.Body>
        </Card>
    ,banner:
        <Card className={'img-specles'}>
            <Card.Body>
                <Card.Title>Banner</Card.Title>
                <hr />
                <Card.Text>banner text</Card.Text>
            </Card.Body>
        </Card>
    ,grass:
        <Card className={'img-grass'}>
            <Card.Body>
                <Card.Title className={'img-banner'}>Grass</Card.Title>
                <hr />
                <Card.Text>grass text</Card.Text>
            </Card.Body>
        </Card>
    ,gray:
        <Card className={'img-grey-back'}>
            <Card.Body>
                <Card.Title className={'img-banner'}>Grass</Card.Title>
                <hr />
                <Card.Text>grass text</Card.Text>
            </Card.Body>
        </Card>
    ,navcards: {
        mowing: 
            <Card className={'img-grey-back'}>
                <Card.Body>
                    <Card.Title className={'img-banner'}>Mowing</Card.Title>
                    <hr />
                    <Card.Text>
                        {buttons.a.mowing.yards}
                        {buttons.a.mowing.trimming}
                        {buttons.a.mowing.hardees}
                    </Card.Text>
                </Card.Body>
            </Card>
        ,ashmore: 
            <Card className={'img-grey-back'}>
                <Card.Body>
                    <Card.Title className={'img-banner'}>{buttons.a.ashmore}</Card.Title>
                    <hr />
                    <Card.Text>
                        {buttons.a.mowing.yards}
                        {buttons.a.mowing.trimming}
                        {buttons.a.mowing.hardees}
                    </Card.Text>
                </Card.Body>
            </Card>
    }

}
export default function jsObjs(){
    return {
        button: buttons,
        card: cards
        //page: pages
}}
