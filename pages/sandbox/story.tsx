import { useEffect, useReducer } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function Story() {
	const gameMaxHp = 20
	const [belt, beltDispatch] = useReducer(
		//reducer
		(state, action) => {
			switch (action.type) {
				case 'Draw':
					return {
						//payload: String
						...state,
						tools: {
							...state.tools,
							[action.payload]: {
								...state.tools[action.payload],
								damage: 10,
							},
						}, //payload consists of the name of the tool
						console: 'he draws his ' + action.payload,
					}
				case 'Equip':
					return {
						//payload: String
						...state,
						tools: {
							...state.tools,
							[action.payload]: {
								...state.tools[action.payload],
								damage: 10,
							},
						}, //payload consists of the name of the tool
					}
				case 'Unequip':
					return {
						//payload: String
						...state,
						tools: {
							...state.tools,
							[action.payload]: {
								...state.tools[action.payload],
								damage: 0,
							},
						}, //payload consists of the name of the tool
					}
				case 'addHp':
					return {
						//payload: Number
						...state,
						game: {
							...state.game,
							hp: state.game.hp + action.payload,
						}, //payload consists of the amount of hp to add
						console: 'addHp ' + action.payload,
					}
				case 'eat':
					if (state.game.food > 0)
						return {
							//payload: Number
							...state,
							game: {
								...state.game,
								hp: (state.game.hp+3<=gameMaxHp)?state.game.hp + 3:state.game.hp,
								food: state.game.food - 1,
							}, //payload consists of the amount of food to add
							console: 'addHp 3: food ' + (state.game.food - 1),
						}
					else
						return {
							...state,
							console: 'out of food',
						}
				case 'addFood':
					if (state.game.food < 10)
						return {
							...state,
							game: { ...state.game, food: state.game.food + 1 },
							console: 'addFood 1',
						}
					else
						return {
							...state,
							console: 'carying too much food',
						}
				case 'addXp':
					return {
						//payload: Number
						...state,
						game: {
							...state.game,
							xp: state.game.xp + action.payload,
						}, //payload consists of the amount of xp to add
					}
				case 'setClimate':
					return {
						//payload: Object
						...state,
						game: { ...state.game, climate: action.payload }, //payload consists of the climate object
					}
                case 'task':
                    switch(action.payload.task){
						case 'mine':
							return {
								//Payload: String
								...state,
								game: {...state.game,
									ore: state.game.ore + (action.payload.time!=0?1:0),
									tasks: {
										...state.game.tasks,
										[action.payload.task]: {
											active: action.payload.active,
											time: action.payload.time
										}
									}
								},
								console: 'task timer '+action.payload.task+': '+action.payload.time
							}
						default:
							return state
					}
                    
				default:
					return state
			}
		},
		//initial state
		{
			game: {
				hp: gameMaxHp,
				food: 10,
				xp: 0,
                ore: 0,
				climate: {
					temperature: '0',
					humidity: '0',
					wind: '0',
					precipitation: '0',
				},
				entities: [
					{
						name: 'cain',
						aspects: ['knowing', 'powerful', 'cunning'],
					},
					{ name: 'abel', aspects: ['having', 'capacity'] },
				],
                tasks: {
                    mine: {active: false, time: 0}
                }
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
					type: 'weapon',
				},
				shield: {
					name: 'shield',
					damage: 0,
					weight: 10,
					type: 'armor',
				},
			},
			characters: {
				cain: { aspects: ['knowing', 'powerful', 'cunning'] },
				abel: { aspects: ['having', 'capacity'] },
			},
			trees: {
				treeOfLife: {
					aspects: ['life', 'knowledge', 'power'],
				},
				treeOfKnowledge: {
					aspects: ['knowledge', 'power'],
				},
			},
			console: 'init',
		}
	)

	useEffect(() => {
		console.log(belt)
		beltDispatch({ type: 'Draw', payload: 'sword' })
	}, [])
	useEffect(() => {
		//regen 1 hp per second
		//console.log(belt)
		const interval = setInterval(() => {
			if (belt.game.hp < gameMaxHp) beltDispatch({ type: 'addHp', payload: 1 })
		}, 1000)
		return () => clearInterval(interval)
	}, [belt.game.hp])
	useEffect(() => {
		console.log(belt.console)
	}, [belt.console])
    useEffect(()=>{
        setTimeout(()=>{
            //console.log('attempt mine activity progress')
            if(belt.game.tasks.mine.active){
                //console.log('mine time left: '+belt.game.tasks.mine.time)
                beltDispatch({
                    type: 'task',
                    payload: {
                        task: 'mine',
                        active: belt.game.tasks.mine.time - 1000 > 0,
                        time: belt.game.tasks.mine.time > 0 ? belt.game.tasks.mine.time - 1000 : 0
                    }
                })
            }
        },1000)
        //return clearTimeout(timeout)
    },[belt.game.tasks.mine.time])
	return (
		<Container>
			<Row>
				<Col>
					<h1>Aweken</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<select>
						<option>Survival</option>
						{/**goals: [hp, 'do not die'] */}
						<option>Adventure</option>
						{/**goals: [xp, 'unlock capabilities and discover chalenges'] */}
						<option>Story</option>
						{/**goals: [story, 'learn the lore'] */}
						<option>Exploration</option>
						{/**goals: [discovery, 'find curiosities'] */}
						<option>Creation</option>
						{/**goals: [creation, 'build something'] */}
					</select>
				</Col>
			</Row>
			<Row>
				<Col>
					<Row>
						<Col>
							<h2>Survive</h2>
							<input
								type='range'
								min='0'
								max={gameMaxHp}
								value={belt.game.hp}
								readOnly
							/>
							<button
								onClick={() =>
									beltDispatch({ type: 'addHp', payload: 1 })
								}>
								Heal
							</button>
							<button
								onClick={() => beltDispatch({ type: 'eat' })}>
								Eat
							</button>
							<button
								onClick={() =>
									beltDispatch({
										type: 'addHp',
										payload: -Math.floor(Math.random() * 8),
									})
								}>
								Hurt
							</button>
						</Col>
					</Row>
					<Row>
						<Col>
							<button
								onClick={() =>
									beltDispatch({
										type: 'addFood',
										payload: 1,
									})
								}>
								Harvest
							</button>
						</Col>
						<Col>Food</Col>
						<Col>
							<input
								type='range'
								min='0'
								max='10'
								value={belt.game.food}
								readOnly
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<button
								onClick={() =>
									beltDispatch({
										type: 'task',
                                        payload: {
                                            task: 'mine',
                                            active: true,
                                            time: 5000
                                        }
									})
								}>
								Mine
							</button>
						</Col>
						<Col>Ore</Col>
						<Col>
							<div style={{border: '1px solid black'}}>{belt.game.ore}</div>
						</Col>
					</Row>
                    <Row id={'gamesquare'}>
						<Col>
							<Row>
								<Col>
									{belt.game.tasks.mine.active?
									<div style={{width: '100%', height: '100%', backgroundColor: 'brown', color: 'white'}}>Miner Mining</div>
									:<div style={{width: '100%', height: '100%', backgroundColor: 'orange', color: 'white'}}>Mine</div>}
								</Col>
								<Col>2
								</Col>
								<Col>3
								</Col>
							</Row>
							<Row>
								<Col>4
								</Col>
								<Col>5
								</Col>
								<Col>6
								</Col>
							</Row>
							<Row>
								<Col>7
								</Col>
								<Col>8
								</Col>
								<Col>9
								</Col>
							</Row>
						</Col>
                    </Row>
				</Col>
				<Col>
					<div id={'controlGUI'} style={{
						width: '100%',
						height: '100%',
						border: '3px inset gray'
					}}>Access Pannel</div>
				</Col>
			</Row>
			<Row>
				<Col><p>These are the things that stand against you.</p>
					<p>In order to survivel, you must overcome them.</p>
					<ul>
						<li>
							weather: take shelter
							<table>
								<tbody>
									<tr>
										<td>IDEAS</td>
									</tr>
									<tr>
										<td>colorize for seasons</td>
									</tr>
									<tr>
										<td>buffs and debufs during storms</td>
									</tr>
									<tr>
										<td>Weather based challenges</td>
									</tr>
								</tbody>
							</table>
						</li>
						<li>hunger: put some meat on your bones</li>
						<li>thirst: hydrate</li>
						<li>fatigue: you need rest</li>
						<li>injury: don't trip</li>
					</ul>
					<hr/>
					<h2>Adventure</h2>
					<p>These are the things that stand against you.</p>
					<p>You will discover obstacles along your way.</p>
					<p>Find creative ways to overcome them.</p>
					<ul>
						<li>terrain: find a way through</li>
						{/** */}
						<li>enemies: fight or flight</li>
						<li>traps: don't get caught</li>
						<li>challenges: prove your worth</li>
						<li>obstacles: find a way around</li>
						<li>secrets: discover the unknown</li>
					</ul>
				</Col>
				<Col>
					{JSON.stringify(belt)}
					{belt.Draw('sword')}
				</Col>
			</Row>
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
