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
        pages: props.pages || 'Home: context,Content: context',
        content: props.content || 'Content: context',
        footer: props.footer || 'Footer: context'
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