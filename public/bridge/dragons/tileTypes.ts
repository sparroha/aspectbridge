import { getMap, reagionLibrary } from "./tiles"

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
export type Position ={
    x: number,
    y: number,
    z: number,
    pixel?: {
        x: number,
        y: number,
    }
}
export type Region = {
    name?: string,
    description?: string,
    image?: string,
    paths: number[],//north, east, south, west, up, down
    items?: Item[],//list of items that may apear in this region
    monsters?: any[],//list of monsters that may apear in this region
    events?: any[],//list of events that may apear in this region
    destination?: Position,
    destinationMap?: string,
}
export type MapData = {
    name?: string,
    description?: string,
    background?: string,
    viewDistance: number,
    setViewDistance: Function,
    regions: Region[][][]
}
export type EventData = {
    name: string,
    description?: string,
    init?: string,
    update?: string,
    destroy?: string,
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
export const exitEvent = (game: GameData)=>{game.setActiveMap(game.previousMap);let reg: Region = game.activeMap.regions[game.position.z][game.position.x][game.position.y];game.setPosition(reg.destination || game.previousMapPos/*(pos: Position)=>{return game.activeMap.regions[pos.z][pos.x][pos.y].destination}*/)}
export const enterEvent = (game: GameData)=>{game.setPreviousMap(game.activeMap);game.setPreviousMapPos(game.position);let reg: Region = game.activeMap.regions[game.position.z][game.position.x][game.position.y];game.setActiveMap(getMap(reg.destinationMap));game.setPosition(reg.destination/*(pos: Position)=>{return game.activeMap.regions[pos.z][pos.x][pos.y].destination}*/)}
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

const rl = reagionLibrary;
type Floor = Region[][];
const treeTrunk: Floor = [
    [rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air],
    [rl.air, rl.air, rl.air, rl.air, {paths: [0,0,1,0,1,1], events: []}, rl.air, rl.air, rl.air],
    [rl.air, rl.air, {paths: [0,1,0,0,1,1], events: []}, {paths: [1,0,0,1,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,1,0,0,1,1]}, {paths: [0,0,0,1,1,1], events: []}, rl.air],
    [rl.air, rl.air, rl.air, {paths: [0,1,0,1,1,1]}, rl.vineUpDown, {paths: [0,1,0,1,1,1]}, rl.air, rl.air],
    [rl.air, rl.air, {paths: [0,1,0,0,1,1], events: []}, {paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}, {paths: [0,0,0,1,1,1], events: [rl.events.fall]}, rl.air],
    [rl.air, rl.air, rl.air, {paths: [1,0,0,0,1,1], events: []}, rl.air, {paths: [1,0,0,0,1,1], events: []}, {paths: [0,0,0,0,1,1], events: []}, rl.air],
    [rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air],
    [rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air],
]
export const treeOfLifeRegionMap: Region[][][] = [
    [
        [rl.exitWorldTree, {paths: [1,0,0,0,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}],
        [rl.exitWorldTree, {paths: [0,1,0,0,1,1]}, rl.branchS, {paths: [0,1,1,1,1,1]}, rl.branchS, {paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [rl.exitWorldTree, {paths: [0,1,0,0,1,1]}, rl.branchNE, {paths: [1,0,0,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [1,0,0,0,1,1]}, rl.branchW, {paths: [0,1,0,1,1,1]}],
        [rl.exitWorldTree, {paths: [0,0,0,0,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [0,1,0,0,1,1]}, rl.treeOfLifeEntrance, {paths: [0,0,0,1,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [rl.exitWorldTree, {paths: [0,1,0,0,1,1]}, rl.branchE, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}, {paths: [0,0,1,1,1,1]}, {paths: [0,1,0,0,1,1]}],
        [rl.exitWorldTree, {paths: [0,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}, rl.branchN, {paths: [0,1,0,1,1,1]}, rl.branchNE, rl.branchW, {paths: [0,1,0,1,1,1]}],
        [rl.exitWorldTree, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [rl.exitWorldTree, rl.exitWorldTree, rl.exitWorldTree, rl.exitWorldTree, rl.exitWorldTree, rl.exitWorldTree, rl.exitWorldTree, rl.exitWorldTree],
    ],
    treeTrunk,
    treeTrunk,
    treeTrunk,
    treeTrunk,
    treeTrunk,
    [
        [rl.air, rl.branchE, rl.branchWS, rl.air, rl.branchSE, rl.branchW, rl.air, rl.branchS],
        [rl.air, rl.air, rl.branchNS, rl.air, rl.branchNS, rl.air, rl.air, rl.branchNS],
        [rl.air, rl.air, rl.branchNE, {paths: [1,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, rl.branchWE, rl.branchNW],
        [rl.air, rl.air, rl.air, {paths: [0,0,0,0,1,1]}, rl.vineDown, {paths: [0,0,0,0,1,1]}, rl.air, rl.air],
        [rl.air, rl.branchSE, rl.branchWE, {paths: [0,0,1,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}, rl.air, rl.branchS],
        [rl.air, rl.branchNS, rl.air, rl.air, rl.air, rl.branchNSE, rl.branchWE, rl.branchNSW],
        [rl.air, rl.branchNE, rl.branchW, rl.air, rl.branchE, rl.branchNW, rl.air, rl.branchN],
        [rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air],
    ],
]


export const treeOfLife: MapData = {
    name: 'tree',
    description: 'Tree of Life',
    background: 'tree.png',
    viewDistance: 2,
    setViewDistance: null,
    regions: treeOfLifeRegionMap,
}