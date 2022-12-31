import { sha224 } from "js-sha256"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import sql from "../../lib/,base/sql"

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
    const urlParams = router.query
    const [newemail, setNewEmail] = useState('')
    const [password, setPassword] = useState('')

    const [email, setEmail] = useState(props.email)
    const [username, setUsername] = useState(props.username)
    const [access, setAccess] = useState(props.access)
    const [message, setMessage] = useState(props.message)
    const [homepage, setHomepage] = useState(props.homepage)
    if(username && username != '') {
      useEffect(() => { router.push({pathname: '/', query: {
        username: username, email: email, access: access, message: message
      }})}, 
      [username])
    }

    return <Container>
        {access==debugAccess?JSON.stringify(urlParams):JSON.stringify(urlParams.access)}
        <h3>USERNAME: {username}</h3>
        <h3>EMAIL: {email}</h3>
        <h3>SITE_ACCESS: {access}</h3>
        <h3>Message: {message}</h3>
        <h3>Homepage: {homepage}</h3>
        <LoginForm urlParams={urlParams} access={access}/>
        <RegisterForm urlParams={urlParams} access={access}/>
        </Container>
}
function LoginForm(elements: any){
    if (elements.urlParams.submit == 'login' || elements.urlParams.userlogin == 'login')
    return <Form>
        {elements.access.toString()==debugAccess?<h3>JSON.stringify(elements)</h3>:''}
        <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" placeholder={elements.username?JSON.stringify(elements.username):"username"}/>
        </Form.Group>OR
        <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder={elements.email?JSON.stringify(elements.email):"email"}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="password"/>
        </Form.Group>
        <Form.Group controlId="formHidden">
            <Form.Control type="hidden" name="homepage" placeholder={elements.urlParams.homepage}/>
        </Form.Group>
        <Button variant="primary" type="submit" formAction={"/login/validate"}>
            Login
        </Button>
        <Button variant="primary" type="submit" formAction={"/login/registernew"} name="submit" value="registernew">
            Register New User
        </Button>
    </Form>
    else return <>{elements.urlParams.submit || elements.urlParams.userlogin}</>
}
//username, email, password = sha224(email+password)*auto generated*, access = 0
function RegisterForm(elements: any){
    if (elements.urlParams.submit === 'registernew')
    return <Form>
        <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" placeholder={elements.username?JSON.stringify(elements.username):"username"}/>
        </Form.Group>OR
        <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder={elements.email?JSON.stringify(elements.email):"email"}/>
        </Form.Group>
        {elements.access.toString()==debugAccess?JSON.stringify(elements):JSON.stringify(elements.access)}
        <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="password"/>
        </Form.Group>
        <Form.Group controlId="formHidden">
            <Form.Control type="hidden" name="homepage" placeholder={elements.urlParams.homepage}/>
        </Form.Group>
        <Button variant="primary" type="submit" formAction={"/login/register"}>
            Login
        </Button>
    </Form>
    else return <>{elements.urlParams.submit}</>
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
    let userProps: ActiveUser = {
        username: '',
        email: '',
        access: '0',
        message: 'failed to retrieve user name',
        homepage: homepage
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
    }else if(method === 'validate') {
      const [Q] = await sql`SELECT username, email, access FROM aspect_users_ WHERE hash = ${hash}`
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