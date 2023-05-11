import { GetServerSideProps } from "next";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react"
import requestIp from 'request-ip';
import { LoginNav, Profile } from "../login/[userlogin]";
import useLog from "../../components/conlog";
import Dialog from "../../components/dialog";
import { Button, Col, Container, Row } from "react-bootstrap";
import ContainerOverlay from "../../components/overlay";
import useSWR from "swr";
import Chat from "../chat";

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
                <LoginNav user={user.current} homepage={'gather'} style={{textAlign: 'center'}}/>
            </Col>
            <Col xs={4} style={{visibility: 'collapse'}}>
                {/*sets user state to provide user authentiation*/}
                <Profile ip={props.ip} setUser={(data: any)=>{user.current=data;render()}}/>
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
        </Row>
        <Field dispatch={dispatch}/>

        <Row id={'community'}>
            <Col xs={12} sm={8} md={9} style={{backgroundColor: 'lightgrey'}}>
                <Chat ip={props.ip} user={user.current}/>
            </Col>
            <Col xs={12} sm={4} md={3} style={{backgroundColor: 'darkgrey'}}>
                <Users/>
            </Col>
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
        </>} style={{backgroundColor: 'lightblue'}} open={'cCc'} close={'---'}/>
}
const Pack = ({pack, dispatch, updatePlayer}: {pack: Item[], dispatch: Function, updatePlayer: Function}) => {
    return <Dialog id={'pack'} title={'pack'} content={
            <Inventory pack={pack} dispatch={dispatch} updatePlayer={updatePlayer}/>
        } style={{backgroundColor: 'tan'}} open={'Stuff'} close={'Close'}/>
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
        } style={{backgroundColor: 'lightgreen'}} open={'Store'} close={'Exit'}/>
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
/**
 * 
 * @param direction 
 * @param position 
 * @param render 
 * @returns 
 */
