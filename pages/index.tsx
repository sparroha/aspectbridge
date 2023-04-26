import Link from 'next/link';
import React from 'react'
import { Col, Row } from 'react-bootstrap';
import useDomainRoot from '../components/domain';
export default function Main(props) {
    useDomainRoot(props)
    return <Row>
        <Col sm={12}>Redirecting...{JSON.stringify(props)}</Col>
        <Col sm={12}><Link href="/bridge"><a>Aspect Bridge</a></Link></Col>
        <Col sm={12}><Link href="/josh"><a>Sunrise Landscapes</a></Link></Col>
        <Col sm={12}><Link href="/sandbox"><a>Sandbox</a></Link></Col>
        <Col sm={12}><Link href="/xstate"><a>X State: machine</a></Link></Col>
        <Col sm={12}><Link href="/canvas"><a>Canvas</a></Link></Col>
        <Col sm={12}><Link href="/chat"><a>Chat</a></Link></Col>
        <Col sm={12}><Link href="/dragons"><a>Dragons</a></Link></Col>
        <Col sm={12}><Link href="/wasd"><a>wasd</a></Link></Col>
    </Row>
}