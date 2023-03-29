import { Button, Col, Row } from "react-bootstrap";
import { GameData, Position } from "../../../public/dragons/tileTypes";
import { RegionData } from "./region";
import { getMap } from "./worldmap";

export type EventData = {
    name: string,
    description?: string,
    init?: string,
    update?: string,
    destroy?: string,
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
    {name: 'item', description: 'you have discovered an item. click your location to pick it up'},
    {name: 'bright idea', description: 'a wild hair has apeared up yours'},
    {name: 'ambush', description: 'a wild wildabeast has apeared'},
    {name: 'ambush', description: 'a tame guard dog has apeared'},
    {name: 'trip', description: 'you ate some bad shooms bro'}
]