'use client'
import { Elements, RecurlyProvider, useRecurly } from "@recurly/react-recurly";
import React, { useRef } from "react";

export default function Page({params, searchParams}){
    //SEARCH
    const queryArray: [string, string][] = Object.entries(searchParams)
    const urlsearch: string = queryArray.map(([key, value])=>`${key}=${value}`).join('&')
    //return <>{JSON.stringify(urlsearch)}</>

    return <div style={{color: 'white'}}>
        RECURLY
        <RecurlyProvider publicKey="ewr1-AxqCz2aZ9UMj5oOBsENPG2">
            <Elements>
                <RForm/>
            </Elements>
        </RecurlyProvider>
    </div>
}
function RForm(){
    const recurly = useRecurly();
    let form = useRef();
    const handleSubmit = (event) => {
        event.preventDefault();
        recurly.token(form.current, (err, token) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(token)
        });
    }

    return <form onSubmit={handleSubmit} ref={form}>
        <label>Account ID</label>
        <input type="text" name="actid" />
        <button type="submit">Submit</button>
    </form>
}