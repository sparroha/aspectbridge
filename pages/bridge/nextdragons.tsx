import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Nav, Row } from "react-bootstrap";
import requestIp from 'request-ip';
import useLog from "../../components/conlog";
import { ProfileByIp } from "../login/[userlogin]";

export const portcontrol = {
    fontSize: '10px',
    margin: '0px',
    padding: '0px',
    text: 'center',
}
export const control = {
    fontSize: '10px',
    width: '36px',
    height: '24px',
    margin: '0px',
    padding: '0px',
    text: 'center'
}
export const square = {
    fontSize: '12px',
    width: '64px',
    height: '64px',
    margin: '0px',
    padding: '0px',
    text: 'center'
}
export const wall = {
    horizontal: {
        width: '100%',
        height: '10%',
        margin: '0px',
        padding: '0px',
        text: 'center'
    },
    vertical: {
        width: '10%',
        height: '100%',
        margin: '0px',
        padding: '0px',
        text: 'center'
    }
}
export type Item = {
    name: string,
    description: string,
    image: string,
    weight: number,
    value: number,
    volume: number,
    stackable: boolean,
    stackSize: number,
    stackCount: number,
    use: Function,
    useable: boolean,
    equipable: boolean,
    equipped: boolean,
    equip: Function,
    unequip: Function,
    drop: Function,
    droppable: boolean,
    pickup: Function,
    pickupable: boolean,
    destroy: Function,
    destroyable: boolean,
    craft: Function,
    craftable: boolean,
    craftableWith: Item[],
    craftableTo: Item[],
    craftableFrom: Item[],
    craftableFromCount: number,
    craftableToCount: number,
    craftableWithCount: number,
    
}

export default function NetDragons({ip, M, E}){
    const [user, setUser] = useState(null)
    const [playerPosition, setPlayerPosition] = useState({x: 0, y: 0, z: 0})
    const map = useMap(M, playerPosition, E)
    const inventory = useInventory({inventory: ['']})
//<ProfileByIp ip={ip} setUser={setUser}/>
    return <div className={'net-dragons'}>
        <Nav><h3>Next Dragons</h3><Nav.Link href={"/login/"+(user?'logout':'login')+'?homepage='+'bridge/newdragons'+(user?'&username='+user.username:'')}>{user?('Logout '+user.username):'Login'}</Nav.Link>{' '}</Nav>
        <Row>
            <Col xs={6} sm={2}>
                <MapSettings map={map} sSP={setPlayerPosition}/>
            </Col>
            <Col xs={6} sm={2}>
                <Controls M={map} sPP={setPlayerPosition}/>
            </Col>
            <Col xs={12} sm={2}>
                <Inventory inventory={inventory}/>
            </Col>
            <Col xs={12} sm={8}>
                <MapFollow M={map}/>
            </Col>
        </Row>
        <ProfileByIp ip={ip} setUser={setUser}/>
    </div>
}

function MapSettings({map, sSP}){
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [z, setZ] = useState(0)
  
    return <div style={portcontrol}>
        View Distance:
        <select value={map.vieDistance} onChange={e => map.setViewDistance(Number(e.target.value))}>
            <option key={0} value={0}>0</option>
            <option key={1} value={1}>1</option>
            <option key={2} value={2}>2</option>
        </select>
        <Form id={'loginForm'} style={portcontrol} onSubmit={(event) => {event.preventDefault();
                if(typeof map.M[z] === 'undefined') return;
                if(typeof map.M[z][x] === 'undefined') return;
                if(typeof map.M[z][x][y] === 'undefined') return;
                sSP({x: x, y: y, z: z})
            }} >
            <Form.Group style={portcontrol} controlId="formEmail">
                <Form.Label>Longitude</Form.Label>
                <Form.Control style={portcontrol} required type="number" min={1} value={x+1} onChange={(e)=>setX(parseInt(e.target.value)-1)}/>
                <Form.Label>Latitude</Form.Label>
                <Form.Control style={portcontrol} required type="number" min={1} value={y+1} onChange={(e)=>setY(parseInt(e.target.value)-1)}/>
                <Form.Label>Altitude</Form.Label>
                <Form.Control style={portcontrol} required type="number" min={1} value={z+1} onChange={(e)=>setZ(parseInt(e.target.value)-1)}/>
            </Form.Group>
            <Button style={portcontrol} type="submit" >Teleport</Button>
        </Form>
    </div>
  }

