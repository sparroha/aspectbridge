import { Card, Nav } from "react-bootstrap"
import SimpleNav from "../../../../components/simplenav"
export default function Church(){
    return <>
        Bill Information Goes Here...Oxygen
    </>
}
export function ChurchNavOld(){
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
export function ChurchNav(){
    return <SimpleNav {...{root: 'josh', page: "church", links: ["trenton", "ringgold", "calhoon"], args: ''}} />
}