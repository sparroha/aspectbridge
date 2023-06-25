import { useEffect, useReducer } from "react"
import { Col, Container, Row } from "react-bootstrap"

export default function Story() {

    const [belt, beltDispatch] = useReducer(
        //reducer
        (state, action) =>  {
            switch (action.type) {
                case 'Draw':
                    return {//payload: String
                        ...state,
                        tools: {...state.tools, [action.payload]: {...state.tools[action.payload], damage: 10}}//payload consists of the name of the tool
                    }
                case 'Equip':
                    return {//payload: String
                        ...state,
                        tools: {...state.tools, [action.payload]: {...state.tools[action.payload], damage: 10}}//payload consists of the name of the tool
                    }
                case 'Unequip':
                    return {//payload: String
                        ...state,
                        tools: {...state.tools, [action.payload]: {...state.tools[action.payload], damage: 0}}//payload consists of the name of the tool
                    }
                case 'addHp':
                    return {//payload: Number
                        ...state,
                        game: {...state.game, hp: state.game.hp + action.payload}//payload consists of the amount of hp to add
                    }
                case 'eat':
                    return {//payload: Number
                        ...state,
                        game: {...state.game, hp: state.game.hp + 3, food: state.game.food + -1}//payload consists of the amount of food to add
                    }
                case 'addXp':
                    return {//payload: Number
                        ...state,
                        game: {...state.game, xp: state.game.xp + action.payload}//payload consists of the amount of xp to add
                    }
                case 'setClimate':
                    return {//payload: Object
                        ...state,
                        game: {...state.game, climate: action.payload}//payload consists of the climate object
                    }
                default:
                    return state
            }
        },
        //initial state
        {
            game: {
                hp: 10,
                food: 10,
                xp: 0,
                climate: {
                    temperature: '0',
                    humidity: '0',
                    wind: '0',
                    precipitation: '0'
                },
                entities: [
                    {name: 'cain', aspects: ['knowing', 'powerful', 'cunning']},
                    {name: 'abel', aspects: ['having', 'capacity']}
                ]
            },
            Draw: (tool: string) => {
                //beltDispatch({type: 'Draw', payload: tool})
                return <p>He draws his {tool}</p>
            },
            tools: {
                sword: {
                    name: 'sword',
                    damage: 10,
                    weight: 5,
                    type: 'weapon'
                },
                shield: {
                    name: 'shield',
                    damage: 0,
                    weight: 10,
                    type: 'armor'
                }
            },
            characters: {
                cain: {aspects: ['knowing', 'powerful', 'cunning']},
                abel: {aspects: ['having', 'capacity']}

            },
            trees: {
                treeOfLife: {
                    aspects: ['life', 'knowledge', 'power']
                },
                treeOfKnowledge: {
                    aspects: ['knowledge', 'power']
                }
            }
        }
    )
    
    useEffect(() => {
        console.log(belt)
        beltDispatch({type: 'Draw', payload: 'sword'})
    }, [])
    useEffect(() => {//regen 1 hp per second
        console.log(belt)
        const interval = setInterval(() => {
            if(belt.game.hp < 10) beltDispatch({type: 'addHp', payload: 1})
        }
        , 1000)
        return () => clearInterval(interval)
    }, [])

	return (
		<Container>
			<Row><Col><h1>Aweken</h1></Col></Row>
            <Row><Col>
                <select>
                    <option>Survival</option>{/**goals: [hp, 'do not die'] */}
                    <option>Adventure</option>{/**goals: [xp, 'unlock capabilities and discover chalenges'] */}
                    <option>Story</option>{/**goals: [story, 'learn the lore'] */}
                    <option>Exploration</option>{/**goals: [discovery, 'find curiosities'] */}
                    <option>Creation</option>{/**goals: [creation, 'build something'] */}
                </select>
            </Col></Row>
            <Row><Col>
            <h2>Survive</h2>
            <input type="range" min="0" max="10" defaultValue={belt.game.hp} />
            <button onClick={() => beltDispatch({type: 'addHp', payload: 1})}>Heal</button>
            <button onClick={() => beltDispatch({type: 'eat'})}>Eat</button>
            <button onClick={() => beltDispatch({type: 'addHp', payload: -Math.floor(Math.random()*8)})}>Hurt</button>
            <p>These are the things that stand against you.</p>
            <p>In order to survivel, you must overcome them.</p>
            <ul>
                <li>weather: take shelter
                    <table>
                        <tbody>
                            <tr><td>IDEAS</td></tr>
                            <tr><td>colorize for seasons</td></tr>
                            <tr><td>buffs and debufs during storms</td></tr>
                            <tr><td>Weather based challenges</td></tr>
                        </tbody>
                    </table>
                </li>
                <li>hunger: put some meat on your bones</li>
                <li>thirst: hydrate</li>
                <li>fatigue: you need rest</li>
                <li>injury: don't trip</li>
            </ul>
            </Col></Row>
            <Row><Col>
            <h2>Adventure</h2>
            <p>These are the things that stand against you.</p>
            <p>You will discover obstacles along your way.</p>
            <p>Find creative ways to overcome them.</p>
            <ul>
                <li>terrain: find a way through</li>{/** */}
                <li>enemies: fight or flight</li>
                <li>traps: don't get caught</li>
                <li>challenges: prove your worth</li>
                <li>obstacles: find a way around</li>
                <li>secrets: discover the unknown</li>
            </ul>
            </Col></Row>
            <Row><Col>
            {JSON.stringify(belt)}
            {belt.Draw('sword')}
            </Col></Row>
		</Container>
	)
}

//VISION
// 1. The user can see potential

//AGENCY
// 1. The user has the ability to choose a path

//FEEL
// 1. The user feels immersed in the environment
// 2. The control set is comfortable and intuitive
// 3. VFX and SFX are satisfying and immersive

//SYSTEMS
//toolset

//DISCOVERY
// 1. The user can discover curiocities
//reward with surprize and wonder

//RNG
//MYSTERY
