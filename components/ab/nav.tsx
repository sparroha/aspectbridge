import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Collapse, Container, Dropdown, Form, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavDropdown, NavLink} from "react-bootstrap";
import { getDomain } from "../domain";

export default function NavIndex(props) {
    const domain = getDomain()
    const router = useRouter()
    const [access, setAccess] = useState('0')
    const [local, setLocal] = useState(null)
    const [homepage, setHomepage] = useState(props.root)
    useEffect(()=>{
        return setLocal(domain=='localhost:3000/'?'true':'false')
    },[domain])
    function NavBrand(local){
        return local?
        <Navbar.Brand as={Nav.Link} href="https://aspectbridge.com/dashboard" id="brandaspect" >Aspect Bridge</Navbar.Brand>
        :<Navbar.Brand as={Nav.Link} href="/dashboard" id="brandaspect" disabled>Aspect Bridge</Navbar.Brand>
    }
    function NavPartners(local){
        return local?(
            <NavDropdown title="Partners" id="navbarPartnersDropdown">
                <Nav.Link href="https://logan.aspectbridge.com/josh">Logan's Landscapes</Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link href="https://logantest.aspectbridge.com" disabled>Logan_Test_Live</Nav.Link>
                <Nav.Link href="/josh">Logan_Test_Dev</Nav.Link>
            </NavDropdown>
        ):(<NavDropdown title="Partners" id="navbarPartnersDropdown">
            <Nav.Link href="/josh">Logan's Landscapes</Nav.Link>
        </NavDropdown>)
    }
    function NavProjects(access){
        return access='2'?(
            <NavDropdown title="Projects" id="navbarProjectsDropdown">
                <Nav.Link href="/grid/index.html">Grid</Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link href="/sandbox/wasd" disabled>Sandbox: wasd</Nav.Link>
            </NavDropdown>
        ):<></>
    }
    function NavResources(){
        return <NavDropdown title="Resources" id="navbarResourcesDropdown">
            <NavDropdown.Item href="https://javascript.plainenglish.io/connect-mysql-and-authentication-on-next-js-761d12340e4f">AccessMysql...</NavDropdown.Item>
            <NavDropdown.Item href="https://www.phpmyadmin.co/server_databases.php?db=" disabled>phpMyAdmin</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="https://www.freesqldatabase.com/account/" disabled>DB Account</NavDropdown.Item>
        </NavDropdown>
    }
    return (
        <>
            <Navbar bg="" variant="dark" expand="lg" id="navaspect">
                <Container fluid>
                    <NavBrand local={local} />
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '10%' }}>

                            <Nav.Link href="/dashboard">Home</Nav.Link>{' '}
                            <Nav.Link  href="/about">About</Nav.Link>{' '}
                            <NavPartners local={local} />{' '}
                            <NavProjects access={access} />{' '}
                            <NavResources />{' '}
                            <Nav.Link  href={props.username?"/login/"+props.username+'?homepage='+homepage:"/login/login"}>{props.username?props.username:'Login'}</Nav.Link>{' '}
                            
                        </Nav>{' '}
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="primary">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}