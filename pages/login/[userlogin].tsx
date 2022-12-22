import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import sql, { ActiveUser } from "../../lib/,base/sql"

type Props={
    username: string,
    email: string,
    access: string,
}
export default function UserLogin(props: Props) {

    return <Container>
        <h2>USERNAME: {props.username}</h2>
        <h2>EMAIL: {props.email}</h2>
        <h2>SITE_ACCESS: {props.access}</h2>
        </Container>
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const method = context.query.userlogin
    const username = context.query.username
    const email = context.query.email
    const hash = context.query.hash
    const access = context.query.access

    if(method === 'register'){
      const Q = await sql`INSERT INTO aspect_users_ (username, email, hash, access) values (${username}, ${email}, ${hash}, 0);`
      if (Q) {
        return {
          props: {
            username: JSON.stringify(Q),
            email: '',
            access: '0',
          },
        }
      } else return {
        props: {
          username: 'failed to retrieve user name',
          email: '',
          access: '0',
        },
      }
    }else if(method === 'validate') {
      const [Q] = await sql`SELECT username, email, access FROM aspect_users_ WHERE hash = ${hash}`
      if (Q) {
        return {
          props: {
            username: JSON.stringify(Q.username),
            email: JSON.stringify(Q.email),
            access: JSON.stringify(Q.access),
          },
        }
      } else return {
        props: {
          username: 'failed to retrieve user name',
          email: '',
          access: '0',
        },
      }
    }
    else return {
      props: {
        username: 'failed to retrieve query from server',
        email: '',
        access: '0',
      },
    }
}