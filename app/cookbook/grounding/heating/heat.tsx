'use client'
//0,1
import { Card, Nav } from "react-bootstrap"

export default function Heat(){
    return <>
        this is cool
        <H/>
    </>
}
export function H(){
    return <Card className={''}>
        <Card.Body className={''}>
            <Card.Title className={''}><Nav.Link href="/links/spark" className="">spark</Nav.Link></Card.Title>
            <hr />
            <Card.Text>
                <Nav.Link href="/links/spark">stone</Nav.Link>
                <Nav.Link href="/links/spark">Trimmings</Nav.Link>
                <Nav.Link href="/links/spark">Hardees</Nav.Link>
            </Card.Text>
        </Card.Body>
    </Card>
}