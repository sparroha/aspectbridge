import { Button, Collapse, Container, Dropdown, Form, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavDropdown, NavLink} from "react-bootstrap";
const aspect = '';
export default function NavIndex() {
    return (
        <>
            <Navbar bg="" variant="light" expand="lg" id="navindex">
                <Container fluid>
                    <Navbar.Brand href="#navindex" id="aspectnav">Zypk Bridge</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '10%' }} navbarScroll>

                            <Nav.Link href="#">Home</Nav.Link>{' '}
                            <Nav.Link  href="#about">About</Nav.Link>{' '}
                            <NavDropdown title="AC" id="navbarPartnersDropdown">
                                <Nav.Link as={Button} href="#" onclick="showJam('procedures'); return false;">Procedures</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link as={Button} href="#" onclick="showJam('billing'); return false;">Billing</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link as={Button} href="#" onclick="showJam('records'); return false;">Records</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link as={Button} href="#" onclick="showJam('contacts'); return false;">Contacts</Nav.Link>
                            </NavDropdown>{' '}
                            <Nav.Link href="/assistant" >Assistant</Nav.Link>{' '}
                            <Nav.Link href="/employees" >Employees</Nav.Link>{' '}

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