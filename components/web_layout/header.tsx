import Head from "next/head";
import { useContext } from "react";
import { SiteContext } from "./stdindex";

export default function Header(props){
    const {title} = useContext(SiteContext)
    return <Head>
                <title>{props.title || title || 'Page Title: default'}</title>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="keywords" content="" />
                <meta name="description" content="Building bridges of understanding" />
                <link rel="shortcut icon" href="assets/binary2.png" type="image/x-icon" />
            </Head>
}