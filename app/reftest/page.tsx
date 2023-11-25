'use client'
import { useEffect, useRef, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"

export default function Page({params, searchParams}){
    const state: {current: any} = useRef({
        structure: {
            mine: {iron: {count: 0}, copper: {count: 0}, coal: {count: 0}, stone: {count: 0}},
            pump: {water: {count: 0}, oil: {count: 0}},
        }
    })
    const addResource = (resource, amount)=>{
        if(!state.current.resource) state.current = {...state.current, resource: {}}
        if(!state.current.resource[resource]) state.current.resource[resource] = {count: 0}
        state.current.resource = {
            ...state.current.resource,
            [resource]: {
                ...state.current.resource[resource],
                count: state.current.resource[resource].count + amount
            }}}
    const addStructure = (structure, resource)=>{
        if(!state.current.structure) state.current = {...state.current, structure: {}}
        if(!state.current.structure[structure]) state.current.structure = {...state.current.structure, [structure]: {}}
        if(!state.current.structure[structure][resource]) state.current.structure[structure] = {...state.current.structure[structure], [resource]: {count: 0}}
        state.current.structure = {
            ...state.current.structure,
            [structure]: {
                ...state.current.structure[structure],
                [resource]: {
                    ...state.current.structure[structure][resource],
                    count: state.current.structure[structure][resource].count + 1
                }}}}
    const countStructure = (structure, resource)=>{
        return state.current.structure?.[structure]?.[resource]?.count || 0
    }
    const [,render] = useState({})
    useEffect(()=>{
        const i = setInterval(()=>{
            addResource('iron', countStructure('mine', 'iron'))
            addResource('copper', countStructure('mine', 'copper'))
            addResource('coal', countStructure('mine', 'coal'))
            addResource('stone', countStructure('mine', 'stone'))
            addResource('water', countStructure('pump', 'water'))

            render({})
        }
        ,1000)
        return ()=>{
            clearInterval(i)
        }
    },[])
    return <Container style={{color: 'white'}}>
        <ResourceMonitor resources={state.current.resource} addResource={addResource}/>
        <Row><Col xs={6}><StructureBuilder structures={state.current.structure} addStructure={addStructure} countStructure={countStructure}/></Col></Row>
        
    </Container>
}

const ResourceMonitor = ({ resources, addResource }) => 
    <Row>
        <Col>Resources</Col>
        {resources && Object.entries(resources).map(([resource, val]) => 
            <Col key={resource}>
                {resource}: {Object.entries(val).map(([key, val]) =>
                    <span key={key}>
                        {key === 'count' ?
                        <button onClick={() => addResource(resource, 1)}>+</button>
                        : key
                        }: {val || 0}
                    </span>)}
            </Col>
        )}
    </Row>
const StructureBuilder = ({ structures, addStructure, countStructure }) =>
    <Row><Col>
        <Row><Col>Structures</Col></Row>
        {structures && Object.entries(structures).map(([structure, sval]) =>
            <Row key={structure}><Col xs={1}></Col><Col>
                {structure}: {Object.entries(sval).map(([resource, rval]) =>
                    <Row key={resource}><Col xs={1}></Col><Col>
                        {resource}: {Object.entries(rval).map(([key, val]) =>
                        <span key={key}>
                        {key === 'count' ?
                        <button onClick={() => addStructure(structure, resource)}>+</button>
                        : key
                        }: {val?String(val):0}
                        &nbsp;</span>)}

                    </Col></Row>)}
            </Col></Row>
        )}
    </Col></Row>

    /*
<Row>
            <Col>Resources</Col>
            {state.current.resource && Object.entries(state.current.resource).map(([resource, val])=><Col key={resource}>{resource}: {
                Object.entries(val).map(([key, val])=><span key={key}>{key=='count'?
                <button onClick={()=>addResource(key, 1)}>+</button>
                :key}: {val}</span>)
            }</Col>)}
        </Row>
    */