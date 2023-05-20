import { useEffect, useRef, useState } from "react";
import Site from "../../components/web_layout/stdindex";
import { Button } from "react-bootstrap";
import { GetServerSideProps } from "next";

export default function Main(props){
    useEffect(()=>{
        console.log(JSON.stringify(props))
    }, [])
    const {dev} = props//i.e.:dev=John
    //const [state, setState] = useState(0);
    const render = useState({})[1];
    const siteProps = useRef({
        title: 'Page Title: main',
        pages: [
            {name: 'Home: main', Element: <a className={'ancor'} href={'#hero'}>Home: main</a>},
            {name: 'Content: main', Element: <a className={'ancor'} href={'#content'}>Content: main</a>},
        ],
        content: [
            <div key={0}>Content: main</div>,
            <div key={1}>Content: main</div>,
            <div key={2}>Content: main</div>,
        ],
        footer: [
            <div key={0}>Footer: main</div>,
            <div key={1}>Footer: main</div>,
            <div key={2}>Footer: main</div>,
        ]
    })
    /*const Toggle = ()=>{
        setState(current=>(current+1)%2)
        console.log(state)
    }*/
    //const ButtonToggle = ()=>{return <Button onClick={Toggle}>Toggle</Button>}
    const ButtonRender = ()=>{return <Button onClick={()=>render({})}>Apply</Button>}
    const FormSiteValues = ()=>{
        return <>
            <label>title</label>
            <input type={'text'} defaultValue={siteProps.current.title} onChange={(e)=>{siteProps.current.title = e.target.value}}/>
        </>
    }
    const FormSiteLinks = ()=>{
        return <>
            <label>pages</label>
            <input type={'text'} defaultValue={siteProps.current.pages.map((item)=>{return item.name}).join(',')} onChange={(e)=>{
                siteProps.current.pages = e.target.value.split(',').map((item, index)=>{
                    return {name: item, Element: <a className={'ancor'} href={'#'+item}>{item}</a>}
                })
            }}/>
        </>
    }
    const FormSiteContent = ()=>{
        return <>
            <label>content</label>
            <input type={'text'} defaultValue={siteProps.current.content.map((item)=>{return item}).join(',')} onChange={(e)=>{
                siteProps.current.content = e.target.value.split(',').map((item, index)=>{
                    return <div key={index}>{item}</div>
                })
            }}/>
        </>
    }
    function ShowSite(){
        //return state==0 ? <Site {...{...props, ...siteProps.current}}/>:(state==1 ? <Site/>: null)
        return <Site {...{...props, ...siteProps.current}}/>
    }
    return <>Web Layout Test
        {dev?<>
            <div>dev: {dev}</div>
            <FormSiteValues/><br/>
            <FormSiteLinks/><br/>
            <FormSiteContent/><br/>
            <ButtonRender/>
        </>:null}
        <ShowSite/>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    //const value = query.param
    //const ip = await requestIp.getClientIp(context.req)
    //return {props: {ip: ip}} 
    return {props: {...query} }
}