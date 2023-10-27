'use client'
import { sha224 } from "js-sha256"
import { useRouter } from "next/navigation"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import UserProfile from "../../../lib/util/-userprofile-"
import { useHashCookie } from "../../../lib/util/^hashcookie"
import { useEffect, useState, FC } from "react"
import useUser from "../../../lib/util/^user"

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

export default function LoginApp({params, searchParams}) {
    const {root, userlogin} = params
    const router = useRouter()
    const user = useUser()
    const [hash, setHash] = useHashCookie()
    const [method, setMethod] = useState(userlogin[0] || 'login')


    const username = searchParams.username?.toString().toLocaleLowerCase() || ''
    const email = searchParams.email?.toString().toLocaleLowerCase() || ''
    const nemail = searchParams.nemail?.toString().toLocaleLowerCase() || ''
    const cemail = searchParams.cemail?.toString().toLocaleLowerCase() || ''
    const password = searchParams.password?.toString().toLocaleLowerCase() || ''
    const homepage = searchParams.homepage && searchParams.homepage!='undefined' ? searchParams.homepage : (root || 'bridge')


    useEffect(()=>{
        if(!method) return
        fetch('/api/login/'+method, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, nemail, cemail, password, homepage})
          })
    }
    , [method, username, email, nemail, cemail, password, homepage])
    
  
    const loginLayout = {
      backgroundImage: 'linear-gradient(to bottom right, #4b4, #7c7, #ada)',
      padding: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderRadius: '5px'
    }
    const registerLayout = {
      backgroundImage: 'linear-gradient(to bottom right, #44b, #77c, #aad)',
      padding: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderRadius: '5px'
    }
    
    useEffect(() => { 
      if(!user) return
      router.push(`/${homepage?homepage:'bridge'}/${user?.username}`)
    },[user?.username, hash])


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


function LoginForm({setHash}){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <Form id={'loginForm'} onSubmit={(event) => {setHash((h)=>{
      console.log('Hash Old', h)
      let newHash = sha224(email+''+password)
      console.log('Hash New', newHash)
      return newHash
    })}}>
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