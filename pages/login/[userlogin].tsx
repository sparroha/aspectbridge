import { sha224 } from "js-sha256"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { SetStateAction, useEffect, useState } from "react"
import { Button, Col, Container, Form, Nav, Row } from "react-bootstrap"
import sql from "../../lib/,base/sql"
import useSWR from 'swr'
import requestIp from 'request-ip'
import SimpleNav from "../../components/simplenav"

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
    const [hash, setHash] = useState(null)
    const [user, setUser] = useState(null)
    const [menu, setMenu] = useState('show')
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
    const menuLayout = {
      backgroundColor: '#c0c',
      padding: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderRadius: '10px'
    }
    
    useEffect(() => { 
      if(user)router.push({pathname: '/'+homepage/*+'/'+user.username*/, query: {
        username: user.username, email: user.email, access: user.access, message: user.message
      }}
    )},[user])

    return <Container>
            {/**ProfileByIp is used to login if session ip is saved */}
            {/**ProfileByIp will not work if user has logged out */}
            {/*<ProfileByIp ip={ip} setUser={setUser}/>*/}
            {/**Profile is used to login if session is not saved */}
            <Profile hash={hash} ip={ip} setUser={setUser}/>

            {/**Menu Dropdown example*/}
            <div style={menuLayout}>{
              menu === 'show'?<>
                <Button onClick={() => {setMenu('hide')}}>{'\u21E3'}</Button>
                <SimpleNav root={"./"} title={"login/login"} links={["login", "logout", "registernew"]} args={''}/>
              </>
              :<Button onClick={() => {setMenu('show')}}>{'\u2911'}</Button>
            }</div>

            <div style={loginLayout}>{
              method === 'login'?<LoginForm setHash={setHash}/>
              :<Button variant="primary" type="submit" onClick={() => {setMethod('login')}}>Back to Login</Button>
            }</div>

            <div style={registerLayout}>{
              method === 'registernew'?
              <RegisterForm homepage={homepage}/>
              :<Button variant="primary" type="submit" onClick={() => {setMethod('registernew')}}>Register New User</Button>
            }</div>

          </Container>
}

/*good example but doesnt work
export function StateToggle( {setState, state, key, name, style, children}){
  return <div style={style}>{
    state===key?
    children
    :<Button onClick={setState(key)}>{name}</Button>
  }</div>
}*/

function LoginForm({setHash}){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <Form id={'loginForm'} onSubmit={(event) => {event.preventDefault();setHash(sha224(email+''+password))}} >
      <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" name="email" placeholder={"email"} onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" name="password" placeholder={"password"} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Button type="submit" >Login</Button>
  </Form>
}

function RegisterForm({homepage}){
  return <Form id={'registerForm'}>
        <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control required type="text" name="username" placeholder={"username"}/>
        </Form.Group>
        <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required type="email" name="email" placeholder={"email"}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" name="password" placeholder="password"/>
        </Form.Group>
        <Form.Group controlId="formHidden">
            <Form.Control required type="hidden" name="homepage" value={homepage} placeholder={homepage}/>
        </Form.Group>
        <Button variant="primary" type="submit" formAction={"/login/register"}>Register</Button>
    </Form>
}
export function Profile(props) {
  const {ip, setUser, hash} = props
  const { data, error, mutate } = useSWR('../api/getuserdetails?ip='+ip+(hash && hash!= null?'&hash='+hash:''), { revalidateOnFocus: false })
  const debug = true
  useEffect(() => {
    if(hash&&error)mutate()
  },[hash])
  useEffect(() => {
    if(data)setUser(data)
    //return //alert('data: '+JSON.stringify(data)+'\nhash:'+hash+'\nip:'+ip+'\nerror:'+JSON.stringify(error))//debug
  },[data])
  if (error) {
    return <Row><Col style={{visibility: (debug?'visible':'hidden'), position: (debug?'relative':'absolute')}}>
        {JSON.stringify(error)}:No such user:{JSON.stringify(props)+'\n'+JSON.stringify(data)}
      </Col></Row>
  }
  if (!data) return <div>loading...</div>
  else {
    let {username, email, access} = data
    data.message = 'Welcome back '+data.username+'!'
    return <Row>
        <Col sm={4}></Col>
        <Col sm={4} className={'tcenter'} style={{color: 'white', background: 'gray', borderRadius: '90px'}}>
          hello {username}!{`\<${email}\>`} Your access level is {access}.
        </Col>
        <Col sm={4}></Col>
      </Row>
  }
}
/**
 * depricated
 * @param param0 
 * @returns 
 */
export function ProfileByIp({ip, setUser}) {
  const { data, error } = useSWR('/api/getuserdetails?ip='+ip, { revalidateOnFocus: false })
  const debug = true
  useEffect(() => {
    console.log('[ProfileByIp]This function is deprecated. Use Profile instead.');
    setUser(data)
  },[data])
  if (error) {
    return <Row><Col style={{visibility: (debug?'visible':'hidden'), position: (debug?'relative':'absolute')}}>
        {JSON.stringify(error)}:User not cached. Please login or register.
      </Col></Row>
  }
  if (!data) return <div>loading...</div>
  else {
    let {username, email, access} = data
    data.message = 'Welcome back '+data.username+'!'
    return <Row>
        <Col sm={4}></Col>
        <Col sm={4} className={'tcenter'} style={{color: 'white', background: 'gray', borderRadius: '90px'}}>
          hello {username}!{`\<${email}\>`} Your access level is {access}.
        </Col>
        <Col sm={4}></Col>
      </Row>
  }
}

export function LoginNav({ user, homepage }) {
  return (
    <Nav>
      <Nav.Link 
        href={
          '/login/' + (user ? 'logout' : 'login') + 
          '?homepage=' + homepage + 
          (user ? '&username=' + user.username : '')
        }>
        {user ? 'Logout ' + user.username : 'Login'}
      </Nav.Link>{' '}
    </Nav>
  );
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