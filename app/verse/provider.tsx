'use client'
import { createContext, useContext, useReducer } from "react"

type Location = 'Mine' | 'Quary' | 'Forest' | 'River' | 'Port' | 'Shipyard' | 'Library' | 'Scripts' | 'Tower' | 'Aurical' |
    'ContentPanel' | 'InfoPanel' | 'ChatPanel' | 'InterfacePanel' | 'Grid' | 'GridInfo'
type LocationInfo = {name: string, forms: Location[]}

/**
 * each location represents a page content and each zone represents a form interface on that page
 * interfaces will not render if not included in this zone list unless they are standalone and do not use the zone constraints
 * 
 * const {state, dispatch} = useZRContext()
 * if(!state.location?.zones?.includes(id))return
 * 
 */
export const formgroups: {[key: string]: LocationInfo} = {
    island: {name: 'Island', forms: ['Mine', 'Quary', 'Forest', 'River', 'Library', 'Tower']},
    mainland: {name: 'Mainland', forms: ['Quary', 'Forest', 'Port', 'Shipyard', 'Library', 'Scripts']},
    styx: {name: 'Styx', forms: ['Aurical', 'Forest', 'River', 'Grid', 'GridInfo']},
    display: {name: 'Display', forms: ['ContentPanel','InfoPanel']},
    control: {name: 'Control', forms: ['ChatPanel','InterfacePanel','InfoPanel']}
}

export const initialState = {
    location: formgroups.styx
}

const VerseContext = createContext(null)

export const useVerseContext = ()=>{
    const context = useContext(VerseContext)
    if(!context) throw new Error(
        "VerseContext not available in scope"
    )
    return context
}

