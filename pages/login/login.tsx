import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useLog from '../../components/conlog';
import sql, { createTableOnce, getUserName, addUser, alterTable } from '../lib/sql';
import { sha256, sha224 } from 'js-sha256'

type Props = {
    createTableOnce(): Promise<any>,
    alterTable(): Promise<any>,
    addUser(username: String, email: String, hash: String, access: Number): Promise<Object>,
    getUserName(email: String, hash: String): Promise<Object>,
}
export default function UserLogin(props: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    useLog(props.createTableOnce)
    useLog(props.alterTable)
    //useLog(JSON.stringify(props.addUser('Anthymn', 'AnthymnGalaris@gmail.com', sha224('AnthymnGalaris@gmail.compassword'), 2)))
    //useLog(JSON.stringify(props.getUserName('AnthymnGalaris@gmail.com', sha224("AnthymnGalaris@gmail.compassword"))))
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

