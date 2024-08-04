import { Button, Col, Row } from "react-bootstrap";
import { GameData, Position } from "../../../public/dragons/tileTypes";
import { RegionData } from "./region";
import { getMap } from "./worldmap";

export type EventData = {
    id?: number,
    name: string,
    description?: string,
    oninit?: string[],//JSON.stringify(['function1', 'function2'])
    onupdate?: string[],//JSON.stringify(['function1', 'function2'])
    ondestroy?: string[],//JSON.stringify(['function1', 'function2'])
}
export default function Event({event}: {event: EventData}){
    if(!event) return <>Noting is happening.</>
    return <Button style={{position: 'relative'}}>
            <Row height={'33vh'}>
                    <Col xs={12}>{event.name}: {event.description}</Col>
                </Row>
        </Button>
}
export const exitEvent = (game: GameData)=>{game.setActiveMap(game.previousMap);let reg: RegionData = game.activeMap.regions[game.position.z][game.position.x][game.position.y];game.setPosition(reg.destination || game.previousMapPos/*(pos: Position)=>{return game.activeMap.regions[pos.z][pos.x][pos.y].destination}*/)}
export const enterEvent = (game: GameData)=>{game.setPreviousMap(game.activeMap);game.setPreviousMapPos(game.position);let reg: RegionData = game.activeMap.regions[game.position.z][game.position.x][game.position.y];game.setActiveMap(getMap(reg.destinationMap));game.setPosition(reg.destination/*(pos: Position)=>{return game.activeMap.regions[pos.z][pos.x][pos.y].destination}*/)}
export const fallEvent = (game: GameData)=>{game.setPosition((pos: Position)=>{return {x: pos.x, y: pos.y, z: pos.z+(pos.z>=1?-1:0)}})}

const enter: EventData = {
    name: 'enter',
    description: 'you enter this region',
    oninit: ['enter'],
}
//https://aspectbridge.com/api/dragons/events?method=add&name=enter&description=you%20enter%20this%20region&oninit=\["enter"\]

const fall: EventData = {
    name: 'fall',
    description: 'you fell',
    oninit: ['fall'],
}
const exit: EventData = {
    name: 'exit',
    description: 'you left this region',
    oninit: ['exit']
}
export const EVENT = {
    "fall": fallEvent,
}