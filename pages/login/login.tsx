import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useLog from '../../components/conlog';
import { createTableOnce, getUsers } from '../lib/sql';

type Props = {
    createTableOnce(),
}
export default function UserLogin(props: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    useLog(props)
    // props.expectdWhatever

    // always data just show data

    //OR
    // const {data, error} = useSWR('/api/whatever') // dependency swr

    // if error then show error, if data then show data, else show Loading... text

    // OR
    // const [data, setData] = useState()
    // useEffect(() => { fetch(...).then(data => setData(data))})

        //let t = createTableOnce()
        //let usersQ = getUsers()
    
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

