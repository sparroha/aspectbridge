import { Button, Col, Row } from "react-bootstrap"
import { Position } from "../../../public/dragons/tileTypes"

const background = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
}
const scale = '48px'
const regionButton = {
    fontSize: '7px',
    width: scale,
    height: scale,
    margin: '0px',
    padding: '0px',
    border: '0px',
    text: 'center'
}
export const square = {
    fontSize: '12px',
    width: scale,
    height: scale,
    margin: '0px',
    padding: '0px',
    text: 'center'
}
export const collomn = {
    fontSize: '10px',
    padding: '0px',
    text: 'center'
}


export type RegionData = {
    name?: string,
    description?: string,
    image?: string,
    paths: number[],//north, east, south, west, up, down
    items?: string[],//list of items that may apear in this region
    monsters?: any[],//list of monsters that may apear in this region
    events?: any[],//list of events that may apear in this region
    destination?: Position,
    destinationMap?: string,
}
export default function Region({indexkey, region, disabled}: {indexkey: number, region: RegionData, disabled: boolean}){
    if(!region) return <>Tile Loading...</>
        return <div key={indexkey} style={{float: 'left', position: 'relative', ...square}}>
            <Button style={{...regionButton, ...background, position: 'relative', backgroundImage: `url(${region.image})`}} disabled={disabled}>
                <Walls paths={region.paths}>
                    <Row height={'33vh'}>
                        <Col xs={4} style={collomn}>{region.paths[5]==0?'\u2935'/*DOWN*/:'-'}</Col>
                        <Col xs={4} style={collomn}>{region.paths[0]==0?'\u2B06'/*NORTH*/:'-'}</Col>
                        <Col xs={4} style={collomn}>{region.paths[4]==0?'\u2934'/*UP*/:'-'}</Col>
                    </Row>
                    <Row height={'33vh'}>
                        <Col xs={4} style={collomn}>{region.paths[3]==0?'\u2B05'/*WEST*/:'-'}</Col>
                        <Col xs={4} style={{...collomn, fontSize: '5px'}}>{region.name}</Col>
                        <Col xs={4} style={collomn}>{region.paths[1]==0?'\u27A1'/*EAST*/:'-'}</Col>
                    </Row>
                    <Row height={'33vh'}>
                        <Col xs={4} style={collomn}>{0==0?'-':'-'}</Col>
                        <Col xs={4} style={collomn}>{region.paths[2]==0?'\u2B07'/*SOUTH*/:'-'}</Col>
                        <Col xs={4} style={collomn}>{0==0?'-':'-'}</Col>
                    </Row>
                </Walls>
            </Button>
        </div>
}
export function Walls({paths, children}: {paths: number[], children: any}){
    return <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1}}>{children}
        {paths[0]==1?<div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'black', zIndex: 1}}></div>:null}
        {paths[1]==1?<div style={{position: 'absolute', top: 0, right: 0, width: '2px', height: '100%', backgroundColor: 'black', zIndex: 1}}></div>:null}
        {paths[2]==1?<div style={{position: 'absolute', bottom: 0, right: 0, width: '100%', height: '2px', backgroundColor: 'black', zIndex: 1}}></div>:null}
        {paths[3]==1?<div style={{position: 'absolute', bottom: 0, left: 0, width: '2px', height: '100%', backgroundColor: 'black', zIndex: 1}}></div>:null}
    </div>
}