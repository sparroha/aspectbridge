//init
//    getPlayerGameState from server
//    getOpponentGameState from server

export default function D(){return<>D</>}

export type Deck = {
    name: string,
    cards: Card[]
}

export type Card = {
    name: string,
    type: string,
    subtype: string,
    text: string,
    cost: number,
    power: number,
    toughness: number,
    loyalty?: number,
    color: string,
    image: string,
    actions?: Action[]
    token?: boolean,
}

export type Action = {
    name: string,
    fname: string,
    params: string[]
}

//can not stringify
export type ActionHandler = {
    name: string,
    handler: Function
}

export type GameState = {
    playerid: string,
    active: boolean,
    hand: Card[],
    deck: Card[],
    decks: Deck[],
}
export type FunctionStack = Function[]

//gameActive
    //SWR from opponent
    //fetch POST player


export const actions: Action[] = [
    {name: "draw", fname: '', params: []},
    {name: "token", fname: '', params: ["1"]},
]
export const actionHAndlers: ActionHandler[] = [
    {name: "draw", handler: (params: string[])=>{}},
    {name: "maketoken", handler: (setLocationState: Function, card: any)=>{setLocationState((state)=>{return [...state, card]})}},//tested, works
]