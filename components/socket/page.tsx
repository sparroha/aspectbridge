'use client'
/**
 * 
 * Standalone example with thrown errot 'cannot fine net'
 * 
 */
import React, { useEffect, useState } from "react";
import useUser from "../../lib/util/^user";
const io = require('socket.io')();

let socket;
export default function Socket(props) {
    const user = useUser()
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    useEffect(()=>{
        socketInitializer()
    },[])
    async function socketInitializer(){
        await fetch('/api/socket')
        socket = io()
        socket.on('receive-message',(data)=>{
            console.log(data)
            setAllMessages((pre)=>[...pre,data])
        })
    }
    function handelSubmit(e){
        e.preventDefault()
        let name = user.username
        socket.emit('send-message',{
            name,
            message
        })
    }
    if(!user.username) return <div>require login...</div>
    return <div>
        <h1>Chat App</h1>
        {allMessages.map((message,index)=>{
            return <div key={index}>
                <h3>{message.name}</h3>
                <p>{message.message}</p>
            </div>
        })}

        <form onSubmit={handelSubmit}>
            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
            <button>Send</button>
        </form>
        
    </div>
}