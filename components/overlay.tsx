import { Container } from "react-bootstrap";

export default function ContainerOverlay(props){
    return <Container className={'overlay'}>
        {props.children}
    </Container>
}