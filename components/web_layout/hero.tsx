import { useContext, useRef } from "react"
import { Col, Row } from "react-bootstrap"
import { SiteContext } from "./stdindex"
export type PageNav = {name: string, Element: JSX.Element}
export default function Hero(props){
    const {title, pages} = useContext(SiteContext)
    const testpages: string = 'Home: default,Content: default'
    /*const testpages: PageNav[] = [
        {name: 'Home: default', Element: <a className={'ancor'} href={'#hero'}>Home: default</a>},
        {name: 'Content: default', Element: <a className={'ancor'} href={'#content'}>Content: default</a>},
        //{name: 'Login', Element: <LoginNav as={'a'} user={user} homepage={'/'}/>},
    ]*/
    const nav:{current: string} = useRef(props.pages || pages || testpages)
    return <Row id={'hero'}>
        <Col className={'hero'} xs={12}>
        <div className={'hero-content'}>
            {props.title || title || 'Page Title: default'}
            {//nav.current.filter((item)=>{return item.name == 'Login'})[0]?.Element
            }
            {//<Profile ip={props.ip} setUser={customSetUser} debug={false}/>
            }
        </div>
        <div className={'hero-nav'}>
            {nav.current.split(',').map((item, index)=>{return <div key={index}><a className={'ancor'} href={'#'+item}>{item}</a></div>})}
        </div>
        </Col>
    </Row>
}