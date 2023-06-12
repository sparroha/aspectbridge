//init
//    getPlayerGameState from server
//    getOpponentGameState from server


type Deck = {
    deckid: string,
    cards: Card[]
}

type Card = {
    name: string,
    actions: Action[]
    token: boolean,
}

type Action = {
    name: string,
    fname: string,
    params: string[]
}

//can not stringify
type ActionHandler = {
    name: string,
    handler: Function
}

type GameState = {
    playerid: string,
    active: boolean,
    hand: Card[],
    deck: Card[],
    decks: Deck[],
}
type FunctionStack = Function[]

//gameActive
    //SWR from opponent
    //fetch POST player


const actions: Action[] = [
    {name: "draw", fname: '', params: []},
    {name: "token", fname: '', params: ["1"]},
]
export const actionHAndlers: ActionHandler[] = [
    {name: "draw", handler: (params: string[])=>{}},
    {name: "maketoken", handler: (setLocationState: Function, card: any)=>{setLocationState((state)=>{return [...state, card]})}},//tested, works
]