import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Nav, Row } from "react-bootstrap";
import requestIp from 'request-ip';
import useLog from "../../components/conlog";
import { ProfileByIp } from "../login/[userlogin]";
import { EventData, eventsList, fallEvent, GameData, MapData, Position, Region, treeOfLifeRegionMap } from "./dragons/tileTypes";

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
    text: 'center',
    zIndex: '10'
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

export default function NetDragons({ip, M, E}: {ip: string, M: MapData, E: EventData[]}){
    const [user, setUser] = useState(null)
    const startPosition: Position = {x: 0, y: 0, z: 0, pixel:{x: 0, y: 0}}
    const [playerPosition, setPlayerPosition] = useState(startPosition)
    const game: GameData = useGame(M, 0, playerPosition, setPlayerPosition, E)
    const inventory = useInventory({inventory: ['']})
    return <div className={'net-dragons'}>
        <Nav><h3>Next Dragons</h3><Nav.Link href={"/login/"+(user?'logout':'login')+'?homepage='+'bridge/nextdragons'+(user?'&username='+user.username:'')}>{user?('Logout '+user.username):'Login'}</Nav.Link>{' '}</Nav>
        <Row>
            <Col xs={6} sm={2}>
                <MapSettings game={game}/>
            </Col>
            <Col xs={6} sm={2}>
                <Controls game={game}/>
            </Col>
            <Col xs={12} sm={2}>
                <Inventory inventory={inventory}/>
            </Col>
            <Col xs={12} sm={8}>
                <MapFollow game={game}/>
            </Col>
        </Row>
        <ProfileByIp ip={ip} setUser={setUser}/>
    </div>
}

function MapSettings({game}: {game: GameData}){
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [z, setZ] = useState(0)
  
    return <div style={portcontrol}>
        View Distance:
        <select value={game.viewDistance} onChange={e => game.setViewDistance(Number(e.target.value))}>
            <option key={0} value={0}>0</option>
            <option key={1} value={1}>1</option>
            <option key={2} value={2}>2</option>
        </select>
        <Form id={'teleport'} style={portcontrol} onSubmit={(event) => {event.preventDefault();
                if(typeof game.regions[z] === 'undefined') return;
                if(typeof game.regions[z][x] === 'undefined') return;
                if(typeof game.regions[z][x][y] === 'undefined'/*|| !game.regions[z][x][y].isValid*/) return;
                game.setPosition({x: x, y: y, z: z})
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

export function Controls({game}: {game: GameData}){
    return <div className={'net-dragons-controls'}>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>{game.setPosition((pP)=>{
                    if(typeof game.regions[pP.z-1] === 'undefined') return pP;
                    if(typeof game.regions[pP.z-1][pP.x] === 'undefined') return pP;
                    if(typeof game.regions[pP.z-1][pP.x][pP.y] === 'undefined') return pP;
                    return {x: pP.x, y: pP.y, z: pP.z+(!(game.regions[pP.z][pP.x][pP.y].paths[5])?-1:0)}})}}>Down</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>{game.setPosition((pP)=>{
                    if(typeof game.regions[pP.z] === 'undefined') return pP;
                    if(typeof game.regions[pP.z][pP.x-1] === 'undefined') return pP;
                    if(typeof game.regions[pP.z][pP.x-1][pP.y] === 'undefined') return pP;
                    return {x: pP.x+(!(game.regions[pP.z][pP.x][pP.y].paths[0])?-1:0), y: pP.y, z: pP.z}})}}>North</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>{game.setPosition((pP)=>{
                    if(typeof game.regions[pP.z+1] === 'undefined') return pP;
                    if(typeof game.regions[pP.z+1][pP.x] === 'undefined') return pP;
                    if(typeof game.regions[pP.z+1][pP.x][pP.y] === 'undefined') return pP;
                    return {x: pP.x, y: pP.y, z: pP.z+(!(game.regions[pP.z][pP.x][pP.y].paths[4])?1:0)}})}}>Up</Button>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>{game.setPosition((pP)=>{
                    if(typeof game.regions[pP.z] === 'undefined') return pP;
                    if(typeof game.regions[pP.z][pP.x] === 'undefined') return pP;
                    if(typeof game.regions[pP.z][pP.x][pP.y-1] === 'undefined') return pP;
                    return {x: pP.x, y: pP.y+(!(game.regions[pP.z][pP.x][pP.y].paths[3])?-1:0), z: pP.z}})}}>West</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Enter</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>{game.setPosition((pP)=>{
                    if(typeof game.regions[pP.z] === 'undefined') return pP;
                    if(typeof game.regions[pP.z][pP.x] === 'undefined') return pP;
                    if(typeof game.regions[pP.z][pP.x][pP.y+1] === 'undefined') return pP;
                    return {x: pP.x, y: pP.y+(!(game.regions[pP.z][pP.x][pP.y].paths[1])?1:0), z: pP.z}})}}>East</Button>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Run</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>{game.setPosition((pP)=>{
                    if(typeof game.regions[pP.z] === 'undefined') return pP;
                    if(typeof game.regions[pP.z][pP.x+1] === 'undefined') return pP;
                    if(typeof game.regions[pP.z][pP.x+1][pP.y] === 'undefined') return pP;
                    return {x: pP.x+(!(game.regions[pP.z][pP.x][pP.y].paths[2])?1:0), y: pP.y, z: pP.z}})}}>South</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Fight</Button>
            </Col>
        </Row>
    </div>
}

