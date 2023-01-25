import { useEffect, useState } from "react";

export default function DiceWidget(rand){
    const dice = [2,4,6,8,10,12,20,100]
    const [sides, selectSides] = useState(0)
    const [value, setValue] = useState(0)
    const [roller, setRoller] = useState('false')
    const [speed, setSpeed] = useState(5)
    
    useEffect(() => {
        if(sides==0){
            let r = dice[Math.floor(Math.random()*8)]
            selectSides(r)
            setValue(Math.floor(Math.random()*r)+1)
        }
    }, [])
    useEffect(() => {
        if(roller=='false') return
        const i = setInterval(() => {
            setValue(Math.floor(Math.random()*sides)+1);
            console.log('dice roll every '+speed+' seconds!');
        }, speed*1000);
        return () => clearInterval(i)
    }, [sides, roller])

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
        }} onClick={() => setValue(Math.floor(Math.random()*sides)+1)}>{value}</button>
    </div>
}