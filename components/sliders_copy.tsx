import { useEffect, useRef, useState } from "react";
import Dialog from "./dialog";
import { Button, Col, Container, Row } from "react-bootstrap";
import style from "./sliders.module.css";
import useRegister from "../lib/util/^register";

// props: style={object.style} setStyle={setStyle} id={'row_'+object.id}}
export default function CssSlidersWrapper(props) {
    //{children}
    const [controlerOpen, setControlerOpen] = useState(false)
    const [controlerTarget, setControlerTarget] = useState(null)

    //TODO:: FIX PLS
    //SAVE LOAD DATA
    const [styleRef, setStyleRef] = useRegister('csswrapper_'+props.id, {
        top: "0vh",
        left: "0vw",
        width: '100vw',
        height: '100vh',
        opacity: '100%',
        borderRadius: '0%',
        borderWidth: '0%',
        fontSize: 12,
        margin: '0%',
        padding: '0%',
        color: 'black',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'gray',
        borderStyle: 'solid',
        borderColor: 'black',
        borderShadow: 0,
        borderShadowColor: 'black',
        ...props.style
    })
    //END SAVE LOAD DATA

    const sliders = [
        { name: 'zIndex', min: 0, max: 10},
        { name: 'width', min: 0, max: 100, unit: 'vw' },
        { name: 'height', min: 0, max: 100, unit: 'vh' },
        { name: 'left', min: 0, max: 100, unit: 'vw' },
        { name: 'top', min: 0, max: 100, unit: 'vh' },
        { name: 'opacity', min: 0, max: 100, unit: '%' },
        { name: 'margin', min: 0, max: 100},
        { name: 'padding', min: 0, max: 100},
        { name: 'borderWidth', min: 0, max: 100, unit: 'px' },
        { name: 'borderRadius', min: 0, max: 50, unit: 'px' },
        { name: 'borderRadius', min: 0, max: 50, unit: '%' },
        { name: 'borderShadow', min: 0, max: 50},
        { name: 'fontSize', min: 0, max: 100},
    ]
    const slidersOption = [
        { name: 'display', options: ['flex', 'block', 'inline-block', 'inline', 'none'] },
        { name: 'alignItems', options: ['center', 'flex-start', 'flex-end', 'baseline', 'stretch'] },
        { name: 'justifyContent', options: ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly'] },
        { nane: 'borderStyle', options: ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden'] },
        { name: 'position', options: ['absolute', 'relative', 'fixed', 'sticky']}
    ]
    const slidersColor = [
        { name: 'color' },
        { name: 'backgroundColor' },
        { name: 'borderColor' },
        { name: 'borderShadowColor' },
    ]
    const q = false
    if(q)return (
        <div id={"csswrapper_"+props.id} style={{ ...props.styleRef, ...JSON.parse(styleRef), position: 'absolute' }}>
            <div id={"csschild_" + props.id} style={{ width: '100vw', height: '100vh', position: 'relative' }}>
                <Dialog id={"csscontrol_" + props.id} className={style.controlStyle} title={'css sliders'} open={'<>'} close={'</>'}>
                    <Container>
                        {sliders.map((slider, i) => {
                            return <Row key={i}>
                                <Col xs={6}><label>{slider.name + ': '+JSON.parse(styleRef)[slider.name]+'  '}</label>
                                </Col>
                                <Col xs={6}><input
                                    type="range"
                                    min={slider.min}
                                    max={slider.max}
                                    name={slider.name}
                                    defaultValue={JSON.parse(styleRef)[slider.name].split(slider.unit)[0]}
                                    onChange={(e) => { console.log(slider.name + "=" + e.target.value); JSON.parse(styleRef)[slider.name] = e.target.value + slider.unit; setStyleRef(styleRef); }}
                                /></Col>
                            </Row>
                        })}
                        {slidersColor.map((slider, i) => {
                            return <Row key={i}>
                                <Col xs={6}><label>{slider.name + ': '+JSON.parse(styleRef)[slider.name]+'  '}</label>
                                </Col>
                                <Col xs={6}><input
                                    type="color"
                                    name={slider.name}
                                    defaultValue={JSON.parse(styleRef)[slider.name]}
                                    onChange={(e) => { console.log(slider.name + "=" + e.target.value); JSON.parse(styleRef)[slider.name] = e.target.value; setStyleRef(JSON.parse(styleRef)); }}
                                /></Col>
                            </Row>
                        })}
                    </Container>
                </Dialog>
                {props.children}
            </div>
        </div>
    )
    else return <>
        <div id={"csswrapper_"+props.id} style={{...props.styleRef, ...JSON.parse(styleRef), position: 'absolute' }}>
            <div id={"csschild_" + props.id} style={{ width: '100vw', height: '100vh', position: 'relative' }}>
                <div id={"csscontrolerbutton_" + props.id} className={style.controlStyle} title={'css sliders'}>
                    <Button id={'csscontroleropen_'+props.id} onClick={
                        ()=>{setControlerOpen(!controlerOpen)}
                    }>{controlerOpen?'Close':'Open'}</Button>
                </div>
                {props.children}
            </div>
        </div>
        {controlerOpen?<CssControler sliders={sliders} slidersOption={slidersOption} slidersColor={slidersColor} styleRef={JSON.parse(styleRef)} setStyleRef={setStyleRef}/>:null}
    </>

}

export function CssControler(props){
    const {sliders, slidersOption, slidersColor, styleRef, setStyleRef} = props
    let styleR = styleRef
    return <div id={"csscontroler_" + props.id} style={{position: 'absolute', right: '0%', top: '0%', width: '300px', borderRadius: '25px', fontSize: '10px'}}>
        <div id={"csscontrolerBackground_" + props.id} className={'grey-back o4 w100 h100'} style={{position: 'absolute', borderRadius: '25px'}}></div>{/**translucent backdrop */}
        <div id={"csscontroler_" + props.id} style={{position: 'relative', padding: 10}}>
            {sliders.map((slider, i) => {
                return <Row key={i} style={{zIndex: 2}}>
                    <Col xs={6} style={{margin: 0, padding: 0}}><label>{slider.name + ': '+styleR[slider.name]+'  '}</label>
                    </Col>
                    <Col xs={6} style={{margin: 0, padding: 0}}><input
                        type="range"
                        min={slider.min}
                        max={slider.max}
                        name={slider.name}
                        defaultValue={slider.unit?styleR[slider.name].split(slider.unit)[0]:styleR[slider.name]}
                        onChange={(e) => { console.log(slider.name + "=" + e.target.value); styleR[slider.name] = slider.unit?(e.target.value + slider.unit):e.target.value; setStyleRef(styleR); }}
                    /></Col>
                </Row>
            })}
            {slidersOption.map((slider, i) => {
                return <Row key={i} style={{zIndex: 2}}>
                    <Col xs={6} style={{margin: 0, padding: 2}}><label>{slider.name + ': '+styleR[slider.name]+'  '}</label>
                    </Col>
                    <Col xs={6} style={{margin: 0, padding: 2}}><select
                        name={slider.name}
                        defaultValue={styleR[slider.name]}
                        onChange={(e) => { console.log(slider.name + "=" + e.target.value); styleR[slider.name] = e.target.value; setStyleRef(styleR); }}
                    >{slider.options.map((option, i) => {
                        return <option key={i} value={option}>{option}</option>
                    })}</select></Col>
                </Row>
            })}
            {slidersColor.map((slider, i) => {
                return <Row key={i} style={{zIndex: 2}}>
                    <Col xs={6} style={{margin: 0, padding: 2}}><label>{slider.name + ': '+styleR[slider.name]+'  '}</label>
                    </Col>
                    <Col xs={6} style={{margin: 0, padding: 2}}><input
                        type="color"
                        name={slider.name}
                        defaultValue={styleR[slider.name]}
                        onChange={(e) => { console.log(slider.name + "=" + e.target.value); styleR[slider.name] = e.target.value; setStyleRef(styleR); }}
                    /></Col>
                </Row>
            })}
        </div>
    </div>
}
