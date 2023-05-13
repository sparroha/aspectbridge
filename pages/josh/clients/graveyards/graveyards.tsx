import { Card, Form, Nav } from "react-bootstrap"
import SimpleNav from "../../../../components/simplenav"

export default function Graveyards(){
    return <Form>
            </Form>
}
export function GraveyardsNav(){
    return <SimpleNav {...{root: 'josh', page: "graveyards", links: ["trenton", "ringgold", "calhoon"], args: ''}} />
}
export function TrentonGraveyards(){
    return <SimpleNav {...{root: 'josh', page: "trenton", links: ["map", "calendar", "tools"], args: ''}} />
}
export function RinggoldGraveyards(){
    return <SimpleNav {...{root: 'josh', page: "ringgold", links: ["map", "calendar", "tools"], args: ''}} />
}
export function CalhoonGraveyards(){
    return <SimpleNav {...{root: 'josh', page: "calhoon", links: ["map", "calendar", "tools"], args: ''}} />
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

