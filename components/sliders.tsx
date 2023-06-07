import { useEffect, useRef, useState } from "react";
import Dialog from "./dialog";
import { Col, Container, Row } from "react-bootstrap";

export default function CssSlidersWrapper(props) {
    //{children}
    const controlStyle = {
        top: "0vh",
        left: "0vw",
        zIndex: 10,
    };
    const [state, setState] = useState({});
    const styleRef = useRef({
        top: "0vh",
        left: "0vw",
        width: '100vw',
        height: '100vh',
        opacity: '100%',
        borderRadius: '0%',
        borderWidth: '0%',
        //fontSize: '100%',
        margin: '0%',
        padding: '0%',
        color: 'black',
        display: 'flex',
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: 'gray',
        borderColor: 'black',
        ...props.style
    })

    useEffect(() => {
        props.setStyle(props.id, {...styleRef.current})
        console.log(props.id+" css sliders wrapper style updated")
    }, [state])

    /*const [content, setContent] = useState(<></>)
        useEffect(()=>{
            setContent(<>
                
            </>)
        },[])*/

    return (
        <div id={"csswrapper_"+props.id} style={{ ...props.styleRef, ...styleRef.current, position: 'absolute' }}>
            <div id={"csschild_" + props.id} style={{ width: '100vw', height: '100vh', position: 'relative' }}>
                <Dialog id={"csscontrol_" + props.id} style={{...controlStyle, float: 'right' }} title={'css sliders'} open={'<>'} close={'</>'}>
                    <Container>
                    <Row>
                        <Col xs={6}><label>{'width: '+styleRef.current.width+'  '}</label></Col>
                        <Col xs={6}><input
                            type="range"
                            name={"width"}
                            defaultValue={styleRef.current.width.split("vw")[0]}
                            onChange={(e) => { console.log("width=" + e.target.value); styleRef.current.width = e.target.value + "vw"; setState({}); }}//(Number.parseInt(e.target.value)<85?e.target.value:"85") + "vw"; setState({}); }}
                        /></Col>
                    </Row>
                    <Row>
                        <Col xs={6}><label>{'height: '+styleRef.current.height+'  '}</label></Col>
                        <Col xs={6}><input
                            type="range"
                            name={"height"}
                            defaultValue={styleRef.current.height.split("vh")[0]}
                            onChange={(e) => { console.log("height=" + e.target.value); styleRef.current.height = e.target.value + "vh"; setState({}); }}
                        /></Col>
                    </Row>
                    <Row>
                        <Col xs={6}><label>{'x: '+styleRef.current.left+'  '}</label></Col>
                        <Col xs={6}><input
                            type="range"
                            name={"left"}
                            defaultValue={styleRef.current.left.split("vw")[0]}
                            onChange={(e) => { console.log("x=" + e.target.value); styleRef.current.left = e.target.value + "vw"; setState({}); }}
                        /></Col>
                    </Row>
                    <Row>
                        <Col xs={6}><label>{'y: '}</label>
                        {styleRef.current.top+'  '}</Col>
                        <Col xs={6}><input
                            type="range"
                            name={"top"}
                            defaultValue={styleRef.current.top.split("vh")[0]}
                            onChange={(e) => { console.log("y=" + e.target.value); styleRef.current.top = e.target.value + "vh"; setState({}); }}
                        /></Col>
                    </Row>
                    <Row>
                        <Col xs={6}><label>{'opacity: '}</label>
                        {styleRef.current.opacity+'  '}</Col>
                        <Col xs={6}><input
                            type="range"
                            name={"opacity"}
                            defaultValue={styleRef.current.opacity.split("%")[0]}
                            onChange={(e) => { console.log("opacity=" + e.target.value); styleRef.current.opacity = e.target.value + "%"; setState({}); }}
                        /></Col>
                    </Row>
                    <Row>
                        <Col xs={6}><label>{'color: '}</label>
                        {styleRef.current.color+'  '}</Col>
                        <Col xs={6}><input
                            type="color"
                            name={"color"}
                            defaultValue={styleRef.current.color}
                            onChange={(e) => { console.log("color=" + e.target.value); styleRef.current.color = e.target.value; setState({}); }}
                        /></Col>
                    </Row>
                    <Row>
                        <Col xs={6}><label>{'background color: '}</label>
                        {styleRef.current.backgroundColor+'  '}</Col>
                        <Col xs={6}><input
                            type="color"
                            name={"backgroundColor"}
                            defaultValue={styleRef.current.backgroundColor}
                            onChange={(e) => { console.log("backgroundColor=" + e.target.value); styleRef.current.backgroundColor = e.target.value; setState({}); }}
                        /></Col>
                    </Row>
                    </Container>
                </Dialog>
                {props.children}
            </div>
        </div>
    );
}
