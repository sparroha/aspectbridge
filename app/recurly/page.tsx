'use client'
import { Elements, RecurlyProvider } from "@recurly/react-recurly";
import { useEffect, useState } from "react";
import recurly from 'recurly';

export default function Page({params, searchParams}){
    //SEARCH
    const queryArray: [string, string][] = Object.entries(searchParams)
    const urlsearch: string = queryArray.map(([key, value])=>`${key}=${value}`).join('&')
    //return <>{JSON.stringify(urlsearch)}</>


    return <div style={{color: 'white'}}>
        RECURLY
        <link href="https://js.recurly.com/v4/recurly.css" rel="stylesheet" type="text/css"></link>
        <RecurlyProvider publicKey="ewr1-AxqCz2aZ9UMj5oOBsENPG2">
            <Elements>
                <form action={'/api/recurly'} method="POST">
                    <label>Account ID</label>
                    <input type="text" name="actid" />
                    <button type="submit">Submit</button>
                </form>
            </Elements>
        </RecurlyProvider>
    </div>
}
