import { GetServerSideProps } from "next";
import { useState } from "react";
import { Button, Col, InputGroup, Nav, Row } from "react-bootstrap";
import requestIp from 'request-ip';
import useLog from "../../components/conlog";
import { ProfileByIp } from "../login/[userlogin]";

export const control = {
    fontSize: '10px',
    width: '48px',
    height: '32px',
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
export default function NetDragons({ip, M}){
    const [user, setUser] = useState(null)
    const [playerPosition, setPlayerPosition] = useState({x: 0, y: 0, z: 0})
//<ProfileByIp ip={ip} setUser={setUser}/>
    return <div className={'net-dragons'}>
        <h1>Next Dragons</h1>
        <Nav><Nav.Link href={"/login/"+(user?'logout':'login')+'?homepage='+'bridge/newdragons'+(user?'&username='+user.username:'')}>{user?('Logout '+user.username):'Login'}</Nav.Link>{' '}</Nav>
        <ProfileByIp ip={ip} setUser={setUser}/>
        <Row>
            <Col xs={12} sm={2}>
                <Controls M={M} sPP={setPlayerPosition}/>
            </Col>
            <Col xs={12} sm={8}>
                <MapFollow M={M} pP={playerPosition}/>
            </Col>
        </Row>
    </div>
}


export function Controls({M, sPP}){
    return <div className={'net-dragons-controls'}>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y, z: pP.z+((pP.z>0)?-1:0)}})}>Down</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x+((pP.x>0)?-1:0), y: pP.y, z: pP.z}})}>North</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y, z: pP.z+((pP.z<M.length-1)?1:0)}})}>Up</Button>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y+((pP.y>0)?-1:0), z: pP.z}})}>West</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Enter</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y+((pP.y<M[0][0].length-1)?1:0), z: pP.z}})}>East</Button>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Run</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control} onClick={()=>sPP((pP)=>{return {x: pP.x+((pP.x<M[0].length-1)?1:0), y: pP.y, z: pP.z}})}>South</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} style={control}>Fight</Button>
            </Col>
        </Row>
    </div>
}

export function Map({M, pP}){
    return <div className={'net-dragons-map'}>
        {M?.map((row, i) => {if(pP.z==i) {return <Row key={i}>Floor {i}<Col xs={12}>
            {row.map((col, j) => <Row key={j}><Col xs={12}>
                {col.map((cell, k) => <div key={k} style={{float: 'left'}}>
                    <Button variant={'primary'} style={square} disabled={(pP.x==j&&pP.y==k&&pP.z==i?false:true)}>room {1+k+j*col.length}:<br/>{(1+k)+'\/'+(1+j)}<br/>{pP.x==j&&pP.y==k?cell:''}</Button>
                </div>)}
            </Col></Row>)}
        </Col></Row>}})}
    </div>
}
export function MapFollow({M, pP}){
    const [vieDistance, setViewDistance] = useState(2)
    return <div className={'net-dragons-map'}>
        View Distance:
        <select value={vieDistance} onChange={e => setViewDistance(Number(e.target.value))}>
            <option key={0} value={0}>0</option>
            <option key={1} value={1}>1</option>
            <option key={2} value={2}>2</option>
        </select>
        {M?.map((row, i) => (pP.z==i)?<Row key={i}>Floor {i}<Col xs={12}>
            {row.map((col, j) => (j>=(pP.x-vieDistance))&&(j<=(pP.x+vieDistance))?<Row key={j}><Col xs={12}>
                {col.map((cell, k) => ((k>=pP.y-vieDistance)&&(k<=pP.y+vieDistance))?
                <div key={k} style={{float: 'left'}}>
                    <Button variant={'primary'} style={square} disabled={(pP.x==j&&pP.y==k&&pP.z==i?false:true)}>room {1+k+j*col.length}:<br/>{(1+k)+'\/'+(1+j)}<br/>{pP.x==j&&pP.y==k?cell:''}</Button>
                </div>:
                null)}
            </Col></Row>:null)}
        </Col></Row>:null)}
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const ip = await requestIp.getClientIp(context.req)
    const mapSmall = [
        [
            ['this','map','is','small'],
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
            ['this','map','is','medium','and tall',0,0],
            ['this','building','is','5x5x6','tall and wide',0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ],
        [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ],
        [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,'market',0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ],
        [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ],
        [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ],
        [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ]
    ]
    return {props: {ip: ip, M: map}} 
}