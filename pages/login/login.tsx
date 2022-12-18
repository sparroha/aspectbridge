import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useLog from '../../components/conlog';
import { sha256, sha224 } from 'js-sha256'
import { GetServerSideProps } from 'next';
import { addAnthymn, createUsersTableOnce, getAnthymn } from '../../lib/,base/sql';

type Props = {}
export default function UserLogin(props: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
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
            <h2>{props.user}</h2>
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

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const [user] = await getAnthymn()
    //const user = addUser(username: String, email: String, hash: String, access: Number): Promise<Object>,
    //getUserName(email: String, hash: String): Promise<Object>,
    const { req, res } = context
    if (user) {
        return {
          props: {
            user: user[0].username.json(),
          },
        }
      } else return {
          props: {
            table: 'fail',
          },
        }
    /*const { req, res } = context
    const { db } = await connectToDatabase()
    const users = await db.collection('users').find({}).toArray()
    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        }
    }*/
}