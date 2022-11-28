import Link from "next/link"
import { Card, Col, Row } from "react-bootstrap"

const componentObject = {
    navcards: {
        aspects: <Row className={'grey-back'}>
                    <Col ><Link href='/aspects'>Aspects</Link><hr /></Col>
                    
                    <Col><Link href='/air'>Aspect of Air</Link></Col>
                    <Col><Link href='/fire'>Aspect of Fire</Link></Col>
                    <Col><Link href='/water'>Aspect of Water</Link></Col>
                    <Col><Link href='/earth'>Aspect of Earth</Link></Col>
            </Row>,
        air: <Row className={'grey-back'}>
                    <Col><Link href='/air'>Air</Link><hr /></Col>
                    
                    <Col><Link href='/light'>Aspect of Spirit</Link></Col>
                    <Col><Link href='/spirit'>Aspect of breath</Link></Col>
                    <Col><Link href='/water'>Aspect of wind</Link></Col>
                    <Col><Link href='/earth'>Aspect of wand</Link></Col>
            </Row>
    }
}
export default function navCcomponentObject(){

    return componentObject
}