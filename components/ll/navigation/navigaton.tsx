import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"

/*const navIndex = {
    navcards: {
        aspects: <Row className={'side-nav grey-back'}>
                <Col>
                    <Row>
                        <Col ><Link href='/ashmore'>Ashmore</Link><hr /></Col>
                    </Row>
                    <Row>
                        <Col><Link href='/air'>Air</Link></Col>
                        <Col><Link href='/fire'>Fire</Link></Col>
                        <Col><Link href='/water'>Water</Link></Col>
                        <Col><Link href='/earth'>Earth</Link></Col>
                    </Row>
                </Col>
            </Row>,
        air: <Row className={'side-nav grey-back'}>
                <Col><Link href='/air'>Air</Link><hr /></Col>
                
                <Col><Link href='/light'>Aspect of Spirit</Link></Col>
                <Col><Link href='/spirit'>Aspect of breath</Link></Col>
                <Col><Link href='/water'>Aspect of wind</Link></Col>
                <Col><Link href='/earth'>Aspect of wand</Link></Col>
            </Row>
    }
}*/
function Dir(dir){
    if(!dir) return
    //let title = dir.substring(0)//dir.replace(0, dir.charAt(0).toUpperCase())
    const dur = (dir) => {
        return <Col><Link href={'/'+dir}>{dir}</Link></Col>} 
        return dur(dir)}
function Subs(dir){
    const subs = (dir) => {
        return dir.map(sub => <Col><Link href={'/'+sub}>{
            sub.replace(0, sub.charAt(0).toUpperCase())
        }</Link></Col>)} 
        return subs(dir)}

//const [path, setPath] = useState({dir: ' ', sub: ' ', nest: ' '});
export function NavBarSelect(path){
    return <Row className={'side-nav grey-back'}>
                <Col>
                    <Row>
                        <Dir dir={path.dir} />
                    </Row>
                    <Row>
                        <Subs dir={path.dir} />
                    </Row>
                </Col>
            </Row>
}