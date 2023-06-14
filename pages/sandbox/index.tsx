import { useEffect, useReducer, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Deck, Card, actionHAndlers } from "./cardgame"
import useLog from "../../components/conlog"


export default function Sandbox(props) {
    const [cardLib, setCardLib] = useState([])
    const [deckLib, setDeckLib] = useState([])
    //useLog('INIT: '+cards)
    const priest: Card = {
        name: 'priest',
        type: 'hero',
        subtype: 'priest',
        cost: 0,
        power: 0,
        toughness: 30,
        text: 'priest hero',
        color: 'gray',
        image: 'priest.png'
    }
    const gamestructure = {
        phase: 'draw',
        deckPlayer: deckLib[0]?.cards, /*[
            'priest','mage','warrior','paladin','druid',
            'shaman','rogue','hunter','warlock','dragon',
            'elemental','mech', 'murloc','pirate','totem',
            'hero','hero_power','minion','clue','quest',
        ],*/
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
    const [deckPlayer, setDeckPlayer] = useState(deckLib[0]?.cards, /*[
        'priest','mage','warrior','paladin','druid',
        'shaman','rogue','hunter','warlock','dragon',
        'elemental','mech', 'murloc','pirate','totem',
        'hero','hero_power','minion','clue','quest',
    ],*/)
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

    //INITIALIZE DECKS
    useEffect(() => {console.log('use INITIALIZE DECKS')
        if(cardLib.length == 0){
            const cards: Promise<Card[]> = fetch('/api/sandbox/cards').then(res => res.json()).then(data => {
                console.log('cards fetched: '+JSON.stringify(JSON.parse(data.cards)[0]))
                setCardLib(JSON.parse(data.cards))
                return JSON.parse(data.cards)
            })
            
        }else{
            const dummyDeck: Deck = {
                name: 'dummy',
                cards: [...cardLib]
            }
            setDeckLib([dummyDeck])
            setDeckPlayer([...dummyDeck.cards])
        }
        //console.log('deckPlayer: '+JSON.stringify(deckPlayer))
    }, [cardLib])

    //SEQUENCE GAMEPLAY
    useEffect(() => {console.log('use SEQUENCE GAMEPLAY')
        switch (phase) {
            case 'reset':
                //reset game
                setTimeout(() => {setPhase('upkeep')}, 2000)
                break;
            case 'upkeep':
                //foreach card in play, do upkeep
                setTimeout(() => {setPhase(deckPlayer?'draw':'reset')}, 1000)
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

    //RENDER FUNCTIONS
    function Card({card, index, location, className}){
        return <button className={'card_design '+className} style={{backgroundImage: `url(${card.image})`}} onClick={() => {
            if(phase != 'main' && phase != 'main2' && phase != 'combat') return false
                //play card from hand
                if(location == handPlayer){ //dispatch({type: 'play', payload: index})
                    setFieldPlayer(fieldPlayer.concat(location[index]))
                    setHandPlayer(location.slice(0, index).concat(location.slice(index + 1)))
                }else if(location == fieldPlayer){ //dispatch({type: 'discard', payload: index})
                    if(phase != 'main' && phase != 'main2') return false
                    setDiscardPlayer(discardPlayer.concat(location[index]))
                    setFieldPlayer(location.slice(0, index).concat(location.slice(index + 1)))
                }
            }}>{card.name}</button>
    }
    function HandPlayer({hand}) {
        return <div id={'player_hand'} className={'hand'}>{hand.map((card, index) => {
            return <Card key={index} card={card} index={index} location={hand} className={'card_design card_inhand'} />
        })}</div>
    }
    function FieldPlayer({field}){
        return <div id={'player_field_active'} className={'player_field'}>
        {fieldPlayer.map((card, index) => {
            return <Card key={index} card={card} index={index} location={field} className={'card_design card_inplay'} />
        })}</div>
    }


    return <Container id={'card_game'}>

        {/** OPPONENT SIDE */
        }
        <Row id={'opponent'} style={{height: '35%'}}>
            <Col xs={4} md={2} id={'opponent_deck'}>
                <div className={'deck'}>{deckOpponent.length}</div>
            </Col>
            <Col xs={4} md={8} id={'opponent_field'}>Opponent</Col>
            <Col xs={4} md={2}  id={'opponent_discard'}>
                <div className={'discard'}>{discardOpponent.length}</div>
            </Col>
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
                    if(phase != 'main2') return false
                    //shuffle discard into deck
                    setDeckPlayer(deckPlayer.concat(discardPlayer))
                    setDiscardPlayer([])
                }}>Discard: {phase == 'main2' && deckPlayer.length ==0 ? ' shuffle discard into deck':''}</button>
        </Col>
            {/** PLAYER Field */}
            <Col xs={4} md={8} id={'player_field'}>
                <FieldPlayer field={fieldPlayer}/>
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