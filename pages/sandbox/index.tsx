import { useEffect, useReducer, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { actionHAndlers } from "./cardgame"


export default function Sandbox(props) {
    const gamestructure = {
        phase: 'draw',
        deckPlayer: [1,2,3,4,5,6,7,8,9],
        deckOpponent: [],
        handPlayer: [],
        handOpponent: [],
        fieldPlayer: [],
        fieldOpponent: [],
        discardPlayer: [],
        discardOpponent: [],
        statsPlayer: [],
        statsOpponent: [],
        gameState: ''
    }
    const [state, dispatch] = useReducer(reducer, gamestructure)
    function reducer(state, action) {
        switch (action.type) {
            case 'draw':
                return {...state, handPlayer: state.handPlayer.concat(state.deckPlayer[0]), deckPlayer: state.deckPlayer.slice(1)}
            case 'play':
                return {...state, fieldPlayer: state.fieldPlayer.concat(state.handPlayer[action.payload]), handPlayer: state.handPlayer.slice(0, action.payload).concat(state.handPlayer.slice(action.payload + 1))}
            case 'discard':
                return {...state, discardPlayer: state.discardPlayer.concat(state.fieldPlayer[action.payload]), fieldPlayer: state.fieldPlayer.slice(0, action.payload).concat(state.fieldPlayer.slice(action.payload + 1))}
            case 'shuffle':
                return {...state, deckPlayer: state.deckPlayer.concat(state.discardPlayer), discardPlayer: []}
            default:
                return state
        }
    }

    const [phase, setPhase] = useState('upkeep')//upkeep, draw, main, combat, main2, end
    const [deckPlayer, setDeckPlayer] = useState([1,2,3,4,5,6,7,8,9])
    const [deckOpponent, setDeckOpponent] = useState([])
    const [handPlayer, setHandPlayer] = useState([])
    const [handOpponent, setHandOpponent] = useState([])
    const [fieldPlayer, setFieldPlayer] = useState([])
    const [fieldOpponent, setFieldOpponent] = useState([])
    const [discardPlayer, setDiscardPlayer] = useState([])
    const [discardOpponent, setDiscardOpponent] = useState([])
    const [statsPlayer, setStatsPlayer] = useState([])
    const [statsOpponent, setStatsOpponent] = useState([])
    const [gameState, setGameState] = useState('')

    useEffect(() => {
        switch (phase) {
            case 'upkeep':
                //foreach card in play, do upkeep
                setTimeout(() => {setPhase('draw')}, 2000)
                break;
            case 'draw':
                if(deckPlayer.length == 0) alert('no cards in deck')
                else{
                    setHandPlayer(handPlayer.concat(deckPlayer[0]))
                    setDeckPlayer(deckPlayer.slice(1))
                }
                setTimeout(() => {setPhase('main')}, 2000)
                break;
            case 'main':
                //setTimeout(() => {}, 5000)
                //allow player hand actions
                break;
            case 'combat':
                //setTimeout(() => {}, 5000)
                //allow player field actions
                break;
            case 'main2':
                //setTimeout(() => {}, 5000)
                //allow player hand actions
                break;
            case 'end':
                //foreach card in play, do end
                setTimeout(() => {setPhase('opponent')}, 2000)
                break;
            case 'opponent':
                //await opponent actions
                setTimeout(() => {setPhase('upkeep')}, 2000)
                break;
            default:
                break;
        }
    },[phase])
    function HandPlayer({hand}) {
        return <div id={'player_hand'} className={'hand'}>{hand.map((card, index) => {
            return <button className={'card_design card_inhand'} key={index} onClick={() => {
                if(phase != 'main' && phase != 'main2' && phase != 'combat') return false
                //play card
                    setFieldPlayer(fieldPlayer.concat(hand[index]))
                    setHandPlayer(hand.slice(0, index).concat(hand.slice(index + 1)))
                }}>play card: {card}</button>
        })}</div>
    }
    return <Container id={'card_game'}>

        {/** OPPONENT SIDE */
        }
        <Row id={'opponent'} style={{height: '35%'}}>
            <Col xs={4} md={2} id={'opponent_deck'}></Col>
            <Col xs={4} md={8} id={'opponent_field'}></Col>
            <Col xs={4} md={2}  id={'opponent_discard'}></Col>
        </Row>

        {/** MEDIAN */
        }
        <Row id={'median'} style={{height: '10%'}}>
            <Col>
                {phase == 'main' || phase == 'main2' || phase == 'combat' ?
                    <button className={'game_phase_button'} onClick={() => {
                        setPhase((phase)=>{
                            switch (phase) {
                                case 'upkeep':
                                    return 'draw'
                                case 'draw':
                                    return 'main'
                                case 'main':
                                    return 'combat'
                                case 'combat':
                                    return 'main2'
                                case 'main2':
                                    return 'end'
                                case 'end':
                                    return 'opponent'
                                case 'opponent':
                                    return 'upkeep'
                                default:
                                    return 'upkeep'
                            }
                        })
                    }}><h4>{phase}</h4>: Next Phase</button>
                :<h4>{phase}</h4>}
            </Col>
        </Row>

        {/** PLAYER SIDE */
        }
        <Row id={'player'} style={{height: '55%'}}>
            {/** PLAYER Discard Pile */}
            <Col xs={4} md={2} id={'player_discard'}>
                <button className={'discard'} onClick={() => {
                    return false
                    if(phase != 'main' && phase != 'main2' && phase != 'combat') return false
                    //shuffle discard into deck
                    setDeckPlayer(deckPlayer.concat(discardPlayer))
                    setDiscardPlayer([])
                }}>Discard: shuffle discard into deck</button>
        </Col>
            {/** PLAYER Field */}
            <Col xs={4} md={8} id={'player_field'}>
                <Row id={'player_field_active'}>
                    {fieldPlayer.map((card, index) => {
                        return <Col id={'card_design player_card_active'} key={index}>
                            <button className={'card_design card_inplay'} onClick={() => {
                                if(phase != 'main' && phase != 'main2') return false
                                //discard card
                                setDiscardPlayer(discardPlayer.concat(fieldPlayer[index]))
                                setFieldPlayer(fieldPlayer.slice(0, index).concat(fieldPlayer.slice(index + 1)))
                            }}>discard: {card}</button>
                        </Col>
                    }
                    )}
                </Row>
                <HandPlayer hand={handPlayer}/>
            </Col>
            {/** PLAYER Deck */}
            <Col xs={4} md={2} id={'player_deck'}>
                <button className={'deck'} onClick={() => {
                    //draw card
                    if (deckPlayer.length == 0) return false
                    setHandPlayer(handPlayer.concat(deckPlayer[0]))
                    setDeckPlayer(deckPlayer.slice(1))
                }}>Draw</button>
                <button onClick={() => {
                    actionHAndlers.find(action => action.name == 'maketoken').handler(setFieldPlayer, 40)
                }}>Token</button>
            </Col>

        </Row>
    </Container>
}