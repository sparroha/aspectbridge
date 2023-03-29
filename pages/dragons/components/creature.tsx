import { Button, Col, Row } from "react-bootstrap";

export type CreatureData = {
    name: string,
    description: string,
    image: string,
    action: Function
}
export default function Region({creature}: {creature: CreatureData}){
    if(!creature) return <>Creature Loading...</>
    return <Button style={{position: 'relative', backgroundImage: `url(${creature.image})`}}>
                <Row height={'33vh'}>
                    <Col xs={12}>{creature.name}</Col>
                </Row>
        </Button>
}