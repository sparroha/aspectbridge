import { useEffect, useReducer, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import useRegister, { getDB, setDB } from '../../lib/util/^register'
import { ACTIVEUSERS, LoginNav, Profile, activateUser } from '../login/[userlogin]'
import { GetServerSideProps } from 'next'
import requestIp from 'request-ip';
import useLog from '../../components/conlog'

export default function Story(props) {
	const [user, setUser] = useState(null)
	const [activeUsers, setActiveUsers] = useState(null)
	const gameMaxHp = 100
	const gameModes = {
		survival: {description: 'survival mode'},
		adventure: {description: 'adventure mode'},
		story: {description: 'story mode'},
		exploration: {description: 'exploration mode'},
		creative: {description: 'creative mode'},
	}
	//reducer
	const reducer = (state, action) => {
		switch (action.type) {
			case 'init':
				return {...state, ...action.payload, console: 'loaded game data from save'}
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
					//console: 'addHp ' + action.payload,
				}
			case 'eat':
				let gain = state.game.foods[action.payload].hp
				let consume = Math.floor(gain/3)
				if (state.game.food > 0 && state.game.hp < gameMaxHp)
					return {
						//payload: Number
						...state,
						game: {
							...state.game,
							hp: state.game.hp + gain <= gameMaxHp ? state.game.hp + gain : gameMaxHp,
							food: state.game.food - consume < 0 ? 0 : state.game.food - consume,
						}, //payload consists of the amount of food to add
						console: 'addHp '+gain+': food ' + (state.game.food - consume),
					}
				else
					return {
						...state,
						console: state.game.food==0?'out of food':'hp is full',
					}
			case 'addFood':
				if (state.game.food < 10)
					return {
						...state,
						game: { ...state.game, food: state.game.food + 1 },
						//console: 'addFood 1',
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
			case 'mode':
				console.log('mode select '+JSON.stringify(action.payload))
				return {
					//payload: String
					...state,
					game: { ...state.game, mode: action.payload }, //payload consists of the mode string
				}
			default:
				return state
		}
	}
	//initial state
	const defaultBelt = {
		game: {
			mode: 'Survival',
			hp: gameMaxHp,
			food: 10,
			foods: {
				apple: {
					name: 'apple',
					weight: 1,
					hp: 3,
				},
				steak: {
					name: 'steak',
					weight: 1,
					hp: 6,
				},
			},
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
	//Reducer
	const [belt, beltDispatch] = useReducer(reducer,defaultBelt)
	//current client user state
	const [save, setSave, saveLoaded] = useRegister(user?user.username+'_beltedGameState':null,belt)

	//const [activeUsers,,activeUsersLoaded] = useActiveUsers()//not upating like swr should
	const [selectedUser, setSelectedUser] = useState(null)
	const [selectedUserState, setSelectedUserState] = useState(null)
	useEffect(()=>{
		//TODO
	},[])

	useEffect(()=>{
		if(!selectedUser)return
		getDB(selectedUser+'_beltedGameState').then((data)=>{
			setSelectedUserState(data)
		})
	},[selectedUser,activeUsers,belt])
	useEffect(()=>{
		if(!user){ console.log('user not loaded for active user update'); return }
		if(!activeUsers){ console.log('activeUsers not loaded for active user update'); return }
		console.log('loading event handler click for active user update')
		const L = (e)=>{
			//console.log('why?')
			activateUser(user)
		}
		document.addEventListener('click', L)
		return ()=>document.removeEventListener('click',L)
	},[user, activeUsers])//??[]

	//BEGIN SAVE LOAD DATA
    useEffect(()=>{
		if(!saveLoaded || !user)return
        console.log('LOADING INIT DATA for '+user.username+'_beltedGameState'+': '+save)
        beltDispatch({type: 'init', payload: JSON.parse(save)})
    },[saveLoaded, user])

    /**CONFIRMED */
	//Save Data on State Change
    useEffect(() => {
		if(!saveLoaded)return
		//console.log('save raw: '+save)
		//console.log('save JSON: '+JSON.stringify(save))
		setSave(belt!=0?belt:defaultBelt)
    }, [belt])
    //END SAVE LOAD DATA\\

	//Signal Init: not needed
	useEffect(() => {
		if (belt.console == 'init') return
		console.log('@Story> Post Init: '+belt)
		beltDispatch({ type: 'Draw', payload: 'sword' })
	}, [])

	//Fatigue Inducer
	useEffect(() => {
		if (belt.console == 'init') return//prevents game start from first effect run
		//regen 1 hp per second
		const interval = setInterval(() => {
			if (belt.game.hp > 0) beltDispatch({ type: 'addHp', payload: -Math.floor(Math.random()*3) })
		}, 1000)
		return () => clearInterval(interval)
	}, [belt.game.hp])//game starts when hp changes

	//Console Logger
	useEffect(() => {
		console.log(belt.console)
	}, [belt.console])

	//Mine Opperator
    useEffect(()=>{
		if (belt.console == 'init') return
		//console.log('attempt mine activity progress')
		if (!belt.game.tasks.mine.active) return
        setTimeout(()=>{
			//console.log('mine time left: '+belt.game.tasks.mine.time)
			beltDispatch({
				type: 'task',
				payload: {
					task: 'mine',
					active: belt.game.tasks.mine.time - 1000 > 0,
					time: belt.game.tasks.mine.time > 0 ? belt.game.tasks.mine.time - 1000 : 0
				}
			})
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
					<select onChange={(e)=>{beltDispatch({type: 'mode', payload: e.target.value})}} value={belt.game.mode}>
						<option value={'Survival'}>Survival</option>
						{/**goals: [hp, 'do not die'] */}
						<option value={'Adventure'}>Adventure</option>
						{/**goals: [xp, 'unlock capabilities and discover chalenges'] */}
						<option value={'Story'}>Story</option>
						{/**goals: [story, 'learn the lore'] */}
						<option value={'Exploration'}>Exploration</option>
						{/**goals: [discovery, 'find curiosities'] */}
						<option value={'Creative'}>Creation</option>
						{/**goals: [creation, 'build something'] */}
					</select>
				</Col>
			</Row>
			<Row>
				<Col>
					<Row>
						<Col>
							<h2>{belt.game.mode}</h2>
							<input
								type='range'
								min='0'
								max={gameMaxHp}
								value={belt.game.hp}
								readOnly
							/>
							<button onClick={() => beltDispatch({ type: 'addHp', payload: 1 })}>
								Heal
							</button>
							<button onClick={() => beltDispatch({ type: 'eat', payload: 'apple'})}>
								Eat Apple
							</button>
							<button onClick={() => beltDispatch({ type: 'eat', payload: 'steak' })}>
								Eat Steak
							</button>
							<button onClick={() => beltDispatch({ type: 'addHp', payload: -Math.floor(Math.random() * 8)})}>
								Hurt
							</button>
						</Col>
					</Row>
					<Row>
						<Col>
							<button onClick={() => beltDispatch({ type: 'addFood', payload: 1})}>
								Harvest
							</button>
						</Col>
						<Col>Food</Col>
						<Col>
							<input type='range' min='0' max='10' value={belt.game.food} readOnly/>
						</Col>
					</Row>
					<Row>
						<Col>
							<button onClick={() =>{
								if(belt.game.tasks.mine.active) return false
								beltDispatch({ type: 'task', payload: {
									task: 'mine',
									active: true,
									time: 5000
								}})
							}}>
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
					}}>
						<h2>Info</h2><br/>
						Mode: {belt.game.mode}<br/>
						discription: {gameModes[belt.game.mode.toLowerCase()].description}<br/><br/>
						Log: {belt.console}<br/><br/>
						Active Users:<br/>
						<ActiveUsers activeUsers={activeUsers} setSelectedUser={setSelectedUser}/>
					</div>
				</Col>
				<Col>
					<div>User: {selectedUser}</div>
					<div>HP: {selectedUserState?.game.hp}</div>
					<div>Food: {selectedUserState?.game.food}</div>
					<div>Ore: {selectedUserState?.game.ore}</div>
				</Col>
			</Row><hr/>
			<Row hidden>
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
			</Row>
			<Row>
				<Col>
					GAME STATE<br/><hr/>
					{JSON.stringify(belt)}
					{/*belt.Draw('sword')*/}
				</Col>
			</Row>
			<Row>
				<Col>
					<LoginNav user={user} homepage={'sandbox/story'}/>
				</Col>
				<Col>
					<Profile ip={props.ip} setUser={setUser} setActiveUsers={setActiveUsers}/>
				</Col>
			</Row>
		</Container>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const ip = await requestIp.getClientIp(context.req)
    return {props: {ip: ip}} 
}

export function ActiveUsers({activeUsers, setSelectedUser}){
	if(!activeUsers) return <>Loading Active Users...</>
	let users = JSON.parse(activeUsers)
	//useLog(activeUsers+'::'+JSON.stringify(activeUsers)+'::'+JSON.parse(activeUsers))
	return <>{users.length?users.map((user, i) => {
		let lastActive = new Date().getTime() - user.time
		lastActive = Math.floor(lastActive / 1000 / 60 )
		let lastActiveS = lastActive.toString().concat(' minutes')
		//if(lastActive > 5*60) return null
		return <div key={i}>
				<a href={'#'+JSON.stringify(user.name)} onClick={()=>setSelectedUser(user.name)}>{JSON.stringify(user.name)+': Last Active < '+lastActiveS}</a>
			</div>
	}):'No Active Users'}</>
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
