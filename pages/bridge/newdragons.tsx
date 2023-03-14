import { GetServerSideProps } from "next";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import requestIp from 'request-ip';
import useLog from "../../components/conlog";
import { ProfileByIp } from "../login/[userlogin]";

export default function NetDragons({ip, M}){
    const [user, setUser] = useState(null)
    const [playerPosition, setPlayerPosition] = useState({x: 0, y: 0, z: 0})
//<ProfileByIp ip={ip} setUser={setUser}/>
    return <div className={'net-dragons'}>
        <h1>Net Dragons</h1>
        <ProfileByIp ip={ip} setUser={setUser}/>
        <Row>
            <Col xs={12} sm={3}>
                <Controls sPP={setPlayerPosition}/>
            </Col>
            <Col xs={12} sm={6}>
                <Map M={M} pP={playerPosition}/>
            </Col>
        </Row>
    </div>
}


export function Controls({sPP}){
    return <div className={'net-dragons-controls'}>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y, z: pP.z+((pP.z<4)?1:0)}})}>Up</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} onClick={()=>sPP((pP)=>{return {x: pP.x+((pP.x>0)?-1:0), y: pP.y, z: pP.z}})}>North</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y, z: pP.z+((pP.z>0)?-1:0)}})}>Down</Button>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y+((pP.y>0)?-1:0), z: pP.z}})}>West</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'}>Enter</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} onClick={()=>sPP((pP)=>{return {x: pP.x, y: pP.y+((pP.y<4)?1:0), z: pP.z}})}>East</Button>
            </Col>
        </Row>
        <Row>
            <Col xs={4}>
                <Button variant={'primary'}>Fight</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'} onClick={()=>sPP((pP)=>{return {x: pP.x+((pP.x<4)?1:0), y: pP.y, z: pP.z}})}>South</Button>
            </Col>
            <Col xs={4}>
                <Button variant={'primary'}>Run</Button>
            </Col>
        </Row>
    </div>
}

export function Map({M, pP}){
    return <div className={'net-dragons-map'}>
        {M?.map((row, i) => {if(pP.z==i) {return <Row key={i}>Floor {i}<Col xs={12}>
            {row.map((col, j) => <Row key={j}>
                {col.map((cell, k) => <Col key={k} xs={2}>
                    <Button variant={'primary'} disabled={(pP.x==j&&pP.y==k&&pP.z==i?false:true)}>room {k}:{j}<br/>{cell}</Button>
                </Col>)}
            </Row>)}
        </Col></Row>}})}
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const ip = await requestIp.getClientIp(context.req)
    const map = [
        [
            [0,0,0,0,0],
            [0,'shop',0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ],
        [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ],
        [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,'market',0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ],
        [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ],
        [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ]
    ]
    return {props: {ip: ip, M: map}} 
}