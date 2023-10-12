'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Collapse, Container, Dropdown, Form, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavDropdown, NavLink, Row} from "react-bootstrap";
import { getDomain } from "../components/domain";
import { User } from "../pages/login/[userlogin]";
import UserLogin from "../lib/util/-userlogin-";
import useUser from "../lib/util/^user";

export default function LayoutHeader({ user, root }: { user?: User, root?: string }) {
    const domain = getDomain()
    const router = useRouter()
    const [local, setLocal] = useState(domain=='localhost:3000/'?'true':'false')
    const [search, setSearch] = useState('')
    /*useEffect(()=>{
        return setLocal(domain=='localhost:3000/'?'true':'false')
    },[domain])*/
    function NavBrand(){
        return local?
        <Navbar.Brand as={Nav.Link} href="https://aspectbridge.com/dashboard" id="brandaspect" >Aspect Bridge</Navbar.Brand>
        :<Navbar.Brand as={Nav.Link} href="/dashboard" id="brandaspect" disabled>Aspect Bridge</Navbar.Brand>
    }
    function Search(){
        return <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>{setSearch(e.target.value)}}
            />
            <Button variant="primary" type="submit" formAction={'./search'} name="search" value={search}>Search</Button>
        </Form>
    }
    
    return <NavMain/>
}

function NavPartners(){
    const domain = getDomain()
    const [local, setLocal] = useState(domain=='localhost:3000/'?'true':'false')
    return local?(
        <NavDropdown title="Partners">
            <Nav.Link href="https://logan.aspectbridge.com/josh">Logan's Landscapes</Nav.Link>
            <NavDropdown.Divider />
            <Nav.Link href="https://logantest.aspectbridge.com" disabled>Logan_Test_Live</Nav.Link>
            <Nav.Link href="/josh">Logan_Test_Dev</Nav.Link>
        </NavDropdown>
    ):(<NavDropdown title="Partners" id="navbarPartnersDropdown">
        <Nav.Link href="/josh">Logan's Landscapes</Nav.Link>
    </NavDropdown>)
}
function NavResources(){
    return <NavDropdown title="Resources" id="navbarResourcesDropdown">
        <NavDropdown.Item href="https://javascript.plainenglish.io/connect-mysql-and-authentication-on-next-js-761d12340e4f" disabled>AccessMysql...</NavDropdown.Item>
        <NavDropdown.Item href="https://www.phpmyadmin.co/server_databases.php?db=" disabled>phpMyAdmin</NavDropdown.Item>
        <NavDropdown.Item href="https://www.unicodepedia.com/">Unicodepedia</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="https://www.freesqldatabase.com/account/" disabled>DB Account</NavDropdown.Item>
    </NavDropdown>
}

function NavMain(){
    const user = useUser()
    const [disabled, setDisabled] = useState(true)
    const [selected, setSelected] = useState('')
    useEffect(()=>{
        if(user&&(user.access==2||user.access==1)){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    },[user])
    const ifstyle = {
        width: 250,
        height: 200,
        border: '1px solid black',
        overflow: 'hidden',
    }
    const plinks: [string, string, string][] = [
        //['1','api','/assets/terraforge_bg.jpg'],
        ['0','bridge','/assets/AspectHome.png'],
        //['0','projects/canvas',''],
        //['0','chat',''],
        ['0','card','/assets/cards_game.png'],
        ['0','chess','/assets/chess.png'],
        ['0','cost','/assets/cost_game.png'],
        ['0','dragons','/assets/dragons_game.png'],
        //['1','element',''],
        //['1','fetchexamples/example',''],
        //['0','gather',''],
        ['0','growth','/assets/growth_game.png'],
        //['0','neuralnet',''],
        //['0','registry/all',''],
        ['0','sandbox','/assets/sandbox.png'],
        ['1','slidersCss','/assets/sliders_css.png'],
        //['0','projects/story',''],
        //['1','talents',''],
        //['0','toolbelt',''],//broken
        //['0','tutorial',''],
        ['0','projects','/assets/projects.png'],
        ['0','verse','/assets/verse_game.png'],
        //['1','wasd',''],
        //['1','xstate',''],
    ]
    return <NavRow>
            <h4><Nav.Link href={'/bridge'}>Home</Nav.Link></h4>
            <h4><Nav.Link href={'/bridge/about'}>About</Nav.Link></h4>
            <h4><NavDropdown title={'Projects'}>
                {/*plinks.map((link, i)=>{
                    if(i%2==1){
                        return <Row key={i} style={{width: '22vw'}}>
                            <Col style={{border: '1px solid black'}}>
                                <Nav.Link key={i} href={"/"+plinks[i-1][1]} disabled={plinks[i-1][0]=='1'?disabled:false} onMouseOver={()=>setSelected(plinks[i-1][1])}>
                                    {plinks[i-1][1]}<br/>{selected!=plinks[i-1][1]?null:(plinks[i-1][2]!=''?<img  width={225} height={150} src={plinks[i-1][2]}/>:<iframe style={ifstyle} src={"/"+plinks[i-1][1]}></iframe>)}
                                </Nav.Link>
                            </Col><Col style={{border: '1px solid black'}}>
                                <Nav.Link key={i} href={"/"+link[1]} disabled={link[0]=='1'?disabled:false} onMouseOver={()=>setSelected(link[1])}>
                                    {link[1]}<br/>{selected!=link[1]?null:(link[2]!=''?<img  width={225} height={150} src={link[2]}/>:<iframe style={ifstyle} src={"/"+link[1]}></iframe>)}
                                </Nav.Link>
                            </Col>
                        </Row>
                    }return null
                })*/}
                <Row style={{width: '33vw'}}>
                {plinks.map((link, i)=>{
                    return <Col key={i} xs={12} sm={6}>
                        <Nav.Link href={"/"+link[1]} disabled={link[0]=='1'?disabled:false}>
                            {link[1]}
                            {link[2]!='' && <img src={link[2]} alt={link[1]} width={'100%'}/>}
                        </Nav.Link>
                    </Col>
                })}
                </Row>
            </NavDropdown></h4>
            {//<h4><NavPartners /></h4>
            }
            <h4><NavResources /></h4>
            <h4><UserLogin/></h4>
        </NavRow>
}
function NavRow({children}){
    return <Row bg="" variant="dark" id="navaspect" style={{width: '100%', zIndex: '10'}}>
        {children.map((child, i)=>{return <Col key={i} xs={4} sm={3} md={2} lg={1} style={{zIndex: '10'}}>{child}</Col>})}
    </Row>
}