'use client'
import { useState } from "react"
import { Col, Row } from "react-bootstrap"
import useUsers from "../lib/util/^users"
import ActiveUserList from "./activeusers"
import WhiteboardNav from "./whiteboardlink"

export default function NavRightDefault(){  
    const {ip, user, activeUsers} = useUsers()
    const [hide, setHide] = useState('hidden')
    return <Col xs={0} sm={0} md={2} id="nav-right" className={"p0"} style={{position: 'relative'}}>
        <Row className={'w100 h100'} style={{position: 'relative', zIndex: '5', color: 'white'}}>
            <Col xs={12} style={{visibility: user?.username?'visible':'collapse', zIndex: '5'}}>
                Username: {user?.username} <br />
                Access: {user?.access} <br />
                Message: {user?.message} <br />
            </Col>
            <Col xs={12} style={{zIndex: '5'}}><WhiteboardNav /></Col>
            <Col xs={12} style={{zIndex: '5'}}><ActiveUserList activeUsers={activeUsers}/></Col>
            <div className={'grey-back o4 w100 h100'} style={{position: 'absolute'}}></div>{/**translucent backdrop */}
        </Row>
    </Col>
}