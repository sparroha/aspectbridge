import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useLog from '../../components/conlog';
import { sha256, sha224 } from 'js-sha256'
import { GetServerSideProps } from 'next';
import sql, { addAnthymn, addUser, createUsersTableOnce, getAnthymn, setAccess, updAnthymn, updateUser } from '../../lib/,base/sql';
import { NextRouter, useRouter } from 'next/router';

//STEP 1: Create a new user
//STEP 2: Login with the new user
//STEP 3: Update existing user

type Props = {result: string}
export default function UserLogin(props: Props) {
    const router = useRouter()
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
            <h2>{username}</h2>
            <div className="add_book">
                <label>email: </label>
                <input onChange={(e)=>{setEmail(e.target.value)}} name="email" value={email}/>
            </div>
            <div>
                <label >password: </label>
                <input onChange={(e)=>{setPassword(e.target.value)}} name="password" value={password}/>
            </div>
            <div>
                <button onClick={()=>{validate(sha224(email+password), router)}}>Login</button>    
            </div>
            <hr></hr>
            <div>
                <label >username: </label>
                <input onChange={(e)=>{setUsername(e.target.value)}} name="username" value={username}/>
            </div>
            <div>
                <button onClick={()=>{register(username, email, sha224(email+password), router)}}>Register</button>
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
async function register(usernane: string, email: string, hash: string, router: NextRouter){
    router.push('/login/register?username='+usernane+'&email='+email+'&hash='+hash)
}
async function validate(hash: string, router: NextRouter){
    router.push('/login/validate?hash='+hash)
}
async function editSettings(usern: string, newemail: string, newhash: string, hash: string){
    const [username, setUsername] = useState('')
    const userprops = await updateUser(usern, newemail, 0, newhash, hash)
    if (userprops) {
        setUsername(userprops.username)
    } else setUsername('failed to update user info')
}

//TEMPLATE
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const Q = await setAccess('Anthymn', 2)
    if (Q) {
        return {
          props: {
            result: JSON.stringify(Q),
          },
        }
      } else return {
          props: {
            result: 'failed to retrieve user name',
          },
        }
}