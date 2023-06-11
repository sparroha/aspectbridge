import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"


export default function Sandbox(props) {
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

    function HandPlayer({hand}) {
        return <div id={'player_hand'} className={'hand'}>{hand.map((card, index) => {
            return <button className={'card_inhand'} key={index} onClick={() => {
                //play card
                    setFieldPlayer(fieldPlayer.concat(hand[index]))
                    setHandPlayer(hand.slice(0, index).concat(hand.slice(index + 1)))
                }}>play card: {card}</button>
        })}</div>
    }
    return <Container id={'card_game'}>
        <Row id={'opponent'} style={{height: '40%'}}>
            <Col xs={4} md={2} id={'opponent_deck'}></Col>
            <Col xs={4} md={8} id={'opponent_field'}></Col>
            <Col xs={4} md={2}  id={'opponent_discard'}></Col>
        </Row>
        <Row id={'medium'} style={{height: '5%'}}>

        </Row>
        <Row id={'player'} style={{height: '55%'}}>
            <Col xs={4} md={2} id={'player_discard'}>
                <button className={'card'} onClick={() => {
                    //shuffle discard into deck
                    setDeckPlayer(deckPlayer.concat(discardPlayer))
                    setDiscardPlayer([])
                }}>Discard: shuffle discard into deck</button>
            </Col>
            <Col xs={4} md={8} id={'player_field'}>
                <Row id={'player_field_active'}>
                    {fieldPlayer.map((card, index) => {
                        return <Col id={'player_card_active'} key={index}>
                            <button className={'card'} onClick={() => {
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
            <Col xs={4} md={2} id={'player_deck'}>
                <button className={'card'} onClick={() => {
                    //draw card
                    if (deckPlayer.length == 0) return false
                    setHandPlayer(handPlayer.concat(deckPlayer[0]))
                    setDeckPlayer(deckPlayer.slice(1))
                }}>Draw</button>
            </Col>

        </Row>
    </Container>
}