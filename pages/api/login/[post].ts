import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import sql, { ActiveUser } from "../../../lib/,base/sql"

type Props = {}
export default function handler({user}) {
    return user?user:false
}

export const getServerSideProps: GetServerSideProps<Props> = async function ({ req, res, query, params, resolvedUrl }) {
    const {Q} = query
    if(Q == 'login') {
        const [R] = await sql`SELECT (username, email, access) FROM aspect_users_ WHERE hash = ${params.hash}`
        if(R) {
            const user: ActiveUser = {
                username: R.username,
                email: R.email,
                access: R.access
            }
            return {props: {user}}
        }
    }
    else if(Q == 'register') {
        const [R] = await sql`INSERT INTO aspect_users_ (username, email, hash, access) values (${params.username}, ${params.email}, ${params.hash}, ${params.access});`
        if(R) {
            const [R2] = await sql`SELECT (username, email, access) FROM aspect_users_ WHERE hash = ${params.hash}`
            if(R2) {
                const user: ActiveUser = {
                    username: R2.username,
                    email: R2.email,
                    access: R2.access
                }
                return {props: {user}}
            }
        }
    }
    else if(Q == 'update') {
        const [R] = await sql`UPDATE aspect_users_ SET username=${params.username}, email=${params.newemail}, access=${params.access} hash=${params.newhash} WHERE hash=${params.hash};`
        if(R) {
            const [R2] = await sql`SELECT (username, email, access) FROM aspect_users_ WHERE hash = ${params.newhash}`
            if(R2) {
                const user: ActiveUser = {
                    username: R.username,
                    email: R.email,
                    access: R.access
                }
                return {props: {user}}
            }
        }
    }
    return {props: false}
  }