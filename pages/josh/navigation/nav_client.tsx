import { Button, Col, Collapse, Container, Dropdown, Form, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavDropdown, NavLink, Row} from "react-bootstrap";
export default function NavClient() {
    return (<>
        <Col sm={12}>
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
                    </Row>
                </Container>
            </Navbar>
        </Col></>
    );
}
/*<li class="dropdown">
<a class="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="#">Bill<span class="caret"></span></a>
<ul class="dropdown-menu">
    <li><a href="#" onclick="showJam('bill'); return false;">Seasonal</a></li>
    <li><a href="#" onclick="showJam('bill'); return false;">Weekly</a></li>
    <li><a href="#" onclick="showJam('bill'); return false;">Projects</a></li>
</ul>
</li>
<li class="dropdown">
<a class="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="#">Graves<span class="caret"></span></a>
<ul class="dropdown-menu">
    <li><a href="#" onclick="showJam('graveyard'); return false;">Lake Hills</a></li>
    <li><a href="#" onclick="showJam('graveyard'); return false;">Ringgold 1</a></li>
    <li><a href="#" onclick="showJam('graveyard'); return false;">Ringgold 2</a></li>
    <li><a href="#" onclick="showJam('graveyard'); return false;">Gordy</a></li>
    <li><a href="#" onclick="showJam('graveyard'); return false;">Havens Rest</a></li>
</ul>
</li>
<li class="dropdown">
<a class="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="#">Regions<span class="caret"></span></a>
<ul class="dropdown-menu">
    <li><a href="#" onclick="showJam('lookout'); return false;">South</a></li>
    <li><a href="#" onclick="showJam('lookout'); return false;">East</a></li>
    <li><a href="#" onclick="showJam('lookout'); return false;">North</a></li>
    <li><a href="#" onclick="showJam('lookout'); return false;">West</a></li>
</ul>
</li>*/