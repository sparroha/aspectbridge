import { useState } from "react";
import Canvas from "../../components/canvas";
import { Col, Container, Form, Row } from "react-bootstrap";

export default function Home() {
    const [formula, setFormula] = useState('Ripples');

    return <Container>
        <Row>
            <Col xs={12}>
                <Form>
                    <Form.Group controlId='y'>
                        <Form.Label>Formula</Form.Label>
                        <select value={formula} onChange={e => setFormula(e.target.value)}>
                            <option value={'Ripples'}>{'Ripples'}</option>
                            <option value={'Mandlebrot'}>{'Mandlebrot'}</option>
                        </select>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
        {formula === 'Ripples' && <Ripples/>}
        {formula === 'Mandlebrot' && <Mandlebrot/>}
    </Container>
}
function Ripples(){
    const [wavelength, setWavelength] = useState(1);
    const [zPlane, setZPlane] = useState(0);
    
    const ripples = (x: number, y: number, width: number, height: number) => {
        const center = {x: width/2, y: height/2};
        //distance from center = square root of (x-center.x)^2 + (y-center.y)^2
        const centerDistance = Math.sqrt((x - center.x) ** 2 + (y - center.y) ** 2);
        return {valid: Math.sin(centerDistance / wavelength) > zPlane, color: '#000000'}
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
                </Form>
            </Col>
        </Row>
        <Canvas formula={ripples}/>
    </Container>
}
function Mandlebrot(){
    // Set the maximum number of iterations to determine if a point is in the set
    const [maxIterations, setMaxIterations] = useState(100);
    const [threshold, setThreshold] = useState(0);
    // Set the range of the complex plane to be rendered
    const xmin = -2.5;
    const xmax = 1;
    const ymin = -1.5;
    const ymax = 1.5;
    //\\Mandlebrot

    const mandlebrot = (x: number, y: number, width: number, height: number) => {
        // Map the pixel coordinates to the complex plane
        const a = xmin + (x / width) * (xmax - xmin);
        const b = ymin + (y / height) * (ymax - ymin);

        // Start with z = 0
        let zr = 0;
        let zi = 0;

        let i = 0;
        while (i < maxIterations) {
            // Apply the Mandelbrot formula: z = z^2 + c
            const zrNew = zr ** 2 - zi ** 2 + a;
            const ziNew = 2 * zr * zi + b;

            zr = zrNew;
            zi = ziNew;

            // Check if the magnitude of z is greater than 2 (diverges to infinity)
            if (zr * zr + zi * zi > 4) {
                break;
            }

            i++;
        }

        // Color the pixel based on the number of iterations
        const color = i === maxIterations ? '#000000' : `hsl(${i % 360}, 100%, 50%)`;

        return {valid: true, color: color};
    };
    return <Container>
        <Row>
            <Col xs={12}>
                <Form>
                    <Form.Group controlId='x'>
                        <Form.Label>Max Iterations:</Form.Label>
                        <Form.Control hidden type="number" defaultValue={maxIterations} onChange={(e) => setMaxIterations(Number(e.target.value))} />
                    </Form.Group>
                    <Form.Group controlId='x'>
                        <Form.Label>Z Threshold:</Form.Label>
                        <Form.Control hidden type="number" defaultValue={threshold} step={.1} onChange={(e) => setThreshold(Number(e.target.value))} />
                    </Form.Group>
                </Form>
            </Col>
        </Row>
        <Canvas formula={mandlebrot}/>
    </Container>
}