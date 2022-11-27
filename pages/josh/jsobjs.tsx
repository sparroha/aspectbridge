import React, { useState, useEffect } from 'react'
import { Nav, Button, Card, Col, Row } from 'react-bootstrap'
import NavIndex from './navigation/nav'
import NavClient from './navigation/nav_client'

var displayClient = 'Lorem Ipsum'
const buttons = {
    a: {
        mowing: {
            yards: <Nav.Link href="#" onClick={() => {showJam('yards'); return false;}}>Yards</Nav.Link>,
            trimming: <Nav.Link href="#" onClick={() => {showJam('trimming'); return false;}}>Trimming</Nav.Link>,
            hardees: <Nav.Link href="#" onClick={() => {showJam('tardees'); return false;}}>Hardees</Nav.Link>
        }
    }
}
const cards = {
    header:
        <Card className={'img-mgrass'}>
            <Card.Body>
                <Card.Title className={'img-banner'}>Lorem Ipsum</Card.Title>
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
    ,clientDynamic:
        <Card className={'img-terrace'}>
            <Card.Body>
                <Card.Title className={'img-banner'}>What is {displayClient}?</Card.Title>
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
    }

}
const pages = {
    home: {
        title: "Dashboard",
        html: <>
            <Col sm={3} md={3} lg={5}  id="nav1" className={''}>
                <Row>
                    <Col sm={12} md={6} >{cards.navcards.mowing}</Col>
                    <Col sm={12} md={6} >{cards.grass}</Col>
                    <Col sm={12} md={6} >{cards.grass}</Col>
                    <Col sm={12} md={6} >{cards.grass}</Col>
                </Row>
            </Col>
            <Col sm={9} md={7} lg={6} id="client-content h100" className={'md-well h100'} >
                <Row>
                    {cards.clientDynamic}
                </Row>
            </Col>
            <Col sm={12} md={2} lg={1} id="nav2" className={''}><NavClient />
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

export default function jsObjs(){
    return {
            button: buttons,
            card: cards,
            page: pages
    }
}
function showJam(id){
    
}
function usePage(id){
    const [page, setPage] = useState(id);
    return page;
}