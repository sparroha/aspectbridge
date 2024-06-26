import React from 'react';
const { useEffect, useReducer, useRef, useState } = React;
import { GetServerSideProps } from "next";
import requestIp from 'request-ip';
import Dialog from "../../components/dialog";
import { Button, Col, Container, Row } from "react-bootstrap";
import useSWR from "swr";
import Field from "./field";
import Chat from "../../app/chat/chat";
import UserLogin from "../../lib/util/-userlogin-";
import UserProfile from "../../lib/util/-userprofile-";

export type Item = {name: string, value: number, amount: number}
export type Player = {
    wallet:{ 
        income: number, 
        coin: number, 
        gem: number, 
        prestige: number
    },
    items: Item[]
}
//TODO: const friend = useSWR('/api/gather/friends', fetcher)
export default function Motion(props: { ip: any; }){
    const r = useState({})[1]
    const renders = useRef(1)
    const render = ()=>{renders.current++;r({})}
    const Debug = () => {return <>Renders: {renders.current}</>}
    const user = useRef(null)//set by <Profile/> to provide user authentiation

    const shopItems: Item[] = [
        {name: 'Apple Alphabary', value: 42, amount: 0},
        {name: 'Berry', value: 2, amount: 0},
        {name: 'Grape', value: 3, amount: 0},
        {name: 'Duck', value: 4, amount: 0},
        {name: 'Hay', value: 5, amount: 0},
        {name: 'Wine', value: 6, amount: 0},
        {name: 'Zukini', value: 7, amount: 0},
        {name: 'Chorn', value: 8, amount: 0},
        {name: 'Tomatoes', value: 9, amount: 0},
        {name: 'Yams', value: 10, amount: 0},
    ]
    //<PLAYER STATE>
    const {data, error, mutate} = useSWR('/api/gather/users', { refreshInterval: 500 })
    function Users(){
        if(data){
            return <>
                Users:<br/>
                {data.map((u, i)=>{return <div key={i}>{u.username+'[gems: '+JSON.parse(u.player_data).wallet.gem+' / coins: '+JSON.parse(u.player_data).wallet.coin+']'}</div>})}
            </>
        }else{
            return <>Loading Online Users...</>
        }
    }
    const Pinit: Player = {
        wallet: {income: 0, coin: 0, gem: 0, prestige: 0},
        items: []
    }
    function reducer (state: {player: Player}, action: {type: string, payload: any}) {
        //TODO: if player is inactive after 5 seconds, refresh page here
        let {player, amount, item} = action.payload
        renders.current++
        switch (action.type) {
            case 'setPlayer':
                return {...state, player: player}
            case 'addIncome':
                return {...state, player:{...state.player, wallet: {...state.player.wallet, income: state.player.wallet.income+amount}}}
            case 'addCoin':
                return {...state, player:{...state.player, wallet: {...state.player.wallet, coin: state.player.wallet.coin+amount}}}
            case 'addGem':
                return {...state, player:{...state.player, wallet: {...state.player.wallet, gem: state.player.wallet.gem+amount}}}
            case 'addPrestige':
                return {...state, player:{...state.player, wallet: {...state.player.wallet, prestige: state.player.wallet.prestige+amount}}}
            case 'addItem':
                let iTemsA = [...state.player.items]
                let ia = iTemsA.findIndex((i)=>i.name===item.name)
                if(ia>-1){
                    iTemsA[ia].amount+=(amount?amount:1)
                }else{
                    iTemsA.push({...item, amount: (amount?amount:1)})
                }
                return {...state, player:{...state.player, items: [...iTemsA]}}
            case 'subItem':
                let iTems = [...state.player.items]
                let ib = iTems.findIndex((i)=>i.name===item.name)
                if(ib>-1){
                    iTems[ib].amount-=(amount?amount:1)
                    if(iTems[ib].amount<1){
                        iTems.splice(ib,1)
                    }
                }
                return {...state, player:{...state.player, items: [...iTems]}}
            default:
                throw new Error()
        }
    }
    //<PLAYER STATE/>
    const [state, dispatch] = useReducer(reducer, {player: Pinit});
    /**
     * api GET player_data once
     */
    useEffect(()=>{//get user initial player_data
        if(user.current){
            const playerData = fetch('/api/gather/users?username='+user.current.username)
            .then((res)=>res.json())
            .then(([{player_data}])=>{ 
                dispatch({type: 'setPlayer', payload: {player: JSON.parse(player_data)}})
            }).catch((e)=>{console.log(e)})
        }
    },[user.current])
    /**
     * api POST player_data
     * @param username 
     * @param player 
     */
    function updatePlayer(){//update database with current player_data
        if(user.current){console.log('updatePlayer')
        fetch('/api/gather/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.current.username,
                player_data: JSON.stringify({...state?.player})//SHALLOW COPY//do I need to stringify inside my stringify?
            })
        }).then((res)=>res.json())
        .then((data)=>{
            //console.log(data)
        })
        .catch((e)=>{console.log(e)})}
    }
    
    return <Container>
        <Row id={'AppSystem'} style={{textAlign: 'center'}}>
            <Col xs={4} style={{visibility: 'collapse'}}>
                <Debug/>
            </Col>
            <Col xs={4} style={{textAlign: 'center'}}>{/*provides standard login link for redirect;homepage=here*/}
                <UserLogin user={user.current} homepage={'gather'} style={{textAlign: 'center'}}/>
            </Col>
            <Col xs={4} style={{visibility: 'collapse'}}>
                {/*sets user state to provide user authentiation*/}
                <UserProfile/>
            </Col>
        </Row>
        <Row id={'Econ'} style={{textAlign: 'center'}}>
            <Col xs={3} sm={2} style={{backgroundColor: 'lightblue'}}><Wallet {...state?.player?.wallet}/></Col>
            <Col xs={3} sm={2} style={{backgroundColor: 'tan'}}><Pack pack={state?.player?.items} dispatch={dispatch} updatePlayer={updatePlayer}/></Col>
            <Col xs={3} sm={2} style={{backgroundColor: 'lightgreen'}}><Store shopItems={shopItems} gem={state?.player?.wallet.gem} dispatch={dispatch} updatePlayer={updatePlayer}/></Col>
        </Row>
        <Row id={'Mine'} style={{textAlign: 'center'}}>
            <Col xs={6}  style={{backgroundColor: 'darkgrey'}}>
                <Mine wallet={state?.player?.wallet} dispatch={dispatch} updatePlayer={updatePlayer}/>
            </Col>
            <Col xs={12} sm={4} md={3} style={{backgroundColor: 'darkgrey'}}>
                <Users/>
            </Col>
        </Row>
        <Field dispatch={dispatch}/>
    </Container>
}

