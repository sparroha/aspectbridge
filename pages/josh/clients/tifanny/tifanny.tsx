import { Card, Nav } from "react-bootstrap"
export default function Tifanny(){
    return <>
        Bill Information Goes Here...Oxygen
    </>
}
export function TifannyNav(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh/tifanny" className="">Tifanny</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/josh/tifanny/trenton">tiTrenton</Nav.Link>
                <Nav.Link href="/josh/tifanny/ringgold">tiRinggold</Nav.Link>
                <Nav.Link href="/josh/tifanny/calhoon">tiCalhoon</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}