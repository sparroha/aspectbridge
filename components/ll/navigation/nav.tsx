import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Collapse, Container, Dropdown, Form, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavDropdown, NavLink} from "react-bootstrap";
import { useDomainRoot } from "../../domain";
const aspect = '';
export default function NavIndex() {
    const domain = useDomainRoot()
    const [local, setLocal] = useState(null)
    useEffect(()=>{
        setLocal(domain=='localhost'?'true':'false')
    },[domain])
    function NavBrand(local){
        return local?
        <Navbar.Brand as={Nav.Link} href="https://logan.aspectbridge.com/dashboard" id="brandlogan" >Zypk Bridge</Navbar.Brand>
        :<Navbar.Brand as={Nav.Link} href="/josh/dashboard" id="brandlogan" disabled>Zypk Bridge</Navbar.Brand>
    }
    return (
        <>
            <Navbar bg="" variant="light" expand="lg" id="navindexjosh">
                <Container fluid>
                    <NavBrand local={local} />
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '10%' }} navbarScroll>

                            <Nav.Link href="/josh">Home</Nav.Link>{' '}
                            <Nav.Link  href="/josh/about">About</Nav.Link>{' '}
                            <NavDropdown title="AC" id="navbarPartnersDropdown">
                                <Nav.Link href="/josh/ac">AC</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link href="/josh/ac/procedures">Procedures</Nav.Link>
                                <Nav.Link href="/josh/ac/billing">Billing</Nav.Link>
                                <Nav.Link href="/josh/ac/records">Records</Nav.Link>
                                <Nav.Link href="/josh/ac/contacts">Contacts</Nav.Link>
                            </NavDropdown>{' '}
                            <Nav.Link href="/josh/assistant" >Assistant</Nav.Link>{' '}
                            <Nav.Link href="/josh/employees" >Employees</Nav.Link>{' '}
                            <NavDropdown title="External" id="navbarPartnersDropdown">
                                <Nav.Link href="dashboard">AspectBridge</Nav.Link>
                                <Nav.Link href="noreact">NRLandscape</Nav.Link>
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