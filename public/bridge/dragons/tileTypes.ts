import { EventData } from "../../../pages/bridge/dragons/components/event"
import { MapData } from "../../../pages/bridge/dragons/components/worldmap"


export type Position ={
    x: number,
    y: number,
    z: number,
    pixel?: {
        x: number,
        y: number,
    }
}

export type Player = {
    name?: string,
    description?: string,
    image?: string,
    access?: number,
    position?: Position,
}
export type GameData = {
    user?: Player,
    name?: string,
    description?: string,
    background?: string,
    previousMap?: MapData,
    setPreviousMap?: Function,
    previousMapPos?: Position,
    setPreviousMapPos?: Function,
    activeMap: MapData,
    setActiveMap: Function,
    events: EventData[],
    eventIndex: number,
    setEventIndex: Function,
    viewDistance: number,
    setViewDistance: Function,
    position: Position,
    setPosition: Function,
}
//events.ts


