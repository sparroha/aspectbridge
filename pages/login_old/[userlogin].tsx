
import { sha224 } from "js-sha256"
import { GetServerSideProps } from "next"
import { useRouter } from "next/navigation"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import sql from "../../lib/,base/sql"
import useSWR from 'swr'
import requestIp from 'request-ip'
import UserProfile from "../../lib/util/-userprofile-"
import { useHashCookie } from "../../lib/util/^hashcookie"
import { useEffect, useState } from "react"

export type StoredUser = {
  id: number,
  username: string,
  email: string,
  hash: string,
  access: number,
  ip: string
}
export type User = StoredUser & {
  message: string,
  homepage: string,
}
export default function LoginApp(props) {
    const {root, logmethod} = props
    const homepage = root || 'bridge'
    const router = useRouter()
    const [method, setMethod] = useState(logmethod || 'login')
    const [hash, setHash] = useHashCookie()
    const { data, error} = useSWR('../api/getuser?hash='+hash, {refreshInterval: 2200})

    /*useEffect(()=>{
      console.log('LoginApp props', props)
      console.log('LoginApp', method, data, error, homepage)
      if(method == 'logout') document.cookie = `secret=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    },[])*/
    const loginLayout = {
      backgroundImage: 'linear-gradient(to bottom right, #4b4, #7c7, #ada)',
      //backgroundColor: '#0c0',
      padding: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderRadius: '5px'
    }
    const registerLayout = {
      backgroundImage: 'linear-gradient(to bottom right, #44b, #77c, #aad)',
      //backgroundColor: '#cc0',
      padding: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderRadius: '5px'
    }
    
    useEffect(() => { 
      if(!data) return
      router.push(`/${homepage?homepage:'bridge'}/${data?.username}`)
    },[data])


    return <Container style={{textAlign: 'center', maxWidth: '100vw'}}>
            <Row>
              <Col xs={12}>
                <UserProfile/>
              </Col>
            </Row>
            <Row>
              <Col sm={4} lg={5}></Col>
              <Col xs={12} sm={4} lg={2} style={loginLayout}>{
                method === 'login'?<LoginForm setHash={setHash}/>
                :<Button variant="primary" type="submit" onClick={() => {setMethod('login')}}>Back to Login</Button>
              }</Col>
              <Col sm={4} lg={5}></Col>
            </Row>
            <Row>
              <Col sm={4} lg={5}></Col>
              <Col xs={12} sm={4} lg={2} style={registerLayout}>{
                method === 'registernew'?
                <RegisterForm homepage={homepage}/>
                :<Button variant="primary" type="submit" onClick={() => {setMethod('registernew')}}>Register New User</Button>
              }</Col>
              <Col sm={4} lg={5}></Col>
            </Row>
            <Row>
              <Col sm={4} lg={5}></Col>
              <Col xs={12} sm={4} lg={2} style={registerLayout}>{
                method === 'email'?
                <UpdateEmailForm homepage={homepage}/>
                :<Button variant="primary" type="submit" onClick={() => {setMethod('email')}}>Update User Email</Button>
              }</Col>
              <Col sm={4} lg={5}></Col>
            </Row>
            <Row>
              <Col sm={4} lg={5}></Col>
              <Col xs={12} sm={4} lg={2} style={registerLayout}>{
                method === 'forgot'?
                <ForgotForm homepage={homepage}/>
                :<Button variant="primary" type="submit" onClick={() => {/*setMethod('forgot')*/}}>{/*'Forgot User Email'*/}</Button>
              }</Col>
              <Col sm={4} lg={5}></Col>
            </Row>
          </Container>
}

/**
 * The Head section contains all the complicated important stuff.
 * The brains if you will.
 * 
 * @returns <Head>{els}</Head>
 *
function Headers(){
  return <Head>
              <title>Bridge Login</title>
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="keywords" content="" />
              <meta name="description" content="" />
              <link rel="shortcut icon" href="/assets/binary2.png" type="image/x-icon" />
          </Head>
}*/
function LoginForm({setHash}){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <Form id={'loginForm'} onSubmit={(event) => {event.preventDefault();setHash((h)=>{
      console.log('Hash Old', h);
      let newHash = sha224(email+''+password)
      console.log('Hash New', newHash);
      return newHash
    });}}>
    <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="email" name="email" placeholder={"email"} onChange={(e)=>setEmail(e.target.value.toLowerCase())}/>
    </Form.Group>
    <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" name="password" placeholder={"password"} autoComplete={"on"} onChange={(e)=>setPassword(e.target.value)}/>
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
            <Form.Control required type="password" name="password" placeholder="password" autoComplete={"on"}/>
        </Form.Group>
        <Form.Group controlId="formHidden">
            <Form.Control required type="hidden" name="homepage" value={homepage} placeholder={homepage}/>
        </Form.Group>
        <Button variant="primary" type="submit" formAction={"/login/register"}>Register</Button>
    </Form>
}
function UpdateEmailForm({homepage}){
  return <Form id={'updateForm'}>
        <Form.Group controlId="formEmail">
            <Form.Label>New Email address</Form.Label>
            <Form.Control required type="email" name="nemail" placeholder={"email"}/>
        </Form.Group>
        <Form.Group controlId="formEmail">
            <Form.Label>Current Email address</Form.Label>
            <Form.Control required type="email" name="cemail" placeholder={"email"}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control required type="password" name="password" autoComplete={"on"} placeholder="password"/>
        </Form.Group>
        <Form.Group controlId="formHidden">
            <Form.Control required type="hidden" name="homepage" value={homepage} placeholder={homepage}/>
        </Form.Group>
        <Button variant="primary" type="submit" formAction={"/login/update"}>Update</Button>
    </Form>
}
/**
 * TODO
 * @param param0 
 * @returns 
 */
function ForgotForm({homepage}){
  return <Form id={'forgotForm'}>
        <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required type="email" name="email" placeholder={"email"}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" name="password" autoComplete={"on"} placeholder="password"/>
        </Form.Group>
        <Form.Group controlId="formHidden">
            <Form.Control required type="hidden" name="homepage" value={homepage} placeholder={homepage}/>
        </Form.Group>
        <Button variant="primary" type="submit" formAction={"/login/forgot"}>Forgot</Button>
    </Form>
}
export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const method = query.userlogin?.toString().toLocaleLowerCase()
  const username = query.username?.toString().toLocaleLowerCase() || ''
  const email = query.email?.toString().toLocaleLowerCase() || ''
  const nemail = query.nemail?.toString().toLocaleLowerCase() || ''
  const hash = sha224(query.email?.toString().toLocaleLowerCase()+''+query.password)
  const homepage = query.homepage && query.homepage!='undefined' ? query.homepage : 'bridge'
  const ip = await requestIp.getClientIp(req)
  //console.log('ip: '+ip+' method: '+method+' username: '+username+' email: '+email+' nemail: '+nemail+' hash: '+hash)
  switch(method){
    case  'logout':
      await sql`Update aspect_users_ SET ip = null WHERE username = ${username}`
      break
    case 'register':
      const [user] = await sql`SELECT * FROM aspect_users_ WHERE hash = ${hash}`
      if (!user) await sql`INSERT INTO aspect_users_ (username, email, hash, access, ip) values (${username}, ${email}, ${hash}, 0, ${ip});`
      break
    case 'update':
      await sql`UPDATE aspect_users_ SET email = ${nemail}, hash=${sha224(nemail+''+query.password)} WHERE hash = ${sha224(query.cemail+''+query.password)}`
      break
    case 'login':
      break
    default:
      break
  } 
  return {props: {logmethod: method, root: homepage}}
}
