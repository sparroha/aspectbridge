import { GetServerSideProps } from "next";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react"
import requestIp from 'request-ip';
import { LoginNav, Profile } from "../login/[userlogin]";
import { update } from "xstate/lib/actionTypes";
import useLog from "../../components/conlog";
import Dialog from "../../components/dialog";
import { Button, Col, Container, Row } from "react-bootstrap";
import ContainerOverlay from "../../components/overlay";

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
export default function Gather(props: { ip: any; }){
    const r = useState({})[1]
    const renders = useRef(1)
    const render = ()=>{renders.current++;r({})}
    const Debug = () => {return <>Renders: {renders.current}</>}
    const user = useRef(null)//set by <Profile/> to provide user authentiation
    const Pinit: Player = {
        wallet: {income: 0, coin: 0, gem: 0, prestige: 0},
        items: []
    }
    const shopItems: Item[] = [
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

    function reducer (state: {player: Player}, action) {
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
    const [state, dispatch] = useReducer(reducer, {player: Pinit});
    useEffect(()=>{return updatePlayer()},[state])

    /**
     * api GET player_data once
     */
    useEffect(()=>{//get user initial player_data
        if(user.current){
            const playerData = fetch('/api/gather/users?username='+user?.current?.username)
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
        if(user.current?.username){console.log('updatePlayer')
        fetch('/api/gather/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.current?.username,
                player_data: JSON.stringify({...state?.player})//SHALLOW COPY//do I need to stringify inside my stringify?
            })
        }).then((res)=>res.json())
        .then((data)=>{
            //console.log(data)
        })
        .catch((e)=>{console.log(e)})}
    }
    
    return <Container>
        <Row style={{textAlign: 'center'}}>
            <Col xs={4} style={{visibility: 'collapse'}}>
                <Debug/>
            </Col>
            <Col xs={4} style={{textAlign: 'center'}}>{/*provides standard login link for redirect;homepage=here*/}
                <LoginNav user={user.current} homepage={'gather'} style={{textAlign: 'center'}}/>
            </Col>
            <Col xs={4} style={{visibility: 'collapse'}}>
                {/*sets user state to provide user authentiation*/}
                <Profile ip={props.ip} setUser={(data: any)=>{user.current=data;render()}}/>
            </Col>
        </Row>
        <Row>
            <Col><Wallet {...state?.player?.wallet}/></Col>
            <Col><Pack pack={state?.player?.items} dispatch={dispatch}/></Col>
            <Col><Store shopItems={shopItems} gem={state.player.wallet.gem} dispatch={dispatch}/></Col>
        </Row>
        <Row>
            <Col>g: {state.player.wallet.gem}<br/><Button onClick={()=>{dispatch({type: 'addGem', payload: {amount: Math.floor(Math.random()*6+1)>2?1:-2}})}}>Mine Gems</Button></Col>
        </Row>
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
        </>} open={'cCc'} close={'---'}/>
}
const Pack = ({pack, dispatch}: {pack: Item[], dispatch: Function}) => {
    return <Dialog id={'pack'} title={'pack'} content={<Inventory pack={pack} dispatch={dispatch} />} open={'Stuff'} close={'Close'}/>
}
const Inventory = ({pack, dispatch}) => {
    useLog('Inventory: '+JSON.stringify(pack))
    return pack.map((item, i)=>{
        return item.amount>0?<Row key={i+1}>
            <Col xs={12} sm={4}><label>{item.amount}:{item.name}</label></Col>
            <Col xs={12} sm={4}><label>{item.value}</label></Col>
            <Col xs={12} sm={4}><Button onClick={
                ()=>{
                    dispatch({type: 'addGem', payload: {amount: item.value}})
                    dispatch({type: 'subItem', payload: {item: item, amount: 1}})
                }
            }>Sell</Button></Col>
        </Row>:null
    })
}
const Store = ({shopItems, gem, dispatch}) => {
    return <Dialog id={'store'} title={'store'} content={<Shop shopItems={shopItems} gem={gem} dispatch={dispatch}/>} open={'Store'} close={'Exit'}/>
}
const Shop = ({shopItems, gem, dispatch}) => {
    return shopItems.map((item, i)=>{
        return <Row key={i+1}>
            <Col xs={12} sm={4}><label>{item.name}</label></Col>
            <Col xs={12} sm={4}><label>{item.value}</label></Col>
            <Col xs={12} sm={4}><Button onClick={
                ()=>{
                    if(gem<item.value)return alert('You do not have enough gems to buy this item.')
                    dispatch({type: 'addGem', payload: {amount: -item.value}})
                    dispatch({type: 'addItem', payload: {item: item, amount: 1}})
                }
            }>Buy</Button></Col>
        </Row>
    })
}
