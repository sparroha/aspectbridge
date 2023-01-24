import { sha224 } from "js-sha256"
import { GetServerSideProps } from "next"
import Link from "next/link"
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
    const styleLogin = {
      backgroundColor: '#0c0',
      padding: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderRadius: '10px'
    }
    const styleRegister = {
      backgroundColor: '#cc0',
      padding: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderRadius: '10px'
    }
    
    useEffect(() => { 
      if(user)router.push({pathname: '/'+homepage+'/'+user.username, query: {
        username: user.username, email: user.email, access: user.access, message: 'Welcome back '
      }}
    )},[user])

    return <Container>
            <Profile hash={hash} setUser={setUser}/>
            <div style={styleLogin}>
            {router.query.userlogin === 'login'?
            <LoginForm props={props} setHash={setHash}/>
            :<Form><Button variant="primary" type="submit" formAction={"/login/login"}>Back to Login</Button></Form>}
            </div>
            <div style={styleRegister}>
            {router.query.userlogin === 'registernew'?
            <RegisterForm homepage={homepage?homepage:'bridge'}/>
            :<Form><Button variant="primary" type="submit" formAction={"/login/registernew"}>Register New User</Button></Form>}
            </div>
          </Container>
}
function LoginForm(props: any){
  const router = useRouter()
  const urlParams = router.query
  const [email, setEmail] = useState(props.props.email)
  const [username, setUsername] = useState(props.props.username)
  const [access, setAccess] = useState(props.props.access)
  const [message, setMessage] = useState(props.props.message)
  const [homepage, setHomepage] = useState(props.props.homepage)
  const [password, setPassword] = useState(props.props.password)

  return <Form onSubmit={(event) => {event.preventDefault();props.setHash(sha224(email+''+password))}} >
      {/*<Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" disabled placeholder={"username"} onChange={(e)=>setUsername(e.target.value)}/>
      </Form.Group>OR*/}
      <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder={"email"} autoComplete={email} onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formHidden">
          <Form.Control type="hidden" name="homepage" value={urlParams.homepage}/>
      </Form.Group>
      {//<Button variant="primary" type="submit" formAction={"/login/validate"}>
      }<Button variant="primary" type="submit" >Login</Button>
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
    const newemail = context.query.newemail
    const hash = sha224(context.query.email+''+context.query.password)
    const newhash = sha224(context.query.newemail+''+context.query.password)
    const access = context.query.access
    const homepage = context.query.homepage
    const password = context.query.password
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
    }else if(method === 'validate') {//secondary
      if(hash){
        const [Q2] = await sql`SELECT username, email, access FROM aspect_users_ WHERE hash = ${hash}`
        if (Q2) {//{"username":"Fore Getable","email":"forgettable","access":0}
          userProps.email = Q2.email
          userProps.username = Q2.username
          userProps.access = Q2.access
        }return {props: userProps}
      }
      let Q
      if(email ?? email != '') Q = await getUserbyEmail(email, password)
      else Q = await getUserbyUsername(username, password)
      if (Q) {//{"username":"Fore Getable","email":"forgettable","access":0}
        userProps.username = Q.username
        userProps.email = Q.email
        userProps.access = Q.access
        userProps.message = 'Welcome Back '+Q.username+'!'
      }
    }else if(method === 'update') {
      const Q1 = await sql`UPDATE aspect_users_ SET username=${username}, email=${newemail}, access=${access=='1'||access=='2'?access:'0'}, hash=${newhash} WHERE hash=${hash};`
      if (Q1) {//"fieldCount":0,"affectedRows":1,"insertId":30,"info":"","serverStatus":2,"warningStatus":0}
        userProps.email = JSON.stringify(Q1)
        const [Q2] = await sql`SELECT username, email, access FROM aspect_users_ WHERE hash = ${hash}`
        if (Q2) {//{"username":"Fore Getable","email":"forgettable","access":0}
          userProps.email = Q2.email
          userProps.username = Q2.username
          userProps.access = Q2.access
        }
        else userProps.message = 'failed to update user'
      }
    }
    return {props: userProps}
}
async function getUserbyEmail(email, password){
  let hash = sha224(email+''+password)
  const [Q] = await sql`SELECT username, email, access FROM aspect_users_ WHERE hash = ${hash}`
  return Q

}
async function getUserbyUsername(username, password){
  const E = await getEmailbyUsername(username)
  const Q = await getUserbyEmail(E.email, password)
  return Q
}
async function getEmailbyUsername(username){
  const [Q] = await sql`SELECT email FROM aspect_users_ WHERE username = ${username}`
  return Q
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
function PullEmail(props) {
  const { data, error } = useSWR('../api/database/getemailbyusername?username='+props.username, { revalidateOnFocus: false })
  if (error) return <div>{error}:No such user</div>
  if (!data) return <div>loading...</div>
  else {
    let {email} = data
    props.setEmail(email)
    return <></>
  }
}
//not sure when a good alternate use case would come in.
/*function profile(props) {
  const { data, error } = useSWR('../api/getuserdetails?hash='+props.hash, { revalidateOnFocus: false })
  
  if (error) return <div>{error}:No such user</div>
  if (!data) return <div>loading...</div>
  else {
    let {username, email, access} = data
    props.setUser(data)
    return <div>hello {username}!{`\<${email}\>`} Your access level is {access}.</div>
  }
}*/