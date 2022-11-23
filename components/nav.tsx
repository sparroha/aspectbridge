import Link from "next/link";
import { Button, Collapse, Container, Dropdown, Form, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavDropdown, NavLink} from "react-bootstrap";
export default function NavIndex() {
    return (
        <>
            <Navbar sticky="top" bg="secondary" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Aspect Bridge</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>

                            <Nav.Link href="#">Home</Nav.Link>{''}
                            <NavDropdown title="Partners" id="navbarScrollingDropdown">
                                <Nav.Link href="logan.aspectbridge.com">Logan</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link href="https://logantest.aspectbridge.com" disabled>Logan_Test_Live</Nav.Link>
                                <Nav.Link href="/josh/index.html">Logan_Test_Dev</Nav.Link>
                            </NavDropdown>{''}

                            <NavDropdown title="Projects" id="navbarScrollingDropdown">
                                <Nav.Link href="/grid/index.html">Grid</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link href="/wasd/index.html" disabled>wasd</Nav.Link>
                            </NavDropdown>{''}

                            <NavDropdown title="Resources" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#ankor1" disabled>Wiki</NavDropdown.Item>
                                <NavDropdown.Item href="#ankor2" disabled>Mimicry Wiki</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#ankor3" disabled>Other Wikis</NavDropdown.Item>
                            </NavDropdown>{''}
                            <NavDropdown title="Links" id="navbarScrollingDropdown">
                                <Nav.Link href="#">Enabled_Link</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link href="#" disabled>Disabled_Link</Nav.Link>
                            </NavDropdown>{''}
                            
                        </Nav>{''}
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