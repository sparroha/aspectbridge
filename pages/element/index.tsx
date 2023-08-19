import { observer, useObservable } from "@legendapp/state/react";
import ElementContext, { ElContextprovider, ElDisplayContext, ElSetContext } from "./element_context_provider";
import ObserverContextProvider, {ObservableContextUser, useObservableContext} from "./observer_context";
import { useMemo, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Index(props){
    function f(z: number, i:number ,c: {x:number, y:number}, iterations: number[], size: number){
        let test = (((z*z+c.x)+(Math.sqrt(-i)*Math.sqrt(-i)+Math.sqrt(-c.y))))
        let newz = z*z+c.x
        let newi = 0//(i*i+c.y)%size
        let nextIteration = Math.sqrt(test*test)
        let itrs = iterations
        let count = itrs.push(test)
        if(nextIteration>100)return {inSet: false, color: 'black', count: count, list: itrs}
        if(count<100){
            if(nextIteration>90 && nextIteration<=100)return {inSet: false, color: 'blue', count: count, list: itrs}
            if(nextIteration>80 && nextIteration<=90)return {inSet: false, color: 'purple', count: count, list: itrs}
            if(nextIteration>70 && nextIteration<=80)return {inSet: false, color: 'red', count: count, list: itrs}
            if(nextIteration>60 && nextIteration<=70)return {inSet: false, color: 'orange', count: count, list: itrs}
            if(nextIteration>60 && nextIteration<=70)return {inSet: false, color: 'yellow', count: count, list: itrs}
        }
        if(count>=100)return {inSet: true, count: count, color: 'white', list: itrs}
        return f(newz,newi,c,itrs,size)
    }
    function mBrot(){
        
    }
    const size = 100
    const halfsize = size/2
    const magnitude = 10
    const width = 5
    const height = 5
    function CNMB(props){
        const {pos, len} = props
        let s = f(0,0,pos,[],size)
        return <div style={{
            position: 'absolute',
            backgroundColor: s.color,
            color: s.color!='white'?'white':'inherit',
            fontSize: '8px',
            textAlign: 'center',
            width: width, height: height,
            left: (pos.x*magnitude*width)+((Math.sqrt(len)/2*width)),
            top: (pos.y*magnitude*height)+((Math.sqrt(len)/2*height)),
        }}>
            .
        </div>
    }
    function MapMuch(){
        let arr: {x:number, y:number}[] = []
        let len = useRef(0)
        for(let x=-halfsize;x<halfsize;x++){
            for(let y=-halfsize;y<halfsize;y++){
                len.current = arr.push({x: x/magnitude, y: y/magnitude})
            }
        }
        return <>
        length: {len.current}<br/>
        {arr.map(({x,y},i)=>{return <div key={i} style={{position: 'relative'}}>
            <CNMB pos={{x,y}} len={len.current} index={i}/>
        </div>})}</>
    }
    return  <Container>
        <CCP/>
        {//<CCP/>
        }
        <br/>
        <br/>
        <MapMuch/>
    </Container>
}
function CCP(props){
    const ObservableContextUserC = observer(()=>{
        const p = props
        const {value} = useObservable({value: true})
        const valueAsString = useMemo(()=>{return value.get()?'true':'false'},[value.get()])
        function boolOf(v){return v=='true'?true:false}
        return <>
            <input type={'checkbox'}
                value={valueAsString}
                onChange={(e)=>{value.set(!boolOf(e.target.value))}}
            />
            <br/>
            {value.get()?<Examples/>:null}
        </>
    })
    return <ObservableContextUserC/>
}

function Examples(){
    return  <>
    <Row sm={3}>
        <Col style={{backgroundColor: 'lightblue'}}>
        <ElContextprovider>
            children: <ElDisplayContext/><br/>
            children: <ElSetContext/><br/>
        </ElContextprovider>
        </Col>
        <Col></Col>
        <Col></Col>
    </Row>
    <hr/>
    <Row sm={6}>
        <Col style={{backgroundColor: 'lightblue'}}><ElementContext title={'HP'}/></Col><Col></Col>
        <Col style={{backgroundColor: 'lightblue'}}><ElementContext title={'MANA'}/></Col><Col></Col>
        <Col style={{backgroundColor: 'lightblue'}}><ElementContext title={'QQSTAT'}/></Col><Col></Col>
    </Row>
    <hr/>
    <Row sm={3}>
        <Col style={{backgroundColor: 'lightblue'}}>
        <ObserverContextProvider>
            children: NOISE
        </ObserverContextProvider>
        </Col>
        <Col></Col>
        <Col></Col>
    </Row>
    <hr/>
    <Row sm={3}>
        <Col>
        {'This is an ObserverContextProvider. The implementation is as follows:'}<br/><br/>
        {'<ObserverContextProvider>'}<br/>
        {'   children: <button onClick={()=>{}}>Click me</button>'}<br/>
        {'</ObserverContextProvider><br/>'}<br/><br/>
        </Col>
        <Col style={{backgroundColor: 'lightblue'}}>
        {'this is the result'}<br/><br/>
        <ObserverContextProvider>
            children: <button onClick={()=>{}}>Click me</button>
        </ObserverContextProvider></Col>
        <Col></Col>
    </Row>
    <hr/>
    </>
}