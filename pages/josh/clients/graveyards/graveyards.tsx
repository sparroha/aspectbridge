import { Card, Form, Nav } from "react-bootstrap"
import SimpleNav from "../../../../components/simplenav"

export default function Graveyards(){
    return <Form>
            </Form>
}
export function GraveyardsNavOld(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh/graveyards" className="">Graveyards</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/josh/graveyards/trenton">Trenton</Nav.Link>
                <Nav.Link href="/josh/graveyards/ringgold">Ringgold</Nav.Link>
                <Nav.Link href="/josh/graveyards/calhoon">Calhoon</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}
export function TrentonGraveyardsOld(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh/graveyards" className="">Graveyards</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/josh/graveyards/trenton/map">Map</Nav.Link>
                <hr />
                <Nav.Link href="/josh/graveyards/ringgold/calendar">Calendar</Nav.Link>
                <Nav.Link href="/josh/graveyards/calhoon/tools">Tools</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}
export function RinggoldGraveyardsOld(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh/graveyards" className="">Graveyards</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/josh/graveyards/trenton/map">Map</Nav.Link>
                <hr />
                <Nav.Link href="/josh/graveyards/ringgold/calendar">Calendar</Nav.Link>
                <Nav.Link href="/josh/graveyards/calhoon/tools">Tools</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}
export function CalhoonGraveyardsOld(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/josh/graveyards" className="">Graveyards</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/josh/graveyards/trenton/map">Map</Nav.Link>
                <hr />
                <Nav.Link href="/josh/graveyards/ringgold/calendar">Calendar</Nav.Link>
                <Nav.Link href="/josh/graveyards/calhoon/tools">Tools</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}
export function GraveyardsNav(){
    return <SimpleNav {...{title: "graveyards", links: ["trenton", "ringgold", "calhoon"]}} />
}
export function TrentonGraveyards(){
    return <SimpleNav {...{title: "trenton", links: ["map", "calendar", "tools"]}} />
}
export function RinggoldGraveyards(){
    return <SimpleNav {...{title: "ringgold", links: ["map", "calendar", "tools"]}} />
}
export function CalhoonGraveyards(){
    return <SimpleNav {...{title: "calhoon", links: ["map", "calendar", "tools"]}} />
}
//This is Info Block for Clients
/*const graves = [
    {
    id:  "trenton",
address: “1234 five st”,
billing: "",
schedule: {
monday: {start: "15:00", end: "22:00"},
tuesday: {start: "15:00", end: "22:00"},
wednesday: {start: "15:00", end: "22:00"},
thursday: {start: "15:00", end: "22:00"},
friday: {start: "15:00", end: "22:00"}
}
    },
{
id:  "calhoon",
address: “456  seven st”
schedule: {
monday: {start: "15:00", end: "22:00"},
tuesday: {start: "15:00", end: "22:00"},
wednesday: {start: "15:00", end: "22:00"},
thursday: {start: "15:00", end: "22:00"},
friday: {start: "15:00", end: "22:00"}
}
    },]*/

