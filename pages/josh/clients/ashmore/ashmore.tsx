import { Card, Nav } from "react-bootstrap"
import SimpleNav from "../../../../components/simplenav"

export default function Ashmore(){
    return <>
        this is cool
    </>
}
export function AshmoreNavOld(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh/ashmore" className="">Ashmore</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/josh/ashmore/yards">Yards</Nav.Link>
                <Nav.Link href="/josh/ashmore/trimmings">Trimmings</Nav.Link>
                <Nav.Link href="/josh/ashmore/hardees">Hardees</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}
export function AshmoreNav(){
    return <SimpleNav {...{root: 'josh', title: "ashmore", links: ["trenton", "ringgold", "calhoon"], args: ''}} />
}