'use client'
import { Dispatch, useRef, useState, useEffect, Fragment } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useVerseContext } from "./provider"
import DiceWidget, { useDiceRoll } from "../../components/dice-old"
import D20, { albt22, diceInitProps, diceProps } from "../../components/dice"


export default function Nowhere(){return <></>}



/**
 * VERSE COMPONENTS
 */
export function DisplayGroup({id, bgColor, bgImage, bgGradient, bgAlt, children}:{id: string, bgColor?: string, bgImage?: string, bgGradient?: string, bgAlt?: string, children: any}){
    const {state, dispatch} = useVerseContext()
    return <Col id={id} xs={12} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row xs={1} sm={2} style={{position: 'relative', zIndex: 1, width: '100%', textAlign: 'center'}}>
            {children[0] || null}
            {children[1] || null}
        </Row>
    </Col>
}
export function ControlGroup({id, bgColor, bgImage, bgGradient, bgAlt, children}:{id: string, bgColor?: string, bgImage?: string, bgGradient?: string, bgAlt?: string, children: any}){
    const {state, dispatch} = useVerseContext()
    return <Col id={id} xs={12} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row xs={1} sm={2} style={{position: 'relative', zIndex: 1, width: '100%', textAlign: 'center'}}>
            {children[0] || null}
            {children[1] || null}
        </Row>
    </Col>
}
export function ContentPanel(){
    
    const [exP, setExP]: [Partial<diceProps>, Dispatch<any>] = useState({sides: 22, speed: 5})
    const {state, dispatch} = useVerseContext()
    return <Col xs={12} sm={6}>
        Life brought you here<br/>
        Curiocity is your fuel<br/>
        Self discovery is your purpose<br/>
        <br/>
        You are a soul in the river of life
    </Col>
}
export function InfoPanel(){
    const {state, dispatch} = useVerseContext()
    return <Col xs={12} sm={6}>
        <Row><InfoHeader id="inventory_resources" bgColor={'#aaa'}>
            {['Resources', 'stone', 'wood', 'ore', 'clay', 'fish'].map((item, i)=>{
                return <Col key={i} xs={4} sm={3} md={2} lg={1} style={{textAlign: 'center'}}>
                    {(item=='Resources' || item=='Materials')?item:
                            <>{item}<br/>{state[item.toLowerCase()]}</>}
                </Col>
            })}
        </InfoHeader></Row>
        <Row><InfoHeader id="inventory_materials" bgColor={'#777'}>
            {['Materials', 'tile', 'lumber', 'metal', 'brick'].map((item, i)=>{
                return <Col key={i} xs={4} sm={3} md={2} lg={1} style={{textAlign: 'center'}}>
                    {(item=='Resources' || item=='Materials')?item:
                            <>{item}<br/>{state[item.toLowerCase()]}</>}
                </Col>
            })} 
        </InfoHeader></Row>
    </Col>
}
export function ChatPanel(){return<></>}
export function InterfacePanel(){return<></>}

/**
 * LEGACY COMPONENTS
 */
//zone template
export function InfoHeader({id, bgColor, children}:{id: string, bgColor: string, children: any}){
    return <Col id={id} xs={12} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: bgColor, opacity: '.7'}}></div>
        <Row style={{position: 'relative', zIndex: 1}}>
            {children}
        </Row>
    </Col>
}
export function FormGroup({id, bgColor, bgImage, bgGradient, bgAlt, children, helper, global}:{id: string, bgColor?: string, bgImage?: string, bgGradient?: string, bgAlt?: string, children: any, helper?: boolean, global?: boolean}){
    const {state, dispatch} = useVerseContext()
    if(!state.location?.forms?.includes(id) && !global)return
    return <Col id={id} xs={12} sm={6} md={4} lg={3} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row style={{position: 'relative', width: '100%', textAlign: 'center'}}>
            <Col xs={4}><h4>{id}</h4></Col>
            {helper && <Col xs={8}>
                <Row>
                    <Col xs={5}>
                        <Button onClick={()=>{dispatch({type: 'hire', payload: {type: id.toLowerCase(), fee: 20}})}} disabled={state.fish<20}>Hire:</Button>
                    </Col>
                    <Col xs={7}>
                        <div style={{backgroundColor: '#777777aa'}}>Helpers: {state.helpers?.[id.toLowerCase()]}<br/>-20 Fish</div>
                    </Col>
                </Row>
            </Col>}
        </Row>
        <Row style={{position: 'relative', textAlign: 'center', justifyContent: 'center'}}>
            {children}
        </Row>
    </Col>
}

