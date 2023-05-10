import { Card, Nav } from "react-bootstrap";

/**
 * args will be passed to every link
 * args should be a string with a leading ? or &
 * @param props: {root: string, page: string, links: string[], args: string}
 * @returns 
 */
export default function SimpleNav(props: {root?: string, page: string, links?: string[], args?: string}){
    return  <Card className={'tcenter'}>
                <Card.Body className={'p5'}>
                    <Nav.Link href={(props.root?.includes('.')?'':'/')+(props.root?props.root+"/":'')+(props.page?props.page:'')+(props.args?props.args:'')}>{props.page.replace(props.page.charAt(0),props.page.charAt(0).toUpperCase())}</Nav.Link><hr />
                    {props.links?.map((link, index) => <Nav.Link key={index} href={(props.root.includes('.')?'':'/')+(props.root?props.root+"/":'')+(props.page?props.page:'')+("/"+link)+(props.args?props.args:'')}>{link.replace(link.charAt(0),link.charAt(0).toUpperCase())}</Nav.Link>)}
                </Card.Body>
            </Card>
}