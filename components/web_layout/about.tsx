import { Col, Row } from "react-bootstrap"

/**
 * 
 * @param param0 
 * @returns 
 */
export default function Content({args}){return <Row><Col>
    {args.length==1 && <Layout1Col col1={args[0]}/>}
    {args.length==2 && <Layout2Col col1={args[0]} col2={args[1]}/>}
    {args.length==3 && <Layout3Col col1={args[0]} col2={args[1]} col3={args[2]}/>}
    {args.length>2 && <Row>
        {args.map((arg, index) => <Col key={index} xs={12} md={4}>{arg}</Col>)}
    </Row>}
</Col></Row>}
export function Layout1Col({col1}){return <Row>
    <Col xs={12}></Col>
</Row>}
export function Layout2Col({col1, col2}){return <Row>
    <Col xs={12} md={6}></Col>
    <Col xs={12} md={6}></Col>
</Row>}
export function Layout3Col({col1, col2, col3}){return <Row>
    <Col xs={12} md={4}></Col>
    <Col xs={12} md={4}></Col>
    <Col xs={12} md={4}></Col>
</Row>}

