import { GetServerSideProps } from "next";
import { useState } from "react";
import { Button, Col, Form, InputGroup, Nav, Row } from "react-bootstrap";
import requestIp from 'request-ip';
import useLog from "../../components/conlog";
import { ProfileByIp } from "../login/[userlogin]";

export const portcontrol = {
    fontSize: '10px',
    margin: '0px',
    padding: '0px',
    text: 'center',
}
export const control = {
    fontSize: '10px',
    width: '36px',
    height: '24px',
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
export const wall = {
    horizontal: {
        width: '100%',
        height: '10%',
        margin: '0px',
        padding: '0px',
        text: 'center'
    },
    vertical: {
        width: '10%',
        height: '100%',
        margin: '0px',
        padding: '0px',
        text: 'center'
    }
}
export default function NetDragons({ip, M}){
    const [user, setUser] = useState(null)
    const [playerPosition, setPlayerPosition] = useState({x: 0, y: 0, z: 0})
    const map = useMap(M, playerPosition)
//<ProfileByIp ip={ip} setUser={setUser}/>
    return <div className={'net-dragons'}>
        <h1>Next Dragons</h1>
        <Nav><Nav.Link href={"/login/"+(user?'logout':'login')+'?homepage='+'bridge/newdragons'+(user?'&username='+user.username:'')}>{user?('Logout '+user.username):'Login'}</Nav.Link>{' '}</Nav>
        <ProfileByIp ip={ip} setUser={setUser}/>
        <Row>
            <Col xs={12} sm={2}>
                <MapSettings map={map} sSP={setPlayerPosition}/>
            </Col>
            <Col xs={12} sm={2}>
        
                <Controls M={map} sPP={setPlayerPosition}/>
            </Col>
            <Col xs={12} sm={8}>
                <MapFollow M={map}/>
            </Col>
        </Row>
    </div>
}

function MapSettings({map, sSP}){
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [z, setZ] = useState(0)
  
    return <div style={portcontrol}>
        View Distance:
        <select value={map.vieDistance} onChange={e => map.setViewDistance(Number(e.target.value))}>
            <option key={0} value={0}>0</option>
            <option key={1} value={1}>1</option>
            <option key={2} value={2}>2</option>
        </select>
        <Form id={'loginForm'} style={portcontrol} onSubmit={(event) => {event.preventDefault();
                if(typeof map.M[z] === 'undefined') return;
                if(typeof map.M[z][x] === 'undefined') return;
                if(typeof map.M[z][x][y] === 'undefined') return;
                sSP({x: x, y: y, z: z})
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

export function Controls({M, sPP}){
    return <div className={'net-dragons-controls'}>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y, z: pP.z+(!(M.M[pP.z][pP.x][pP.y].paths[5])?-1:0)}})}>Down</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x+(!(M.M[pP.z][pP.x][pP.y].paths[0])?-1:0), y: pP.y, z: pP.z}})}>North</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y, z: pP.z+(!(M.M[pP.z][pP.x][pP.y].paths[4])?1:0)}})}>Up</Button>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y+(!(M.M[pP.z][pP.x][pP.y].paths[3])?-1:0), z: pP.z}})}>West</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Enter</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y+(!(M.M[pP.z][pP.x][pP.y].paths[1])?1:0), z: pP.z}})}>East</Button>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Run</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x+(!(M.M[pP.z][pP.x][pP.y].paths[2])?1:0), y: pP.y, z: pP.z}})}>South</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Fight</Button>
            </Col>
        </Row>
    </div>
}

export function Map({M}){
    return <div className={'net-dragons-map'}>
        {M?.map((row, i) => {if(M.pP.z==i) {return <Row key={i}>Floor {i}<Col xs={12}>
            {row.map((col, j) => <Row key={j}><Col xs={12}>
                {col.map((cell, k) => <div key={k} style={{float: 'left'}}>
                    <Button variant={'primary'} style={square} disabled={(M.pP.x==j&&M.pP.y==k&&M.pP.z==i?false:true)}>

                            room {1+k+j*col.length}:<br/>{(1+k)+'\/'+(1+j)}<br/>{M.pP.x==j&&M.pP.y==k?cell:''}
                        
                    </Button>
                </div>)}
            </Col></Row>)}
        </Col></Row>}})}
    </div>
}
export function MapFollow({M}){
    return <div className={'net-dragons-map'}>
        {M.M?.map((row, i) => (M.pP.z==i)?<Row key={i}>Floor {i+1}<Col xs={12}>
            {row.map((col, j) => (j>=(M.pP.x-M.vieDistance))&&(j<=(M.pP.x+M.vieDistance))?<Row key={j}><Col xs={12} style={{padding: 0}}>
                {col.map((cell, k) => ((k>=M.pP.y-M.vieDistance)&&(k<=M.pP.y+M.vieDistance))?
                <div key={k} style={{float: 'left', position: 'relative', ...square}}>
                    <Button variant={'primary'} style={square} disabled={(M.pP.x==j&&M.pP.y==k&&M.pP.z==i?false:true)}>{cell.title} {1+k+j*col.length}:<br/>{(1+k)+'\/'+(1+j)}<br/>{M.pP.x==j&&M.pP.y==k?cell.title:''}</Button>
                    <Walls paths={cell.paths}/>
                </div>:
                null)}
            </Col></Row>:null)}
        </Col></Row>:null)}
    </div>
}
function useMap(map, pP){
    const [M, setM] = useState(map)
    const [vieDistance, setViewDistance] = useState(2)
    return {M, pP, vieDistance, setViewDistance}
}

