import { Card, Nav } from "react-bootstrap"
import SimpleNav from "../../../../components/simplenav"
export default function Coopers(){
    return <>
        Bill Information Goes Here...Oxygen
    </>
}
export function CoopersNav(){
    return <SimpleNav {...{root: 'josh', page: "coopers", links: ["trenton", "ringgold", "calhoon"], args: ''}} />
}