import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Collapse, Container, Dropdown, Form, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavDropdown, NavLink, Row} from "react-bootstrap";
import { getDomain } from "../../domain";
const aspect = '';
export default function NavIndex() {
    const domain = getDomain()
    const [local, setLocal] = useState(null)
    useEffect(()=>{
        setLocal(domain=='localhost'?'true':'false')
    },[domain])
    function NavBrand(local){
        return local?
        <Navbar.Brand as={Nav.Link} href="https://logan.aspectbridge.com/josh/dashboard" id="brandlogan" >Zypk Bridge</Navbar.Brand>
        :<Navbar.Brand as={Nav.Link} href="/josh/dashboard" id="brandlogan" disabled>Zypk Bridge</Navbar.Brand>
    }
    function NavActiveClient(dir){
        return <>
        <NavDropdown title="AC" id="navbarPartnersDropdown">
            <Nav.Link href="/josh/ac">AC</Nav.Link>
            <NavDropdown.Divider />
            <Nav.Link href="/josh/ac/procedures">Procedures</Nav.Link>
            <Nav.Link href="/josh/ac/billing">Billing</Nav.Link>
            <Nav.Link href="/josh/ac/records">Records</Nav.Link>
            <Nav.Link href="/josh/ac/contacts">Contacts</Nav.Link>
        </NavDropdown>{' '}</>
    }
    return (
        <>
            <Navbar bg="" variant="light" expand="lg" id="navindexjosh">
                <Container fluid>
                    <NavBrand local={local} />
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Row>
                            <Col><Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '10%' }} navbarScroll>
                                <Row>
                                    <Col><Nav.Link href="/josh">Home</Nav.Link></Col>
                                    <Col><Nav.Link  href="/josh/about">About</Nav.Link></Col>
                                    <Col><NavDropdown title="AC" id="navbarPartnersDropdown">
                                        <Nav.Link href="/josh/ac">AC</Nav.Link>
                                        <NavDropdown.Divider />
                                        <Nav.Link href="/josh/ac/procedures">Procedures</Nav.Link>
                                        <Nav.Link href="/josh/ac/billing">Billing</Nav.Link>
                                        <Nav.Link href="/josh/ac/records">Records</Nav.Link>
                                        <Nav.Link href="/josh/ac/contacts">Contacts</Nav.Link>
                                    </NavDropdown></Col>
                                    <Col><Nav.Link href="/josh/assistant" >Assistant</Nav.Link></Col>
                                    <Col><Nav.Link href="/josh/employees" >Employees</Nav.Link></Col>
                                    <Col><NavDropdown title="External" id="navbarPartnersDropdown">
                                        <Nav.Link href="https://aspectbridge.com">AspectBridge</Nav.Link>
                                        <Nav.Link href="https://aspectbridge.com/public/josh/index.html">NRLandscape</Nav.Link>
                                    </NavDropdown></Col>
                                </Row>
                            </Nav></Col>
                        </Row>
                        <Row>
                            <Col className="float-end"><Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="primary">Search</Button>
                            </Form></Col>
                        </Row>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}