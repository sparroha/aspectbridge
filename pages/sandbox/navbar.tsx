import { Col, Container, Row } from "react-bootstrap";


export default function SandboxNavbar(props){
    return<Container className={'sitemap'}>
        <Row>
            <Col><a href="/sandbox">Home</a></Col>
            <Col><a href="/sandbox/cardgame">Card Game</a></Col>
            <Col><a href="/sandbox/cardsgame">Cards Game</a></Col>
            <Col><a href="/sandbox/provider">Provider</a></Col>
            <Col><a href="/sandbox/registrytest">Registry Test</a></Col>
            <Col><a href="/sandbox/site">Web Site Build</a></Col>
            <Col><a href="/sandbox/story">Story Test</a></Col>
        </Row>
    </Container>
}