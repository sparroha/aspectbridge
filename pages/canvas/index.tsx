import { useState } from "react";
import Canvas from "../../components/canvas";
import { Col, Container, Form, Row } from "react-bootstrap";

export default function Home() {
    const [wavelength, setWavelength] = useState(0);
    const [zPlane, setZPlane] = useState(0);
    const [y, setY] = useState(0);
    const [r, setR] = useState(0);

    //Mandlebrot
    // Set the maximum number of iterations to determine if a point is in the set
    const maxIterations = 100;
    // Set the range of the complex plane to be rendered
    const xmin = -2.5;
    const xmax = 1;
    const ymin = -1.5;
    const ymax = 1.5;
    //\\Mandlebrot

    const formula = (x: number, y: number, width: number, height: number) => {
        const center = {x: width/2, y: height/2};
        //distance from center = square root of (x-center.x)^2 + (y-center.y)^2
        const centerDistance = Math.sqrt((x - center.x) ** 2 + (y - center.y) ** 2);
        return Math.sin(centerDistance / wavelength) > zPlane;
    };
    const mandlebrot = (x: number, y: number, width: number, height: number) => {
        

        return true;
    };
    return <Container>
        <Row>
            <Col xs={12}>
                <Form>
                    <Form.Group controlId='x'>
                        <Form.Label>Wavelength:</Form.Label>
                        <Form.Control type="number" defaultValue={wavelength} onChange={(e) => setWavelength(Number(e.target.value))} />
                    </Form.Group>
                    <Form.Group controlId='y'>
                        <Form.Label>Z Plane</Form.Label>
                        <Form.Control type="number" defaultValue={zPlane} step={0.1} min={-0.99} max={0.99} onChange={(e) => setZPlane(Number(e.target.value))} />
                    </Form.Group>
                    <Form.Group controlId='r'>
                        <Form.Label>Enter R</Form.Label>
                        <Form.Control hidden type="number" placeholder="Enter R" onChange={(e) => setR(Number(e.target.value))} />
                    </Form.Group>

                </Form>
            </Col>
        </Row>
        <Canvas formula={formula}/>
    </Container>
}
