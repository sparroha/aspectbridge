import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import sql, { ActiveUser } from "../../lib/,base/sql"

export default function UserLogin(props: ActiveUser) {
    //TODO add cookies to carry information across pages and sessions

    
    const [email, setEmail] = useState(props.email)
    const [username, setUsername] = useState(props.username)
    const [access, setAccess] = useState(props.access)
    return <Container>
        <h2>USERNAME: {username}</h2>
        <h2>EMAIL: {email}</h2>
        <h2>SITE_ACCESS: {access}</h2>
        <Link href="/login/login"><a>login page</a></Link>
        </Container>
}
export const getServerSideProps: GetServerSideProps<ActiveUser> = async (context) => {
    const method = context.query.userlogin
    const username = context.query.username
    const email = context.query.email
    const newemail = context.query.newemail
    const hash = context.query.hash
    const newhash = context.query.newhash
    const access = context.query.access
    let userProps: ActiveUser = {
        username: 'failed to retrieve user name',
        email: '',
        access: '0',
    }

    if(method === 'register'){
      const Q1 = await sql`INSERT INTO aspect_users_ (username, email, hash, access) values (${username}, ${email}, ${hash}, 0);`
      if (Q1) {//"fieldCount":0,"affectedRows":1,"insertId":30,"info":"","serverStatus":2,"warningStatus":0}
        userProps.email = JSON.stringify(Q1)
        const [Q2] = await sql`SELECT username, email, access FROM aspect_users_ WHERE hash = ${hash}`
        if (Q2) {//{"username":"Fore Getable","email":"forgettable","access":0}
          userProps.username = JSON.stringify(Q2)
          userProps.access = '0'
        }
        else userProps.email = 'failed to register user'
      }
    }else if(method === 'validate') {
      const [Q] = await sql`SELECT username, email, access FROM aspect_users_ WHERE hash = ${hash}`
      if (Q) {//{"username":"Fore Getable","email":"forgettable","access":0}
        userProps.username = JSON.stringify(Q.username)
        userProps.email = JSON.stringify(Q.email)
        userProps.access = JSON.stringify(Q.access)
      }
    }else if(method === 'update') {
      const Q1 = await sql`UPDATE aspect_users_ SET username=${username}, email=${newemail}, access=${access=='1'||access=='2'?access:'0'}, hash=${newhash} WHERE hash=${hash};`
      if (Q1) {//"fieldCount":0,"affectedRows":1,"insertId":30,"info":"","serverStatus":2,"warningStatus":0}
        userProps.email = JSON.stringify(Q1)
        const [Q2] = await sql`SELECT username, email, access FROM aspect_users_ WHERE hash = ${hash}`
        if (Q2) {//{"username":"Fore Getable","email":"forgettable","access":0}
          userProps.email = JSON.stringify(Q2.email)
          userProps.username = JSON.stringify(Q2.username)
          userProps.access = JSON.stringify(Q2.access)
        }
        else userProps.email = 'failed to register user'
      }
    }
    return {props: userProps}
}