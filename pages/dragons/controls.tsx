import { Button, Col, Row } from "react-bootstrap";
import { GameData } from "../../public/dragons/tileTypes";

export const control = {
    fontSize: '10px',
    width: '36px',
    height: '24px',
    margin: '0px',
    padding: '0px',
    text: 'center',
    zIndex: '10'
}
export default function Controls({game}: {game: GameData}){
    return <div className={'net-dragons-controls'}>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>{game.setPosition((pP)=>{
                    if(typeof game.activeMap.regions[pP.z-1] === 'undefined') return pP;
                    if(typeof game.activeMap.regions[pP.z-1][pP.x] === 'undefined') return pP;
                    if(typeof game.activeMap.regions[pP.z-1][pP.x][pP.y] === 'undefined') return pP;
                    return {x: pP.x, y: pP.y, z: pP.z+(!(game.activeMap.regions[pP.z][pP.x][pP.y].paths[5])?-1:0)}})}}>{'\u2BB6'/*DOWN*/}</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>{game.setPosition((pP)=>{
                    if(typeof game.activeMap.regions[pP.z] === 'undefined') return pP;
                    if(typeof game.activeMap.regions[pP.z][pP.x-1] === 'undefined') return pP;
                    if(typeof game.activeMap.regions[pP.z][pP.x-1][pP.y] === 'undefined') return pP;
                    return {x: pP.x+(!(game.activeMap.regions[pP.z][pP.x][pP.y].paths[0])?-1:0), y: pP.y, z: pP.z}})}}>{'\u23F6'/*NORTH*/}</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>{game.setPosition((pP)=>{
                    if(typeof game.activeMap.regions[pP.z+1] === 'undefined') return pP;
                    if(typeof game.activeMap.regions[pP.z+1][pP.x] === 'undefined') return pP;
                    if(typeof game.activeMap.regions[pP.z+1][pP.x][pP.y] === 'undefined') return pP;
                    return {x: pP.x, y: pP.y, z: pP.z+(!(game.activeMap.regions[pP.z][pP.x][pP.y].paths[4])?1:0)}})}}>{'\u2BB5'/*UP*/}</Button>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>{game.setPosition((pP)=>{
                    if(typeof game.activeMap.regions[pP.z] === 'undefined') return pP;
                    if(typeof game.activeMap.regions[pP.z][pP.x] === 'undefined') return pP;
                    if(typeof game.activeMap.regions[pP.z][pP.x][pP.y-1] === 'undefined') return pP;
                    return {x: pP.x, y: pP.y+(!(game.activeMap.regions[pP.z][pP.x][pP.y].paths[3])?-1:0), z: pP.z}})}}>{'\u23F4'/*WEST*/}</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Enter</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>{game.setPosition((pP)=>{
                    if(typeof game.activeMap.regions[pP.z] === 'undefined') return pP;
                    if(typeof game.activeMap.regions[pP.z][pP.x] === 'undefined') return pP;
                    if(typeof game.activeMap.regions[pP.z][pP.x][pP.y+1] === 'undefined') return pP;
                    return {x: pP.x, y: pP.y+(!(game.activeMap.regions[pP.z][pP.x][pP.y].paths[1])?1:0), z: pP.z}})}}>{'\u23F5'/*EAST*/}</Button>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Run</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>{game.setPosition((pP)=>{
                    if(typeof game.activeMap.regions[pP.z] === 'undefined') return pP;
                    if(typeof game.activeMap.regions[pP.z][pP.x+1] === 'undefined') return pP;
                    if(typeof game.activeMap.regions[pP.z][pP.x+1][pP.y] === 'undefined') return pP;
                    return {x: pP.x+(!(game.activeMap.regions[pP.z][pP.x][pP.y].paths[2])?1:0), y: pP.y, z: pP.z}})}}>{'\u23F7'/*SOUTH*/}</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Fight</Button>
            </Col>
        </Row>
    </div>
}