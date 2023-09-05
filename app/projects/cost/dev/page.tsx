'use client'
import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Dialog from "../../../components/dialog";
import { magnitude, tenTo, raise } from "../util/functions";
import UserProfile from "../../../lib/util/-userprofile-";
import useUser from "../../../lib/util/^user";

export default function Cost() {
    const user = useUser()

    const r = useState({})[1]
    const render = ()=>r({})
    const prestigeRef = useRef(0)
    const coinRef = useRef(0)
    const gemRef = useRef(0)
    const incomeRef = useRef(0)
    const shopItems = [
        {name: 'item1', value: 1, amount: 0},
        {name: 'item2', value: 2, amount: 0},
        {name: 'item3', value: 3, amount: 0},
        {name: 'item4', value: 4, amount: 0},
        {name: 'item5', value: 5, amount: 0},
        {name: 'item6', value: 6, amount: 0},
        {name: 'item7', value: 7, amount: 0},
        {name: 'item8', value: 8, amount: 0},
        {name: 'item9', value: 9, amount: 0},
        {name: 'item10', value: 10, amount: 0},
    ]
    const invItems = useRef(shopItems)
    const [update, setUpdate] = useState(false)
    const [level, setLevel] = useState(0)

    //helper functions
    const prestigeCost = ()=>{return tenTo(prestigeRef.current)}

    useEffect(() => {//get initial user data
        if(user){
            const player = fetch('/api/cost/users?username='+user?.username)
            .then((res)=>res.json())
            .then(([{coin, income, prestige}])=>{   
                //console.log(data)
                coinRef.current = coin
                incomeRef.current = income
                prestigeRef.current = prestige
            }).catch((e)=>{console.log(e)})
        }
    }, [user])
    useEffect(() => {//update user data
        if(user&&update)updatePlayer(user, coinRef.current, incomeRef.current, prestigeRef.current)
        //console.log('update')
        return setUpdate(false)
    }, [update])
    useEffect(() => {//used to reduce rerenders for coin
        return setLevel(magnitude(coinRef.current))
    }, [coinRef.current])
    useEffect(() => {
        const interval = setInterval(() => {
            coinRef.current += incomeRef.current
            if(coinRef.current>=Number.MAX_SAFE_INTEGER){
                coinRef.current-=Number.MAX_SAFE_INTEGER
                gemRef.current++
            }
            render()
            console.log('income & render')
        }, 1000);
        //return () => clearInterval(interval);
    }, []);
    
    const wallet = (coin, gem) => {
        return <Dialog id={'wallet'} title={'wallet'} content={<>{'c: '+coin}<br/>{'g: '+gem}</>} open={'cCc'} close={'---'}/>
    }
    return (
        <Container>
            <UserProfile/>
            <Header />
            <Labels props={{wallet: wallet(coinRef.current, gemRef.current), incomeRef: incomeRef, prestigeRef: prestigeRef, coinRef: coinRef, gemRef: gemRef, setUpdate: setUpdate, prestigeCost: prestigeCost}} />
            <RenderButtons props={{level: level, prestigeRef: prestigeRef, incomeRef: incomeRef, coinRef: coinRef, gemRef: gemRef, setUpdate: setUpdate, raise: raise, tenTo: tenTo}} />
            
            <Row>
                <Col xs={12} sm={6}>
                    <Shop shopItems={shopItems} invItems={invItems} gemRef={gemRef} render={render}/>
                </Col>
                <Col xs={12} sm={6}>
                    <Inventory invItems={invItems} gemRef={gemRef} render={render}/>
                </Col>
            </Row>
            
            
        </Container>
    );
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
    const {wallet, prestigeRef, coinRef, incomeRef, setPrestige, setUpdate, prestigeCost} = props
    return <Row>
        <Col xs={12} sm={2}><Button onClick={()=>{coinRef.current++;setUpdate(true)}}>Increment coin by 1</Button></Col>
        <Col xs={12} sm={3}><label>Coin: {wallet}</label></Col>
        <Col xs={12} sm={3}><label>income: {incomeRef.current}</label></Col>
        <Col xs={12} sm={3}><label>prestige: {prestigeRef.current}</label></Col>
        {coinRef.current>=prestigeCost()?<Col xs={12} sm={1}><Button onClick={()=>{coinRef.current=0;incomeRef.current=0;setPrestige((p)=>++p);setUpdate(true)}}>Prestige</Button></Col>:prestigeCost()}
    </Row>
}
function RenderButtons({props}){
    const {level, prestigeRef, incomeRef, coinRef, gemRef, setUpdate, raise, tenTo} = props
    const buttons = []
    for(let i=1;i<=level;i++){
        buttons.push(<><Button 
            onClick={()=>{
                incomeRef.current+=(raise(i, prestigeRef.current))//set income to current income + 10^i
                if(incomeRef.current>=Number.MAX_SAFE_INTEGER){
                    incomeRef.current-=Number.MAX_SAFE_INTEGER
                    gemRef.current+=10
                }
                coinRef.current-=tenTo(i)//set coin to current coin - 10^i
                setUpdate(true)
            }
        }>{'income: +'+raise(i, prestigeRef.current).toExponential()}<br/>{'cost: (c: -'+tenTo(i).toExponential()+')'}</Button><br/></>)}
    return <Row>
        {buttons.map((b, i)=>{
            return <Col key={i+1} xs={5} sm={4} md={3} lg={2}>{b}</Col>
        })}
    </Row>
}
function updatePlayer(user, coin, income, prestige){//items, gems, etc
    let max = Number.MAX_SAFE_INTEGER///////BROKEN for database
    let cmax = coin>=max?max:coin
    let imax = income>=max?max:income
    let pmax = prestige>=max?max:prestige
    console.log('updatePlayer')
    fetch('/api/cost/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user.username,
            coin: cmax,
            income: imax,
            prestige: prestige
        })
    }).then((res)=>res.json())
    .then((data)=>{
        //console.log(data)
    })
    .catch((e)=>{console.log(e)})
}

//experimental
function Shop({shopItems, gemRef, invItems, render}){
    return shopItems.map((item, i)=>{
        return <Row key={i+1}>
            <Col xs={12} sm={4}><label>{item.name}</label></Col>
            <Col xs={12} sm={4}><label>{item.value}</label></Col>
            <Col xs={12} sm={4}><Button onClick={
                ()=>{
                    gemRef.current-=item.value
                    invItems.current[i].amount++
                    render({})
                }
            }>Buy</Button></Col>
        </Row>
    })
}
function Inventory({invItems, gemRef, render}){
    return invItems.current.map((item, i)=>{
        return item.amount>0?<Row key={i+1}>
            <Col xs={12} sm={4}><label>{item.amount}:{item.name}</label></Col>
            <Col xs={12} sm={4}><label>{item.value}</label></Col>
            <Col xs={12} sm={4}><Button onClick={
                ()=>{
                    gemRef.current+=item.value
                    invItems.current[i].amount--
                    render({})
                }
            }>Sell</Button></Col>
        </Row>:null
    })
}
