import Link from "next/link";
import { Button, Collapse, Container, Dropdown, ListGroup, ListGroupItem, Navbar, NavbarBrand, NavDropdown, NavLink} from "react-bootstrap";
export default function Nav() {
    return (
        <>
            <Navbar bg={'secondary'} className="navbar-inverse cssmenu h100">
                <Container>
                    <Navbar.Brand className="navbar-header">
                        <Button className="navbar-toggle" data-toggle="collapse" data-target="#navIndex">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </Button>
                        <NavbarBrand href="#">Terra Forge</NavbarBrand>
                    </Navbar.Brand>
                    
                    <div className="collapse navbar-collapse" id="navIndex">
                        <ListGroup className="nav navbar-nav">
                            <ListGroupItem className="active"><NavLink href="/">Home</NavLink></ListGroupItem>
                            <ListGroupItem className="dropdown">
                                <NavLink className="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="#">Resources<span
                                    className="caret"></span></NavLink>
                                <ListGroup className="dropdown-menu">
                                    <ListGroupItem><NavLink href="#">Wiki</NavLink></ListGroupItem>
                                    <ListGroupItem><NavLink href="#">Mimicry Wiki</NavLink></ListGroupItem>
                                    <ListGroupItem><NavLink href="#">Other Wikis</NavLink></ListGroupItem>
                                </ListGroup>
                            </ListGroupItem>
                            <ListGroupItem className="dropdown">
                                <NavLink className="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="#">Child
                                    Sites<span className="caret"></span></NavLink>
                                <ListGroup className="dropdown-menu">
                                    <ListGroupItem><NavLink href='/josh'>Josh</NavLink></ListGroupItem>
                                </ListGroup>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Dropdown>
                                    <NavLink className="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="#">Projects<span
                                        className="caret"></span></NavLink>
                                    <ListGroup className="dropdown-menu">
                                        <ListGroupItem><NavLink href='/wasd/index.html'>Game</NavLink></ListGroupItem>
                                        <ListGroupItem><NavLink href='/grid/index.html'>Grid</NavLink></ListGroupItem>
                                    </ListGroup>
                                </Dropdown>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </Container>
            </Navbar>
            <Navbar bg="light" expand="lg" className={'h100 '}>
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar className="me-auto">
                        <NavLink href="#home">Home</NavLink>
                        <NavLink href="#link">Link</NavLink>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}