function Action({name, actionType, payload, bgColor, disabled, children}:{name: string, actionType: string, payload: any, bgColor?: string, disabled?: boolean, children?: any}){
    const {state, dispatch} = useVerseContext()
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: actionType, payload: payload})}} disabled={disabled}>{name}</Button><br/>
        <div style={{backgroundColor: bgColor || '#777777aa'}}>{children}</div>
    </Col>
}

//zone activities
export function ChopWood(){
    const {state, dispatch} = useVerseContext()
    return <Action name={'Chop'} actionType={'add'} payload={{type: 'wood', count: 1}}>+Wood: {state.wood}</Action>
}
export function SawLumber(){
    const {state, dispatch} = useVerseContext()
    return <Action name={'Saw'} actionType={'craft'} payload={{type: 'lumber'}} disabled={state.wood<1}>-1 Wood<br/>+Lumber: {state.lumber}</Action>

}
export function BuildRaft(){
    const {state, dispatch} = useVerseContext()
    return <Action name={'Raft'} actionType={'craft'} payload={{type: 'raft'}} disabled={state.wood<20}>-20 Wood<br/>+Raft: {state.raft}</Action>
}
export function MineOre(){
    const {state, dispatch} = useVerseContext()
    return <Action name={'Mine'} actionType={'add'} payload={{type: 'ore', count: 1}}>+Ore: {state.ore}</Action>
}
export function SmeltMetal(){
    const {state, dispatch} = useVerseContext()
    return <Action name={'Smelt'} actionType={'craft'} payload={{type: 'metal'}} disabled={state.wood<3 || state.ore<3}>-3 Ore<br/>-3 Wood<br/>+Metal: {state.metal}</Action>
}
export function QuaryStone(){
    const {state, dispatch} = useVerseContext()
    return <Action name={'Quary'} actionType={'add'} payload={{type: 'stone', count: 1}}>+Stone: {state.stone}</Action>
}
export function ChiselSlabs(){
    const {state, dispatch} = useVerseContext()
    return <Action name={'Chisel'} actionType={'craft'} payload={{type: 'tile'}} disabled={state.stone<1 || state.lumber<4}>-1 Stone<br/>-4 Lumber<br/>+Tile: {state.tile}</Action>
}
export function DigClay(){
    const {state, dispatch} = useVerseContext()
    return <Action name={'Dig'} actionType={'add'} payload={{type: 'clay', count: 1}}>+Clay: {state.clay}</Action>
}
export function FireBricks(){
    const {state, dispatch} = useVerseContext()
    return <Action name={'Fire'} actionType={'craft'} payload={{type: 'brick'}} disabled={state.wood<3 || state.clay<4}>-4 Clay<br/>-3 Wood<br/>+Brick: {state.brick}</Action>
}
export function ScribeTablet(){
    const {state, dispatch} = useVerseContext()
    const [script, setScript] = useState('')
    return <>
        <Col xs={12}>
            <Form>
                <Form.Control type="text" maxLength={33} placeholder="Message" value={script} onChange={(e)=>{setScript(e.target.value)}}/>
            </Form>
        </Col>
        <Action name={'Scribe'} actionType={'write'} payload={{message: script}} disabled={state.brick<1 || state.lumber<1}>-1 Bricks<br/>-1 Lumber<br/>+Scripts: {state.tablets?.length || 0}</Action>
        <Col xs={8}>
            <label style={{backgroundColor: '#777777aa'}}>Last 3 scripts</label>
            <div style={{maxHeight: '100%', overflow: 'auto', color: 'black', textShadow: '2px 1px #73f', backgroundColor: '#777777aa'}}>
                {state.tablets?.map((t, i)=>{
                    if(i<state.tablets.length-3) return
                    return <div key={i}>{t}<hr style={{margin: 0, padding: 0}}/></div>
                }
                )}
            </div>
        </Col>
    </>
}
export function ScriptDirectory(){
    const {state, dispatch} = useVerseContext()
    return <Col xs={12}>
        <div style={{maxHeight: '100%', overflow: 'auto', color: 'black', textShadow: '2px 1px #73f', backgroundColor: '#777777aa'}}>
            {state.tablets?.map((t, i)=>{
                return <div key={i}>{t}<hr style={{margin: 0, padding: 0}}/></div>
            })}
        </div>
    </Col>
}
export function Fish(){
    const {state, dispatch} = useVerseContext()
    return <Action name={'Fish'} actionType={'add'} payload={{type: 'fish', count: 1}}>+Fish: {state.fish}</Action>
}
export function Sail(){
    const {state, dispatch} = useVerseContext()
    const [destination, setDestination] = useState(state.location.name)
    const [vessel, setVessel] = useState('boat')
    return <Col xs={12}>
        <Form>
            <Row>
                <Action name={'Sail'} actionType={'sail'} payload={{destination: destination, vessel: vessel}} disabled={state.fish<20}>-20 fish</Action>
                <Col xs={8}>
                    <select className={'form-control'} value={destination} onChange={(e)=>{setDestination(e.target.value)}}>
                        <option>Island</option>
                        <option>Mainland</option>
                        <option>Styx</option>
                    </select>
                    <div style={{backgroundColor: '#777777aa'}}>By</div>
                    <select className={'form-control'} value={vessel} onChange={(e)=>{setVessel(e.target.value)}}>
                        <option>boat</option>
                        <option>ship</option>
                        <option>flagship</option>
                        <option>raft</option>
                    </select>
                </Col>
            </Row>
        </Form>
    </Col>
}
export function BuildShip(){
    const {state, dispatch} = useVerseContext()
    const [vessel, setVessel] = useState('Boat')
    const dis = {
        Raft: state.wood<20,
        Boat: state.lumber<30,
        Ship: state.lumber<40 || state.brick<40 || state.metal<20,
        Flagship: state.lumber<80 || state.wood<40 || state.brick<80 || state.metal<60
    }
    return <Col xs={12}>
        <Row>
            <Action name={'Build'} actionType={'craft'} payload={{type: vessel.toLowerCase()}} disabled={dis[vessel]}/>
            <Col xs={8}>
                <select className={'form-control'} value={vessel} onChange={(e)=>{setVessel(e.target.value)}}>
                    <option>Raft</option>
                    <option>Boat</option>
                    <option>Ship</option>
                    <option>Flagship</option>
                </select>
            </Col>
        </Row>
        <Row style={{backgroundColor: '#777777aa'}}>
            <Col xs={4}>
                Boats: {state.boat || 0}
            </Col>
            <Col xs={4}>
                Ships: {state.ship || 0}
            </Col>
            <Col xs={4}>
                Flagships: {state.flagship || 0}
            </Col>
            <Col xs={4}>
                Rafts: {state.raft || 0}
            </Col>
        </Row>
        <Row style={{backgroundColor: '#777777aa'}}>
            <Col xs={12}>
                {vessel=='Raft' && <>Raft: -20 Wood<br/></>}
                {vessel=='Boat' && <>Boat: -30 Lumber<br/></>}
                {vessel=='Ship' && <>Ship: -40 Lumber, -40 Brick, -20 Metal</>}
                {vessel=='Flagship' && <>Ship: -80 Lumber, -40 Wood, -80 Brick, -60 Metal</>}
            </Col>
        </Row>
    
    </Col>
}
export function Portal(){
    const {state, dispatch} = useVerseContext()
    const portals = ['projects', 'bridge', 'cookbook', 'lexicon']
    const [destination, setDestination] = useState('projects')
    return <Col xs={12}>
        <Form>
            <Row>
                <Col xs={12}>Teleport to another realm</Col>
                <Action name={'bLink'} actionType={'teleport'} payload={{destination: destination}}/>
                <Col xs={8}>
                    <select className={'form-control'} value={destination} onChange={(e)=>{setDestination(e.target.value)}}>
                        {
                            portals.map((p, i)=>{
                                return <option key={i}>{p}</option>
                            })
                        }
                    </select>
                </Col>
            </Row>
        </Form>
    </Col>
}
export function Choice_experimental(){
    const {state, dispatch} = useVerseContext()
    const options = [7, 8, 9]
    const pathways = {
        7: ''
    }
    const [choice, setChoice] = useState(0)
    return <Col xs={12}>
        <Form>
            <Row>

                <Col xs={12}>What is your role?</Col>
                <Col xs={8}>
                    <select className={'form-control'} value={choice} onChange={(e)=>{setChoice(Number.parseInt(e.target.value))}}>
                        {options.map((o, i)=>{
                            return <option key={i}>{o}</option>
                        })}
                    </select>
                </Col>
                <Action name={'Choose'} actionType={'choose'} payload={{choice: choice}}/>

            </Row>
        </Form>
    </Col>
}
export function Beginning(){
    const [exPfro, setExPfro]: [Partial<diceProps>, Dispatch<any>] = useState({sides: 22, speed: 5})
    const [exPat, setExPat]: [Partial<diceProps>, Dispatch<any>] = useState({sides: 22, speed: 5})
    const [exPto, setExPto]: [Partial<diceProps>, Dispatch<any>] = useState({sides: 22, speed: 5})
    const {state, dispatch} = useVerseContext()
    return <Col xs={12} sm={6}>
        <Row><Col>Where from?<br/>{albt22[exPfro.value-1]?.uni || ''}</Col><Col><D20 setExternalProps={setExPfro} clickD={()=>{}}/></Col></Row>
        <Row><Col>Where are?<br/>{albt22[exPat.value-1]?.uni || ''}</Col><Col><D20 setExternalProps={setExPat} clickD={()=>{}}/></Col></Row>
        <Row><Col>Where to?<br/>{albt22[exPto.value-1]?.uni || ''}</Col><Col><D20 setExternalProps={setExPto} clickD={()=>{}}/></Col></Row>
    </Col>
}


