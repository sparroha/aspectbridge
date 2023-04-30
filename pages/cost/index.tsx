import { GetServerSideProps } from "next";
import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import requestIp from 'request-ip';
import { Profile } from "../login/[userlogin]";
import { LoginNav } from "../login/[userlogin]";


export default function Cost(props) {
    const [coin, setCoin] = useState(0)
    const [income, setIncome] = useState(0)
    const [user, setUser] = useState(null)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const player = fetch('/api/cost/users?username='+user?.username)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            coin==0?setCoin(data[0].coin):null
            income==0?setIncome(data[0].income):null
        }).catch((e)=>{console.log(e)})
    }, [user])

    useEffect(() => {
        if(update)updatePlayer(user, coin, income)
        console.log('update')
        return setUpdate(false)
    }, [update])


    useEffect(() => {
        const interval = setInterval(() => {
            setCoin((c)=>{return c+income})
        }, 1000);
        return () => clearInterval(interval);
    }, [income]);
        
    function RenderButton(){
        const buttons = []
        for(let i=1;i<=Math.floor(Math.log10(coin));i++){
            buttons.push(
                <><Button onClick={()=>{
                    setIncome((p)=>{return p+Math.pow(10,i)/10})//set income to current income + (i-1)*10
                    setCoin((c)=>{return c-Math.pow(10,i)})//set coin to current coin - 10^i
                    setUpdate(true)
                }}>+{Math.pow(10,i)/10} income {'(-'}{Math.pow(10,i)}{' coin)'}</Button><br/></>
            )
        }
        return <Row>
            {buttons.map((b, i)=>{
                return <Col key={i+1} xs={5} sm={4} md={3} lg={2}>{b}</Col>
            })}
        </Row>
    }
    return (
        <Container>
            <LoginNav user={user} homepage={props.homepage || 'cost'} />
            <Profile ip={props.ip} setUser={setUser}/>
            <Row style={{marginTop: '20px'}}>
                <Col xs={12} sm={4}><h1>Cost</h1></Col>
                <Col xs={12} sm={6}><h3>Basic Idle Clicker</h3></Col>
                <Col xs={0} sm={2}></Col>
            </Row>
            <Row>
                <Col xs={12} sm={4}><Button onClick={()=>{setCoin((c)=>{return ++c});setUpdate(true)}}>Increment coin by 1</Button></Col>
                <Col xs={12} sm={4}><label>Coin: {coin}</label></Col>
                <Col xs={12} sm={4}><label>income: {income}</label></Col>
            </Row>
            <RenderButton />
        </Container>
    );
}
function updatePlayer(user, coin, income){
    console.log('updatePlayer')
    fetch('/api/cost/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user.username,
            coin: coin,
            income: income
        })
    }).then((res)=>res.json())
    .then((data)=>{console.log(data)})
    .catch((e)=>{console.log(e)})
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const ip = await requestIp.getClientIp(context.req)
    return {props: {ip: ip}} 
}
