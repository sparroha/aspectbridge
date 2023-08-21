'use client'
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

type diceProps = {
    sides?: number,
    speed?: number,
    rand?: Function,
    value?: number,
    setRoller?: Function,
    selectSides?: Function,
    setValue?: Function,
    setSpeed?: Function,
}
export type diceInitProps = {
    sides?: number,
    speed?: number,
    rand?: Function,
}
/**
 * JSX: Dice Widget default
 * @param udr: DATA HOOK: Dice Roll useDiceRoll(props: diceInitProps): diceProps{} 
 * @returns 
 */
export default function DiceWidget({udr}: {udr: Function}){
    return <div className={'dice-widget text-white'}>
      <DiceCompact udr={udr}/>
    </div>
}

/**
 * JSX: Dice Widget Compact
 * @param udr: DATA HOOK: Dice Roll useDiceRoll(props: diceInitProps): diceProps{}
 * @returns 
 */
function DiceCompact({udr}){
    const {sides, speed, rand, 
           value, setRoller, 
           selectSides, setValue, 
           setSpeed} = udr()
    const dice = [2,4,6,8,10,12,20,100]
    useEffect(() => {
        if(setValue){
            let r = sides?sides:dice[Math.floor(rand()*8)]
            selectSides(r)
            setValue(Math.floor(rand()*r)+1)
            //console.log(r+' sided dice roll!')
        }
    }, [setValue])

    return <div>
        <button
            style={{
                maxHeight: '100%',
                maxWidth: '100%',
                height: '210px',
                width: '210px',
                color: 'blue',
                backgroundColor: 'silver',
                borderRadius: '25px',
                border: '5px outset lightgray',
                padding: '0px',
                margin: '0px',
            }}
            onClick={() => setValue(
            Math.floor(rand()*sides)+1)}
        ><Row>
            <Col xs={3}>
                <input style={{
                    borderRadius: '50px', textAlign: 'center' 
                }} type="text" size={2} min={1} max={10} defaultValue={speed} onChange={e => {if(Number(e.target.value))setSpeed(Number(e.target.value))}} />
            </Col>
            <Col xs={7}>
                second reroll
            </Col>
            <Col xs={2}>
                <input type="checkbox" onChange={e => e.target.checked ? setRoller('true') : setRoller('false')} />
            </Col>
        </Row>
        <Row><Col xs={12}><h1>{value}</h1></Col></Row>
        <Row>
            <Col xs={4}><select value={sides} onChange={e => selectSides(Number(e.target.value))}>
                {dice.map((sideCount, index) => <option key={index} value={sideCount}>{sideCount}</option>)}
            </select> </Col>
            <Col xs={4}>
                Sides D{sides}<input style={{
                    borderRadius: '50px', 
                }} type="text" size={3} min={2} max={100} defaultValue={sides} onChange={e => selectSides(Number(e.target.value))}/>
            </Col>
            <Col xs={4}></Col>
            <Col xs={4}></Col>
        </Row>
        </button>
    </div>
}

/**
 * DATA HOOK: Dice Roll useDiceRoll(props: diceInitProps): diceProps{}
 * @param props: diceInitProps
 * @returns 
 */
export function useDiceRoll(props: diceInitProps): diceProps{
    const rand: Function = props.rand?props.rand:()=>Math.random()
    const [sides, selectSides] = useState(props.sides || 0)
    const [value, setValue] = useState(0)
    const [roller, setRoller] = useState('false')
    const [speed, setSpeed] = useState(props.speed || 5)
    
    useEffect(() => {
        if(roller=='false') return
        const i = setInterval(() => {
            setValue(Math.floor(rand()*sides)+1);
            //console.log('dice roll every '+speed+' seconds!');
        }, speed*1000);
        return () => clearInterval(i)
    }, [sides, roller])

    return {
        sides: sides,
        speed: speed,
        rand: rand,
        value: value,
        setRoller: setRoller,
        selectSides: selectSides,
        setValue: setValue,
        setSpeed: setSpeed
    }
}