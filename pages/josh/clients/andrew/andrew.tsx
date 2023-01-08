import { Card, Nav } from "react-bootstrap"
import SimpleNav from "../../../../components/simplenav"

export default function Andrew(){
    return <>
        this is cool
    </>
}
export function AndrewNavOld(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh/andrew" className="">Andrew</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/josh/andrew/trenton">anTrenton</Nav.Link>
                <Nav.Link href="/josh/andrew/ringgold">anRinggold</Nav.Link>
                <Nav.Link href="/josh/andrew/calhoon">anCalhoon</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}
export function AndrewNav(){
    return <SimpleNav {...{root: 'josh', title: "andrew", links: ["trenton", "ringgold", "calhoon"], args: ''}} />
}