export function MapFollow({game}: {game: GameData}){
    useEffect(()=>{
        game.setEventIndex(Math.floor(Math.random()*game.events.length))
        return game.regions[game.position.z][game.position.x][game.position.y].events?.forEach((event)=>{
            switch(event.init){
                case 'fall':
                    fallEvent(game)
                case 'fight':
                    game.setEventIndex(Math.floor(Math.random()*game.events.length))
                    break;
                case 'item':
                    game.setEventIndex(Math.floor(Math.random()*game.events.length))
                    break;
                case 'trap':
                    game.setEventIndex(Math.floor(Math.random()*game.events.length))
                    break;
                case 'treasure':
                    game.setEventIndex(Math.floor(Math.random()*game.events.length))
                    break;
                case 'event':
                    game.setEventIndex(Math.floor(Math.random()*game.events.length))
                    break;
                default:
                    game.setEventIndex(Math.floor(Math.random()*game.events.length))
                    break;
            }
        })
    },[game.position])
    return <div className={'net-dragons-map'}>Event:{'\['}{game.events[game.eventIndex].name}{': '}{game.events[game.eventIndex].description}{'\]'}
        {game.regions?.map((row, i) => (game.position.z==i)?<Row key={i}>Floor {i+1}<Col xs={12}>
            {row.map((col, j) => (j>=(game.position.x-game.viewDistance))&&(j<=(game.position.x+game.viewDistance))?<Row key={j}><Col xs={12} style={{padding: 0}}>
                {col.map((cell, k) => ((k>=game.position.y-game.viewDistance)&&(k<=game.position.y+game.viewDistance))?
                <div key={k} style={{float: 'left', position: 'relative', ...square}}>
                    <Walls paths={cell.paths}>
                        <Button variant={'primary'} style={square} disabled={(game.position.x==j&&game.position.y==k&&game.position.z==i?false:true)}>{cell.name} {1+k+j*col.length}:<br/>{(1+k)+'\/'+(1+j)}<br/>{game.position.x==j&&game.position.y==k?cell.name:''}</Button>
                    </Walls>
                </div>:
                null)}
            </Col></Row>:null)}
        </Col></Row>:null)}
    </div>
}
function useGame(map: MapData, activeMapIndex: 0, pP: Position, sPP: Function, events: EventData[]): GameData{
    //const mapList = maps
    //const [activeMap, setActiveMap] = useState(mapList[activeMapIndex])
    const [regionMap, setRegionMap] = useState(map.regions)
    const [viewDistance, setViewDistance] = useState(2)
    const [eventIndex, setEventIndex] = useState(0)
    const game: GameData = {
        name: 'placeholder',
        description: 'placeholder',
        background: 'placeholder.png',
        regions: regionMap,
        activeRegion: pP,
        events: events,
        eventIndex: eventIndex,
        setEventIndex: setEventIndex,
        viewDistance: viewDistance,
        setViewDistance: setViewDistance,
        position: pP,
        setPosition: sPP,
    }

    return game
}

function Walls({paths, children}: {paths: number[], children: any}){
    return <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1}}>{children}
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
    const events = eventsList
    const map: MapData = {
        name: 'tree',
        description: 'Tree of Life',
        background: 'tree.png',
        viewDistance: 2,
        setViewDistance: null,
        regions: treeOfLifeRegionMap,
        activeRegion: treeOfLifeRegionMap[0][0][0]
    }
    return {props: {ip: ip, M: map, E: events}} 
}