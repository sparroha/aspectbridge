import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import useLog from "../components/conlog";
import useSave from "../lib/util/savedata";

export default function ExampleMain(){

    const initialState = {}
    /**
     * Initialize user specific and data
     */
    const [init, setInit] = useState(false)
    const [user, setUser] = useState(null)
    const {data, error, save} = useSave('ExampleApp_uuid:'+user?.username)
    const safeToInit: boolean = useMemo(()=> data && user && !init,[data, user, init])
    /**
     * Local State
     */
    const [localState, setLocalState] = useState(initialState)
    const safeToSave: boolean = useMemo(()=> data && localState && init && user,[data, localState, init, user])

    /**
     * Load initial data to local state
     */
    useEffect(()=>{
        if(!safeToInit) return
        setLocalState((state)=> data || state)
    },[safeToInit])
    /**
     * Save local state to data
     */
    useEffect(()=>{
        if(!safeToSave) return
        //console.log('Saveing grid to data')
        save(localState)
    },[localState])








    //useReducer => dynamic state
    const add = 'increment'
    const sub = 'decrement'
    function reducer (state, action) {
        switch (action.type) {
            case 'increment':
                return {count: state.count + 1};
            case 'decrement':
                return {count: state.count - 1};
            default:
                throw new Error();
        }
    }
    const [state, dispatch] = useReducer(reducer, {count: 0});
    function Dispatch(){
        return <Row>
            <Col>
                <Button onClick={()=>{dispatch({type: sub})}}>-</Button>
            </Col>
            <Col>{state.count}</Col>
            <Col>
                <Button onClick={()=>{dispatch({type: add})}}>+</Button>
            </Col>
        </Row>
        
    }
    useLog('PARAM: useReducer = '+state.count)
    //useRef => dynamic value
    const ref = useRef('param')
    useLog('PARAM: useRef = '+ref.current)
    //useMemo => dynamic object value :: remembers the output of a function so that the function doesnt have to run if the input params haven't changed
    const memo = useMemo(()=>{//memoize player data
        return {param: ref.current}
    },[ref.current])
    useLog('PARAM: memo = '+memo.param)
    //useCallback => dynamic callable function
    const callb = useCallback(()=>{//memoize player data
        return {param: ref.current}
    },[ref.current])
    useLog('PARAM: callBack = '+callb().param)
    return <>
        <Dispatch/>
    </>
}