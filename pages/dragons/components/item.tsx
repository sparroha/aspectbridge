import { Button, Col, Row } from "react-bootstrap";

export type ItemData = {
    name: string,
    description: string,
    image: string,
    use: Function
}
export default function Region({item}: {item: ItemData}){
    if(!item) return <></>
    return <Button style={{position: 'relative', backgroundImage: `url(${item.image})`}}>
            <Row height={'33vh'}>
                    <Col xs={12}>{item.name}</Col>
                </Row>
        </Button>
}