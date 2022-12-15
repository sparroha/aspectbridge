import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { createTableOnce, getUsers } from '../lib/sql';
export default function UserLogin(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    useEffect(()=>{
        let t = createTableOnce()
        let usersQ = getUsers()
    },[])
    
    return(<Container>
            <div className="add_book">
                <label>email: </label>
                <input onChange={()=>{setEmail(this.value)}} name="email" value={email}/>
            </div>
            <div>
                <label >password: </label>
                <input onChange={()=>{setUsername(this.value)}} name="password" value={password}/>
            </div>
            <div>
                <button onClick={()=>{}}>Login</button>    
            </div>
            <div>
                <button onClick={()=>{}}>createTableOnce</button>    
            </div>
        </Container>
    )
}