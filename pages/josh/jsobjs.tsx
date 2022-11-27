import React, { useState, useEffect, useRef } from 'react'
import { Nav, Button, Card, Col, Row } from 'react-bootstrap'
import NavIndex from './navigation/nav'
import NavClient from './navigation/nav_client'


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
            yards: <Nav.Link href="#" onClick={() => {useClientComponent('yards'); return false;}}>Yards</Nav.Link>,
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
    ,clientDynamic:
        <Card className={'img-terrace'}>
            <Card.Body>
                <Card.Title className={'img-banner'}>What is {filler.title}?</Card.Title>
                <hr />
                <Card.Text>
                </Card.Text>
                <hr />
            </Card.Body>
        </Card>

}
const pages = {
    home: {
        title: "Dashboard",
        html: cards.clientDynamic
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
function showJam(id: String){
    const [activepage, setPage] = useState(id);
}

export function RenderPage(page){
    const [activepage, setActivePage] = useState(page);
    const ref = useRef('#pagecontent');
    useEffect(() => {
    },[activepage]);
}
export function Client(name: String){
    const [client, setClient] = useState(name)
    useEffect(() => {
        //window.location.reload();
    }, [client])
}

function useClientComponent(name){
    const [client, setClient] = useState(name);
    useEffect(() => {
        const handlePageUpdate = () => {setClient(name)};

    })
    return client;
}
export function MyMod(){
    const client = useClientComponent('Name');
    return;

    function useClientComponent(name){
        const [client, setClient] = useState(name);
        useEffect(() => {
            const handlePageUpdate = () => {setClient(name)};
    
        })
        return client;
    }
}