import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";


export default function Cost() {
    const [coin, setCoin] = useState(0)
    const [income, setIncome] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCoin((c)=>{return c+income})
        }, 1000);
        }, []);
        
    const RenderButton = ()=>{
        const buttons = []
        for(let i=1;i<Math.floor(Math.log10(coin));i++){
            buttons.push(
                coin>=Math.pow(10,i)?//if current coin is greater than 10^i then display button
                <><button key={i} onClick={()=>{
                    setIncome((p)=>{return p+Math.pow(10,i)/10})//set income to current income + (i-1)*10
                    setCoin((c)=>{return c-Math.pow(10,i)})//set coin to current coin - 10^i
                }}>+{Math.pow(10,i)/10} income {'(-'}{Math.pow(10,i)}{' coin)'}</button><br/></>:
                null
            )
        }
        return <Row>
            {buttons.map((b, i)=>{
                return <Col xs={5} sm={4} md={3} lg={2}>{b}</Col>
            })}
        </Row>
    }
    return (
        <Container>
            <Row style={{marginTop: '20px'}}>
                <Col xs={12} sm={4}><h1>Cost</h1></Col>
                <Col xs={12} sm={6}><h3>Basic Idle Clicker</h3></Col>
                <Col xs={0} sm={2}></Col>
            </Row>
            <Row>
                <Col xs={12} sm={4}><button onClick={()=>setCoin((c)=>{return ++c})}>Increment coin by 1</button></Col>
                <Col xs={12} sm={4}><label>Coin: {coin}</label></Col>
                <Col xs={12} sm={4}><label>income: {income}</label></Col>
            </Row>
            <RenderButton />
        </Container>
    );
}
