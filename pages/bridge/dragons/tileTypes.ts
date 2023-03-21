export default function(){}
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
}
export type MapData = {
    name?: string,
    description?: string,
    background?: string,
    viewDistance: number,
    setViewDistance: Function,
    regions: Region[][][],
    activeRegion: Region
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
    position: Position,
}
export type GameData = {
    name?: string,
    description?: string,
    background?: string,
    regions: Region[][][],
    activeRegion: Position,
    events: EventData[],
    eventIndex: number,
    setEventIndex: Function,
    viewDistance: number,
    setViewDistance: Function,
    position: Position,
    setPosition: Function,
}
//events.ts
export const fallEvent = (game: GameData)=>{game.setPosition((pos: Position)=>{return {x: pos.x, y: pos.y, z: pos.z+(pos.z>=1?-1:0)}})}
const fall: EventData = {
    name: 'fall',
    description: 'you fell',
    init: 'fall',
}
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
//tiles.ts
const treeOfLife: Region = {
    name: 'Tree of Life',
    description: 'The Tree of Life is a symbol of life and rebirth. It is a symbol of the interconnectedness of all life on our planet. It is a symbol of the interconnectedness of all life in the universe. It is a symbol of the interconnectedness of all life in the multive',
    image: 'tree.png',
    paths: [],
    items: [],
    monsters: [],
    events: [],
    destination: {x: 0, y: 0, z: 0}
}
const air: Region = {
    name: 'Air',
    description: 'gravity takes over',
    image: 'air.png',
    paths: [0,0,0,0,0,0],
    items: [],
    monsters: [],
    events: [fall],
    destination: {x: 0, y: 0, z: 0}
}
const branchNS: Region = {
    name: 'NS Branch',
    description: 'The Branch is a symbol of life and rebirth. It is a symbol of the interconnectedness of all life on our planet. It is a symbol of the interconnectedness of all life in the universe. It is a symbol of the interconnectedness of all life in the multive',
    image: 'branchNS.png',
    paths: [0,1,0,1,1,1]
}
const branchNE: Region = {
    name: 'NE Branch',
    image: 'branchNE.png',
    paths: [0,0,1,1,1,1]
}
const branchWE: Region = {
    name: 'WE Branch',
    image: 'branchWE.png',
    paths: [1,0,1,0,1,1]
}
const branchE: Region = {
    name: 'E Branch',
    image: 'branchE.png',
    paths: [1,0,1,1,1,1]
}
const branchW: Region = {
    name: 'W Branch',
    image: 'branchW.png',
    paths: [1,1,1,0,1,1]
}
const branchS: Region = {
    name: 'S Branch',
    image: 'branchS.png',
    paths: [1,1,0,1,1,1]
}
const branchN: Region = {
    name: 'N Branch',
    image: 'branchN.png',
    paths: [0,1,1,1,1,1]
}
const branchV: Region = {
    name: 'Vertical Branch',
    paths: [0,0,0,0,1,1]
}
const vineUp: Region = {
    name: 'Vine Up',
    paths: [1,1,0,1,0,1]
}
const vineDown: Region = {
    name: 'Vine Down',
    paths: [1,1,0,1,1,0]
}
const vineUpDown: Region = {
    name: 'Vine Up and Down',
    paths: [1,1,0,1,0,0]
}
const reagionLibrary = {
    air: air,
    treeOfLife: treeOfLife,
    branchNS: branchNS,
    branchNE: branchNE,
    branchWE: branchWE,
    branchE: branchE,
    branchW: branchW,
    branchV: branchV,
    branchS: branchS,
    branchN: branchN,
    vineUp: vineUp,
    vineDown: vineDown,
    vineUpDown: vineUpDown,
}
const rl = reagionLibrary;
export const treeOfLifeRegionMap: Region[][][] = [
    [
        [{paths: [1,0,0,1,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}],
        [{paths: [0,1,0,1,1,1]}, rl.branchS, {paths: [0,1,1,1,1,1]}, rl.branchS, {paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,1,0,1,1,1]}, rl.branchNE, {paths: [1,0,0,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [1,0,0,0,1,1]}, rl.branchW, {paths: [0,1,0,1,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [0,1,0,0,1,1]}, rl.vineUp, {paths: [0,0,0,1,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,1,0,1,1,1]}, rl.branchE, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}, {paths: [0,0,1,1,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [1,1,0,0,1,1]}, rl.branchN, {paths: [0,1,0,1,1,1]}, rl.branchNE, rl.branchW, {paths: [0,1,0,1,1,1]}],
        [{paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}],
    ],
    [
        [air, air, air, air, air, air, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: []}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: []}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: []}, {paths: [1,0,0,1,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,1,0,0,1,1]}, {paths: [0,0,0,1,1,1], events: []}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [0,1,0,1,1,1]}, rl.vineUpDown, {paths: [0,1,0,1,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: []}, {paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: []}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: []}, {paths: [0,0,0,0,1,1], events: []}, air],
        [air, air, air, air, air, air, air],
    ],
    [
        [air, air, air, air, air, air, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [1,0,0,1,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,1,0,0,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [0,1,0,1,1,1]}, rl.vineUpDown, {paths: [0,1,0,1,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, air],
        [air, air, air, air, air, air, air],
    ],
    [
        [air, air, air, air, air, air, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [1,0,0,1,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,1,0,0,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [0,1,0,1,1,1]}, rl.vineUpDown, {paths: [0,1,0,1,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, air],
        [air, air, air, air, air, air, air],
    ],
    [
        [air, air, air, air, air, air, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [1,0,0,1,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,1,0,0,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [0,1,0,1,1,1]}, rl.vineUpDown, {paths: [0,1,0,1,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, air],
        [air, air, air, air, air, air, air],
    ],
    [
        [air, air, air, air, air, air, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [1,0,0,1,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,1,0,0,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [0,1,0,1,1,1]}, rl.vineUpDown, {paths: [0,1,0,1,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [{paths: [0,0,0,1,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, air],
        [air, air, air, air, air, air, air],
    ],
    [
        [air, air, air, air, air, air, air],
        [air, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [0,0,1,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, air],
        [air, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [1,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [air, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1]}, rl.vineDown, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1], events: [fall]}, air],
        [air, {paths: [0,1,0,0,1,1], events: [fall]}, {paths: [0,0,1,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,1,0,1,1]}, {paths: [0,0,0,1,1,1], events: [fall]}, air],
        [air, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, {paths: [1,0,0,0,1,1], events: [fall]}, {paths: [0,0,0,0,1,1], events: [fall]}, air],
        [air, air, air, air, air, air, air],
    ],
]