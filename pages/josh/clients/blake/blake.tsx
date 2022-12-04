import { Card, Nav } from "react-bootstrap"
export default function Blake(){
    return <>
        Bill Information Goes Here...Oxygen
    </>
}
export function BlakeNav(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh/blake" className="">Blake</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/josh/blake/trenton">blTrenton</Nav.Link>
                <Nav.Link href="/josh/blake/ringgold">blRinggold</Nav.Link>
                <Nav.Link href="/josh/blake/calhoon">blCalhoon</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}