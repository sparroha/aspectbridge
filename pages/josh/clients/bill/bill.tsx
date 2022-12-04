import { Card, Nav } from "react-bootstrap"

export default function Bill(){
    return <>
    Water schedule
    Pine Straw schedule
    Mulch schedule
    Trimming schedule
    Grass schedule     </>
}
export function BillNav(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh/bill" className="">Bill</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/josh/bill">Yards</Nav.Link>
                <Nav.Link href="/josh/bill">Trimmings</Nav.Link>
                <Nav.Link href="/josh/bill">Hardees</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}