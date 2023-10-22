'use client'
import { Dispatch, useRef, useState, useEffect, Fragment } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDynamicContext } from "./provider"
import D20, { albt22, diceInitProps, diceProps } from "../../components/dice"
import Chat from "../chat/chat"


export default function Nowhere(){return <></>}
export type ColProps = {
    id: string,
    colx?: number,
    bgColor?: string,
    bgImage?: string,
    bgGradient?: string,
    bgAlt?: string,
    children: any,
    helper?: boolean,
    global?: boolean
}

/**
 * VERSE COMPONENTS
 */
export function DisplayGroup({id, bgColor, bgImage, bgGradient, bgAlt, children}: ColProps){
    const {state, dispatch} = useDynamicContext()
    return <Col id={id} xs={12} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row xs={1} sm={2} style={{position: 'relative', zIndex: 1, width: '100%', textAlign: 'center'}}>
            {children[0] || null}
            {children[1] || null}
        </Row>
    </Col>
}
export function ControlGroup({id, bgColor, bgImage, bgGradient, bgAlt, children}: ColProps){
    const {state, dispatch} = useDynamicContext()
    return <Col id={id} xs={12} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row xs={1} sm={2} style={{position: 'relative', zIndex: 1, width: '100%', textAlign: 'center'}}>
            {children[0] || null}
            {children[1] || null}
        </Row>
    </Col>
}
export function ContentPanel(){
    
    const [exP, setExP]: [Partial<diceProps>, Dispatch<any>] = useState({sides: 22, speed: 5})
    const {state, dispatch} = useDynamicContext()
    return <Col xs={12} sm={6}>
        Life brought you here<br/>
        Curiocity is your fuel<br/>
        Self discovery is your purpose<br/>
        <br/>
        You are a soul in the river of life
    </Col>
}
export function InfoPanel(){
    const {state, dispatch} = useDynamicContext()
    return <Col xs={12} sm={6}>
        <Row><InfoHeader id="inventory_resources" bgColor={'#aaa'}>
            {['Resources', 'stone', 'wood', 'ore', 'clay', 'fish'].map((item, i)=>{
                return <Col key={i} xs={4} sm={3} md={2} lg={1} style={{textAlign: 'center'}}>
                    {(item=='Resources' || item=='Materials')?item:
                            <>{item}<br/>{state[item.toLowerCase()]}</>}
                </Col>
            })}
        </InfoHeader></Row>
        <Row><InfoHeader id="inventory_materials" bgColor={'#777'}>
            {['Materials', 'tile', 'lumber', 'metal', 'brick'].map((item, i)=>{
                return <Col key={i} xs={4} sm={3} md={2} lg={1} style={{textAlign: 'center'}}>
                    {(item=='Resources' || item=='Materials')?item:
                            <>{item}<br/>{state[item.toLowerCase()]}</>}
                </Col>
            })} 
        </InfoHeader></Row>
    </Col>
}
export function ChatPanel(){return<Col xs={12} sm={12} md={6} lg={4}>CHAT<Chat/></Col>}
export function InterfacePanel(){return<></>}

/**
 * LEGACY COMPONENTS
 */
//zone template
export function InfoHeader({id, bgColor, children}:{id: string, bgColor: string, children: any}){
    return <Col id={id} xs={12} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: bgColor, opacity: '.7'}}></div>
        <Row style={{position: 'relative', zIndex: 1}}>
            {children}
        </Row>
    </Col>
}
export function FormGroup({id, bgColor, bgImage, bgGradient, bgAlt, children, helper, global}: ColProps){
    const {state, dispatch} = useDynamicContext()
    if(!state.location?.forms?.includes(id) && !global)return
    return <Col id={id} xs={12} sm={6} md={4} lg={3} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row style={{position: 'relative', width: '100%', textAlign: 'center'}}>
            <Col xs={4}><h4>{id}</h4></Col>
            {helper && <Col xs={8}>
                <Row>
                    <Col xs={5}>
                        <Button onClick={()=>{dispatch({type: 'hire', payload: {type: id.toLowerCase(), fee: 20}})}}>Hire:</Button>
                    </Col>
                    <Col xs={7}>
                        <div style={{backgroundColor: '#777777aa'}}>Helpers: {state.helpers?.[id.toLowerCase()]}<br/>-20 Fish</div>
                    </Col>
                </Row>
            </Col>}
        </Row>
        <Row style={{position: 'relative', textAlign: 'center', justifyContent: 'center'}}>
            {children}
        </Row>
    </Col>
}

//Form Group 1 per row
export function FG1({id, bgColor, bgImage, bgGradient, bgAlt, children, helper, global}: ColProps){
    const {state, dispatch} = useDynamicContext()
    if(!state.location?.forms?.includes(id) && !global)return
    return <Col id={id} xs={12} sm={12} md={12} lg={12} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row style={{position: 'relative', textAlign: 'center', justifyContent: 'center'}}>
            {children}
        </Row>
    </Col>
}
//Form Group 2 per row
export function FG2({id, bgColor, bgImage, bgGradient, bgAlt, children, helper, global}: ColProps){
    const {state, dispatch} = useDynamicContext()
    if(!state.location?.forms?.includes(id) && !global)return
    return <Col id={id} xs={12} sm={6} md={6} lg={6} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row style={{position: 'relative', textAlign: 'center', justifyContent: 'center'}}>
            {children}
        </Row>
    </Col>
}
//Form Group 3 per row
export function FG3({id, bgColor, bgImage, bgGradient, bgAlt, children, helper, global}: ColProps){
    const {state, dispatch} = useDynamicContext()
    if(!state.location?.forms?.includes(id) && !global)return
    return <Col id={id} xs={12} sm={6} md={4} lg={4} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row style={{position: 'relative', textAlign: 'center', justifyContent: 'center'}}>
            {children}
        </Row>
    </Col>
}
//Form Group 4 per row
export function FG4({id, bgColor, bgImage, bgGradient, bgAlt, children, helper, global}: ColProps){
    const {state, dispatch} = useDynamicContext()
    if(!state.location?.forms?.includes(id) && !global)return
    return <Col id={id} xs={6} sm={4} md={3} lg={3} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row style={{position: 'relative', textAlign: 'center', justifyContent: 'center'}}>
            {children}
        </Row>
    </Col>
}
//Form Group 5 per row
export function FGx({id, colx, bgColor, bgImage, bgGradient, bgAlt, children, helper, global}: ColProps){
    const {state, dispatch} = useDynamicContext()
    if(!state.location?.forms?.includes(id) && !global)return
    return <Col id={id} 
                xs={colx==1?12:colx==2?12:colx==3?12:colx==4?12:colx==6?6:colx==12?4:12} 
                sm={colx==1?12:colx==2?12:colx==3?12:colx==4?6:colx==6?4:colx==12?3:12}
                md={colx==1?12:colx==2?12:colx==3?6:colx==4?4:colx==6?3:colx==12?2:12} 
                lg={colx==1?12:colx==2?6:colx==3?4:colx==4?3:colx==6?2:colx==12?1:12} 
                style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row style={{position: 'relative', textAlign: 'center', justifyContent: 'center'}}>
            {children}
        </Row>
    </Col>
}

export const Piston = ()=>{
    const {state, dispatch} = useDynamicContext()
    return <>
            <Col>Actions: {state.piston?.actions}<br/><Button onClick={()=>{dispatch({type: 'piston', payload: {energy: 3}})}}>e3</Button></Col>
    </>
}