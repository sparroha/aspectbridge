import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DiceWidget, { useDiceRoll } from "../../components/dice";
import Dialog from "../../components/dialog";
import Chat from "../chat";
import requestIp from 'request-ip';
import { GetServerSideProps } from "next";
import { LoginNav, Profile } from "../login/[userlogin]";
import SimpleNav from "../../components/simplenav";
import { Clock } from "../../components/clock";
import TLiterator from "../../components/hebrew";
import Mouse from "../../components/mouse";
import { useMousePosition } from "../../components/mouse";

export const styleFlat = {
    border: '0px',
    margin: '0px',
    padding: '0px'
}

export type componentToolProps = {
    name: string,
    description: string,
    image: string,
    useData: Function,
    jsx: JSX.Element,
    size: {xs?: number, sm?: number, md?: number, lg?: number, xl?: number}
}
type dialogProps = {
        key: number, 
        id: string, 
        title: string, 
        content: string, 
        open: string, 
        close: string, 
        style: {}
    }
export type toolBeltState = {
    debug: {renders: number},
    user: {username: string, email: string, access: number},
    toolShop: componentToolProps[],
    toolBelt: JSX.Element[],
    dataHelper: {
        useDice: Function,
        chat: JSX.Element,
        dialog: dialogProps
    }
}
const ACTIONS = {
    INITIALIZE: 'initialize',
    SETUSER: 'setuser',
    ADDTOOL: 'addtool',
    REMOVETOOL: 'removetool',
    NEXTKEY: 'nextkey'
}
export default function Toolbelt(props) {
    const defaultState: toolBeltState = {
        debug: {renders: 0},
        user: null,
        toolShop: [],
        toolBelt: [],
        dataHelper: {
            useDice: ()=>useDiceRoll({sides: 5, speed: 5}),
            chat: null,
            dialog: {
                key: 0, 
                id: 'Dialog', 
                title: 'Dialog', 
                content: 'Dialog content', 
                open: 'Open', 
                close: 'Close', 
                style: {}
            },
        }
    }
    function reducer (state: toolBeltState, action: {type: string, payload: any}){
        switch (action.type) {
            case ACTIONS.INITIALIZE://TODO: X/dispatch this action on page load
                //console.log('INITIALIZE '+JSON.stringify(action.payload.toolShop))
                return {...state, toolShop: action.payload.toolShop};
            case ACTIONS.ADDTOOL:
                return {...state, 
                    toolBelt: [...state.toolBelt,action.payload.tool],
                    dataHelper: {...state.dataHelper, dialog: {...state.dataHelper.dialog, key: state.dataHelper.dialog.key+1}}
                };
            case ACTIONS.REMOVETOOL:
                return {...state, toolBelt: state.toolBelt.filter((tool, i) => i!=action.payload.index)};
            case ACTIONS.SETUSER:
                return {...state, user: action.payload.user};
            case ACTIONS.NEXTKEY:
                return {...state, dataHelper: {...state.dataHelper, dialog: {...state.dataHelper.dialog, key: state.dataHelper.dialog.key+1}}};
            default:
                throw new Error()
        }
    }
    const [state, dispatch] = useReducer(reducer, defaultState);
    //INITIALIZE SHOP
    useEffect(()=>{
        dispatch({type: ACTIONS.INITIALIZE, payload: {
            toolShop: [
                {/** Dice Widget */
                    name: 'DiceWidget',
                    description: 'customize dice rolls',
                    image: '',
                    useData: state.dataHelper.useDice,
                    jsx: <DiceWidget udr={state.dataHelper.useDice} />,
                    size: {xs: 4}
                },
                {/** Aspect Bridge Chat */
                    name: 'ChatWindow',
                    description: 'discorse apon a bridge',
                    image: '',
                    useData: null,
                    jsx: <Chat user={state.user} homepage={'toolbelt'} ip={props.ip}/>,
                    size: {xs: 12, sm: 6, md: 6}
                },
                {/** Dialog */
                    name: 'Dialog',
                    description: 'a dialog box',
                    image: '',
                    useData: null,
                    jsx: <Dialog id={state.dataHelper.dialog.id+state.dataHelper.dialog.key} title={state.dataHelper.dialog.title} content={state.dataHelper.dialog.content} open={state.dataHelper.dialog.open} close={state.dataHelper.dialog.close}/>,
                    size: {xs: 4, sm: 4, md: 3, lg: 2, xl: 2} 
                },
                {/** Clock */
                    name: 'Clock',
                    description: 'a clock',
                    image: '',
                    useData: null,
                    jsx: <Clock/>,
                    size: {xs: 3, sm: 2, md: 1}
                },
                {/** Hebrew */
                    name: 'Hebrew',
                    description: 'a hebrew transliterator',
                    image: '',
                    useData: null,
                    jsx: <TLiterator/>,
                    size: {xs: 12, sm: 6, md: 6}
                },
                {/** Mouse */
                    name: 'Mouse',
                    description: 'a mouse pointer tracker',
                    image: '',
                    useData: useMousePosition,
                    jsx: <Mouse/>,
                    size: {xs: 12, sm: 6, md: 6}
                },
            ]
        }})
    }, [state.user, state.dataHelper.dialog])
    const Debug = () => {return <>Renders: {state.debug.renders}</>}
    const ButtonToolbelt = (props)=>{return <Row><Col><Dialog id={'toolshop'} title={'toolshop'} content={props.content} open={'toolshop'} close={'>-<'}/></Col></Row>}
    const toolButtonClick = (tool: componentToolProps) => {dispatch({type: ACTIONS.ADDTOOL, payload: {tool: tool}})}
    const toolButton = (tool: componentToolProps) => {return <Button  onClick={()=>toolButtonClick(tool)}>Add {tool.name}</Button>}
    const mapToolButtons = ()=>state.toolShop?.map((tool, i) => {/*console.log(tool);*/return <Col key={i}><Dialog id={tool.name} title={tool.name} content={toolButton(tool)} open={tool.name} close={'>-<'}/></Col>})
    const ToolShop = () => {return <ButtonToolbelt content={<Row>{mapToolButtons()}</Row>}/>}
    /****/

    //Pocket
    const ToolSlots = () => {
        return <Row>
            {state.toolBelt.map((tool, i) => {
                let {name, description, image, useData, jsx, size} = tool
                let {xs, sm, md, lg, xl} = size
                return <Col key={i} xs={xs} sm={sm} md={md} lg={lg} xl={xl}><Row>
                    <Col xs={2} style={styleFlat}>{name.split(' ')[0].charAt(0).toUpperCase()}<br/>{name.charAt(1).toUpperCase()}<br/>{name.charAt(2).toUpperCase()}<br/> <Button style={{...styleFlat, border: '1px outset darkgrey', borderRadius: '2px', marginRight: '2px'}} onClick={()=>{dispatch({type: ACTIONS.REMOVETOOL, payload: {index: i}})}}>X</Button></Col>
                    <Col xs={10} style={styleFlat}>{jsx}</Col>
                </Row></Col>
            })}
        </Row>
    }
    /*const ToolSlots = () => {
        function parseName({name}: {name: string}) {
            let NAME = name.split(' ')[0].toUpperCase()
            let letters = []
            for(let i=0; i<NAME.length; i++) {
                letters.push(NAME.charAt(i))
            }
            return letters
        }

        return <Row>
            {state.toolBelt.map((tool, i) => {
                let {name, description, image, useData, jsx, size} = tool
                let {xs, sm, md, lg, xl} = size
                return <Col key={i} xs={xs} sm={sm} md={md} lg={lg} xl={xl}><Row>
                    <Col xs={2} style={styleFlat}>
                        {parseName(name).map((letter, i) => <><span key={i}>{letter}</span><br/></>)}
                        <Button style={{...styleFlat, border: '1px outset darkgrey', borderRadius: '2px', marginRight: '2px'}} onClick={()=>{dispatch({type: ACTIONS.REMOVETOOL, payload: {index: i}})}}>X</Button></Col>
                    <Col xs={10} style={styleFlat}>{jsx}</Col>
                </Row></Col>
            })}
        </Row>
    }*/
    //Belt
    return <Container>
            <Row id={'AppSystem'} style={{textAlign: 'center'}}>
                <Col xs={4} style={{visibility: 'visible'}}>
                    <Debug/>
                </Col>
                <Col xs={8} style={{textAlign: 'center'}}>{/*provides standard login link for redirect;homepage=here*/}
                    <LoginNav user={state.user} homepage={'gather'} style={{textAlign: 'center'}}/>
                </Col>
                <Col xs={12} style={{visibility: 'visible'}}>{/*sets user state to provide user authentiation*/}
                    <Profile ip={props.ip} setUser={(data: any)=>{dispatch({type: ACTIONS.SETUSER, payload: {user: data}})}}/>
                </Col>
            </Row>
            <ToolShop/>
            <ToolSlots/>
        </Container>
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const ip = await requestIp.getClientIp(context.req);
    return { props: { ip } };
  };