const Control = ({direction, position, render})=>{
    const speed = 10
    const diagSpeed = Math.ceil(Math.sqrt((speed^2)/2))+1//3.5
    const up = ()=>{position.current.y-=speed;render({})}
    const down = ()=>{position.current.y+=speed;render({})}
    const left = ()=>{position.current.x-=speed;render({})}
    const right = ()=>{position.current.x+=speed;render({})}
    const moveKeyDown = (e)=>{
        switch(e.key){
            case 'ArrowUp':
                e.preventDefault()
                direction.current.up=true
                //render({})
                break
            case 'ArrowDown':
                e.preventDefault()
                direction.current.down=true
                //render({})
                break
            case 'ArrowLeft':
                e.preventDefault()
                direction.current.left=true
                //render({})
                break
            case 'ArrowRight':
                e.preventDefault()
                direction.current.right=true
                //render({})
                break
        }
    }
    const moveKeyUp = (e)=>{
        switch(e.key){
            case 'ArrowUp':
                e.preventDefault()
                direction.current.up=false
                //render({})
                break
            case 'ArrowDown':
                e.preventDefault()
                direction.current.down=false
                //render({})
                break
            case 'ArrowLeft':
                e.preventDefault()
                direction.current.left=false
                //render({})
                break
            case 'ArrowRight':
                e.preventDefault()
                direction.current.right=false
                //render({})
                break
        }
    }
    const move = (d)=>{
        //console.log(d)
        let s = speed
        if(!d.up&&!d.down&&!d.left&&!d.right)return
        if(d.up||d.down&&d.left||d.right){
            s=diagSpeed
        }
        if(d.up){
            if(!d.right&&!d.left)position.current.y-=speed//up
            else if(d.right&&!d.left){position.current.y-=speed;position.current.x+=speed}//up right
            else if(!d.right&&d.left){position.current.y-=speed;position.current.x-=speed}//up left
        }else if(d.down){
            if(!d.right&&!d.left)position.current.y+=speed//down
            else if(d.right&&!d.left){position.current.y+=speed;position.current.x+=speed}//down right
            else if(!d.right&&d.left){position.current.y+=speed;position.current.x-=speed}//down left
        }else{
            if(d.left)position.current.x-=speed//left
            else if(d.right)position.current.x+=speed//right
        }
        render({})
    }
    useEffect(()=>{
        const movement = setInterval(()=>move(direction.current), 100);
        return ()=>{clearInterval(movement)}
    },[])
    useEffect(()=>{
        window.onkeydown = (event)=>{
            //console.log(event)
            moveKeyDown(event)
        }; 
        window.onkeyup = (event)=>{
            //console.log(event)
            moveKeyUp(event)
        };
    },[])

    return <>
        <Row>
            <Col xs={4}></Col>
            <Col xs={4}>
                <Button id={'up'} name={'ArrowUp'} onMouseDown={()=>{direction.current.up=true}} onMouseUp={()=>{direction.current.up=false}} onTouchStart={()=>{direction.current.up=true}} onTouchEnd={()=>{direction.current.up=false}}>Up</Button>
            </Col>
            <Col xs={4}></Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button id={'left'} name={'ArrowLeft'} onMouseDown={()=>{direction.current.left=true}} onMouseUp={()=>{direction.current.left=false}} onTouchStart={()=>{direction.current.left=true}} onTouchEnd={()=>{direction.current.left=false}}>Left</Button>
            </Col> 
            <Col xs={4}></Col> 
            <Col xs={4}>
                <Button id={'right'} name={'ArrowRight'} onMouseDown={()=>{direction.current.right=true}} onMouseUp={()=>{direction.current.right=false}} onTouchStart={()=>{direction.current.right=true}} onTouchEnd={()=>{direction.current.right=false}}>Right</Button>
            </Col> 
        </Row>
        <Row>
            <Col xs={4}></Col> 
            <Col xs={4}>
                <Button id={'down'} name={'ArrowDown'} onMouseDown={()=>{direction.current.down=true}} onMouseUp={()=>{direction.current.down=false}} onTouchStart={()=>{direction.current.down=true}} onTouchEnd={()=>{direction.current.down=false}}>Down</Button>
            </Col> 
            <Col xs={4}></Col> 
        </Row></>
}
type Entity = {
    name: string,
    position: {x: number, y: number},
    trigger: (entitiesList: Entity[])=>void,
    triggerMessage: string
}
function Field({dispatch}: {dispatch: React.Dispatch<any>}){
    const render = useState({})[1]
    const position = useRef({x: 0, y: 0})
    const direction = useRef({up: false, down: false, left: false, right: false})
    const entities: {current: Entity[]} = useRef([])
    function RenderPlayer({pos}: {pos: {x: number, y: number}}){
        return <Col><Button style={{position: 'absolute', zIndex: 1, top: pos.y+'px', left: pos.x+'px'}} 
            onClick={()=>{pos.x=0;pos.y=0;render({})}}>Player</Button></Col>
    }
    function RenderEntities({ents}: {ents: Entity[]}){
        return <>{ents.map((e, i)=>{
            return <Col key={i}><Button style={{position: 'absolute', top: e.position.y+'px', left: e.position.x+'px'}}
                onClick={()=>{e.trigger(ents);e.position.x+=1;render({})}}>{e.name}</Button></Col>
        })}</>
    }
    useEffect(()=>{
        entities.current.push({name: 'Colider Hawk', position: {x: 100, y: 100}, trigger: (entitiesList)=>{
            let self = entitiesList.filter(e=>e.name==='Hawk')[0]
            if(self){
                let ePos = self.position
                if(ePos)if(isNear(ePos, position.current, 50))console.log('Entity 1 triggered: collided with player')
            }
        }, triggerMessage: 'You found a hawk!'})

        entities.current.push({name: 'Gem Mine', position: {x: 50, y: 50}, trigger: (entitiesList)=>{
            let self = entitiesList.filter(e=>e.name==='Gem Mine')[0]
            if(self){
                let ePos = self.position
                if(ePos)if(new Date().getSeconds()%5==0)if(isNear(ePos, position?.current, 50))dispatch({type: 'addGem', payload: {amount: 1}})
            }
        }, triggerMessage: 'You found a gem mine!'})
        return ()=>{entities.current = []}
    },[])

    function isNear(p1: {x: number, y: number}, p2: {x: number, y: number}, dist: number){
        if(!p1||!p2)return false
        return p1.x>=p2.x-dist&&p1.y>=p2.y-dist&&p1.x<=p2.x+dist&&p1.y<=p2.y+dist
    }
    useEffect(()=>{
        entities.current.forEach(e=>{
            if(isNear(e.position, position.current, 50)) e.trigger(entities.current)
        });
    },[position.current.x, position.current.y])
    return <>
        <Row id={'Field Control'}>
            <Col xs={12} sm={6} md={3} style={{backgroundColor: 'lightgrey'}}>
                <Control direction={direction} position={position} render={render}/>
                {
                    //JSON.stringify(direction.current)
                }
            </Col>
        </Row>
        <Row id={'Field'} style={{position: 'relative', height: '20%'}}>
            <RenderPlayer pos={position.current}/>
            <RenderEntities ents={entities.current}/>
        </Row>
    </>
}