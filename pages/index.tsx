import React, { useState, useEffect } from 'react'
import $ from 'jquery';
import Link from "next/link";
import NavIndex from '../components/nav';
import Head from "next/head";
import Script from 'next/script';
import fetch from 'isomorphic-unfetch'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { useRouter } from 'next/router';
//import { getDomainLocale } from 'next/dist/shared/lib/router/router';

var activePage = "Home";
export default function Main() {
    //getInitialPage();
    //showDocs();
    //return <><Head children={<meta httpEquiv="Refresh" content="0; URL=/josh/jam.html" />}></Head>
    //<p><Link href="%PUBLIC_URL%/dashboard.html">Home</Link></p>
    return <>
        <Head>
            <title>Aspect Bridge</title>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="keywords" content="" />
            <meta name="description" content="" />
            <link rel="shortcut icon" href="assets/binary2.png" type="image/x-icon" />
            <Script src="js/script.js"></Script>
            <Script src="js/hebrew.js"></Script>
        </Head>
        <Container>
            <Row id='header' className='well-sm row p1 tcenter black-back'>
                <Col sm={12} className='tcenter navy_back title logo'>
                    <h1>Aspect {} Bridge</h1>
                    <NavIndex />
                </Col>
            </Row>
            <Row id="content" className={"h70"}>
                {pageObj.home.html}
            </Row>
            <Row id="footer" className={"h10"}>
                <Col sm={5} >
                    {pageObj.about.html}
                </Col>
                <Col sm={2} >
                    {pageObj.about.html}
                </Col>
                <Col sm={5} >
                    {pageObj.about.html}
                </Col>
            </Row>
        </Container>
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
function getInitialPage() {
    const router = useRouter();
    useEffect(() => {
        let domain = "";
        console.log('CLIENT SIDE RENDERING');
        if(window.location.href=="http://localhost:3000/"){domain="localhost"}
        else domain = /:\/\/([^\.]+)/.exec(window.location.href)[1];
        console.log(domain);
        console.log(window.location.href);
        if(domain == "aspectbridge" || domain == "www"){/*router.push('/dashboard.html')*/}
        else if(domain == "logan" || domain == "localhost"){router.push('/josh/index.html')}
    });
}/*
function showDocs(){
    useEffect(() => {
        $.get("docs.html",function(html_string){
            $('#content').html(html_string)
        },'html');
    });
}
function viewtxt(txt)
{
    useEffect(() => {
        $('#txtout').attr('src',txt);
    });
}*/
const pageObj = {
    home: {
        title: "Home",
        html: <>
            <Col md={1} id="nav1" className={"well-sm grey-back o5"}>
            </Col>
            <Col md={10} id='home' className={"well-sm white-back scroll"}>
                <Row className={""}>
                    <Col sm={12} id="content"></Col>
                </Row>
                <Row className={""}>
                    <Col md={12} className={"tcenter black-font"}>
                    14. The race of the dwarfs | in Dvalin's throng/n
Down to Lofar | the list must I tell;/n
The rocks they left, | and through wet lands/n
They sought a home | in the fields of sand./n
                        <iframe id="homeContent" className={"scroll"} height="100%" width="100%" src ="" frameBorder={"0"}></iframe>
                    </Col>
                </Row>
                <Row className={""}>
                    <Col sm={3}></Col>
                    <Col sm={6} id="content">
                        <Form id="tLit" className="vcenter tcenter">
                            <Form.Group>
                                <Form.Label>Input</Form.Label>
                                <Form.Control  type="text" id="word" name="word" placeholder="Enter word" />
                                <Form.Text className="text-muted"><h2>transliteration: </h2></Form.Text>
                                <Form.Text className="text-muted"><h1 id="hbru"></h1></Form.Text>
                                <Form.Control  type="submit" />
                            </Form.Group>
                        
                        </Form>
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            </Col>
            <Col md={1} id="nav2" className={"well-sm grey-back o5"}>
            </Col>
        </>
    },
    about: {
        title: "About",
        html: <>
            <Row id='about' className='row m5'>
                About Page
            </Row>
        </>
    },
    translit: {
        button: {
            html: {
            }
        }
    },
    nav: {
        html: {
        }
    }
}
export function TLButton(){
    return pageObj.translit.button.html;
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
/*function JavaScript(){
    return<>
        <Script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></Script>
        <Script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></Script>
        <Script src="/js/bs-dropdown-hover.js"></Script>
    </>
}*/
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
