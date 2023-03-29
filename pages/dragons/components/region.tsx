import { Button, Col, Row } from "react-bootstrap"
import { Position } from "../../../../public/bridge/dragons/tileTypes"

const background = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
}
const regionButton = {
    fontSize: '10px',
    width: '64px',
    height: '64px',
    margin: '0px',
    padding: '0px',
    text: 'center'
}
export const square = {
    fontSize: '12px',
    width: '64px',
    height: '64px',
    margin: '0px',
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
export default function Region({key, region, disabled}: {key: number, region: RegionData, disabled: boolean}){
        return <div key={key} style={{float: 'left', position: 'relative', ...square}}>
            <Button style={{...regionButton, ...background, position: 'relative', backgroundImage: `url(${region.image})`}} disabled={disabled}>
                <Walls paths={region.paths}>
                    <Row height={'33vh'}>
                        <Col xs={12}>{region.name}</Col>
                    </Row>
                    <Row height={'33vh'}>
                        <Col xs={12}>{region.description}</Col>
                    </Row>
                    <Row height={'33vh'}>
                        <Col xs={4}>{region.paths[0]}</Col>
                        <Col xs={4}></Col>
                        <Col xs={4}>{region.paths[1]}</Col>
                    </Row>
                </Walls>
            </Button>
        </div>
}
export function Walls({paths, children}: {paths: number[], children: any}){
    return <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1}}>{children}
        {paths[0]==1?<div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', backgroundColor: 'black', zIndex: 1}}></div>:null}
        {paths[1]==1?<div style={{position: 'absolute', top: 0, right: 0, width: '5px', height: '100%', backgroundColor: 'black', zIndex: 1}}></div>:null}
        {paths[2]==1?<div style={{position: 'absolute', bottom: 0, right: 0, width: '100%', height: '5px', backgroundColor: 'black', zIndex: 1}}></div>:null}
        {paths[3]==1?<div style={{position: 'absolute', bottom: 0, left: 0, width: '5px', height: '100%', backgroundColor: 'black', zIndex: 1}}></div>:null}
    </div>
}