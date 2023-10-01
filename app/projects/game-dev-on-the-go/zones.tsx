import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useZRContext } from "./provider"


export default function Nowhere(){return <></>}
/**
 * COMPONENTS
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
export function Zone({id, bgColor, bgImage, bgGradient, bgAlt, children, helper}:{id: string, bgColor?: string, bgImage?: string, bgGradient?: string, bgAlt?: string, children: any, helper?: boolean}){
    const {state, dispatch} = useZRContext()
    if(!state.location?.zones?.includes(id))return
    return <Col id={id} xs={12} sm={6} md={4} lg={3} style={{position: 'relative'}}>
        <div style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', backgroundColor: bgColor || 'none', backgroundImage: bgImage?`img(${bgImage})`:bgGradient || 'none', opacity: '.7'}}></div>
        {bgImage && <img src={bgImage} alt={bgAlt || ''} style={{ position: 'absolute', width: '100%', height: '100%', padding: '5px', borderRadius: '20px', opacity: '.7'}}/>}
        <Row style={{position: 'relative', zIndex: 1, width: '100%', textAlign: 'center'}}>
            <Col xs={4}><h4>{id}</h4></Col>
            {helper && <Col xs={8}>
                <Row>
                    <Col xs={5}>
                        <Button onClick={()=>{dispatch({type: 'hire', payload: {type: id.toLowerCase(), fee: 100}})}}>Hire:</Button>
                    </Col>
                    <Col xs={7}>
                        <div style={{backgroundColor: '#777777aa'}}>Helpers: {state.helpers?.[id.toLowerCase()]}<br/>-100 Fish</div>
                    </Col>
                </Row>
            </Col>}
            
            {children}
        </Row>
    </Col>
}


//zone activities
export function ChopWood(){
    const {state, dispatch} = useZRContext()
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'wood', count: 1}})}}>Chop</Button><br/>
        <div style={{backgroundColor: '#777777aa'}}>+Wood: {state.wood}</div>
    </Col>
}
export function SawLumber(){
    const {state, dispatch} = useZRContext()
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'craft', payload: {type: 'lumber'}})}}>Saw</Button><br/>
        <div style={{backgroundColor: '#777777aa'}}>-1 Wood<br/>+Lumber: {state.lumber}</div>
    </Col>
}
export function BuildRaft(){
    const {state, dispatch} = useZRContext()
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'craft', payload: {type: 'raft'}})}}>Raft</Button><br/>
        <div style={{backgroundColor: '#777777aa'}}>-20 Wood<br/>+Raft: {state.raft}</div>
    </Col>
}
export function MineOre(){
    const {state, dispatch} = useZRContext()
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'ore', count: 1}})}}>Mine</Button><br/>
        <div style={{backgroundColor: '#777777aa'}}>+Ore: {state.ore}</div>
    </Col>
}
export function SmeltMetal(){
    const {state, dispatch} = useZRContext()
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'craft', payload: {type: 'metal'}})}}>Smelt</Button><br/>
        <div style={{backgroundColor: '#777777aa'}}>-3 Ore<br/>-3 Wood<br/>+Metal: {state.metal}</div>
    </Col>
}
export function QuaryStone(){
    const {state, dispatch} = useZRContext()
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'stone', count: 1}})}}>Quary</Button><br/>
        <div style={{backgroundColor: '#777777aa'}}>+Stone: {state.stone}</div>
    </Col>
}
export function ChiselSlabs(){
    const {state, dispatch} = useZRContext()
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'craft', payload: {type: 'tile'}})}}>Chisel</Button><br/>
        <div style={{backgroundColor: '#777777aa'}}>-1 Stone<br/>-4 Lumber<br/>+Tile: {state.tile}</div>
    </Col>
}
export function DigClay(){
    const {state, dispatch} = useZRContext()
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'clay', count: 1}})}}>Dig</Button><br/>
        <div style={{backgroundColor: '#777777aa'}}>+Clay: {state.clay}</div>
    </Col>
}
export function FireBricks(){
    const {state, dispatch} = useZRContext()
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'craft', payload: {type: 'brick'}})}}>Kiln</Button><br/>
        <div style={{backgroundColor: '#777777aa'}}>-4 Clay<br/>-3 Wood<br/>+Brick: {state.brick}</div>
    </Col>
}
export function ScribeTablet(){
    const {state, dispatch} = useZRContext()
    const [script, setScript] = useState('')
    return <>
        <Col xs={12}>
            <Form>
                <Form.Control type="text" maxLength={33} placeholder="Message" value={script} onChange={(e)=>{setScript(e.target.value)}}/>
            </Form>
        </Col>
        <Col xs={4}>
            <Button onClick={()=>{dispatch({type: 'write', payload: {message: script}})}}>Scribe</Button><br/>
            <div style={{backgroundColor: '#777777aa'}}>-1 Bricks<br/>-1 Lumber<br/>+Scripts: {state.tablets?.length || 0}</div>
        </Col>
        <Col xs={8}>
            <label style={{backgroundColor: '#777777aa'}}>Last 3 scripts</label>
            <div style={{maxHeight: '100%', overflow: 'auto', color: 'black', textShadow: '2px 1px #73f', backgroundColor: '#777777aa'}}>
                {state.tablets?.map((t, i)=>{
                    if(i<state.tablets.length-2) return
                    return <div key={i}>{t}<hr style={{margin: 0, padding: 0}}/></div>
                }
                )}
            </div>
        </Col>
    </>
}
export function ScriptDirectory(){
    const {state, dispatch} = useZRContext()
    return <Col xs={12}>
        <div style={{maxHeight: '100%', overflow: 'auto', color: 'black', textShadow: '2px 1px #73f', backgroundColor: '#777777aa'}}>
            {state.tablets?.map((t, i)=>{
                return <div key={i}>{t}<hr style={{margin: 0, padding: 0}}/></div>
            })}
        </div>
    </Col>
}
export function Fish(){
    const {state, dispatch} = useZRContext()
    return <Col xs={4}>
        <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'fish', count: 1}})}}>Fish</Button><br/>
        <div style={{backgroundColor: '#777777aa'}}>+Fish: {state.fish || 0}</div>
    </Col>
}
export function Sail(){
    const {state, dispatch} = useZRContext()
    const [destination, setDestination] = useState(state.location.name)
    const [vessel, setVessel] = useState('boat')
    return <Col xs={12}>
        <Form>
            <Row>
                <Col xs={4}>
                    <Button onClick={()=>{dispatch({type: 'sail', payload: {destination: destination, vessel: vessel}})}}>Sail To</Button><br/>
                    <div style={{backgroundColor: '#777777aa'}}>{vessel}s {state[vessel.toLowerCase()] || 0}<br/>-20 fish</div>
                </Col>
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
    const {state, dispatch} = useZRContext()
    const [vessel, setVessel] = useState('Boat')
    return <Col xs={12}>
        <Row>
            <Col xs={4}>
                <Button onClick={()=>{dispatch({type: 'craft', payload: {type: vessel.toLowerCase()}})}}>Build</Button><br/>
            </Col>
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
    const {state, dispatch} = useZRContext()
    const portals = ['projects', 'bridge', 'cookbook', 'lexicon']
    const [destination, setDestination] = useState('projects')
    return <Col xs={12}>
        <Form>
            <Row>
                <Col xs={12}>Teleport to another realm</Col>
                <Col xs={4}>
                    <Button onClick={()=>{dispatch({type: 'teleport', payload: {destination: destination}})}}>bLink</Button><br/>
                </Col>
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
export function Choice(){
    const {state, dispatch} = useZRContext()
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
                <Col xs={4}>
                    <Button onClick={()=>{dispatch({type: 'choose', payload: {choice: choice}})}}>Choose</Button><br/>
                </Col>

            </Row>
        </Form>
    </Col>
}
