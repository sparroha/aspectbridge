import { useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DiceWidget, { useDiceRoll } from "../../components/dice";
import Dialog from "../../components/dialog";
import Chat from "../chat";
import requestIp from 'request-ip';
import { GetServerSideProps } from "next";
import { Profile } from "../login/[userlogin]";

export type componentToolProps = {
    name: string,
    description: string,
    image: string,
    useData: Function,
    jsx: JSX.Element,
}
export default function Toolbelt(props) {
    const r = useState({})[1]
    const render = ()=>r({})
    const toolBelt: {current: componentToolProps[]} = useRef([])
    const user = useRef({})

    /**
     * Tool Shop
     */
    /** Dice Widget Data Hook */
    const useDice = ()=>useDiceRoll({sides: 5, speed: 5})
    const chatUser = ()=>{return user.current}


    /** Tool Shop Array */
    const toolShop: componentToolProps[] = [
        {/** Dice Widget */
            name: 'DiceWidget',
            description: 'customize dice rolls',
            image: '',
            useData: useDice,
            jsx: <DiceWidget udr={()=>useDice()} />,
        },
        {/** Aspect Bridge Chat */
            name: 'ChatWindow',
            description: 'discorse apon a bridge',
            image: '',
            useData: null,
            jsx: <Chat user={chatUser()} homepage={'toolbelt'} ip={props.ip}/>,
        },
        {/** User Login Profile */
            name: 'UserLogin',
            description: 'login to your profile',
            image: '',
            useData: null,
            jsx: <>
                <Profile ip={props.ip} setUser={(u)=>{user.current=u;render()}}/>
            </>,
        }
    ]
    /** Tool Shop JSX */
    const ToolShop = () => {
        return <Row>
            {toolShop.map(({name, description, image, useData, jsx}) => {
                return <Col><Dialog id={name} title={name} content={<>
                    <Button onClick={() => {addTool({name, description, image, useData, jsx})}}>Add Dice Widget</Button>
                </>} open={name} close={'>-<'}/></Col>
            })}
        </Row>
    }
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
                return <Col>{tool.name}<Button onClick={()=>{removeTool(i)}}>remove tool</Button><br/>{tool.jsx}</Col>
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