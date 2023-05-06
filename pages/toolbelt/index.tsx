import { useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DiceWidget, { useDiceRoll } from "../../components/dice";
import Dialog from "../../components/dialog";

export type componentToolProps = {
    name: string,
    description: string,
    image: string,
    useData: Function,
    jsx: JSX.Element,
}
export default function Toolbelt() {
    const r = useState({})[1]
    const render = ()=>r({})
    const toolBelt: {current: componentToolProps[]} = useRef([])

    /**
     * Tool Shop
     */
    /** Dice Widget Data Hook */
    const dataHook = ()=>useDiceRoll({sides: 5, speed: 5})
    /** Tool Shop Array */
    const toolShop: componentToolProps[] = [
        {/** Dice Widget */
            name: 'DiceWidget',
            description: 'customize dice rolls',
            image: '',
            useData: dataHook,
            jsx: <DiceWidget udr={()=>dataHook()} />,
        },
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