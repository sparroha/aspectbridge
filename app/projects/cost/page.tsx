'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { magnitude, tenTo, raise, prestigeCost } from "./util/functions";
import { getState } from "./util/functions";
import useUser from "../../../lib/util/^user";
import useActiveUsers from "../../../lib/util/^activeusers";
import UserProfile from "../../../lib/util/-userprofile-";


export default function Cost() {
    const user = useUser()
    const activeUsers = useActiveUsers()

    const [prestige, setPrestige] = useState(0)
    const [coin, setCoin] = useState(0)
    const [income, setIncome] = useState(0)
    const [update, setUpdate] = useState(false)
    const [level, setLevel] = useState(0)

    useEffect(() => {//get initial user data
        if(user){
            const player = fetch('/api/cost/users?username='+user?.username)
            .then((res)=>res.json())
            .then(([{coin, income, prestige}])=>{   
                //console.log(data)
                setCoin(coin)
                setIncome(income)
                setPrestige(prestige)
            }).catch((e)=>{console.log(e)})
        }
    }, [user])
    useEffect(() => {//update user data
        if(user&&update)updatePlayer(user, coin, income, prestige)
        //console.log('update')
        return setUpdate(false)
    }, [update])
    useEffect(() => {//used to reduce rerenders for coin
        return setLevel(magnitude(coin))
    }, [coin])
    useEffect(() => {
        const interval = setInterval(() => {
            setCoin((c)=>{return c+getState(setIncome)}); //console.log('income')
        }, 1000);
        //return () => clearInterval(interval);
    }, []);
        
    return <Container>
            <UserProfile/>
            <Labels props={{coin: coin, income: income, prestige: prestige, setCoin: setCoin, setIncome: setIncome, setPrestige: setPrestige, setUpdate: setUpdate, prestigeCost: prestigeCost}} />
            <RenderButtons props={{level: level, prestige: prestige, setIncome: setIncome, setCoin: setCoin, setUpdate: setUpdate, raise: raise, tenTo: tenTo}} />
        </Container>
}
//extracted components to manage rerendering
function Header(){
    return <Row style={{marginTop: '20px'}}>
        <Col xs={12} sm={4}><h1>Cost</h1></Col>
        <Col xs={12} sm={6}><h3>Basic Idle Clicker</h3></Col>
        <Col xs={0} sm={2}></Col>
    </Row>
}
function Labels({props}){
    const {coin, income, prestige, setCoin, setIncome, setPrestige, setUpdate, prestigeCost} = props
    return <Row>
        <Col xs={12} sm={2}><Button onClick={()=>{setCoin((c)=>{return ++c});setUpdate(true)}}>Increment coin by 1</Button></Col>
        <Col xs={12} sm={3}><label>Coin: {coin}</label></Col>
        <Col xs={12} sm={3}><label>income: {income}</label></Col>
        <Col xs={12} sm={3}><label>prestige: {prestige}</label></Col>
        {coin>=prestigeCost()?<Col xs={12} sm={1}><Button onClick={()=>{setCoin(0);setIncome(0);setPrestige((p)=>++p);setUpdate(true)}}>Prestige</Button></Col>:prestigeCost()}
    </Row>
}
function RenderButtons({props}){
    const {level, prestige, setIncome, setCoin, setUpdate, raise, tenTo} = props
    const buttons = []
    for(let i=1;i<=level;i++){
        buttons.push(<><Button 
            onClick={()=>{
                setIncome((p)=>{return p+(raise(i, prestige))})//set income to current income + 10^i
                setCoin((c)=>{return c-tenTo(i)})//set coin to current coin - 10^i
                setUpdate(true)
            }
        }>{'income: +'+raise(i, prestige).toExponential()}<br/>{'cost: (c: -'+tenTo(i).toExponential()+')'}</Button><br/></>)}
    return <Row>
        {buttons.map((b, i)=>{
            return <Col key={i+1} xs={5} sm={4} md={3} lg={2}>{b}</Col>
        })}
    </Row>
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
