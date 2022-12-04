import { Card, Nav } from "react-bootstrap"
export default function Coopers(){
    return <>
        Bill Information Goes Here...Oxygen
    </>
}
export function CoopersNav(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh/coopers" className="">Coopers</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/josh/coopers/trenton">cooTrenton</Nav.Link>
                <Nav.Link href="/josh/coopers/ringgold">cooRinggold</Nav.Link>
                <Nav.Link href="/josh/coopers/calhoon">cooCalhoon</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}