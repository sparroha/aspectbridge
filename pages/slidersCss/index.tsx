import { useRef, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import CssSlidersWrapper from "../../components/sliders";
import UserLogin from "../../lib/util/-userlogin-";
import UserProfile from "../../lib/util/-userprofile-";

//export function 
type RowObj = {id: string, obj: string, style?: React.CSSProperties}
export default function CSliders(props){
    const [state, setState] = useState({})
    const [user, setUser] = useState(null)
    const date = new Date().getTime()
    const objects: {current: RowObj[]} = useRef([
        {id: '0', obj: 'Row 1'},
        {id: '1', obj: 'Row 2'}
    ])
    function setStyle(id: string, style: React.CSSProperties){
        objects.current = objects.current.map((object)=>{
            if(object.id === id){
                object.style = {...style}
            }
            return object
        })
        setState({})
    }

    return <Container>
            <Row>
                <Col sm={2} md={1}>
                    <button onClick={()=>{
                        objects.current.push({id: (new Date().getTime()).toString(), obj: 'New Row', style: {width: '5vw', height: '5vh', left: '5vw', top: '5vh'}})
                        setState({})
                    }}>Add Row</button>
                </Col>
                <Col>
                    <UserProfile ip={props.ip} setUser={setUser}/>
                </Col>
                <Col sm={2} md={1}>
                    <UserLogin homepage={'sandbox/test'}/>
                </Col>
            </Row>
            <Row style={{position: 'relative'}}>
                {objects.current.map(
                    (object, index)=>{
                        return <CssSlidersWrapper key={index} style={object.style || {width: 5*(index+1)+'vw', height: 5*(index+1)+'vh', left: 5*(index+1)+'vw',top: 5*(index+1)+'vh'}} setStyle={setStyle} id={'row_'+object.id}>
                            <a href={'#'} style={{float: "right"}} onClick={()=>{
                                objects.current = objects.current.filter((obj)=>{return obj.id !== object.id})
                                setState({})
                            }}>X</a>
                            {object.obj}
                        </CssSlidersWrapper>
                    }
                )}
            </Row>
        </Container>
}
