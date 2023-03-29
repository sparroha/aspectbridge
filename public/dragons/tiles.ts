import { EventData } from "../../pages/dragons/components/event"
import { RegionData } from "../../pages/dragons/components/region"

const enter: EventData = {
    name: 'enter',
    description: 'you enter this region',
    init: 'enter',
}
const treeOfLifeEntrance: RegionData  = {
    name: 'Tree of Life',
    description: 'The Tree of Life is a symbol of life and rebirth. It is a symbol of the interconnectedness of all life on our planet. It is a symbol of the interconnectedness of all life in the universe. It is a symbol of the interconnectedness of all life in the multive',
    image: '../../bridge/dragons/assets/tree.png',
    paths: [1,1,1,1,0,1],
    items: [],
    monsters: [],
    events: [enter],
    destination: {x: 0, y: 1, z: 0},
    destinationMap: 'treeOfLife'
}
const fall: EventData = {
    name: 'fall',
    description: 'you fell',
    init: 'fall',
}
const air: RegionData = {
    name: 'Air',
    description: 'gravity takes over',
    image: 'air.png',
    paths: [0,0,0,0,0,0],
    items: [],
    monsters: [],
    events: [fall],
    destination: {x: 0, y: 0, z: 0}
}
const exit: EventData = {
    name: 'exit',
    description: 'you teft this region',
    init: 'exit',
}
const leaveMap: RegionData = {
    name: 'Exit',
    description: 'you have reached the end of the world',
    image: 'exit.png',
    paths: [0,0,0,0,0,0],
    items: [],
    monsters: [],
    events: [exit]
}
const exitWorldTree: RegionData = {
    name: 'Exit',
    description: 'you have reached the end of the world',
    image: 'exit.png',
    paths: [0,0,0,0,0,0],
    items: [],
    monsters: [],
    events: [exit],
    destination: {x: 3, y: 4, z: 1},
    destinationMap: 'treeOfLife'
}
const branchNS: RegionData = {
    name: 'NS Branch',
    description: 'The Branch is a symbol of life and rebirth. It is a symbol of the interconnectedness of all life on our planet. It is a symbol of the interconnectedness of all life in the universe. It is a symbol of the interconnectedness of all life in the multive',
    image: 'branchNS.png',
    paths: [0,1,0,1,1,1]
}
const branchNSE: RegionData = {
    name: 'NSE Branch',
    image: 'branchNSE.png',
    paths: [0,0,0,1,1,1]
}
const branchNSW: RegionData = {
    name: 'NSW Branch',
    image: 'branchNSW.png',
    paths: [0,1,0,0,1,1]
}
const branchNE: RegionData = {
    name: 'NE Branch',
    image: 'branchNE.png',
    paths: [0,0,1,1,1,1]
}
const branchNW: RegionData = {
    name: 'NW Branch',
    image: 'branchNW.png',
    paths: [0,1,1,0,1,1]
}
const branchSE: RegionData = {
    name: 'SE Branch',
    image: 'branchSE.png',
    paths: [1,0,0,1,1,1]
}
const branchWE: RegionData = {
    name: 'WE Branch',
    image: 'branchWE.png',
    paths: [1,0,1,0,1,1]
}
const branchWS: RegionData = {
    name: 'WS Branch',
    image: 'branchWS.png',
    paths: [1,1,0,0,1,1]
}
const branchE: RegionData = {
    name: 'E Branch',
    image: 'branchE.png',
    paths: [1,0,1,1,1,1]
}
const branchW: RegionData = {
    name: 'W Branch',
    image: 'branchW.png',
    paths: [1,1,1,0,1,1]
}
const branchS: RegionData = {
    name: 'S Branch',
    image: 'branchS.png',
    paths: [1,1,0,1,1,1]
}
const branchN: RegionData = {
    name: 'N Branch',
    image: 'branchN.png',
    paths: [0,1,1,1,1,1]
}
const branchV: RegionData = {
    name: 'Vertical Branch',
    paths: [0,0,0,0,1,1]
}
const vineUp: RegionData = {
    name: 'Vine Up',
    paths: [1,1,0,1,0,1]
}
const vineDown: RegionData = {
    name: 'Vine Down',
    paths: [1,1,0,1,1,0]
}
const vineUpDown: RegionData = {
    name: 'Vine Up and Down',
    paths: [1,1,0,1,0,0]
}
export const regionLibrary = {
    events: {
        enter: enter,
        fall: fall,
        exit: exit
    },
    air: air,
    treeOfLifeEntrance: treeOfLifeEntrance,
    exitWorldTree: exitWorldTree,
    leaveMap: leaveMap,
    branchNS: branchNS,
    branchNSE: branchNSE,
    branchNSW: branchNSW,
    branchNE: branchNE,
    branchNW: branchNW,
    branchSE: branchSE,
    branchWE: branchWE,
    branchWS: branchWS,
    branchE: branchE,
    branchW: branchW,
    branchV: branchV,
    branchS: branchS,
    branchN: branchN,
    vineUp: vineUp,
    vineDown: vineDown,
    vineUpDown: vineUpDown,
}