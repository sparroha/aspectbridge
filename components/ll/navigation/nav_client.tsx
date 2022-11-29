import { Button, Col, Collapse, Container, Dropdown, Form, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavDropdown, NavLink, Row} from "react-bootstrap";
export default function NavClient() {
    return (<>
        <Navbar bg="" variant="dark" expand="lg" id="navclient">
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <Navbar.Brand href="#navclient" id="aspectnav">Clients</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                    </Col>
                    <Col sm={12}>
                        <Navbar.Collapse id="navbarScroll">
                                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '10%' }} navbarScroll>
                                    <NavDropdown title="Mowing List" id="navbarPartnersDropdown">
                                        <Nav.Link as={Button} href="#" onclick="showJam('yards'); return false;">Yards</Nav.Link>
                                        <Nav.Link as={Button} href="#" onclick="showJam('trimming'); return false;">Trimming</Nav.Link>
                                        <Nav.Link as={Button} href="#" onclick="showJam('tardees'); return false;">Hardees</Nav.Link>
                                    </NavDropdown>
                                </Nav>
                        </Navbar.Collapse>
                    </Col>
                    <Col sm={12}>
                        <Navbar.Collapse id="navbarScroll">
                                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '10%' }} navbarScroll>
                                    <NavDropdown title="Bill" id="navbarPartnersDropdown">
                                        <Nav.Link as={Button} href="#" onclick="showJam('seasonal'); return false;">Seasonal</Nav.Link>
                                        <Nav.Link as={Button} href="#" onclick="showJam('weekly'); return false;">Weekly</Nav.Link>
                                        <Nav.Link as={Button} href="#" onclick="showJam('projects'); return false;">Projects</Nav.Link>
                                    </NavDropdown>
                                </Nav>
                        </Navbar.Collapse>
                    </Col>
                    <Col sm={12}>
                        <Navbar.Collapse id="navbarScroll">
                                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '10%' }} navbarScroll>
                                    <NavDropdown title="Graves" id="navbarPartnersDropdown">
                                        <Nav.Link as={Button} href="#" onclick="showJam('lake_hills'); return false;">Lake Hills</Nav.Link>
                                        <Nav.Link as={Button} href="#" onclick="showJam('weekly'); return false;">Ringgold</Nav.Link>
                                        <Nav.Link as={Button} href="#" onclick="showJam('gordy'); return false;">Gordy</Nav.Link>
                                        <Nav.Link as={Button} href="#" onclick="showJam('havens_rest'); return false;">Havens Rest</Nav.Link>
                                    </NavDropdown>
                                </Nav>
                        </Navbar.Collapse>
                    </Col>
                    <Col sm={12}>
                        <Navbar.Collapse id="navbarScroll">
                                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '10%' }} navbarScroll>
                                    <NavDropdown title="Regions" id="navbarPartnersDropdown">
                                        <Nav.Link as={Button} href="#" onclick="showJam('south'); return false;">South</Nav.Link>
                                        <Nav.Link as={Button} href="#" onclick="showJam('east'); return false;">East</Nav.Link>
                                        <Nav.Link as={Button} href="#" onclick="showJam('north'); return false;">North</Nav.Link>
                                        <Nav.Link as={Button} href="#" onclick="showJam('west'); return false;">West</Nav.Link>
                                    </NavDropdown>
                                </Nav>
                        </Navbar.Collapse>
                    </Col>
                </Row>
            </Container>
        </Navbar>
        </>
    );
}