import { Card, Nav } from "react-bootstrap"

export default function Graveyards(){
    return <>
        this is cool
    </>
}
export function GraveyardsNav(){
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
export function TrentonGraveyards(){
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
export function RinggoldGraveyards(){
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
export function CalhoonGraveyards(){
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

