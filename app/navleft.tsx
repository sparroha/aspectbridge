'use client'
import { Col, Row } from "react-bootstrap"
import DiceWidget, { diceInitProps, useDiceRoll } from "../components/dice-old"
import SimpleNav from "../components/simplenav"
import Clock from "../components/clock"
import D20 from "../components/dice"

export default function NavLeftDefault(){  
    const dip: diceInitProps = {
        sides: 6,
        speed: 5
    }
    return <Col xs={12} sm={3} md={2} id="nav-left" className={"p0 'w100 h100'"}>
                <Row className={'w100 h100'} style={{position: 'relative'}}>
                    {//<Col xs={12} sm={12} style={{zIndex: '5'}}><SimpleNav root={"bridge"} page={"aspect"} links={["air", "fire", "water", "earth"]}/></Col>
                    }
                    <Col xs={12} style={{textAlign: 'center', color: '#888'}}><h4>CSS Clock</h4><br/><Clock /></Col>
                    <Col xs={12} style={{zIndex: '5', textAlign: 'center', color: '#888'}}><h4>Dice roll</h4><br/><D20/></Col>
                    {/*<Col xs={12} sm={12} md={12} style={{zIndex: '5'}}><DiceWidget udr={()=> useDiceRoll(dip)}/></Col>*/}
                    <div className={'grey-back o4 w100 h100'} style={{position: 'absolute'}}></div>{/**translucent backdrop */}
                </Row>
            </Col>
}