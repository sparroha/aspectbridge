import { sha224 } from "js-sha256"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { SetStateAction, useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import sql from "../../lib/,base/sql"
import useSWR from 'swr'
import requestIp from 'request-ip'

export type ActiveUser = {
  username: string | string[],
  email: string | string[],
  access: string | string[],
  message: string | string[],
  homepage: string | string[],
  ip: string | string[]
}
const debugAccess='2'

export default function UserLogin({ip, homepage}) {
    const router = useRouter()
    const [method, setMethod] = useState(router.query.userlogin)
    const [hash, setHash] = useState('')
    const [user, setUser] = useState(null)
    const loginLayout = {
      backgroundColor: '#0c0',
      padding: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderRadius: '10px'
    }
    const registerLayout = {
      backgroundColor: '#cc0',
      padding: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderRadius: '10px'
    }
    
    useEffect(() => { 
      if(user)router.push({pathname: '/'+homepage+'/'+user.username, query: {
        username: user.username, email: user.email, access: user.access, message: user.message
      }}
    )},[user])

    return <Container>
            {/**ProfileByIp is used to login if session ip is saved */}
            {/**ProfileByIp will not work if user has logged out */}
            {ip}<ProfileByIp ip={ip} setUser={setUser}/>
            {/**Profile is used to login if session is not saved */}
            {ip}<Profile hash={hash} ip={ip} setUser={setUser}/>

            <div style={loginLayout}>{
              method === 'login'?
              <LoginForm setHash={setHash}/>
              :<Button variant="primary" type="submit" onClick={() => {setMethod('login')}}>Back to Login</Button>
            }</div>
            {/*<Method method={'registernew'} name={'Register New User'} setMethod={setMethod}>
              <RegisterForm homepage={homepage}/>
          </Method>*/}
            <div style={registerLayout}>{
              method === 'registernew'?
              <RegisterForm homepage={homepage}/>
              :<Button variant="primary" type="submit" onClick={() => {setMethod('registernew')}}>Register New User</Button>
            }</div>
          </Container>
}

export function Method( {method, name, setMethod, children}){
  return <div>{
    method === method?
    {children}
    :<Button onClick={() => {setMethod(method)}}>{name}</Button>
  }</div>
}

function LoginForm({setHash}){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <Form id={'loginForm'} onSubmit={(event) => {event.preventDefault();setHash(sha224(email+''+password))}} >
      <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder={"email"} onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder={"password"} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Button type="submit" >Login</Button>
  </Form>
}

function RegisterForm({homepage}){
  return <Form id={'registerForm'}>
        <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" placeholder={"username"}/>
        </Form.Group>
        <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder={"email"}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="password"/>
        </Form.Group>
        <Form.Group controlId="formHidden">
            <Form.Control type="hidden" name="homepage" value={homepage} placeholder={homepage}/>
        </Form.Group>
        <Button variant="primary" type="submit" formAction={"/login/register"}>Register</Button>
    </Form>
}
export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const method = query.userlogin
    const username = query.username
    const email = query.email
    const hash = sha224(query.email+''+query.password)
    const homepage = query.homepage!=undefined?query.homepage:'bridge'
    const ip = await requestIp.getClientIp(req)
    if(method === 'logout'){
      await sql`Update aspect_users_ SET ip = null WHERE username = ${username}`
    }
    if(method === 'register'){
      const [user] = await sql`SELECT * FROM aspect_users_ WHERE hash = ${hash}`
      if (!user) await sql`INSERT INTO aspect_users_ (username, email, hash, access, ip) values (${username}, ${email}, ${hash}, 0, ${ip});`
    }
    return {props: {ip: ip, homepage: homepage}}
}

export function Profile({hash, ip, setUser}) {
  const { data, error } = useSWR('../api/getuserdetails?hash='+hash+'&ip='+ip, { revalidateOnFocus: false })
  if (error) return <div style={{visibility: 'visible'}}>{JSON.stringify(error)}:No such user</div>
  if (!data) return <div>loading...</div>
  else {
    let {username, email, access} = data
    data.message = 'Welcome back '+data.username+'!'
    setUser(data)
    return <div>hello {username}!{`\<${email}\>`} Your access level is {access}. IP: {ip}</div>
  }
}
export function ProfileByIp({ip, setUser}) {
  const { data, error } = useSWR('../api/getuserdetails?ip='+ip, { revalidateOnFocus: false })
  if (error) return <div style={{visibility: 'visible'}}>{JSON.stringify(error)}:User not cached. Please login or register.</div>
  if (!data) return <div>loading...</div>
  else {
    let {username, email, access} = data
    data.message = 'Welcome back '+data.username+'!'
    setUser(data)
    return <Row><Col sm={12} className={'tcenter'} style={{color: 'white'}}>hello {username}!{`\<${email}\>`} Your access level is {access}.</Col></Row>
  }
}
