import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DiceWidget, { useDiceRoll } from "../../components/dice";
import Dialog from "../../components/dialog";
import requestIp from 'request-ip';
import { GetServerSideProps } from "next";
import { LoginNav, Profile } from "../login/[userlogin]";
import SimpleNav from "../../components/simplenav";
import Clock from "../../components/clock";
import TLiterator from "../../components/hebrew";
import Mouse from "../../components/mouse";
import { useMousePosition } from "../../components/mouse";
import Chat from "../../app/chat/chat";

export const styleFlat = {
    border: '0px',
    margin: '0px',
    padding: '0px'
}

export type componentToolProps = {
    name: string,
    description: string,
    image: string,
    jsx: JSX.Element,
}
type diceProps = {
    id: string, 
    sides: number,
    speed: number,
    size: {xs?: number, sm?: number, md?: number, lg?: number, xl?: number},
    style?: {}
}
type dialogProps = {
    id: string, 
    title: string, 
    content: string, 
    open: string, 
    close: string, 
    size: {xs?: number, sm?: number, md?: number, lg?: number, xl?: number},
    style?: {}
}
type navProps = {
    id: string,
    root: string,
    page: string,
    links: string[],
    args: string[],
    size: {xs?: number, sm?: number, md?: number, lg?: number, xl?: number},
    style?: {}
}
export type toolBeltState = {
    debug: {renders: number},
    user: {username: string, email: string, access: number},
    toolShop: componentToolProps[],
    toolBelt: {name: string, element: JSX.Element, props: any}[],
    toolProps: {name: string, props: any}[],
    dataHelper: {
        key: number
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
        toolProps: [],
        dataHelper: {
            key: 0,
        }
    }
    function reducer (state: toolBeltState, action: {type: string, payload: any}){
        switch (action.type) {
            case ACTIONS.INITIALIZE:
                //console.log('INITIALIZE '+JSON.stringify(action.payload.toolShop))
                return {...state, toolShop: action.payload.toolShop};
            case ACTIONS.ADDTOOL:
                return {...state, 
                    toolBelt: [...state.toolBelt, action.payload.tool],
                    dataHelper: {...state.dataHelper,  key: state.dataHelper.key+1}
                };
            case ACTIONS.REMOVETOOL:
                return {...state, 
                    toolBelt: state.toolBelt.filter((tool, i) => i!=action.payload.index),
                    toopProps: state.toolProps.filter((tool, i) => i!=action.payload.index)
                };
            case ACTIONS.SETUSER:
                return {...state, user: action.payload.user};
            case ACTIONS.NEXTKEY:
                return {...state, dataHelper: {...state.dataHelper, key: state.dataHelper.key+1}};
            default:
                throw new Error()
        }
    }
    const [state, dispatch]: [toolBeltState, any] = useReducer(reducer, defaultState);
    //INITIALIZE SHOP
    const dispatchAddTool = (formData, element)=>{dispatch({type: ACTIONS.ADDTOOL, payload: {tool: {name: formData.current.id, element: element, props: formData.current}}});}
    const SizeProps = ({setSize})=>{
        const size = useRef({xs: null, sm: null, md: null, lg: null, xl: null});
        return <Row><Col>
            xs:<input type='number' min='1' max='12' defaultValue={size.current.xs} onChange={(e)=>{size.current.xs=Number.parseInt(e.target.value);setSize(size)}}/>
            sm:<input type='number' min='1' max='12' defaultValue={size.current.sm} onChange={(e)=>{size.current.sm=Number.parseInt(e.target.value);setSize(size)}}/>
            md:<input type='number' min='1' max='12' defaultValue={size.current.md} onChange={(e)=>{size.current.md=Number.parseInt(e.target.value);setSize(size)}}/>
            lg:<input type='number' min='1' max='12' defaultValue={size.current.lg} onChange={(e)=>{size.current.lg=Number.parseInt(e.target.value);setSize(size)}}/>
            xl:<input type='number' min='1' max='12' defaultValue={size.current.xl} onChange={(e)=>{size.current.xl=Number.parseInt(e.target.value);setSize(size)}}/>
        </Col></Row>
    }
    const Dice = ()=> {
        const render = useState({})[1];
        const formData: {current: diceProps} = useRef({
            id: 'Dice'+state.dataHelper.key,
            sides: 6,
            speed: 5,
            size: {xs: null, sm: null, md: null, lg: null, xl: null},
            style: {}
        });
        const dataManager = ()=>useDiceRoll({sides: formData.current.sides, speed: formData.current.speed})
        const element: JSX.Element = <DiceWidget udr={dataManager} />
        const setSize = (size: {xs: number, sm: number, md: number, lg: number, xl: number})=>{
            formData.current.size = size;
            render({});
        }
        
        return <>
        <Row><Col>
            <input type='number' min='1' max='100' defaultValue={formData.current.sides} onChange={(e)=>{formData.current.sides=Number.parseInt(e.target.value);render({})}}/>
        </Col></Row>
        <Row><Col>
            <input type='number' min='1' max='100' defaultValue={formData.current.speed} onChange={(e)=>{formData.current.speed=Number.parseInt(e.target.value);render({})}}/>
        </Col></Row>
        <SizeProps setSize={setSize}/>
        <Row><Col>
            <Button onClick={()=>dispatchAddTool(formData, element)}>Add {formData.current.id}</Button>
        </Col></Row></>
    }
    const SNav = ()=> {
        const render = useState({})[1];
        const formData: {current: navProps} = useRef({
            id: 'SimpleNav'+state.dataHelper.key,
            root: 'http://localhost:3000',
            page: 'home',
            links: ['home', 'about', 'contact'],
            args: [],
            size: {xs: 12, sm: 12, md: 12, lg: 12, xl: 12},
            style: {}
        });
        const element: JSX.Element = <SimpleNav root={formData.current.root} page={formData.current.page} links={formData.current.links} args={formData.current.args}/>
        const setSize = (size: {xs: number, sm: number, md: number, lg: number, xl: number})=>{
            formData.current.size = size;
            render({});
        }
        return<>
        <Row><Col>
            Root {'('}include 'http://' or 'https://' when entering a url, otherwise root points to current site page root{')'}: <input type='text' defaultValue={formData.current.root} onChange={(e)=>formData.current.root=e.target.value}/>
        </Col></Row>
        <Row><Col>
            Nav Home Page<span style={{color: 'red'}}>*</span>: <input required type='text' defaultValue={formData.current.page} onChange={(e)=>{formData.current.page=e.target.value;render({})}}/>
        </Col></Row>
        <Row><Col>
            Nav Links {'('}comma separated{')'}: <input type='text' defaultValue={''} onChange={(e)=>formData.current.links=e.target.value.replaceAll(' ','').split(',')}/>
        </Col></Row>
        <Row><Col>
            Nav Arguments {'('}comma separated and applies to all links{')'}: <input type='text' defaultValue={''} onChange={(e)=>formData.current.args=e.target.value.replaceAll(' ','').replaceAll(',','&,').split(',')}/>
        </Col></Row>
        <SizeProps setSize={setSize}/>
        <Row><Col>
            <Button onClick={formData.current.page?()=>{dispatchAddTool(formData, element)}:()=>alert('page is required')}>Add {formData.current.id}</Button>
        </Col></Row>
        </>
    }
    const DLog = ()=> {
        const [nav, setNav] = useState(false);
        const P: dialogProps = state.toolProps.filter((tool)=>tool.name=='Dialog')[0]?.props || null;
        const render = useState({})[1];
        const formData: {current: dialogProps} = useRef({id: P?.id, title: P?.title, content: P?.content, open: P?.open, close: P?.close, size: P?.size, style: P?.style});
        const dialog: JSX.Element = <Dialog id={formData.current.id+state.dataHelper.key} title={formData.current.title} content={formData.current.content} open={formData.current.open} close={formData.current.close}/>
        const setSize = (size: {xs: number, sm: number, md: number, lg: number, xl: number})=>{
            formData.current.size = size;
            render({});
        }

        return<>
        {nav?dialog:
        <><Row><Col>
            Title: <input type='text' defaultValue={formData.current.title} onChange={(e)=>formData.current.title=e.target.value}/>
        </Col></Row>
        <Row><Col>
            Content: <input required type='text' defaultValue={formData.current.content} onChange={(e)=>{formData.current.content=e.target.value;render({})}}/>
        </Col></Row>
        <Row><Col>
            Open: <input type='text' defaultValue={''} onChange={(e)=>formData.current.open=e.target.value}/>
        </Col></Row>
        <Row><Col>
            Close: <input type='text' defaultValue={''} onChange={(e)=>formData.current.close=e.target.value}/>
        </Col></Row>
        <SizeProps setSize={setSize}/>
        <Row><Col>
            <Button onClick={()=>{dispatch({type: ACTIONS.ADDTOOL, payload: {jsx: dialog}});setNav(true);}}>Add Tool</Button>
        </Col></Row></>}
        </>
    }
    const toolShop: componentToolProps[] = [
        {/** Dice Widget */
            name: 'Dice_Widget',
            description: 'customize dice rolls',
            image: '',
            jsx: <Dice/>,
        },
        {/** Aspect Bridge Chat */
            name: 'Chat_Window',
            description: 'discorse apon a bridge',
            image: '',
            jsx: <Chat homepage={'toolbelt'}/>,
        },
        {/** SimpleNav */
            name: 'Simple_Nav',
            description: 'a simple navigation bar',
            image: '',
            jsx: <SNav/>,
        },
        {/** Dialog */
            name: 'Dialog',
            description: 'a dialog box',
            image: '',
            jsx: <DLog/>,
        },
        {/** Clock */
            name: 'Clock',
            description: 'a clock',
            image: '',
            jsx: <Clock/>,
        },
        {/** Hebrew */
            name: 'Hebrew',
            description: 'a hebrew transliterator',
            image: '',
            jsx: <TLiterator/>,
        },
        /*{/** Mouse *
            name: 'Mouse',
            description: 'a mouse pointer tracker',
            image: '',
            jsx: <Mouse/>,
        },*/
    ]
    useEffect(()=>{
        dispatch({type: ACTIONS.INITIALIZE, payload: {toolShop: toolShop}})
    }, [state.user, state.dataHelper.key])
    const Debug = () => {return <>Renders: {state.debug.renders}</>}

    const mapToolButtons = ()=>state.toolShop?.map((tool, i) => {
        /*console.log(tool);*/
        return <Col key={i}><Dialog id={tool.name} title={tool.name} content={
                /*<Button  onClick={()=>
                    dispatch({type: ACTIONS.ADDTOOL, payload: {tool: tool, toolProps: tool.useData?tool.useData():null}})
                }>Add {tool.name}</Button>*/
                tool.jsx
            } open={tool.name} close={'>-<'}/></Col>})
    const ButtonToolbeltShop = ()=>{
        return <Row><Col><Dialog id={'toolshop'} title={'toolshop'} content={
            <Row>{mapToolButtons()}</Row>
        } open={'toolshop'} close={'>-<'}/></Col></Row>}
    /****/

    //Pocket
    const ToolSlots = () => {
        return <Row>
            {state.toolBelt.map((tool, i) => {
                const {xs, sm, md, lg, xl} = tool.props.size || {xs: 12, sm: 6, md: 6}
                let name = tool.name.split('_')[0].toUpperCase()
                let letters = []
                for(let i=0; i<name.length; i++) {
                    letters.push(name.charAt(i))
                }
                return <Col key={i} xs={xs} sm={sm} md={md} lg={lg} xl={xl}><Row>
                    <Col xs={1} style={styleFlat}>
                        {letters.map((l,i)=><div key={i}>{l}<br/></div>)}<br/>
                        <Button style={{...styleFlat, border: '1px outset darkgrey', borderRadius: '2px', marginRight: '2px'}} onClick={()=>{dispatch({type: ACTIONS.REMOVETOOL, payload: {index: i}})}}>X</Button>
                    </Col>
                    <Col xs={11} style={styleFlat}>{tool.element}</Col>
                </Row></Col>
            })}
        </Row>
    }
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
            <ButtonToolbeltShop/>
            <ToolSlots/>
        </Container>
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const ip = await requestIp.getClientIp(context.req);
    return { props: { ip } };
  };