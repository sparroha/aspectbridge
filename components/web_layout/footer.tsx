import { useContext } from "react";
import Content from "./content";
import { SiteContext } from "./stdindex";

export default function Footer(props){
    const {footer} = useContext(SiteContext)
    return <Content content={props.footer || footer}/>

}