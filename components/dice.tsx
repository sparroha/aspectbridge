import { GetServerSideProps } from "next";
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
    rand?: number,
}
export default function DiceWidget({udr}: {udr: Function}){
    const {sides, speed, rand, value, setRoller, selectSides, setValue, setSpeed} = udr()
    const dice = [2,4,6,8,10,12,20,100]
    
    useEffect(() => {
        if(setValue&&sides==0){
            let r = dice[Math.floor(rand()*8)]
            selectSides(r)
            setValue(Math.floor(rand()*r)+1)
        }
    }, [setValue])

    return <div className={'dice-widget text-white'}>
        <select value={sides} onChange={e => selectSides(Number(e.target.value))}>
            {dice.map((side, index) => <option key={index} value={side}>{side}</option>)}
        </select>
        <input type="checkbox" onChange={e => e.target.checked ? setRoller('true') : setRoller('false')} /> Auto
        <br/>Sides:<input style={{
            borderRadius: '50%',
        }} type="number" min={2} max={100} defaultValue={sides} onChange={e => selectSides(Number(e.target.value))} />
        <br/>Speed:<input style={{
            borderRadius: '50%',
        }} type="number" min={1} max={10} defaultValue={speed} onChange={e => setSpeed(Number(e.target.value))} />
        small is fast<br/>
        <button style={{
            height: '40px',
            width: '40px',
            color: 'blue',
            backgroundColor: 'silver',
            borderRadius: '25%',
            border: '5px outset lightgray',
        }} onClick={() => setValue(Math.floor(rand()*sides)+1)}>{value}</button>
      <DiceCompact udr={udr}/>
    </div>
}
function DiceCompact({udr}){
    const {sides, speed, rand, 
           value, setRoller, 
           selectSides, setValue, 
           setSpeed} = udr()
    const dice = [2,4,6,8,10,12,20,100]
    useEffect(() => {
        if(setValue&&sides==0){
            let r = dice[Math.floor(rand()*8)]
            selectSides(r)
            setValue(Math.floor(rand()*r)+1)
        }
    }, [setValue])

    return <div>
        <button
            style={{
                height: '40px',
                width: '40px',
                color: 'blue',
                backgroundColor: 'silver',
                borderRadius: '25%',
                border: '5px outset lightgray',
            }}
            onClick={() => setValue(
            Math.floor(rand()*sides)+1)}
        ><Row>
            <Col xs={4}><select value={sides} onChange={e => selectSides(Number(e.target.value))}>
            {dice.map((side, index) => <option key={index} value={side}>{side}</option>)}
        </select></Col>

        <Col xs={4}></Col>

        <Col xs={4}><input type="checkbox" onChange={e => e.target.checked ? setRoller('true') : setRoller('false')} /> Auto
        </Col>
        </Row>
        <Row><Col xs={12}>{value}</Col></Row>
        

        <Col xs={4}>
Sides:<input style={{
            borderRadius: '50%',
        }} type="number" min={2} max={100} defaultValue={sides} onChange={e => selectSides(Number(e.target.value))} />
        </Col>
        <Col xs={4}></Col>
        <Col xs={4}>
Speed:<input style={{
            borderRadius: '50%',
        }} type="number" min={1} max={10} defaultValue={speed} onChange={e => setSpeed(Number(e.target.value))} />
        small is fast
        </Col>


         
        </button>
    </div>
}

export function useDiceRoll(props: diceInitProps): diceProps{
    const rand = ()=>Math.random();
    const [sides, selectSides] = useState(props.sides || 0)
    const [value, setValue] = useState(0)
    const [roller, setRoller] = useState('false')
    const [speed, setSpeed] = useState(props.speed || 5)
    
    useEffect(() => {
        if(roller=='false') return
        const i = setInterval(() => {
            setValue(Math.floor(rand()*sides)+1);
            console.log('dice roll every '+speed+' seconds!');
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

/*export const getServerSideProps: GetServerSideProps<diceProps> = async (context) => {
    const query = context.query
    return {props: {
        sides: query.sides ? Number(query.sides) : 0,
        speed: query.speed ? Number(query.speed) : 5,
        rand: query.rand ? Number(query.rand) : Math.random(),
        value: query.value ? Number(query.value) : 0,
        setRoller: query.setRoller ? Function(query.setRoller) : Function(),
        selectSides: query.selectSides ? Function(query.selectSides) : Function(),
        setValue: query.setValue ? Function(query.setValue) : Function(),
        setSpeed: query.setSpeed ? Function(query.setSpeed) : Function(),
    }} 
}*/