export default function VerseContextProvider({children}){
    /**
     * These are the rules for all manipulations handled by the user intertface
     * @param state 
     * @param action 
     * @returns 
     */
    const reducer = (state: any, action: {type: string, payload?: any})=>{
        let actionType = action.type.toLowerCase()
        switch(actionType){
            case 'teleport':
                return window.location.href = '/'+action.payload.destination
            case 'set':
                return action.payload != "default" ? action.payload : initialState
            case 'user':
                return {...state, user: action.payload}
            case 'loop':
                //console.log('loop attempt')
                let helpercount = 0
                Object.entries(state.helpers).forEach((helper: [string, number])=>{
                    //console.log(helper)
                    helpercount+=helper[1]
                })
                let consumption = -Math.floor(helpercount/10)
                //console.log('total helpers: '+helpercount)
                //console.log('loop success')
                let newState 
                return {...state,
                    //(state.helpers && state.helpers[type])
                    ore: Math.ceil((rand(10)==1?rand(state.helpers?.mine?state.helpers.mine:0) + (state.ore?state.ore:0):(state.ore?state.ore:0))*.93),
                    stone: Math.ceil((rand(10)==1?rand(state.helpers?.quary?state.helpers.quary:0) + (state.stone?state.stone:0):(state.stone?state.stone:0))*.93),
                    wood: Math.ceil((rand(10)==1?rand(state.helpers?.forest?state.helpers.forest:0) + (state.wood?state.wood:0):(state.wood?state.wood:0))*.93),
                    fish: Math.ceil((rand(3)==1?Math.max(0, consumption + Math.floor(rand(state.helpers?.river?state.helpers.river:0)/2) + rand(state.helpers?.port?state.helpers.port:0) + (state.fish?state.fish:0)):Math.max(0, consumption+(state.fish?state.fish:0)))*.93),
                    clay: Math.ceil((rand(10)==1?Math.floor(rand(state.helpers?.river?state.helpers.river:0)/2) + rand(state.helpers?.library?state.helpers.library:0) + (state.clay?state.clay:0):(state.clay?state.clay:0))*.93),
                }
            case 'add'://{type: 'ore', count: 1}
                return {...state, [action.payload.type]: state[action.payload.type]?state[action.payload.type]+action.payload.count:action.payload.count}
            case 'remove'://{type: 'wood', count: 1}
                if(!state[action.payload.type]) {alert("strange; it seems you haven't discovered that yet"); return state}
                if(state[action.payload.type]<action.payload.count) {alert('not enough '+action.payload.type); return state}
                return {...state, [action.payload.type]: state[action.payload.type]-action.payload.count}
            case 'exchange'://{trade: 'ore', amount: 1, type: 'metal', count: 1}
                if(!state[action.payload.trade]) {alert("strange; it seems you haven't discovered that yet"); return state}
                if(!state[action.payload.type]) {alert("strange; it seems you haven't discovered that yet"); return state}
                if(state[action.payload.trade]<action.payload.amount) {alert('not enough '+action.payload.trade); return state}
                return {...state, [action.payload.trade]: state[action.payload.trade]-action.payload.amount, [action.payload.type]: state[action.payload.type]?state[action.payload.type]+action.payload.count:action.payload.count}
            case 'craft':
                let craftType = action.payload.type.toLowerCase()
                switch(craftType){
                    case 'metal':
                        if(state.ore<3) {alert('not enough ore'); return state}
                        if(state.wood<3) {alert('not enough wood'); return state}
                        return {...state, ore: state.ore-3, wood: state.wood-3, metal: state.metal?state.metal+2:2}
                    case 'brick':
                        if(state.clay<4) {alert('not enough clay'); return state}
                        if(state.wood<3) {alert('not enough wood'); return state}
                        return {...state, clay: state.clay-4, wood: state.wood-3, brick: state.brick?state.brick+2:2}
                    case 'lumber':
                        if(state.wood<1) {alert('not enough wood'); return state}
                        return {...state, wood: state.wood-1, lumber: state.lumber?state.lumber+3:3}
                    case 'tile':
                        if(state.stone<1) {alert('not enough stone'); return state}
                        if(state.lumber<4) {alert('not enough lumber'); return state}
                        return {...state, stone: state.stone-1, lumber: state.lumber-4, tile: state.tile?state.tile+4:4}
                    case 'boat':
                        if(state.lumber<30) {alert('not enough lumber'); return state}
                        return {...state, lumber: state.lumber-30, boat: state.boat?state.boat+1:1}
                    case 'ship':
                        if(state.lumber<40) {alert('not enough lumber'); return state}
                        if(state.brick<40) {alert('not enough brick'); return state}
                        if(state.metal<20) {alert('not enough metal'); return state}
                        return {...state, lumber: state.lumber-40, brick: state.brick-40, metal: state.metal-20, ship: state.ship?state.ship+1:1}
                    case 'flagship':
                        if(state.lumber<80) {alert('not enough lumber'); return state}
                        if(state.wood<40) {alert('not enough wood'); return state}
                        if(state.brick<80) {alert('not enough bick'); return state}
                        if(state.metal<60) {alert('not enough metal'); return state}
                        return {...state, lumber: state.lumber-80, wood: state.wood-40, brick: state.brick-80, metal: state.metal-60, flagship: state.flagship?state.flagship+1:1}
                    case 'raft':
                        if(state.wood<20) {alert('not enough wood'); return state}
                        return {...state, wood: state.wood-20, raft: state.raft?state.raft+1:1}
                }
            case 'write':
                if(state.brick<1 || state.lumber<1) {alert('not enough bricks or lumber'); return state}
                return {...state, brick: state.brick-1, lumber: state.lumber-1, tablets: state.tablets?[...state.tablets, action.payload.message]:[action.payload.message]}
            case 'sail'://{destination: 'Island', vessel: 'boat'}
                if(state.fish<20) {alert('not enough fish'); return state}
                let destination = action.payload.destination.toLowerCase()
                if(state.location.name==destination) {alert('this is your current location'); return state}
                let vessel = action.payload.vessel.toLowerCase()
                if(!state[vessel]) {alert('you seem to have not found one of those '+vessel+'s yet'); return state}
                if(state[vessel]<1) {alert('no '+vessel+'s available'); return state}
                let durability = (vessel=='boat'?4:(vessel=='ship'?10:(vessel=='flagship'?20:2)))
                let loss = Math.floor(Math.random()*durability)<1?1:0
                if(loss>=1) {alert('Your '+vessel+' was lost at sea!'); return {...state, location: formgroups[destination], [vessel]: state[vessel]-1, fish: state.fish-20}}
                return {...state, location: formgroups[destination], fish: state.fish-20}
            case 'hire'://{type: 'Mine', fee: 100}
                if(state.fish<(action.payload.fee || 20)) {alert('not enough fish'); return state}
                let type = action.payload.type.toLowerCase()
                return {...state, fish: state.fish-(action.payload.fee || 20), helpers: {...state.helpers, [type]: (state.helpers && state.helpers[type])?state.helpers[type]+1:1}}
            case 'grid':
                return {...state, grid: action.payload}
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    return <VerseContext.Provider
        value={{state, dispatch}}
    >
        {children}
    </VerseContext.Provider>
}

function rand(n){
    let r = Math.floor(Math.random()*n+(n>0?1:0))
    //console.log('random of '+n, r)
    return r
}