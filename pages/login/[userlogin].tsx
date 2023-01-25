import { sha224 } from "js-sha256"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import sql from "../../lib/,base/sql"
import useSWR from 'swr'

export type ActiveUser = {
  username: string | string[],
  email: string | string[],
  access: string | string[],
  message: string | string[],
  homepage: string | string[]
}
const debugAccess='2'

export default function UserLogin(props: ActiveUser) {
    //TODO add cookies to carry information across pages and sessions
    const router = useRouter()
    const [homepage, setHomepage] = useState(props.homepage)
    const [hash, setHash] = useState('')
    const [user, setUser] = useState(null)
    const [method, setMethod] = useState(router.query.userlogin)
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
        username: user.username, email: user.email, access: user.access, message: 'Welcome back '+user.username
      }}
    )},[user])

    return <Container>

            <Profile hash={hash} setUser={setUser}/>

            <div style={loginLayout}>{
              method === 'login'?
              <LoginForm setHash={setHash}/>
              :<Button variant="primary" type="submit" onClick={() => {setMethod('login')}}>Back to Login</Button>
            }</div>

            <div style={registerLayout}>{
              method === 'registernew'?
              <RegisterForm homepage={homepage?homepage:'bridge'}/>
              :<Button variant="primary" type="submit" onClick={() => {setMethod('registernew')}}>Register New User</Button>
            }</div>

          </Container>
}
function LoginForm({setHash}){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <Form onSubmit={(event) => {event.preventDefault();setHash(sha224(email+''+password))}} >
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
//username, email, password = sha224(email+password)*auto generated*, access = 0
function RegisterForm({homepage}){
  return <Form>
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
            <Form.Control type="hidden" name="homepage" placeholder={homepage}/>
        </Form.Group>
        <Button variant="primary" type="submit" formAction={"/login/register"}>Register</Button>
    </Form>
}
function userOrEmail(e){
    if(e.includes('@')) return 'email'
    else return 'username'
}
export const getServerSideProps: GetServerSideProps<ActiveUser> = async (context) => {
    const method = context.query.userlogin
    const username = context.query.username
    const email = context.query.email
    const hash = sha224(context.query.email+''+context.query.password)
    const homepage = context.query.homepage
    let userProps: ActiveUser = {
        username: '',
        email: '',
        access: '0',
        message: 'failed to retrieve user name',
        homepage: homepage?homepage:'bridge'
    }

    if(method === 'register'){
      const Q1 = await sql`INSERT INTO aspect_users_ (username, email, hash, access) values (${username}, ${email}, ${hash}, 0);`
      if (Q1) {//"fieldCount":0,"affectedRows":1,"insertId":30,"info":"","serverStatus":2,"warningStatus":0}
        userProps.email = JSON.stringify(Q1)
        const [Q2] = await sql`SELECT username, email, access FROM aspect_users_ WHERE hash = ${hash}`
        if (Q2) {//{"username":"Fore Getable","email":"forgettable","access":0}
          userProps.username = JSON.stringify(Q2)
          userProps.access = '0'
          userProps.message = 'Welcome '+JSON.stringify(Q2.username)+'!'
        }
        else userProps.message = 'failed to register user'
      }
    }
    return {props: userProps}
}
function Profile(props) {
  const { data, error } = useSWR('../api/getuserdetails?hash='+props.hash, { revalidateOnFocus: false })
  //const { data, error } = useSWR('../api/getemailbyusername?username='+props.username, { revalidateOnFocus: false })
  if (error) return <div style={{visibility: 'hidden'}}>{error}:No such user</div>
  if (!data) return <div>loading...</div>
  else {
    let {username, email, access} = data
    props.setUser(data)
    return <div>hello {username}!{`\<${email}\>`} Your access level is {access}.</div>
  }
}