function Walls({paths}: {paths: number[]}){
    return <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1}}>
        {paths[0]==1?<div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', backgroundColor: 'black', zIndex: 1}}></div>:null}
        {paths[1]==1?<div style={{position: 'absolute', top: 0, right: 0, width: '5px', height: '100%', backgroundColor: 'black', zIndex: 1}}></div>:null}
        {paths[2]==1?<div style={{position: 'absolute', bottom: 0, right: 0, width: '100%', height: '5px', backgroundColor: 'black', zIndex: 1}}></div>:null}
        {paths[3]==1?<div style={{position: 'absolute', bottom: 0, left: 0, width: '5px', height: '100%', backgroundColor: 'black', zIndex: 1}}></div>:null}
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const ip = await requestIp.getClientIp(context.req)
    const mapSmall = [
        [
            [
                {title: 'This', paths: [1,0,0,1]},
                {title: 'map', paths: [1,0,0,0]},
                {title: 'is', paths: [1,0,0,0]},
                {title: 'small', paths: [1,1,0,0]}
            ],
            ['this','building','is','4^3'],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
    ]

    const map = [
        [
            [
                {title: 'left', paths: [1,0,0,1,0,1]},
                {title: 'mid', paths: [1,0,0,1,0,1]},
                {title: 'mid', paths: [1,0,0,0,0,1]},
                {title: 'right', paths: [1,1,0,0,0,1]},
            ],
            [
                {title: 'left', paths: [1,0,0,1,0,1]},
                {title: 'mid', paths: [0,0,0,0,0,1]},
                {title: 'mid', paths: [0,0,0,0,0,1]},
                {title: 'right', paths: [0,0,0,0,0,1]},
                {title: 'faright', paths: [1,1,1,0,0,1]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,1]},
                {title: 'mid', paths: [0,0,0,0,0,1]},
                {title: 'mid', paths: [0,0,0,0,0,1]},
                {title: 'right', paths: [0,1,0,0,0,1]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,1]},
                {title: 'mid', paths: [0,0,0,0,0,1]},
                {title: 'mid', paths: [0,0,0,0,0,1]},
                {title: 'right', paths: [0,1,0,0,0,1]},
            ],
            [
                {title: 'left', paths: [0,0,1,1,0,1]},
                {title: 'mid', paths: [0,0,1,0,0,1]},
                {title: 'mid', paths: [0,0,1,0,0,1]},
                {title: 'right', paths: [0,1,1,0,0,1]},
            ],
        ],
        [
            [
                {title: 'left', paths: [1,0,0,1,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'right', paths: [1,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,0,0,0,0,0]},
                {title: 'faright', paths: [1,1,1,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,1,1,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'right', paths: [0,1,1,0,0,0]},
            ],
        ],
        [
            [
                {title: 'left', paths: [1,0,0,1,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'right', paths: [1,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,0,0,0,0,0]},
                {title: 'faright', paths: [1,1,1,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,1,1,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'right', paths: [0,1,1,0,0,0]},
            ],
        ],
        [
            [
                {title: 'left', paths: [1,0,0,1,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'right', paths: [1,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,0,0,0,0,0]},
                {title: 'faright', paths: [1,1,1,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,1,1,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'right', paths: [0,1,1,0,0,0]},
            ],
        ],
        [
            [
                {title: 'left', paths: [1,0,0,1,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'mid', paths: [1,0,0,0,0,0]},
                {title: 'right', paths: [1,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,0,0,0,0,0]},
                {title: 'faright', paths: [1,1,1,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'mid', paths: [0,0,0,0,0,0]},
                {title: 'right', paths: [0,1,0,0,0,0]},
            ],
            [
                {title: 'left', paths: [0,0,1,1,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'mid', paths: [0,0,1,0,0,0]},
                {title: 'right', paths: [0,1,1,0,0,0]},
            ],
        ],
        [
            [
                {title: 'left', paths: [1,0,0,1,1,0]},
                {title: 'mid', paths: [1,0,0,0,1,0]},
                {title: 'mid', paths: [1,0,0,0,1,0]},
                {title: 'right', paths: [1,1,0,0,1,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,1,0]},
                {title: 'mid', paths: [0,0,0,0,1,0]},
                {title: 'mid', paths: [0,0,0,0,1,0]},
                {title: 'right', paths: [0,0,0,0,1,0]},
                {title: 'faright', paths: [1,1,1,0,1,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,1,0]},
                {title: 'mid', paths: [0,0,0,0,1,0]},
                {title: 'mid', paths: [0,0,0,0,1,0]},
                {title: 'right', paths: [0,1,0,0,1,0]},
            ],
            [
                {title: 'left', paths: [0,0,0,1,1,0]},
                {title: 'mid', paths: [0,0,0,0,1,0]},
                {title: 'mid', paths: [0,0,0,0,1,0]},
                {title: 'right', paths: [0,1,0,0,1,0]},
            ],
            [
                {title: 'left', paths: [0,0,1,1,1,0]},
                {title: 'mid', paths: [0,0,1,0,1,0]},
                {title: 'mid', paths: [0,0,1,0,1,0]},
                {title: 'right', paths: [0,1,1,0,1,0]},
            ],
        ],
    ]
    return {props: {ip: ip, M: map}} 
}