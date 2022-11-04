import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
//import $ from 'jquery';
import Link from "next/link";
import Nav from '../components/nav';
import Head from "next/head";

//const root = ReactDOM.createRoot(<Nav />,document.getElementById('nav'));
export default function Main() {

    return (
        <>
        <Head children={<Imports />}></Head>
        <div>
            <Nav />
            <h1>www.donalds.party.dance</h1>
            <p>This is a simple home page</p>
            <p><Link href="/index.html">Home</Link></p>
        </div></>
    );
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