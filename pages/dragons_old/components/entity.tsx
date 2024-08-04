import { Button, Col, Row } from "react-bootstrap";

//type reference
export type Entity = {
    id?: number,
    name: string,
    description?: string,
    image?: string,
    onaction?: string[],//JSON.stringify(['action1', 'action2'])
    
}
export default function Entity({creature}: {creature: Entity}){
    if(!creature) return <>Creature Loading...</>
    return <Button style={{position: 'relative', backgroundImage: `url(${creature.image})`}}>
                <Row height={'33vh'}>
                    <Col xs={12}>{creature.name}</Col>
                </Row>
        </Button>
}