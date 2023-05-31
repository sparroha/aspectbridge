import { useContext } from "react"
import { Col, Row } from "react-bootstrap"
import { SiteContext } from "./stdindex"

/**
 * 
 * @param param0 
 * @returns 
 */
export default function Content(props){
    const {content} = props.content?props:useContext(SiteContext)
    if(!content) return <>No Content</>

    return <Row><Col>
        {content.length==1 && <Layout1Col col1={content[0]}/>}
        {content.length==2 && <Layout2Col col1={content[0]} col2={content[1]}/>}
        {content.length==3 && <Layout3Col col1={content[0]} col2={content[1]} col3={content[2]}/>}
        {content.length>3 && <Row>
            {content.split(',').map((item, index) => <Col key={index} xs={12} md={4} lg={3}>{item}</Col>)}
        </Row>}
    </Col></Row>
}
export function Layout1Col({col1}){return <Row>
    <Col xs={12}>{col1}</Col>
</Row>}
export function Layout2Col({col1, col2}){return <Row>
    <Col xs={12} md={6}>{col1}</Col>
    <Col xs={12} md={6}>{col2}</Col>
</Row>}
export function Layout3Col({col1, col2, col3}){return <Row>
    <Col xs={12} md={4}>{col1}</Col>
    <Col xs={12} md={4}>{col2}</Col>
    <Col xs={12} md={4}>{col3}</Col>
</Row>}

