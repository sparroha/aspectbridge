import { Card, Nav } from "react-bootstrap"
import useLog from "../../../components/conlog";
import Andrew from "./andrew/andrew";

export const clientlist = [
    {
        name: 'andrew',
        dname: 'Andrew'
    },
    {
        name: 'ashmore',
        dname: 'Ashmore'
    },
    {
        name: 'bill',
        dname: 'Bill'
    },
    {
        name: 'blake',
        dname: 'Blake'
    },
    {
        name: 'church',
        dname: 'Bill'
    },
    {
        name: 'coopers',
        dname: 'Coopers'
    },
    {
        name: 'graveyards',
        dname: 'Grave Yards'
    },
    {
        name: 'joshneal',
        dname: 'Josh Neal'
    },
    {
        name: 'justinsmom',
        dname: 'justin\'s Mom'
    },
    {
        name: 'kim',
        dname: 'Kim'
    },
    {
        name: 'mckeellane',
        dname: 'McKeel Lane'
    },
    {
        name: 'restaurant',
        dname: 'Restaurant'
    },
    {
        name: 'tiffany',
        dname: 'Tiffany'
    },
    {
        name: 'lumberyard',
        dname: 'lumber Yard'
    },
    {
        name: 'paytonsoray',
        dname: 'Payton & Soray'
    },
    {
        name: 'pineridge',
        dname: 'Pineridge'
    },
    {
        name: 'preacher',
        dname: 'Preacher'
    },
]
export default function ClientList(){
    let l = <>{clientlist.map((client) => {
        <Nav.Link href={"/josh/"+(client.name)}>
            {client.dname}
            </Nav.Link>
    })}</>
    useLog(l)
    return l
}
export function Dashboard(){
    return <>Dashboard</>
}
export function DashNav(){
    Object.values(clientlist).forEach((element) => {
        useLog('@DashNav('+element+')')
    })
    //let l = clientlist.map((client) => {<Nav.Link href={"/josh/"+(client.name?client.name:'')+""}>{client.dname}</Nav.Link>})
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh" className="">Clients</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <ClientList />
            </Card.Text>
        </Card.Body>
    </Card>
}
/*
<html>
<head>
<title>Client List thus far</title>
</head>
<body>

<h1>Links</h1>
<p>
    Andrew
    Ashmore
    Bill
    Blake
    Church
    Coopers
    Graveyards
    Josh Neal
    Justin's Mother
    Kim
    Mckeel lane
    Restaurant
    Tiffany
    Lumber yard
    Payton Boon / Soray Luna
    Pine Ridge
    Preacher
    
    
</p>

</body>
</html>*/