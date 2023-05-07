import { useMemo, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DiceWidget, { useDiceRoll } from "../../components/dice";
import Dialog from "../../components/dialog";
import Chat from "../chat";
import requestIp from 'request-ip';
import { GetServerSideProps } from "next";
import { LoginNav, Profile } from "../login/[userlogin]";

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
export default function Toolbelt(props) {
    const r = useState({})[1]
    const render = ()=>r({})
    const toolBelt: {current: componentToolProps[]} = useRef([])
    const user = useRef({})
    const setUser = (u)=>{user.current=u}

    /**
     * Tool Shop
     */
    /** Dice Widget Data Hook */
    const useDice = ()=>useDiceRoll({sides: 5, speed: 5})
    const getUser = ()=>{return user.current}


    /** Tool Shop Array */
    const toolShop: componentToolProps[] = useMemo(()=>{return [
        {/** Dice Widget */
            name: 'DiceWidget',
            description: 'customize dice rolls',
            image: '',
            useData: useDice,
            jsx: <DiceWidget udr={useDice} />,
            size: {xs: 4}
        },
        {/** Aspect Bridge Chat */
            name: 'ChatWindow',
            description: 'discorse apon a bridge',
            image: '',
            useData: null,
            jsx: <Chat user={getUser()} homepage={'toolbelt'} ip={props.ip}/>,
            size: {xs: 12, sm: 6, md: 6}
        },
        /*{** User Login Profile *causing continuous rerender
            name: 'UserLogin',
            description: 'login to your profile',
            image: '',
            useData: null,
            jsx: <>
                <LoginNav user={getUser()} homepage={'toolbelt'} style={styleFlat}/>
                <Profile ip={props.ip} setUser={setUser}/>
            </>,
            size: {xs: 12}
        }*/
    ]},[user.current])
    /** Tool Shop JSX */
    const ButtonToolbelt = (props)=>{return <Row><Col><Dialog id={'toolshop'} title={'toolshop'} content={props.content} open={'toolshop'} close={'>-<'}/></Col></Row>}
    const toolButtonClick = (tool: componentToolProps) => {addTool(tool)}
    const toolButton = (tool: componentToolProps) => {return <Button  onClick={()=>toolButtonClick(tool)}>Add {tool.name}</Button>}
    const mapToolButtons = ()=>toolShop.map((tool, i) => {return <Col key={i}><Dialog id={tool.name} title={tool.name} content={toolButton(tool)} open={tool.name} close={'>-<'}/></Col>})
    const ToolShop = () => {return <ButtonToolbelt content={<Row>{mapToolButtons()}</Row>}/>}
    /****/




    //add a tool to the tool belt
    function addTool(tool: componentToolProps){
        toolBelt.current.push(tool)
        render()
    }
    function removeTool(index: number){
        toolBelt.current = toolBelt.current.filter((tool, i) => i!=index)
        render()
    }
    //Pocket
    const ToolSlots = () => {
        return <Row>
            {toolBelt.current.map((tool, i) => {
                let {name, description, image, useData, jsx, size} = tool
                let {xs, sm, md, lg, xl} = size
                return <Col key={i} xs={xs} sm={sm} md={md} lg={lg} xl={xl}><Row>
                    <Col xs={1} style={styleFlat}>{name.substring(0,3).toUpperCase()} <Button style={{...styleFlat, border: '1px outset darkgrey', borderRadius: '10px'}} onClick={()=>{removeTool(i)}}>X</Button></Col>
                    <Col xs={11} style={styleFlat}>{jsx}</Col>
                </Row></Col>
            })}
        </Row>
    }
    //Belt
    return <Container>
            <ToolShop/>
            <ToolSlots/>
        </Container>
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const ip = await requestIp.getClientIp(context.req);
    return { props: { ip } };
  };