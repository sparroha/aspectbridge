import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

var activePage = "Home";
export default function Main() {
    getInitialPage();
    return <></>
}
function getInitialPage() {
    const router = useRouter();
    useEffect(() => {
        let domain = "";
        console.log('CLIENT SIDE RENDERING');
        if(window.location.href=="http://localhost:3000/"){domain="localhost"}
        else domain = /:\/\/([^\.]+)/.exec(window.location.href)[1];
        console.log(domain);
        console.log(window.location.href);
        if(domain == "aspectbridge" || domain == "www" || domain == "localhost"){router.push('/dashboard')}
        else if(domain == "logan" || domain == "localhost"){router.push('/josh/dashboard')}
    });
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
/*function Profile() {
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
}*/
