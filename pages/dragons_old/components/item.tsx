import { Button, Col, Row } from "react-bootstrap";

export type ItemData = {
    id: number,
    name: string,
    description: string,
    image: string,
    onuse: string[]
}
export default function Item({item}: {item: ItemData}){
    if(!item) return <>Item Loading...</>
    return <Button style={{position: 'relative', backgroundImage: `url(${item.image})`}}>
            <Row height={'33vh'}>
                    <Col xs={12}>{item.name}</Col>
                </Row>
        </Button>
}