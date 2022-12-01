import { useEffect, useState } from "react";
import { Button, Collapse, Container, Dropdown, Form, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavDropdown, NavLink} from "react-bootstrap";
import { getDomain } from "../domain";

export default function NavIndex() {
    const domain = getDomain()
    const [local, setLocal] = useState(null)
    useEffect(()=>{
        return setLocal(domain=='localhost'?'true':'false')
    },[domain])
    function NavBrand(local){
        return local?
        <Navbar.Brand as={Nav.Link} href="https://aspectbridge.com/dashboard" id="brandaspect" >Aspect Bridge</Navbar.Brand>
        :<Navbar.Brand as={Nav.Link} href="/dashboard" id="brandaspect" disabled>Aspect Bridge</Navbar.Brand>
    }
    function NavPartners(local){
        return local?(<>
            <Nav.Link href="https://logan.aspectbridge.com/josh">Logan's Landscapes</Nav.Link>
            <NavDropdown.Divider />
            <Nav.Link href="https://logantest.aspectbridge.com" disabled>Logan_Test_Live</Nav.Link>
            <Nav.Link href="/josh">Logan_Test_Dev</Nav.Link></>
        ):(<>
            <Nav.Link href="/josh">Logan's Landscapes</Nav.Link>
        </>)
    }
    return (
        <>
            <Navbar bg="" variant="dark" expand="lg" id="navaspect">
                <Container fluid>
                    <NavBrand local={local} />
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '10%' }} navbarScroll>

                            <Nav.Link href="/dashboard">Home</Nav.Link>{' '}
                            <Nav.Link  href="/about">About</Nav.Link>{' '}
                            <NavDropdown title="Partners" id="navbarPartnersDropdown">
                                <NavPartners local={local} />
                            </NavDropdown>{' '}

                            <NavDropdown title="Projects" id="navbarProjectsDropdown">
                                <Nav.Link href="/grid/index.html">Grid</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link href="/sandbox/wasd" disabled>Sandbox: wasd</Nav.Link>
                            </NavDropdown>{' '}

                            <NavDropdown title="Resources" id="navbarResourcesDropdown">
                                <NavDropdown.Item href="#ankor1" disabled>Wiki</NavDropdown.Item>
                                <NavDropdown.Item href="#ankor2" disabled>Mimicry Wiki</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#ankor3" disabled>Other Wikis</NavDropdown.Item>
                            </NavDropdown>{' '}
                            
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