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

export const eventsList: EventData[] = [
    {name: 'nothing', description: 'nothing happens'},
    {name: 'nothing', description: 'nothing happens'},
    {name: 'nothing', description: 'nothing happens'},
    {name: 'nothing', description: 'nothing happens'},
    {name: 'item', description: 'you have discovered an lietem. click your location to pick it up'},
    {name: 'bright idea', description: 'a wild hare has appeared with a wild hair on its tail'},
    {name: 'ambush', description: 'a wild wildabeast has appeared'},
    {name: 'ambush', description: 'a tame guard dog has appeared'},
    {name: 'trip', description: 'you ate some bad shrooms bro'}
]