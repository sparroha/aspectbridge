'use client'

import React from "react";
import { StateContext } from "../provider";

export default function AddCaseForm(){
    const {state, dispatch} = React.useContext(StateContext)
    function addCase(name: string, value: any) {
        dispatch({type: 'ADD_CASE', payload: {name: name, value: value}})
    }
    return <form>
        <label htmlFor='name'>Name:</label>
        <input type='text' placeholder='name' id='name'/><br/>
        <label htmlFor='value'>Value:</label>
        <input type='text' placeholder='value' id='value'/><br/>
        <button onClick={(e) => {e.preventDefault(); addCase((document.getElementById('name') as HTMLInputElement).value, (document.getElementById('value') as HTMLInputElement).value)}}>Add Case</button>
    </form> 
}