export function Grid5x5(){
    const {state, dispatch} = useVerseContext()
    const [stateReady, setStateReady] = useState(false)
    if(!state)return
    const gridRef: {current: [[any]]} = useRef(state.grid || [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ])
    useEffect(()=>{
        if(stateReady)return
        if(!state)return
        if(!state.grid)return
        gridRef.current = state.grid
        setStateReady(true)
    },[state])

    return <Col xs={12} sm={6}>
        {gridRef.current.map((row, i)=>{
            return <Row key={i}>
                {row.map((col, j)=>{
                    return <Col key={j} style={{textAlign: 'center'}}>
                        <select className={'form-control'} style={{padding: '7px'}} value={gridRef.current[i][j]} onChange={(e)=>{
                            gridRef.current[i][j] = e.target.value
                            dispatch({type: 'grid', payload: gridRef.current})
                        }}>
                            {albt22.map((k, i)=>{return <option key={i}>{albt22[i].uni}</option>})}
                        </select>
                    </Col>
                })}
            </Row>
        })}
    </Col>
}
export function Grid5x5Info(){
    const {state, dispatch} = useVerseContext()
    if(!state)return
    const gridInf: {current: {}} = useRef({})
    useEffect(()=>{
        if(!state)return
        if(!state.grid)return
        state.grid.map((row, i)=>{
            row.map((col, j)=>{
                //let top = i-1<0?null:state.grid[i-1][j]
                //if(top) gridInf.current = {...gridInf.current, [col+top]: (gridInf.current[col+top]?gridInf.current[col+top]+1:1)}
                let bottom = i+1>4?null:state.grid[i+1][j]
                if(bottom) gridInf.current = {...gridInf.current, [col+bottom]: (gridInf.current[col+bottom]?gridInf.current[col+bottom]+1:1)}
                //let left = j-1<0?null:state.grid[i][j-1]
                //if(left) gridInf.current = {...gridInf.current, [col+left]: (gridInf.current[col+left]?gridInf.current[col+left]+1:1)}
                let right = j+1>4?null:state.grid[i][j+1]
                if(right) gridInf.current = {...gridInf.current, [col+right]: (gridInf.current[col+right]?gridInf.current[col+right]+1:1)}
            })
        })
    },[state.grid])
    function Display({current}: {current: {}}){
        if(!current)return<></>
        return <>{Object.entries(current).map((e,i)=>{return <Fragment key={i}>{e[0]}<br/></Fragment>})}</>
    }
    return <Col xs={12} sm={6} style={{color: '#33f'}}>
        <Display {...gridInf}/>
    </Col>
}