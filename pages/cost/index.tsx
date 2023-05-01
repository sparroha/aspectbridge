import { GetServerSideProps } from "next";
import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import requestIp from 'request-ip';
import { Profile } from "../login/[userlogin]";
import { LoginNav } from "../login/[userlogin]";


export default function Cost(props) {
    const [prestige, setPrestige] = useState(0)
    const [coin, setCoin] = useState(0)
    const [income, setIncome] = useState(0)
    const [user, setUser] = useState(null)
    const [update, setUpdate] = useState(false)

    //const maxIncome = Number.MAX_SAFE_INTEGER
    //const maxCoin = Number.MAX_SAFE_INTEGER
    const raise = (i, prestige)=>{return (Math.pow(10,i)/10)*prestige}
    const magnitude = (n)=>{return Math.floor(Math.log10(n))}
    const tenTo = (n)=>{return Math.pow(10,n)}
    const lol = (n)=>{return n/tenTo(magnitude(n))}
    const prestigeCost = ()=>{return tenTo(prestige)}

    useEffect(() => {
        if(user){
            const player = fetch('/api/cost/users?username='+user?.username)
            .then((res)=>res.json())
            .then((data)=>{
                //console.log(data)
                setCoin(data[0].coin)
                setIncome(data[0].income)
                setPrestige(data[0].prestige)
            }).catch((e)=>{console.log(e)})
        }
    }, [user])

    useEffect(() => {
        if(user&&update)updatePlayer(user, coin, income, prestige)
        //console.log('update')
        return setUpdate(false)
    }, [update])


    useEffect(() => {
        const interval = setInterval(() => {
            setCoin((c)=>{return c+income})
        }, 1000);
        return () => clearInterval(interval);
    }, [income]);
        
    function RenderButtons(){
        const buttons = []
        for(let i=1;i<=magnitude(coin);i++){//rerenders for each income tick
            buttons.push(
                <><Button onClick={()=>{
                    setIncome((p)=>{return p+(raise(i, prestige))})//set income to current income + (i-1)*10
                    setCoin((c)=>{return c-tenTo(i)})//set coin to current coin - 10^i
                    setUpdate(true)
                }}>{'+'+raise(i, prestige)+' income (-'+tenTo(i)+' coin)'}</Button><br/></>
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
                <Col xs={12} sm={2}><Button onClick={()=>{setCoin((c)=>{return ++c});setUpdate(true)}}>Increment coin by 1</Button></Col>
                <Col xs={12} sm={3}><label>Coin: {coin}</label></Col>
                <Col xs={12} sm={3}><label>income: {income}</label></Col>
                <Col xs={12} sm={3}><label>prestige: {prestige}</label></Col>
                {coin>=prestigeCost()?<Col xs={12} sm={1}><Button onClick={()=>{setCoin(0);setIncome(0);setPrestige((p)=>++p);setUpdate(true)}}>Prestige</Button></Col>:prestigeCost()}
            </Row>
            <RenderButtons />
        </Container>
    );
}
function updatePlayer(user, coin, income, prestige){
    console.log('updatePlayer')
    fetch('/api/cost/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user.username,
            coin: coin,
            income: income,
            prestige: prestige
        })
    }).then((res)=>res.json())
    .then((data)=>{
        //console.log(data)
    })
    .catch((e)=>{console.log(e)})
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const ip = await requestIp.getClientIp(context.req)
    return {props: {ip: ip}} 
}
