import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { GameData } from "../../../public/bridge/dragons/tileTypes";

export const portcontrol = {
    fontSize: '10px',
    margin: '0px',
    padding: '0px',
    text: 'center',
}
export default function MapSettings({game}: {game: GameData}){
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [z, setZ] = useState(0)
  
    return <div style={portcontrol}>
        View Distance:
        <select value={game.viewDistance} onChange={e => game.setViewDistance(Number(e.target.value))}>
            <option key={0} value={0}>0</option>
            <option key={1} value={1}>1</option>
            <option key={2} value={2}>2</option>
            {game.user.access==2?(
                <><option key={3} value={3}>3</option>
                <option key={4} value={4}>4</option></>
            ):(null)}
        </select> 
        <Form id={'teleport'} style={portcontrol} onSubmit={(event) => {event.preventDefault();
                if(typeof game.activeMap.regions[z] === 'undefined') return;
                if(typeof game.activeMap.regions[z][x] === 'undefined') return;
                if(typeof game.activeMap.regions[z][x][y] === 'undefined'/*|| !game.regions[z][x][y].isValid*/) return;
                game.setPosition({x: x, y: y, z: z})
            }} >
            <Form.Group style={portcontrol} controlId="formEmail">
                <Form.Label>Longitude</Form.Label>
                <Form.Control style={portcontrol} required type="number" min={1} value={x+1} onChange={(e)=>setX(parseInt(e.target.value)-1)}/>
                <Form.Label>Latitude</Form.Label>
                <Form.Control style={portcontrol} required type="number" min={1} value={y+1} onChange={(e)=>setY(parseInt(e.target.value)-1)}/>
                <Form.Label>Altitude</Form.Label>
                <Form.Control style={portcontrol} required type="number" min={1} value={z+1} onChange={(e)=>setZ(parseInt(e.target.value)-1)}/>
            </Form.Group>
            <Button style={portcontrol} type="submit" >Teleport</Button>
        </Form>
    </div>
  }