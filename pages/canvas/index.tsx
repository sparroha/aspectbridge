import { useState } from "react";
import Canvas from "../../components/canvas";
import { Col, Container, Form, Row } from "react-bootstrap";

export default function Home() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [r, setR] = useState(0);
    const formula = () => {
        const r1 = Math.sqrt((x - 400) ** 2 + (y - 300) ** 2);
        return Math.sin(r1 / 10) > 0.5;
      };
    const mandlebrot = () => {
        //Z^2+C
        return true;
        };
    return <Container>
        <Row>
            <Col xs={12}>
                <Form>
                    <Form.Group controlId='x'>
                        <Form.Label>Enter X</Form.Label>
                        <Form.Control type="number" placeholder="Enter X" onChange={(e) => setX(Number(e.target.value))} />
                    </Form.Group>
                    <Form.Group controlId='y'>
                        <Form.Label>Enter Y</Form.Label>
                        <Form.Control type="number" placeholder="Enter Y" onChange={(e) => setY(Number(e.target.value))} />
                    </Form.Group>
                    <Form.Group controlId='r'>
                        <Form.Label>Enter R</Form.Label>
                        <Form.Control type="number" placeholder="Enter R" onChange={(e) => setR(Number(e.target.value))} />
                    </Form.Group>

                </Form>
            </Col>
        </Row>
        <Canvas formula={formula} />
    </Container>
}
