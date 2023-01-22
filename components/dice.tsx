import { useState } from "react";

export default function DiceWidget(props){
    const [sides, setSides] = useState(6);
    const [value, setValue] = useState(Math.floor(Math.random()*sides)+1);

    return <div className={'dice-widget'} style={{position: 'absolute', zIndex: 10 }}>
        <select defaultValue={6} onChange={e => setSides(Number(e.target.value))}>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
            <option value={100}>100</option>
        </select><br/>
        <button style={{height: '40px', width: '40px', color: 'blue', backgroundColor: 'white'}} onClick={() => setValue(Math.floor(Math.random()*sides)+1)}>{value}</button>
    </div>
}