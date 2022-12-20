import Link from "next/link";
import { Card, Col, Nav, Navbar, NavbarBrand, Row } from "react-bootstrap"
import useLog from "../../../components/conlog";

export const clientlist = [
    {
        id: 1,
        name: 'andrew',
        dname: 'Andrew'
    },
    {
        id: 2,
        name: 'ashmore',
        dname: 'Ashmore'
    },
    {
        id: 3,
        name: 'bill',
        dname: 'Bill'
    },
    {
        id: 4,
        name: 'blake',
        dname: 'Blake'
    },
    {
        id: 5,
        name: 'church',
        dname: 'Church'
    },
    {
        id: 6,
        name: 'coopers',
        dname: 'Coopers'
    },
    {
        id: 7,
        name: 'graveyards',
        dname: 'Graveyards'
    },
    {
        id: 8,
        name: 'joshneal',
        dname: 'Josh Neal'
    },
    {
        id: 9,
        name: 'justinsmom',
        dname: 'justin\'s Mom'
    },
    {
        id: 10,
        name: 'kim',
        dname: 'Kim'
    },
    {
        id: 11,
        name: 'mckeellane',
        dname: 'McKeel Lane'
    },
    {
        id: 12,
        name: 'restaurant',
        dname: 'Restaurant'
    },
    {
        id: 13,
        name: 'tiffany',
        dname: 'Tiffany'
    },
    {
        id: 14,
        name: 'lumberyard',
        dname: 'lumber Yard'
    },
    {
        id: 15,
        name: 'paytonsoray',
        dname: 'Payton & Soray'
    },
    {
        id: 16,
        name: 'pineridge',
        dname: 'Pineridge'
    },
    {
        id: 17,
        name: 'preacher',
        dname: 'Preacher'
    }
]
const test = [
    
    {
        id: 16,
        name: 'pineridge',
        dname: 'Pineridge'
    },
    {
        id: 17,
        name: 'preacher',
        dname: 'Preacher'
    }
]
export default function ClientList(){
    let style = {
            border: '2px outset white'
        }
    return <>
        {clientlist.map((client) => <Col sm={12} className={'p2'}><Nav.Link className={'text-dark p3 r4 tcenter'} style={style} href={"/josh/"+(client.name)}>{client.dname}</Nav.Link></Col>)}
    </>
}
export function ClientNA(){
    return <>Client Unavailable...</>
}
export function Dashboard(){
    return <>Dashboard</>
}
export function DashNav(){
    Object.values(clientlist).forEach((client) => {
        useLog('@DashNav('+client.dname+')')
    })
    //let l = clientlist.map((client) => {<Nav.Link href={"/josh/"+(client.name?client.name:'')+""}>{client.dname}</Nav.Link>})
    return <Card className={''}>
        <Card.Body className={'p0'}>
            <Card.Title className={''}><Nav.Link href="/josh" className="">Clients</Nav.Link></Card.Title>
            <hr />
            <Nav>
                <Row><ClientList /></Row>
            </Nav>
        </Card.Body>
    </Card>
}