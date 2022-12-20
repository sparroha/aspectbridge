import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useLog from '../../components/conlog';
import { sha256, sha224 } from 'js-sha256'
import { GetServerSideProps } from 'next';
import { addAnthymn, addUser, createUsersTableOnce, getAnthymn, updateUser } from '../../lib/,base/sql';
import { getUser } from './[userlogin]';

//STEP 1: Create a new user
//STEP 2: Login with the new user
//STEP 3: Update existing user

type Props = {username: String}
export default function UserLogin(props: Props) {
    const [email, setEmail] = useState('')
    const [newemail, setNewemail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [access, setAccess] = useState(0)

    // props.expectdWhatever
    // always data just show data

    //OR
    // const {data, error} = useSWR('/api/whatever') // dependency swr
    // if error then show error, if data then show data, else show Loading... text

    // OR
    // const [data, setData] = useState()
    // useEffect(() => { fetch(...).then(data => setData(data))})
    
    return(<Container>
            <h2>{props.username}</h2>
            <div className="add_book">
                <label>email: </label>
                <input onChange={(e)=>{setEmail(e.target.value)}} name="email" value={email}/>
            </div>
            <div>
                <label >password: </label>
                <input onChange={(e)=>{setPassword(e.target.value)}} name="password" value={password}/>
            </div>
            <div>
                <button onClick={()=>{validate(sha224(email+password))}}>Login</button>    
            </div>
            <hr></hr>
            <div>
                <label >username: </label>
                <input onChange={(e)=>{setUsername(e.target.value)}} name="username" value={username}/>
            </div>
            <div>
                <button onClick={()=>{register(username, email, sha224(email+password), 0)}}>Register</button>
            </div>
            <hr></hr>
            <div>
                <label >newemail: </label>
                <input onChange={(e)=>{setNewemail(e.target.value)}} name="username" value={newemail}/>
            </div>
            <div>
                <button onClick={()=>{editSettings(username, newemail, sha224(newemail+password), sha224(email+password))}}>Register</button>
            </div>
            <div>
                <label >username: {username}</label>
            </div>
        </Container>
    )
}
async function register(usern: String, email: String, hash: String, access: Number){
    //const [username, setUsername] = useState('')
    const userprops = await addUser(usern, email, hash, access)
    if (userprops) {
        return usern.toString()//? why .toString()
    } else return 'failed to register user'
}
async function validate(hash: String){
    const [username, setUsername] = useState('')
    const [access, setAccess] = useState(0)
    const userprops = await getUser(hash)//fetch('/api/login/login')
    if (userprops) {
        setUsername(userprops.username)
        setAccess(userprops.access)
    } else setUsername('failed to validate user')
}
async function editSettings(usern: String, newemail: String, newhash: String,hash: String){
    const [username, setUsername] = useState('')
    const userprops = await updateUser(usern, newemail, 0, newhash, hash)
    if (userprops) {
        setUsername(userprops.username)
    } else setUsername('failed to update user info')
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const [user] = await getAnthymn()
    //const user = addUser(username: String, email: String, hash: String, access: Number): Promise<Object>,
    //getUserName(email: String, hash: String): Promise<Object>,
    const { req, res } = context
    if (user) {
        return {
          props: {
            username: JSON.stringify(user),
          },
        }
      } else return {
          props: {
            username: 'failed to retrieve user name',
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