'use client'
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Nav, Row } from "react-bootstrap";
import { GameData, Player, Position } from "../../public/dragons/tileTypes";
import Inventory, { useInventory } from "./components/inventory";
import MapSettings from "./mapsettings";
import Controls from "./controls";
import MapFollow, { getMap, MapData } from "./components/worldmap";
import { EventData } from "./components/event";
import sql from "../../lib/,base/sql";
import useUser from "../../lib/util/^user";
import UserProfile from "../../lib/util/-userprofile-";

export default function NetDragons({params}){


    const MAP: MapData = getMap('treeOfLife')
    const E: EventData[] = []



    const user = useUser()
    const startPosition: Position = {x: 1, y: 1, z: 0, pixel:{x: 0, y: 0}}
    const [playerPosition, setPlayerPosition] = useState(startPosition)
    const player: Player = {name: user?.username, access: user?.access, position: playerPosition}
    const game: GameData = useGame([MAP], 0, playerPosition, setPlayerPosition, E, player)
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
        <UserProfile/>
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
