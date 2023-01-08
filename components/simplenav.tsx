import { Card, Nav } from "react-bootstrap";

/**
 * args will be passed to every link
 * args should be a string with a leading ? or &
 * @param props: {root: string, title: string, links: string[], args: string}
 * @returns 
 */
export default function SimpleNav(props: {root: string, title: string, links: string[], args: string | ''}){
    return  <Card className={'tcenter'}>
                <Card.Body className={'p5'}>
                    <Nav.Link href={"/"+props.root+"/"+props.title+props.args}>{props.title.replace(props.title.charAt(0),props.title.charAt(0).toUpperCase())}</Nav.Link><hr />
                    {props.links.map((l) => <Nav.Link href={"/"+props.root+"/"+props.title+"/"+l+props.args}>{l.replace(l.charAt(0),l.charAt(0).toUpperCase())}</Nav.Link>)}
                </Card.Body>
            </Card>
}