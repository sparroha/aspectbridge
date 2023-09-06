'use client'
import { useState } from "react"
import { Col, Row } from "react-bootstrap"
import useUser from "../lib/util/^user"
import WhiteboardNav from "./whiteboard/wb_btn"
import ActiveUsers from "../lib/util/-activeusers-"
import Laser from "../lib/util/gfx/laser"

export default function NavRightDefault(){  
    const greenLaser = '#00ff0033'
    const blueLaser = '#0000ff33'
    const redLaser = '#ff000033'
    const user = useUser()
    const [hide, setHide] = useState('hidden')
    return <Col xs={0} sm={0} md={2} id="nav-right" className={"p0"} style={{position: 'relative'}}>
        <Row className={'w100 h100'} style={{position: 'relative', zIndex: '5', color: 'white'}}>
            <Col xs={12} style={{visibility: user?.username?'visible':'collapse', zIndex: '5'}}>
                Username: {user?.username} <br />
                Access: {user?.access} <br />
                Message: {user?.message} <br />
            </Col>
            <Col xs={12} style={{zIndex: '5'}}><WhiteboardNav>
                    <div style={{position: 'relative', height: '100%', backgroundColor: '#014'}}>
                        <Laser angle={30} color={blueLaser} width={2} radiance={1} rotation={3}/>
                        <Laser angle={60} color={greenLaser} width={2} radiance={1} rotation={33}/>
                        <Laser angle={90} color={redLaser} width={2} radiance={1} rotation={333}/>
                    </div>
                </WhiteboardNav></Col>
            <Col xs={12} style={{zIndex: '5'}}><ActiveUsers/></Col>
            <div className={'grey-back o4 w100 h100'} style={{position: 'absolute'}}></div>{/**translucent backdrop */}
        </Row>
    </Col>
}