export function Controls({M, sPP}){
    return <div className={'net-dragons-controls'}>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y, z: pP.z+(!(M.M[pP.z][pP.x][pP.y].paths[5])?-1:0)}})}>Down</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x+(!(M.M[pP.z][pP.x][pP.y].paths[0])?-1:0), y: pP.y, z: pP.z}})}>North</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y, z: pP.z+(!(M.M[pP.z][pP.x][pP.y].paths[4])?1:0)}})}>Up</Button>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y+(!(M.M[pP.z][pP.x][pP.y].paths[3])?-1:0), z: pP.z}})}>West</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Enter</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y+(!(M.M[pP.z][pP.x][pP.y].paths[1])?1:0), z: pP.z}})}>East</Button>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Run</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x+(!(M.M[pP.z][pP.x][pP.y].paths[2])?1:0), y: pP.y, z: pP.z}})}>South</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Fight</Button>
            </Col>
        </Row>
    </div>
}

export function Map({M}){
    useEffect(()=>{
        M.setE(M.events[Math.floor(Math.random()*M.events.length)])
    },[M.pP])
    return <div className={'net-dragons-map'}>Event: {M.E[0].title}{'\>'}{M.E[0].description}
        {M?.map((row, i) => {if(M.pP.z==i) {return <Row key={i}>Floor {i}<Col xs={12}>
            {row.map((col, j) => <Row key={j}><Col xs={12}>
                {col.map((cell, k) => <div key={k} style={{float: 'left'}}>
                    <Button variant={'primary'} style={square} disabled={(M.pP.x==j&&M.pP.y==k&&M.pP.z==i?false:true)}>

                            room {1+k+j*col.length}:<br/>{(1+k)+'\/'+(1+j)}<br/>{M.pP.x==j&&M.pP.y==k?cell:''}
                        
                    </Button>
                </div>)}
            </Col></Row>)}
        </Col></Row>}})}
    </div>
}
export function MapFollow({M}){
    useEffect(()=>{
        M.setE(M.events[Math.floor(Math.random()*M.events.length)])
    },[M.pP])
    return <div className={'net-dragons-map'}>Event:{'\['}{M.E.title}{': '}{M.E.description}{'\]'}
        {M.M?.map((row, i) => (M.pP.z==i)?<Row key={i}>Floor {i+1}<Col xs={12}>
            {row.map((col, j) => (j>=(M.pP.x-M.vieDistance))&&(j<=(M.pP.x+M.vieDistance))?<Row key={j}><Col xs={12} style={{padding: 0}}>
                {col.map((cell, k) => ((k>=M.pP.y-M.vieDistance)&&(k<=M.pP.y+M.vieDistance))?
                <div key={k} style={{float: 'left', position: 'relative', ...square}}>
                    <Button variant={'primary'} style={square} disabled={(M.pP.x==j&&M.pP.y==k&&M.pP.z==i?false:true)}>{cell.title} {1+k+j*col.length}:<br/>{(1+k)+'\/'+(1+j)}<br/>{M.pP.x==j&&M.pP.y==k?cell.title:''}</Button>
                    <Walls paths={cell.paths}/>
                </div>:
                null)}
            </Col></Row>:null)}
        </Col></Row>:null)}
    </div>
}
function useMap(map, pP, events){
    const [M, setM] = useState(map)
    const [vieDistance, setViewDistance] = useState(2)
    const [E, setE] = useState(events[0])
    return {M, pP, events, E, setE, vieDistance, setViewDistance}
}

