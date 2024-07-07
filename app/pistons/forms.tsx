'use client'
import { Dispatch, useRef, useEffect, Fragment, useMemo } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { pActions, reActions, useDynamicContext } from "./provider"
import D20, { albt22, diceInitProps, diceProps } from "../../components/dice"
import { rand, responsive } from "./util"
import Chat from "../chat/chat"
import useLoop from "../../lib/util/^loop"


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
    style?: any
}

/**
 * VERSE COMPONENTS
 */
export function DisplayGroup({id, bgColor, bgImage, bgGradient, bgAlt, children}: ColProps){
    const {state, dispatch} = useDynamicContext()
    return <Col id={id} xs={12} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', top: '0px', left: '0px', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', top: '0px', left: '0px', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row xs={1} sm={2} style={{position: 'relative', zIndex: 1, width: '100%', textAlign: 'center'}}>
            {children[0] || null}
            {children[1] || null}
        </Row>
    </Col>
}
export function ControlGroup({id, bgColor, bgImage, bgGradient, bgAlt, children}: ColProps){
    const {state, dispatch} = useDynamicContext()
    return <Col id={id} xs={12} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', top: '0px', left: '0px', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', top: '0px', left: '0px', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row xs={1} sm={2} style={{position: 'relative', zIndex: 1, width: '100%', textAlign: 'center'}}>
            {children[0] || null}
            {children[1] || null}
        </Row>
    </Col>
}
export function ContentPanel(){
    
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
        <Row>
            <InfoHeader id="piston-resources" bgColor={'#777'}>
                <Col xs={4} sm={4} md={3} lg={2} style={{textAlign: 'center'}}>
                        PISTONS
                </Col>
                {state.piston && Object.entries(state.piston).map((item, i)=>{
                    return <Fragment key={'piston-resources1'+i}><Col xs={4} sm={4} md={3} lg={2} style={{textAlign: 'center'}}>
                            {item[0]}<br/>{JSON.stringify(item[1])}
                    </Col></Fragment>
                })}
            </InfoHeader>
        </Row>
        <Row>
            <InfoHeader id="ore-resources" bgColor={'#777'}>
                <Col xs={4} sm={4} md={3} lg={2} style={{textAlign: 'center'}}>
                        ORE
                </Col>
                {state.ore && Object.entries(state.ore).map((item: any, i)=>{
                    return <Fragment key={'piston-resources2'+i}><Col xs={4} sm={4} md={3} lg={2} style={{textAlign: 'center'}}>
                            {item[0]}<br/>{item[1].count}
                    </Col></Fragment>
                })}
            </InfoHeader>
        </Row>
        {/*<Row><InfoHeader id="inventory-resources" bgColor={'#aaa'}>
            {['Resources', 'stone', 'wood', 'ore', 'clay', 'fish'].map((item, i)=>{
                return <Fragment key={'inventory-resources'+i}><Col xs={4} sm={4} md={3} lg={2} style={{textAlign: 'center'}}>
                    {(item=='Resources' || item=='Materials')?item:
                            <>{item}<br/>{state[item.toLowerCase()]}</>}
                </Col></Fragment>
            })}
        </InfoHeader></Row>*/}
        
    </Col>
}

/**
 * LEGACY COMPONENTS
 */
//zone template
export function InfoHeader({id, bgColor, children}:{id: string, bgColor: string, children: any}){
    return <Col id={id} xs={12} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', top: '0px', left: '0px', backgroundColor: bgColor, opacity: '.7'}}></div>
        <Row style={{position: 'relative', zIndex: 1}}>
            {children}
        </Row>
    </Col>
}

