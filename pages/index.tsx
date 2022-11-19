import React, { useState, useEffect } from 'react'
//import ReactDOM from 'react-dom'
//import $ from 'jquery';
import Link from "next/link";
import Nav from '../components/nav';
import Head from "next/head";
import {querySelectorAll} from "dom-helpers";
import fetch from 'isomorphic-unfetch'
import Document, {Html} from "next/document";
import {Row} from "react-bootstrap";

const html = Html;
var domain = "";
//const root = ReactDOM.createRoot(<Nav />,Document.getElementById('nav'));
//root.render(<Nav />);

var activePage = "Home";
export default function Main() {
    useEffect(() => {
        console.log('CLIENT SIDE RENDERING');
        domain = /:\/\/([^\.]+)/.exec(window.location.href)[1];
        console.log(domain);
    });
    while(domain == ""){}
    if(domain =="aspectbridge" || domain=="www"){
        return <><Head children={<meta httpEquiv="Refresh" content="0; URL=/dashboard.html" />}></Head></>
    }
    if(domain =="logan"){
        return <><Head children={<meta httpEquiv="Refresh" content="0; URL=/josh/jam.html" />}></Head></>
    }
    //return <><Head children={<meta httpEquiv="Refresh" content="0; URL=/josh/jam.html" />}></Head>
    return <>
        <div>
            <h1>H1</h1>
            <p>This is a simple home page</p>
        </div>
        <div>
            {pageObj.home.html}
            {pageObj.about.html}
        </div>
    </>
}
/*async function getData() {
    const res = await fetch('https://api.example.com/...');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
}*/
const pageObj = {
    home: {
        title: "Home",
        html: <>
            <Row id='home' className='row m5'>
                Home Page
            </Row>
        </>
    },
    about: {
        title: "About",
        html: <>
            <Row id='about' className='row m5'>
                About Page
            </Row>
        </>
    }
}
function ActivePage(ap){
    switch (ap){
        case 'home': return pageObj.home.html
            break;
        default: return pageObj.home.html;
    }
}
export async function getStaticProps() {
    const res = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
    );
    const data = await res.json();

    return {
        props: {
            title: data.title,
            imageUrl: data.url,
        },
    };
}
//<Head children={<meta httpEquiv="Refresh" content="0; URL=/dashboard.html" />}></Head>
function Init(url){
    return <meta httpEquiv="Refresh" content="0; URL={url}" />
}
//<p><Link href="%PUBLIC_URL%/dashboard.html">Home</Link></p>
function Imports(){
    return<>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="/js/bs-dropdown-hover.js"></script>
    </>
}
export function DocumentBlock(){
    return <>
    <div id={'root'}></div>
    </>
};
function QS(){
    //return querySelectorAll(,'#root');
}
function Profile() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/profile-data')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.bio}</p>
        </div>
    )
}