/**
 * server props for ip
 * @param context 
 * @returns {props: {ip: string}}
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const ip = await requestIp.getClientIp(context.req)
    return {props: {ip: ip}} 
}

//Wallet disigner
const Wallet = ({income, coin, gem, prestige}: {income: number, coin: number, gem: number, prestige: number}) => {
    return <Dialog id={'wallet'} title={'wallet'} content={<>
            {'i: '+income}<br/>
            {'c: '+coin}<br/>
            {'g: '+gem}<br/>
            {'p: '+prestige}
        </>} style={{backgroundColor: 'lightblue'}} info={'Currency container'} open={'cCc'} close={'---'}/>
}
const Pack = ({pack, dispatch, updatePlayer}: {pack: Item[], dispatch: Function, updatePlayer: Function}) => {
    return <Dialog id={'pack'} title={'pack'} content={
            <Inventory pack={pack} dispatch={dispatch} updatePlayer={updatePlayer}/>
        } style={{backgroundColor: 'tan'}} info={'Player inventory'} open={'Stuff'} close={'Close'}/>
}
const Inventory = ({pack, dispatch, updatePlayer}) => {
    //useLog('Inventory: '+JSON.stringify(pack))
    return pack.map((item, i)=>{
        return item.amount>0?<Row key={i+1}>
            <Col xs={12} sm={4}><label>{item.amount}:{item.name}</label></Col>
            <Col xs={12} sm={4}><label>{item.value}</label></Col>
            <Col xs={12} sm={4}><Button onClick={
                ()=>{
                    dispatch({type: 'addGem', payload: {amount: item.value}})
                    dispatch({type: 'subItem', payload: {item: item, amount: 1}})
                    updatePlayer()
                }
            }>Sell</Button></Col>
        </Row>:null
    })
}
const Store = ({shopItems, gem, dispatch, updatePlayer}) => {
    return <Dialog id={'store'} title={'store'} content={
            <Shop shopItems={shopItems} gem={gem} dispatch={dispatch} updatePlayer={updatePlayer}/>
        } style={{backgroundColor: 'lightgreen'}} info={'Component list'} open={'Store'} close={'Exit'}/>
}
const Shop = ({shopItems, gem, dispatch, updatePlayer}) => {
    return shopItems.map((item, i)=>{
        return <Row key={i+1}>
            <Col xs={12} sm={4}><label>{item.name}</label></Col>
            <Col xs={12} sm={4}><label>{item.value}</label></Col>
            <Col xs={12} sm={4}><Button onClick={
                ()=>{
                    if(gem<item.value)return alert('You do not have enough gems to buy this item.')
                    dispatch({type: 'addGem', payload: {amount: -item.value}})
                    dispatch({type: 'addItem', payload: {item: item, amount: 1}})
                    updatePlayer()
                }
            }>Buy</Button></Col>
        </Row>
    })
}
const Mine = ({wallet, dispatch, updatePlayer}) => {
    return <Row>
        <Col>
            g: {wallet.gem}<br/>
            <Button onClick={()=>{
                dispatch({type: 'addGem', payload: {amount: Math.floor(Math.random()*6+1)>2?1:-1}})
                updatePlayer()
            }}>Mine Gems</Button>
        </Col>
        <Col>
            c: {wallet.coin}<br/>
            <Button onClick={()=>{
                let price = 1000
                if(wallet.gem>=10){
                dispatch({type: 'addGem', payload: {amount: -10}})
                dispatch({type: 'addCoin', payload: {amount: price}})
                updatePlayer()}
            }}>Sell Gem 10g/1000c</Button>
            <Button onClick={()=>{
                let price = 1200
                if(wallet.coin>=price){dispatch({type: 'addGem', payload: {amount: 10}})
                dispatch({type: 'addCoin', payload: {amount: -price}})
                updatePlayer()}
            }}>Buy Gem 1000c/10g</Button>
        </Col>
    </Row>
}