export function FGx({id, colx, bgColor, bgImage, bgGradient, bgAlt, children, helper, global, style}: ColProps){
    const {state, dispatch} = useDynamicContext()
    if(!state.location?.forms?.includes(id) && !global)return
    return <Col id={id} {...responsive(colx)} style={{...style, position: 'relative', padding: '5px', justifyContent: 'center'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', top: '0px', left: '0px', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', top: '0px', left: '0px', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row style={{position: 'relative', textAlign: 'center', justifyContent: 'center'/*, maxHeight: '30vh'*/}}>
            {children}
        </Row>
    </Col>
}
export const ChatForm = ({user})=>{
    return <Col xs={12} style={{maxHeight: '30vh'}}>
            <Chat user={user} homepage={'redux_temple'}/>
        </Col>
}

export const Piston = ({id, power}:{id: string, power?: number})=>{
    const {state, dispatch} = useDynamicContext()
    const cd = useMemo(()=>state.cooldown?.[id] || 0, [state.cooldown?.[id]])
    const setCd = (newCd)=>dispatch({type: 'cooldown', payload: {id: id, value: newCd}})
    const cyclePiston = ()=>{dispatch({type: 'piston', payload: {energy: power || 4}})}
    const time = /**/7/*config*/
    useLoop(()=>{if(cd>0)setCd(cd-1)},1000,[cd])
    return <Col style={{position: 'relative'}}>
                <div style={{
                    zIndex: 1,position: 'absolute', transition: 'all 1s linear', width: '100%', 
                    height: (cd==7?0:cd==6?20:cd==5?40:cd==4?60:cd==3?80:cd==2?90:cd==1?100:0)+'%', 
                    top: '0px', left: '0px', borderRadius: '20px', backgroundColor: '#777', opacity: '1'
                }}></div>
                <Button onClick={()=>{
                        setCd(time)
                        setTimeout(cyclePiston, time*1000)
                    }} disabled={cd>0}>Piston_{power || 4}</Button>cd: {cd}
            </Col>
}
export const IxJ = ({i,j, children})=>{
    let ar = [...Array(i)].map(()=>{return [...Array(j)].map(()=>1)})
    return <Col style={{position: 'relative', justifyContent: 'center'}}>
                <Row>
                    {ar.map((row, j)=>{
                        //console.log('ar row ', i, row)
                        return <Fragment key={'oreMineR'+j}><Row>
                            {row.map((item, i)=>{
                                return <Fragment key={'oreMineR'+j+'x'+i}><Col style={{justifyContent: 'center'}}>
                                    {children}
                                </Col></Fragment>
                            })}
                        </Row></Fragment>
                    })}
                </Row>
            </Col>
}
export const Mine = ({id, i,j})=>{
    let ar = [...Array(i)].map(()=>{return [...Array(j)].map(()=>1)})
    return <Col style={{position: 'relative', justifyContent: 'center'}}>
                <Row>
                    {ar.map((row, j)=>{
                        //console.log('ar row ', i, row)
                        return <Fragment key={'oreMineR'+j}><Row>
                            {row.map((item, i)=>{
                                return <Fragment key={'oreMineR'+j+'x'+i}><Col style={{justifyContent: 'center'}}>
                                    <MineButton id={'ore'+j+'x'+i} mineId={id}/>
                                </Col></Fragment>
                            })}
                        </Row></Fragment>
                    })}
                </Row>
            </Col>
}
export const MineButton = ({id, mineId}: {id: string, mineId: string})=>{
    
    const {state, dispatch} = useDynamicContext()
    const time = /**/20/*config*/
    
    const oreType = (oreQ): string=>{
        switch(oreQ){
            case 1: return 'copper'
            case 2: return 'tin'
            case 3: return 'iron'
            case 4: return 'gold'
            default: return 'stone'
        }
    }
    const cd = useMemo(()=>state.cooldown?.[id] || 0, [state.cooldown?.[id]])
    const setCd = (newCd)=>dispatch({type: 'cooldown', payload: {id: id, value: newCd}})
    const typeNum = useMemo(()=>state.switch?.['oreTypeId'+id] || 0, [state.switch?.['oreTypeId'+id]])
    const setTypeNum = (newTypeNum)=>dispatch({type: 'switch', payload: {id: 'oreTypeId'+id, value: newTypeNum}})
    const pickOre = ()=>{dispatch({type: 'ore', payload: {type: oreType(typeNum)}})}
    useLoop(()=>{if(cd<time){setCd(cd+1)};if(cd==0)setTypeNum(rand(7))},1000,[cd])
    return <div style={{
                position: 'relative', width: '77px', height: '77px', 
                borderRadius: '20px', backgroundColor: 'transparent', margin: 'auto'
            }}>

                <div style={{
                    zIndex: 1,position: 'absolute', transition: 'all 1s linear', width: '100%', 
                    height: '100%', top: '0px', left: '0px', borderRadius: '20px', backgroundColor: 'transparent', 
                    backgroundImage: `radial-gradient(#00000000 20%, #${
                        typeNum==1?'00aa88':typeNum==2?'aaaaaa':typeNum==3?'aa8800':typeNum==4?'aaaa00':'777777'
                    }dd 45%, #00000000 70%)`, 
                    opacity: cd/20
                }} onClick={()=>{
                    if(cd<20)return
                    setCd(0)
                    pickOre()
                    //setTimeout(f, time*1000)
                }}></div>

            </div>
    }

export const ActionFactory = ()=>{
    const {state, dispatch} = useDynamicContext()

    function Selector({children}){
        return <Col>
            <select onChange={(e)=>{ dispatch({type:'switch',payload: {id: 'actfact', value: e.target.value}}) }} value={state.switch?.actfact || 'piston'}>
                {Object.entries(reActions).map((item, i)=>{
                    return <option key={'actionFactory'+i} value={item[0]}>{item[0]}</option>
                })}
            </select>
            {children}
        </Col>
    }
    function AddPiston(){//broken button. causes data wipe
        return <Button onClick={()=>{
                dispatch({type: 'action', payload: 'piston'})
            }} disabled={state.piston?.actions<pActions.piston.cost}>Add Piston<br/>-{pActions.piston.cost} actions</Button>
    }
    
    switch(state.switch?.actfact){
        case 'piston': return <Selector><AddPiston/></Selector>
        default: return <Selector>WIP</Selector>
    }

}