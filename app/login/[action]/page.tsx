'use client'
import { sha224 } from "js-sha256"
import { useRouter } from "next/navigation"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import UserProfile from "../../../lib/util/-userprofile-"
import { useHashCookie } from "../../../lib/util/^hashcookie"
import { useEffect, useState, FC } from "react"
import useUser from "../../../lib/util/^user"
import { useUserSave } from "../../../lib/util/^userSave"

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
    const {root, userLogin} = params
    const router = useRouter()
    const user = useUser()
    const [hash, setHash] = useHashCookie()
    const [action, setAction] = useState(userLogin || searchParams.userLogin || 'login')
    
    const [loading, setLoading] = useState(true)
    const [color1a, setColor1a] = useState('44bb44')
    const [color1b, setColor1b] = useState('77cc77')
    const [color1c, setColor1c] = useState('aaddaa')
    const [color2a, setColor2a] = useState('4444bb')
    const [color2b, setColor2b] = useState('7777cc')
    const [color2c, setColor2c] = useState('aaaadd')
    const [save, useLoad] = useUserSave(
      'colorPicker', 
      user?.username || 'login:admin', 
      [color1a, color1b, color1c, color2a, color2b, color2c], 
      (colors)=>{
        console.log('colors','set')
        setColor1a(colors[0])
        setColor1b(colors[1])
        setColor1c(colors[2])
        setColor2a(colors[3])
        setColor2b(colors[4])
        setColor2c(colors[5])
        setLoading(false)
      }
    )
    useEffect(()=>{
      if(loading) return
      const i = setInterval(()=>{
        console.log('useEffect','save',user?.username || 'login:admin',[color1a, color1b, color1c, color2a, color2b, color2c])
        save()
      }
      , 1000)
      return ()=>clearInterval(i)
    },[loading, color1a, color1b, color1c, color2a, color2b, color2c, user?.username])
    useLoad()

    const username = searchParams.username?.toString().toLocaleLowerCase() || ''
    const email = searchParams.email?.toString().toLocaleLowerCase() || ''
    const nemail = searchParams.nemail?.toString().toLocaleLowerCase() || ''
    const cemail = searchParams.cemail?.toString().toLocaleLowerCase() || ''
    const password = searchParams.password?.toString().toLocaleLowerCase() || ''
    const homepage = searchParams.homepage && searchParams.homepage!='undefined' ? searchParams.homepage : (root || 'bridge')

    const picker = {width: '15px', height: '15px', border: '1px solid grey', margin: 0, padding: 0}
    const loginLayout = {
      backgroundImage: `linear-gradient(to bottom right, #${color1a}, #${color1b}, #${color1c})`,
      padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '5px'
    }
    const registerLayout = {
      backgroundImage: `linear-gradient(to bottom right, #${color2a}, #${color2b}, #${color2c})`,
      padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '5px'
    }

    function ColorPicker({id, color1a, color1b, color1c, color2a, color2b, color2c, save}){
      const stl = {
        top: '0%', left: '90%', lineHeight: '1em'
      }
      switch(id){
        case 'login': return <div style={{position: 'absolute', ...stl}}>
          <input type="color" style={picker} value={'#'+color1a} onChange={(e)=>{setColor1a(e.target.value.slice(1));save()}}/><br/>
          <input type="color" style={picker} value={'#'+color1b} onChange={(e)=>{setColor1b(e.target.value.slice(1));save()}}/><br/>
          <input type="color" style={picker} value={'#'+color1c} onChange={(e)=>{setColor1c(e.target.value.slice(1));save()}}/>
        </div>
        case 'register': return <div style={{position: 'absolute', ...stl}}>
          <input type="color" style={picker} value={'#'+color2a} onChange={(e)=>{setColor2a(e.target.value.slice(1));save()}}/><br/>
          <input type="color" style={picker} value={'#'+color2b} onChange={(e)=>{setColor2b(e.target.value.slice(1));save()}}/><br/>
          <input type="color" style={picker} value={'#'+color2c} onChange={(e)=>{setColor2c(e.target.value.slice(1));save()}}/>
        </div>
      }
    }

    useEffect(()=>{
        if(!action) return
        fetch('/api/login/'+action, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, nemail, cemail, password, homepage})
          })
    }
    , [action, username, email, nemail, cemail, password, homepage])
    
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
              <Col xs={12} sm={4} lg={2} style={{...loginLayout, position: 'relative'}}>{
                action === 'login'?<LoginForm setHash={setHash}/>
                :<Button variant="primary" type="submit" onClick={() => {setAction('login')}}>Back to Login</Button>
              }<ColorPicker id={'login'}
                color1a={color1a} color1b={color1b} color1c={color1c}
                color2a={color2a} color2b={color2b} color2c={color2c}
                save={save}
              /></Col>
              <Col sm={4} lg={5}></Col>
            </Row>
            <Row>
              <Col sm={4} lg={5}></Col>
              <Col xs={12} sm={4} lg={2} style={{...loginLayout, position: 'relative'}}>{
                action === 'registernew'?
                <RegisterForm homepage={homepage}/>
                :<Button variant="primary" type="submit" onClick={() => {setAction('registernew')}}>Register New User</Button>
              }</Col>
              <Col sm={4} lg={5}></Col>
            </Row>
            <Row>
              <Col sm={4} lg={5}></Col>
              <Col xs={12} sm={4} lg={2} style={{...registerLayout, position: 'relative'}}>{
                action === 'email'?
                <UpdateEmailForm homepage={homepage}/>
                :<Button variant="primary" type="submit" onClick={() => {setAction('email')}}>Update User Email</Button>
              }<ColorPicker id={'register'}
                color1a={color1a} color1b={color1b} color1c={color1c}
                color2a={color2a} color2b={color2b} color2c={color2c}
                save={save}
              /></Col>
              <Col sm={4} lg={5}></Col>
            </Row>
            <Row>
              <Col sm={4} lg={5}></Col>
              <Col xs={12} sm={4} lg={2} style={registerLayout}>{
                action === 'forgot'?
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
        <Form.Group controlId="formEmailNew">
            <Form.Label>New Email address</Form.Label>
            <Form.Control required type="email" name="nemail" placeholder={"email"}/>
        </Form.Group>
        <Form.Group controlId="formEmailCurrent">
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