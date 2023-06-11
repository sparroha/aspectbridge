import { useEffect, useReducer, useRef, useState } from "react";
import Site, { SiteProps } from "../../components/web_layout/stdindex";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { GetServerSideProps } from "next";
import sql from "../../lib/,base/sql";
import useSWR from "swr";
import requestIp from 'request-ip'
import { Profile } from "../login/[userlogin]";
import { LoginNav } from "../login/[userlogin]";
import useLog from "../../components/conlog";
import CssSlidersWrapper from "../../components/sliders";


const ACTIONS = {
    INITIALIZE: 'initialize',
    SETTITLE: 'settitle',
    SETPAGES: 'setpages',
    SETCONTENT: 'setcontent',
    SETFOOTER: 'serfooter'
}
export default function WebSiteDesign(props){
    //VARIABLES AND CONSTANTS
    const [titleState, setTitleState] = useState('Saved')
    const [user, setUser] = useState(null)
    useLog('props='+JSON.stringify(props))
    const [dev, setDev] = useState(props.dev || user?.username || null)//i.e.:dev=John

    //const render = useState({})[1];
    const siteProps: SiteProps = {
        title: props.title || titleState,
        pages: props.pages || 'Home: main,Content: main',
        content: props.content || 'Content: main',
        footer: props.footer || 'Footer: main'
    }
    //REDCER
    function reducer (state: SiteProps, action: {type: string, payload: any}){
        switch (action.type) {
            case ACTIONS.INITIALIZE:
                return {...action.payload}//{...state, toolShop: action.payload.toolShop};
            case ACTIONS.SETTITLE:
                return {...state, title: action.payload.title};
            case ACTIONS.SETPAGES:
                return {...state, pages: action.payload.pages};
            case ACTIONS.SETCONTENT:
                return {...state, content: action.payload.content};
            case ACTIONS.SETFOOTER:
                return {...state, footer: action.payload.footer};
            default:
                throw new Error()
        }
    }
    const [state, dispatch]: [SiteProps, any] = useReducer(reducer, siteProps)
    //DATA LOADING
    const {data, error, mutate} = useSWR(`/api/devpack/site?username=${dev}&title=${titleState}`, {refreshInterval: 200})
    //HOOKS
    useEffect(()=>{//update siteProps.current.title
        if(user?.username){
            setDev(user.username)
        }
    },[user])
    useEffect(()=>{
        if(data){
            const {title, pages, content, footer} = data[0] || {pages: 'No valid Pages', content: 'No valid Content', footer: 'No valid  Footer'}
            let P: SiteProps = {
                title: title || props.title || titleState,
                pages: pages || props.pages || 'Home: main,Content: main',
                content: content || props.content || 'Content: main',
                footer: footer || props.footer || 'Footer: main'
            }
            dispatch({type: ACTIONS.INITIALIZE, payload: P})
        }
    },[data])
    useLog('data='+data+'||JSONdata='+JSON.stringify(data))
    //DATA LOADING
    if (error) return <div style={{visibility: 'visible', position: 'absolute'}}>{JSON.stringify(error)}:Page not loaded.</div>
    if (!data) return <div>loading...</div>

    
    //const showSiteProps = {...props,...{}}
    return <Container>
        <h4>Web Layout Test</h4>
        <Profile ip={props.ip} setUser={setUser}/>
        <LoginNav as={'a'} user={user} homepage={'sandbox/test'}/>
        <h5>dev: {dev}</h5>
        <Form>
            <FormSiteTitle visible={dev} title={titleState} setTitle={setTitleState} mutate={mutate}/><br/>
            <FormSiteNavigation visible={dev} pages={state.pages} setPagesRef={(pages)=>{dispatch({type: ACTIONS.SETPAGES, payload: pages})}}/>
            <FormSiteContent visible={dev} content={state.content} setContentRef={(content)=>{dispatch({type: ACTIONS.SETCONTENT, payload: content})}}/>
        </Form>
        <ButtonRender onClick={()=>{updateSite(user, state)}}/>
        <Site {...siteProps}/>
    </Container>
}
//FUNCTION CONSTANTS
const ButtonRender = ({onClick})=>{return <Button onClick={onClick}>Apply</Button>}
//input form for site header
const FormSiteTitle = ({visible, title, setTitle, mutate})=>{
    if(!visible) return <></>
    return <FormGroup>
        <Form.Label>Title: </Form.Label>
        <Form.Control type={'text'} defaultValue={title} onChange={(e)=>{
            setTitle(e.target.value)
            mutate()
        }}/>
    </FormGroup>
}
const FormSiteNavigation = ({visible, pages, setPagesRef})=>{
    if(!visible) return <></>
    return <FormGroup>
        <Form.Label>pages</Form.Label>
        <Form.Control type={'text'} defaultValue={pages} onChange={(e)=>{
            setPagesRef(e.target.value)
        }}/>
    </FormGroup>
}
const FormSiteContent = ({visible, content, setContentRef})=>{
    if(!visible) return <></>
    return <FormGroup>
        <Form.Label>content</Form.Label>
        <Form.Control type={'text'} defaultValue={content} onChange={(e)=>{
            setContentRef(e.target.value)
        }}/>
    </FormGroup>
}

function updateSite(user, props, mutate?){//update database with current player_data
    if(user.current){console.log('updatePlayer')
    fetch('/api/devpack/site', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user.current.username,
            title: props.current.title,
            pages: props.current.pages,
            content: props.current.content,
            footer: props.current.footer
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
        //console.log(data)
    })
    .catch((e)=>{console.log(e)})}
    if(mutate)mutate()
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    //const value = query.param
    const ip = await requestIp.getClientIp(context.req)
    //return {props: {ip: ip}}
    if(!query.dev)return {props: {...query, ip} }
    if(!query.title)return {props: {...query, ip} }
    const [data] = await sql`SELECT * FROM aspect_sites_devpack_ WHERE username = '${query.dev}' AND title = '${query.title}'`
    if(!data)return {props: {...query, ip} }

    const {title, pages, content, footer} = data
    const siteProps: SiteProps = {
        title: title ||'Page Title: getServerSideProps',
        pages: pages ||'Home: getServerSideProps,Content: getServerSideProps',
        content: content || 'Content: getServerSideProps',
        footer: footer || 'Footer: getServerSideProps'
    }
    return {props: {...query, ...siteProps, ip: ip} }
}


