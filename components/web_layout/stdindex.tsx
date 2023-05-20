import { Container } from "react-bootstrap";
import Header from "./header";
import Hero from "./hero";
import React, { useRef } from "react";
import Content from "./content";
import Footer from "./footer";

export const SiteContext = React.createContext(null)
export default function Site(props){
    
    const siteProps = useRef({
        title: props.title || 'Page Title: context',
        pages: props.pages || [
            {name: 'Home: context', Element: <a className={'ancor'} href={'#hero'}>Home: context</a>},
            {name: 'Content: context', Element: <a className={'ancor'} href={'#content'}>Content: context</a>},
        ],
        content: props.content || [
            <div key={0}>Content: context</div>,
            <div key={1}>Content: context</div>,
            <div key={2}>Content: context</div>,
        ],
        footer: props.footer || [
            <div key={0}>Footer: context</div>,
            <div key={1}>Footer: context</div>,
            <div key={2}>Footer: context</div>,
        ]
    })
    return <SiteContext.Provider value={siteProps.current}>
        <Container>
            <Header/>
            <Hero/>
            <Content/>
            <Footer/>
        </Container>
    </SiteContext.Provider>
}
//TODO: parseContent(content)