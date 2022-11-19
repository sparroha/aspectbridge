import React, { useState, useEffect } from 'react'
//import ReactDOM from 'react-dom'
import $ from 'jquery';
import Link from "next/link";
import Nav from '../components/nav';
import Head from "next/head";
import {querySelectorAll} from "dom-helpers";
import fetch from 'isomorphic-unfetch'
import Document, {Html} from "next/document";
import {Row} from "react-bootstrap";
import { getDomainLocale } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/router';

const html = Html;
//const root = ReactDOM.createRoot(<Nav />,Document.getElementById('nav'));
//root.render(<Nav />);

var activePage = "Home";
export default function Main() {
    getPage();
    /*while(domain == "" && timeout < 2000){timeout++}
    if(domain =="aspectbridge" || domain=="www"){
        return <><Head children={<meta httpEquiv="Refresh" content="0; URL=/dashboard.html" />}></Head></>
    }
    else if(domain =="logan" || domain == "localhost"){
        return <><Head children={<meta httpEquiv="Refresh" content="0; URL=/josh/jam.html" />}></Head></>
    }
    else{*/
    //return <><Head children={<meta httpEquiv="Refresh" content="0; URL=/josh/jam.html" />}></Head>
    //<p><Link href="%PUBLIC_URL%/dashboard.html">Home</Link></p>
    return <>
        <div>
            <h1>HOME</h1>
            <p>This is a simple home page</p>
        </div>
        <div>
            {pageObj.home.html}
            {pageObj.about.html}
        </div>
    </>
    //}
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
function getPage() {
    const router = useRouter();
    useEffect(() => {
        let domain = "";
        console.log('CLIENT SIDE RENDERING');
        if(window.location.href=="http://localhost:3000/"){domain="localhost"}
        else domain = /:\/\/([^\.]+)/.exec(window.location.href)[1];
        console.log(domain);
        console.log(window.location.href);
        if(domain =="aspectbridge" || domain=="www"){router.push('/dashboard.html')}
        else if(domain =="logan" || domain == "localhost"){router.push('/josh/index.html')}
    });
}
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
export async function getNasaImgProps() {
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
function Imports(){
    return<>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="/js/bs-dropdown-hover.js"></script>
    </>
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
