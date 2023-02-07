import Link from "next/link"
import { Card, Col, Row } from "react-bootstrap"

const componentObject = {
    navcards: {
        aspects: <Row className={'side-nav grey-back'}>
                <Col>
                    <Row>
                        <Col ><Link href='./aspects'>Aspects</Link><hr /></Col>
                    </Row>
                    <Row>
                        <Col><Link href='./air'>Air</Link></Col>
                        <Col><Link href='./fire'>Fire</Link></Col>
                        <Col><Link href='./water'>Water</Link></Col>
                        <Col><Link href='./earth'>Earth</Link></Col>
                    </Row>
                </Col>
            </Row>,
        air: <Row className={'side-nav grey-back'}>
                <Col><Link href='./air'>Air</Link><hr /></Col>
                
                <Col><Link href='./light'>Aspect of Spirit</Link></Col>
                <Col><Link href='./spirit'>Aspect of breath</Link></Col>
                <Col><Link href='./water'>Aspect of wind</Link></Col>
                <Col><Link href='./earth'>Aspect of wand</Link></Col>
            </Row>
    }
}
export default function navCcomponentObject(){

    return componentObject
}