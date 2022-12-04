import { Card, Nav } from "react-bootstrap";

export default function SimpleNav(props: {title: String, links: String[]}){
    return  <Card className={'tcenter'}>
                <Card.Body className={'p5'}>
                    <Nav.Link href={"/josh/"+props.title}>{props.title.replace(props.title.charAt(0),props.title.charAt(0).toUpperCase())}</Nav.Link><hr />
                    {props.links.map((l) => <Nav.Link href={"/josh/"+props.title+"/"+l}>{l.replace(l.charAt(0),l.charAt(0).toUpperCase())}</Nav.Link>)}
                </Card.Body>
            </Card>
}