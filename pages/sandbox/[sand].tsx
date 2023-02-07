import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useLog from "../../components/conlog"
import Landscape from "../../components/ll/css/layout"

export type Ingredients = {
    message: string | string[]
}

export default function Sand(food: Ingredients) {
    //TODO add cookies to carry information across pages and sessions
    const router = useRouter()
    //router is a home router, useRouter grabs url obj
    const urlParams = router.query
    //this is the actual stuff
    const [message, setMessage] = useState(food.message)
import sql from "../../lib/,base/sql"

export type Game = {
    playerLocalHP: number,
    deck: string[],
    hand: string[],
    discard: string[],
    message: string,
    tokenCount: number,
    previousTokenCount: number,
}
export type Card = {
    name: string,
    type: string,
    cost: number,
    text: string,
    image: string,
    id: number,
    action: (instance: Game, setInstance: any) => void,
}
const ann_pr: Card = {
    name: 'annointer_priest',
    type: 'priest',
    cost: 1,
    text: 'heal 1',
    image: 'https://cdn.discordapp.com/attachments/801000000000000000/801000000000000000/annointer_priest.png',
    id: 1,
    action: (instance: Game, setInstance: any) => {
        let playerLocalHP = instance.playerLocalHP + ((instance.tokenCount > instance.previousTokenCount) ? 1 : 0);
        instance.playerLocalHP = playerLocalHP//illegal operation
        setInstance(instance)
    }
}


export default function Sand(game: Game) {
    //TODO add cookies to carry information across pages and sessions
    const router = useRouter()
    const urlParams = router.query
    const [message, setMessage] = useState(game.message)
    const [instance, setInstance] = useState(game)

    if(!message || message == '') {
        useEffect(() => { router.push({pathname: '/sandbox/message', query: {
        message: 'this message is auto gener...statically stored and retrieved for your viewing: from urlParams',
        }})}, 
        [message])
    }else useLog('message: '+message)

<<<<<<< HEAD
    let processedFood = <Landscape>
        <p>Message From URL reads: {JSON.stringify(urlParams.message)}</p>
        <p>Message From PROPS reads: {food.message}</p>
        <hr></hr>
        <ElementFunction urlP={urlParams} message={message}/>
=======
    useEffect(() => {ann_pr.action(instance, setInstance)}, [])

    let processedFood = <Landscape>
        <p>Message From URL reads: {JSON.stringify(urlParams.message)}</p>
        <p>Message From PROPS reads: {instance.message}</p>
        <hr></hr>
        <ElementFunction game={instance} />
        
        <div></div>
>>>>>>> main
    </Landscape>

    let poop = processedFood
    return poop
}
<<<<<<< HEAD
function ElementFunction(food: any){
    return <>
        <>{'URL: '+food.urlP.message}</>
        <br></br>
        <>{'PROPS: '+food.message}</>
    </>
}
export const getServerSideProps: GetServerSideProps<Ingredients> = async (context) => {
    const urlParams = context.query
    const message = urlParams.message
    let food: Ingredients = {
        message: '',
    }
    if(message) {
        food.message = message+': from props'
    }
    return {props: food}
=======
function ElementFunction(game: {game: Game}){
    return <>
        {game.game.discard.map((c) => <>{c}</>)}
        <br></br>
        <>{'PROPS: '+game.game.message}</>
    </>
}
export const getServerSideProps: GetServerSideProps<Game> = async (context) => {
    const urlParams = context.query
    const deckid = urlParams.deckid
    const activeGame = context.req.cookies.game
    //const deck = await sql `SELECT * FROM decks WHERE deckid = ${deckid}`
    let game: Game = {
        playerLocalHP: 20,
        deck: [],//deck[0].cards.split(','), //lol it just keeps doing the work for me
        hand: [],
        discard: ['annointer_priest','annointer_priest','annointer_priest','annointer_priest' ],
        message: 'Initial State Loaded',
        tokenCount: 0,
        previousTokenCount: 0,
    }
    return {props: game}
>>>>>>> main
}