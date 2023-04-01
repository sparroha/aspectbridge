import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Nav, Row } from "react-bootstrap";
import requestIp from 'request-ip';
import useLog from "../../components/conlog";
import { ProfileByIp } from "../login/[userlogin]";
import { GameData, Player, Position } from "../../public/dragons/tileTypes";
import Inventory, { useInventory } from "./components/inventory";
import MapSettings from "./mapsettings";
import Controls from "./controls";
import MapFollow, { getMap, MapData } from "./components/worldmap";
import { EventData } from "./components/event";
import sql from "../../lib/,base/sql";

export default function NetDragons({ip, M, E}: {ip: string, M: MapData[], E: EventData[]}){
    const [user, setUser] = useState(null)
    const startPosition: Position = {x: 1, y: 1, z: 0, pixel:{x: 0, y: 0}}
    const [playerPosition, setPlayerPosition] = useState(startPosition)
    const player: Player = {name: user?.username, access: user?.access, position: playerPosition}
    const game: GameData = useGame(M, 0, playerPosition, setPlayerPosition, E, player)
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

function useGame(maps: MapData[], activeMapIndex: number, pP: Position, sPP: Function, events: EventData[], player: Player): GameData{
    //const mapList = maps
    const [activeMap, setActiveMap] = useState(maps[activeMapIndex])
    const [previousMap, setPreviousMap] = useState(activeMap)
    const [previousMapPos, setPreviousMapPos] = useState(pP)
    const [viewDistance, setViewDistance] = useState(2)
    const [eventIndex, setEventIndex] = useState(0)
    const game: GameData = {
        name: 'placeholder',
        description: 'placeholder',
        background: 'placeholder.png',
        previousMap: previousMap,
        setPreviousMap: setPreviousMap,
        previousMapPos: previousMapPos,
        setPreviousMapPos: setPreviousMapPos,
        activeMap: activeMap,
        setActiveMap: setActiveMap,
        events: events,
        eventIndex: eventIndex,
        setEventIndex: setEventIndex,
        viewDistance: viewDistance,
        setViewDistance: setViewDistance,
        user: player,
        position: pP,
        setPosition: sPP,
    }
    return game
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    //extract query arguments from context
    const query = context.query
    //extract user IP from context rquest
    const ip = await requestIp.getClientIp(context.req)

    //get Item data from database
    //const items = await getItems()
    const items = await sql`select * from aspect_dragons_items_ WHERE 1;`
    console.log(items)
    //get Map data from database
    //const maps = await getMaps()
    const maps = await sql`select * from aspect_dragons_maps_ WHERE 1;`
    console.log(maps)
    //get Event data from database
    //****SUCCUEES */
    //const events = await getEvents()
    const events = await sql`select * from aspect_dragons_events_ WHERE 1;`
    console.log(events)
    const eventList: EventData[] = events.map((event: any)=>{return {name: event.name, description: event.description, oninit: JSON.parse(event.oninit), onupdate: JSON.parse(event.onupdate), ondestroy: JSON.parse(event.ondestroy)}}) 
    //get Entity data from database
    //const entities = await getEntities()
    const entities = await sql`select * from aspect_dragons_entities_ WHERE 1;`
    console.log(entities)

    const eventsL = eventList
    const map: MapData = getMap('treeOfLife')
    return {props: {ip: ip, M: [map,map], E: eventsL}} 
}