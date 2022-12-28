import { sha224 } from "js-sha256"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import sql from "../../lib/,base/sql"

export type ActiveUser = {
  username: string,
  email: string,
  access: string,
  message: string
}
const debugAccess='2'

export default function UserLogin(props: ActiveUser) {
    //TODO add cookies to carry information across pages and sessions
    const router = useRouter()
    const rQ = router.query
    const [newemail, setNewEmail] = useState('')
    const [password, setPassword] = useState('')

    const [email, setEmail] = useState(props.email)
    const [username, setUsername] = useState(props.username)
    const [access, setAccess] = useState(props.access)
    const [message, setMessage] = useState(props.message)
    if(username && username != '') {
      useEffect(() => { router.push({pathname: '/', query: {
        username: username, email: email, access: access, message: message
      }})}, 
      [username])
    }

    return <Container>
        {access==debugAccess?JSON.stringify(rQ):JSON.stringify(rQ.access)}
        <h2>USERNAME: {username}</h2>
        <h2>EMAIL: {email}</h2>
        <h2>SITE_ACCESS: {access}</h2>
        <h2>Message: {message}</h2>
        <LoginForm rq={rQ} access={access}/>
        <RegisterForm rq={rQ} access={access}/>
        </Container>
}
function LoginForm(args: any){
    if (args.rq.submit == 'login' || args.rq.userlogin == 'login')
    return <Form>
        <h2>
          Form Data:
        </h2>
        <h3>
          {args.access.toString()==debugAccess?JSON.stringify(args):args.access.toString()}
        </h3>
        Form Under Construction
        <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" placeholder={args.username?JSON.stringify(args.username):"username"}/>
        </Form.Group>OR
        <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder={args.email?JSON.stringify(args.email):"email"}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="password"/>
        </Form.Group>
        <Button variant="primary" type="submit" formAction={"/login/validate"}>
            Login
        </Button>
        <Button variant="primary" type="submit" formAction={"/login/registernew"} name="submit" value="registernew">
            Register New User
        </Button>
    </Form>
    else return <>{args.rq.submit}</>
}
//username, email, password = sha224(email+password)*auto generated*, access = 0
function RegisterForm(args: any){
    if (args.rq.submit === 'registernew')
    return <Form>
        Form Under Construction
        <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" placeholder={args.username?JSON.stringify(args.username):"username"}/>
        </Form.Group>OR
        <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder={args.email?JSON.stringify(args.email):"email"}/>
        </Form.Group>
        {args.access.toString()==debugAccess?JSON.stringify(args):JSON.stringify(args.access)}
        <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="password"/>
        </Form.Group>
        <Button variant="primary" type="submit" formAction={"/login/register"}>
            Login
        </Button>
    </Form>
    else return <>{args.rq.submit}</>
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
    const password = context.query.password
    let userProps: ActiveUser = {
        username: '',
        email: '',
        access: '0',
        message: 'failed to retrieve user name'
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