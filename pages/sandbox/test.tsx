import { useEffect, useRef, useState } from "react";
import Site from "../../components/web_layout/stdindex";
import { Button, Container, Form, FormGroup } from "react-bootstrap";
import { GetServerSideProps } from "next";
import sql from "../../lib/,base/sql";
import useSWR from "swr";
import requestIp from 'request-ip'
import { Profile } from "../login/[userlogin]";
import { LoginNav } from "../login/[userlogin]";
import useLog from "../../components/conlog";

export type SiteProps = {
    title: string,
    pages: string,
    content: string,
    footer: string
}
export default function Main(props){
    const title ='Saved'
    const user = useRef(null)
    useEffect(()=>{
        console.log(JSON.stringify(props))
    }, [])
    const dev = props.dev || user.current?.username || null//i.e.:dev=John
    //const title = props.title//i.e.:dev=John
    const render = useState({})[1];
    //const renderMute = ()=>{mutate();render({})}
    const siteProps: {current: SiteProps} = useRef({
        title: props.title || title,
        pages: props.pages || 'Home: main,Content: main',
        content: props.content || 'Content: main',
        footer: props.footer || 'Footer: main'
    })

    /*const Toggle = ()=>{
        setState(current=>(current+1)%2)
        console.log(state)
    }*/
    //const ButtonToggle = ()=>{return <Button onClick={Toggle}>Toggle</Button>}
    const ButtonRender = ()=>{return <Button onClick={()=>{updateSite(user, siteProps);/*TODO: update sql with values*/render({})}}>Apply</Button>}
    //input form for site header
    const FormSiteValues = ()=>{
        return <FormGroup>
            <Form.Label>Title: </Form.Label>
            <Form.Control type={'text'} defaultValue={siteProps.current.title} onChange={(e)=>{
                siteProps.current.title = e.target.value;render({})
            }}/>
        </FormGroup>
    }
    //input form for site navbar
    const FormSiteLinks = ()=>{
        return <FormGroup>
            <Form.Label>pages</Form.Label>
            <Form.Control type={'text'} defaultValue={siteProps.current.pages} onChange={(e)=>{
                siteProps.current.pages = e.target.value
            }}/>
        </FormGroup>
    }
    //input form for site content
    const FormSiteContent = ()=>{
        return <FormGroup>
            <Form.Label>content</Form.Label>
            <Form.Control type={'text'} defaultValue={siteProps.current.content} onChange={(e)=>{
                siteProps.current.content = e.target.value
            }}/>
        </FormGroup>
    }
    function ShowSite({t}){
        useLog('title='+t)
        const { data, error } = useSWR(`/api/devpack/site?username=${dev}&title=${t}`, {refreshInterval: 200})
        useLog('data='+data)
        if (error) return <div style={{visibility: 'visible', position: 'absolute'}}>{JSON.stringify(error)}:Page not loaded.</div>
        if (!data) return <div>loading...</div>
        if (typeof data === undefined) return <div>undefined</div>
        const {pages, content, footer} = data[0]
        
        siteProps.current = {
            title: title,
            pages: pages,
            content: content,
            footer: footer
        }
        //useLog(siteProps)

        //return state==0 ? <Site {...{...props, ...siteProps.current}}/>:(state==1 ? <Site/>: null)
        return <Site {...{...props, ...siteProps.current}}/>
    }
    return <Container>
        <h4>Web Layout Test</h4>
        <Profile ip={props.ip} setUser={(u)=>{user.current=u;render({})}}/>
        <LoginNav as={'a'} user={user.current} homepage={'sandbox/test'}/>
        {dev?<>
            <h5>dev: {dev}</h5>
            <FormSiteValues/><br/>
            <FormSiteLinks/><br/>
            <FormSiteContent/><br/>
            <ButtonRender/>
        </>:null}
        <ShowSite t={siteProps.current.title}/>
    </Container>
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
            content: JSON.stringify(props.current.content),
            footer: JSON.stringify(props.current.footer)
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
        content: content || [
            <div key={0}>Content: getServerSideProps</div>,
        ],
        footer: footer || [
            <div key={0}>Footer: getServerSideProps</div>,
        ]
    }
    return {props: {...query, ...siteProps, ip} }
}