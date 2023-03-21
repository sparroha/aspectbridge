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
    description: string,
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
    E: EventData,
    setE: Function,
    viewDistance: number,
    setViewDistance: Function,
    position: Position,
    setPosition: Function,
}

//tiles.ts
const treeOfLife: Region = {
    name: 'Tree of Life',
    description: 'The Tree of Life is a symbol of life and rebirth. It is a symbol of the interconnectedness of all life on our planet. It is a symbol of the interconnectedness of all life in the universe. It is a symbol of the interconnectedness of all life in the multive',
    image: 'tree.png',
    paths: []}
const branchNS: Region = {
    name: 'NS Branch',
    description: 'The Branch is a symbol of life and rebirth. It is a symbol of the interconnectedness of all life on our planet. It is a symbol of the interconnectedness of all life in the universe. It is a symbol of the interconnectedness of all life in the multive',
    image: 'branchNS.png',
    paths: [1,0,1,0,1,1]
}
const branchWE: Region = {
    name: 'EW Branch',
    image: 'branchWE.png',
    paths: [0,1,0,1,1,1]
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
export const reagionLibrary: Region[] = [
    treeOfLife,
    branchNS,
    branchWE,
    branchV
]
const rl = reagionLibrary;
export const treeOfLifeRegionMap: Region[][][] = [
    [
        [{paths: [1,0,0,1,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}, vineUp, {paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}],
    ],
    [
        [{paths: [1,0,0,1,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, vineUpDown, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}],
    ],
    [
        [{paths: [1,0,0,1,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, vineUpDown, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}],
    ],
    [
        [{paths: [1,0,0,1,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, vineUpDown, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}],
    ],
    [
        [{paths: [1,0,0,1,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, vineUpDown, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}],
    ],
    [
        [{paths: [1,0,0,1,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, vineUpDown, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}],
    ],
    [
        [{paths: [1,0,0,1,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, vineDown, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,0,1,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [{paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}],
    ],
]