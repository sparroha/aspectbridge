import { Card, Nav } from "react-bootstrap"
import SimpleNav from "../../../../components/simplenav"
export default function Tifanny(){
    return <>
        Bill Information Goes Here...Oxygen
    </>
}
export function TifannyNav(){
    return <SimpleNav {...{root: 'josh', page: "tifanny", links: ["trenton", "ringgold", "calhoon"], args: ''}} />
}