function Walls({paths}: {paths: number[]}){
    return <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1}}>
        {paths[0]==1?<div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', backgroundColor: 'black', zIndex: 1}}></div>:null}
        {paths[1]==1?<div style={{position: 'absolute', top: 0, right: 0, width: '5px', height: '100%', backgroundColor: 'black', zIndex: 1}}></div>:null}
        {paths[2]==1?<div style={{position: 'absolute', bottom: 0, right: 0, width: '100%', height: '5px', backgroundColor: 'black', zIndex: 1}}></div>:null}
        {paths[3]==1?<div style={{position: 'absolute', bottom: 0, left: 0, width: '5px', height: '100%', backgroundColor: 'black', zIndex: 1}}></div>:null}
    </div>
}
function Inventory({inventory}){
    const {I, setI} = inventory
    return <div className={'net-dragons-inventory'}>
        {I.map((item, i) => <Button key={i} onClick={e => useItem(I, setI, item)}>{item}</Button>)}
    </div>
}
function useInventory({inventory}){
    const [I, setI] = useState(inventory)
    return {I, setI}
}
function addItem(I, setI, item){
    setI([...I, item])
}
function useItem(I, setI, item){
    switch(item){
        case 'hair':
            setI(I.filter(i => i!=item))
            addItem(I, setI, 'hair')
            item.use()
            break
        default:
            break
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const ip = await requestIp.getClientIp(context.req)
    const eventsList = [
        {title: 'nothing', description: 'nothing happens'},
        {title: 'nothing', description: 'nothing happens'},
        {title: 'nothing', description: 'nothing happens'},
        {title: 'nothing', description: 'nothing happens'},
        {title: 'item', description: 'you have discovered an item. click your location to pick it up'},
        {title: 'bright idea', description: 'a wild hair has apeared up yours'},
        {title: 'ambush', description: 'a wild wildabeast has apeared'},
        {title: 'ambush', description: 'a tame guard dog has apeared'},
        {title: 'trip', description: 'you ate some bad shooms bro'},
    ]
    const map = [
        [
            [
                {title: 'left', paths: [1,0,0,1,0,1]},
                {title: 'mid', paths: [1,0,0,1,0,1]},
                {title: 'mid', paths: [1,0,0,0,0,1]},
                {title: 'right', paths: [1,1,0,0,0,1]},
            ],
            [
                {title: 'left', paths: [1,0,0,1,0,1]},
                {title: 'mid', paths: [0,0,0,0,0,1]},
                {title: 'mid', paths: [0,0,0,0,0,1]},
                {title: 'right', paths: [0,0,0,0,0,1]},
                {title: 'faright', paths: [1,1,1,0,0,1]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,1]},
                {title: 'mid', paths: [0,0,0,0,0,1]},
                {title: 'mid', paths: [0,0,0,0,0,1]},
                {title: 'right', paths: [0,1,0,0,0,1]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,1]},
                {title: 'mid', paths: [0,0,0,0,0,1]},
                {title: 'mid', paths: [0,0,0,0,0,1]},
                {title: 'right', paths: [0,1,0,0,0,1]},
            ],
            [
                {title: 'left', paths: [0,0,1,1,0,1]},
                {title: 'mid', paths: [0,0,1,0,0,1]},
                {title: 'mid', paths: [0,0,1,0,0,1]},
                {title: 'right', paths: [0,1,1,0,0,1]},
            ],
        ],
        [
            [
                {title: 'left', paths: [1,0,0,1,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'right', paths: [1,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,0,0,0,0,0]},
                {title: 'faright', paths: [1,1,1,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,1,1,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'right', paths: [0,1,1,0,0,0]},
            ],
        ],
        [
            [
                {title: 'left', paths: [1,0,0,1,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'right', paths: [1,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,0,0,0,0,0]},
                {title: 'faright', paths: [1,1,1,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,1,1,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'right', paths: [0,1,1,0,0,0]},
            ],
        ],
        [
            [
                {title: 'left', paths: [1,0,0,1,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'right', paths: [1,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,0,0,0,0,0]},
                {title: 'faright', paths: [1,1,1,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,1,1,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'right', paths: [0,1,1,0,0,0]},
            ],
        ],
        [
            [
                {title: 'left', paths: [1,0,0,1,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'right', paths: [1,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,0,0,0,0,0]},
                {title: 'faright', paths: [1,1,1,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,1,1,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'right', paths: [0,1,1,0,0,0]},
            ],
        ],
        [
            [
                {title: 'left', paths: [1,0,0,1,1,0]},
                {title: 'mid', paths: [1,0,0,0,1,0]},
                {title: 'mid', paths: [1,0,0,0,1,0]},
                {title: 'right', paths: [1,1,0,0,1,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,1,0]},
                {title: 'mid', paths: [0,0,0,0,1,0]},
                {title: 'mid', paths: [0,0,0,0,1,0]},
                {title: 'right', paths: [0,0,0,0,1,0]},
                {title: 'faright', paths: [1,1,1,0,1,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,1,0]},
                {title: 'mid', paths: [0,0,0,0,1,0]},
                {title: 'mid', paths: [0,0,0,0,1,0]},
                {title: 'right', paths: [0,1,0,0,1,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,1,0]},
                {title: 'mid', paths: [0,0,0,0,1,0]},
                {title: 'mid', paths: [0,0,0,0,1,0]},
                {title: 'right', paths: [0,1,0,0,1,0]},
            ],
            [
                {title: 'left', paths: [0,0,1,1,1,0]},
                {title: 'mid', paths: [0,0,1,0,1,0]},
                {title: 'mid', paths: [0,0,1,0,1,0]},
                {title: 'right', paths: [0,1,1,0,1,0]},
            ],
        ],
    ]
    return {props: {ip: ip, M: map, E: eventsList}} 
}