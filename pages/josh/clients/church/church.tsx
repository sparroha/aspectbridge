import { Card, Nav } from "react-bootstrap"
export default function Church(){
    return <>
        Bill Information Goes Here...Oxygen
    </>
}
export function ChurchNav(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh/church" className="">Church</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/josh/church/trenton">chTrenton</Nav.Link>
                <Nav.Link href="/josh/church/ringgold">chRinggold</Nav.Link>
                <Nav.Link href="/josh/church/calhoon">chCalhoon</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}