import Link from "next/link";
import { Button, Collapse, Container, Dropdown, ListGroup, ListGroupItem, Navbar, NavbarBrand, NavLink} from "react-bootstrap";
export default function Nav() {
    return (
        <>
            <Navbar className="navbar-inverse cssmenu">
                <Container fluid className="">
                    <div className="navbar-header">
                        <Button className="navbar-toggle" data-toggle="collapse" data-target="#navIndex">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </Button>
                        <NavbarBrand className="" href="#">Terra Forge</NavbarBrand>
                    </div>
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
        </>
    );
}