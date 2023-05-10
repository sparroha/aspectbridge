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
import JSXStyle from "styled-jsx/style";

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
type simpleNavProps = {
    id: string,
    root: string,
    page: string,
    links: string[],
    args: string[],
    style?: {}
}
export type toolBeltState = {
    debug: {renders: number},
    user: {username: string, email: string, access: number},
    toolShop: componentToolProps[],
    toolBelt: {name: string, element: JSX.Element}[],
    toolProps: {name: string, props: any}[],
    dataHelper: {
        key: number
        useDice: Function,
        chat: JSX.Element,
        //dialog: dialogProps
    }
}
const ACTIONS = {
    INITIALIZE: 'initialize',
    SETUSER: 'setuser',
    ADDTOOL: 'addtool',
    ADDPROPS: 'addprops',
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
            useDice: ()=>useDiceRoll({sides: 5, speed: 5}),
            chat: null,
            /*dialog: {
                id: 'Dialog', 
                title: 'Dialog', 
                content: 'Dialog content', 
                open: 'Open', 
                close: 'Close', 
                size: {xs: 12, sm: 12, md: 12, lg: 12, xl: 12},
                style: {}
            },*/
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
                    toolProps: [...state.toolProps, {name: action.payload.tool.name, props: null}],
                    dataHelper: {...state.dataHelper,  key: state.dataHelper.key+1}
                };
            case ACTIONS.ADDPROPS:
                let index = state.toolProps.findIndex((tool)=>tool.name==action.payload.name);
                let toolProps = [...state.toolProps];
                toolProps[index].props = action.payload.props;
                return {...state,
                    toolProps: [...toolProps]
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
    const SizeProps = ({setSize})=>{
        let size = {xs: 12, sm: 12, md: 12, lg: 12, xl: 12};
        const {xs, sm, md, lg, xl} = size;
        return <Row><Col>
            xs:<input type='number' min='1' max='12' defaultValue={xs} onChange={(e)=>{size.xs=Number.parseInt(e.target.value);setSize(size)}}/>
            sm:<input type='number' min='1' max='12' defaultValue={sm} onChange={(e)=>{size.sm=Number.parseInt(e.target.value);setSize(size)}}/>
            md:<input type='number' min='1' max='12' defaultValue={md} onChange={(e)=>{size.md=Number.parseInt(e.target.value);setSize(size)}}/>
            lg:<input type='number' min='1' max='12' defaultValue={lg} onChange={(e)=>{size.lg=Number.parseInt(e.target.value);setSize(size)}}/>
            xl:<input type='number' min='1' max='12' defaultValue={xl} onChange={(e)=>{size.xl=Number.parseInt(e.target.value);setSize(size)}}/>
        </Col></Row>
    }
    const Dice = ()=> {
        const [nav, setNav] = useState(false);
        const P: diceProps = state.toolProps.filter((tool)=>tool.name=='Dice_Widget')[0]?.props || null;
        const render = useState({})[1];
        const formData: {current: diceProps} = useRef({id: P?.id, sides: P?.sides, speed: P?.speed, size: P?.size, style: P?.style});
        const udr = ()=>useDiceRoll({sides: formData.current.sides, speed: formData.current.speed})
        const dice: JSX.Element = <DiceWidget udr={udr} />
        const setSize = (size: {xs: number, sm: number, md: number, lg: number, xl: number})=>{
            formData.current.size = size;
            render({});
        }
        
        return<>
        {nav?dice:
        <><Row><Col>
            <input type='number' min='1' max='100' defaultValue={formData.current.sides} onChange={(e)=>formData.current.sides=Number.parseInt(e.target.value)}/>
        </Col></Row>
        <Row><Col>
            <input type='number' min='1' max='100' defaultValue={formData.current.speed} onChange={(e)=>formData.current.speed=Number.parseInt(e.target.value)}/>
        </Col></Row>
        <SizeProps setSize={setSize}/>
        <Row><Col>
            <Button onClick={()=>{setNav(true)}}>Roll</Button>
        </Col></Row></>}
        </>
    }
    const SNav = ()=> {
        const P = state.toolProps.filter((tool)=>tool.name=='Simple_Nav')[0]?.props || null;
        const render = useState({})[1];
        const formData: {current: any} = useRef({root: P?.root, page: P?.page, links: P?.links, args: P?.args, nav: P?.nav, style: P?.style});
        const setSize = (size: {xs: number, sm: number, md: number, lg: number, xl: number})=>{
            formData.current.size = size;
            render({});
        }
        return<>
        {formData.current.nav?<SimpleNav root={formData.current.root} page={formData.current.page} links={formData.current.links} args={formData.current.args}/>:
        <><Row><Col>
            Root {'('}include 'http://' or 'https://' when entering a url, otherwise root points to current site page root{')'}: <input type='text' defaultValue={formData.current.root} onChange={(e)=>formData.current.root=e.target.value}/>
        </Col></Row>
        <Row><Col>
            Nav Home Page<span style={{color: 'red'}}>*</span>: <input required type='text' defaultValue={formData.current.page} onChange={(e)=>{formData.current.page=e.target.value;render({})}}/>
        </Col></Row>
        <Row><Col>
            Nav Links {'('}comma separated{')'}: <input type='text' defaultValue={''} onChange={(e)=>formData.current.links=e.target.value.replaceAll(' ','').split(',')}/>
        </Col></Row>
        <Row><Col>
            Nav Arguments {'('}comma separated and applies to all links{')'}: <input type='text' defaultValue={''} onChange={(e)=>formData.current.args='?'+e.target.value.replaceAll(' ','').split(',').map((arg)=>{return arg+'&'})}/>
        </Col></Row>
        <SizeProps setSize={setSize}/>
        <Row><Col>
            <Button onClick={formData.current.page?()=>{formData.current.nav=true;/*dispatch({type: ACTIONS.ADDPROPS, payload: {name: 'Simple_Nav', props: formData.current}});*/render({})}:()=>alert('page is required')}>Nav</Button>
        </Col></Row></>}
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
            useData: state.dataHelper.useDice,
            jsx: <Dice/>,
            size: {xs: 4}
        },
        {/** Aspect Bridge Chat */
            name: 'Chat_Window',
            description: 'discorse apon a bridge',
            image: '',
            useData: null,
            jsx: <Chat user={state.user} homepage={'toolbelt'} ip={props.ip}/>,
            size: {xs: 12, sm: 6, md: 6}
        },
        {/** SimpleNav */
            name: 'Simple_Nav',
            description: 'a simple navigation bar',
            image: '',
            useData: null,
            jsx: <SNav/>,
            size: {xs: 12, sm: 6, md: 6}
        },
        {/** Dialog */
            name: 'Dialog',
            description: 'a dialog box',
            image: '',
            useData: null,
            jsx: <DLog/>,
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
                //let {name, description, image, useData, jsx, size} = tool
                //let {xs, sm, md, lg, xl} = size
                let NAME = tool.name.split('_')[0].toUpperCase()
                let letters = []
                for(let i=0; i<NAME.length; i++) {
                    letters.push(NAME.charAt(i))
                }
                /*return <Col key={i} xs={xs} sm={sm} md={md} lg={lg} xl={xl}><Row>
                    <Col xs={2} style={styleFlat}>
                        {letters.map((l,i)=><div key={i}>{l}<br/></div>)}<br/>
                        <Button style={{...styleFlat, border: '1px outset darkgrey', borderRadius: '2px', marginRight: '2px'}} onClick={()=>{dispatch({type: ACTIONS.REMOVETOOL, payload: {index: i}})}}>X</Button>
                    </Col>
                    <Col xs={10} style={styleFlat}>{tool.jsx}</Col>
                </Row></Col>*/
                return <>{tool.element}</>
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