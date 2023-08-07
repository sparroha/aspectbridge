import { useRouter } from "next/router"
import { User } from "../../login/[userlogin]"
import sql from "../../../lib/,base/sql"
import { sha224 } from "js-sha256"
type ProfileProps = Partial<User> & {
    password: string
    collumn: string
    command: string
}
//this page is only accessable when a user is logged in and a hash is provided
//this will ensure the user detailes are matched with the provided login data to ensure no desync occurs when updating user data
//and other reasons
export default async function userProfileApi(req, res){
    const router = useRouter()
    const { hash } = router.query
    const { username, email, access, message, homepage, ip, password, collumn, command }: ProfileProps = req.body

    let user = null
    switch(user.collumn){
        case 'email':
            if(!username) return res.status(400).json({message: 'No username provided.'})
            if(!email) return res.status(400).json({message: 'No email provided.'})
            user = await sql`UPDATE aspect_users_ SET email = ${email} WHERE username = ${username}`
            res.status(200).json(user);
            break;
        case 'username':
            if(!username) return res.status(400).json({message: 'No username provided.'})
            if(!email) return res.status(400).json({message: 'No email provided.'})
            user = await sql`UPDATE aspect_users_ SET username = ${username} WHERE email = ${email}`
            res.status(200).json(user);
            break;
        case 'password':
            if(!username) return res.status(400).json({message: 'No username provided.'})
            if(!email) return res.status(400).json({message: 'No email provided.'})
            user = await sql`UPDATE aspect_users_ SET password = ${password} WHERE email = ${email}`
            res.status(200).json(user);
            break;
        case 'access':
            if(!username) return res.status(400).json({message: 'No username provided.'})
            if(!email) return res.status(400).json({message: 'No email provided.'})
            user = await sql`UPDATE aspect_users_ SET access = ${access} WHERE email = ${email}`
            res.status(200).json(user);
            break;
        default:
            break;
    }
}
/**
 * api async functions
 * @param req 
 * @param res 
 */
async function getUser() {
    const user = await sql`SELECT username, email, access FROM aspect_users_ WHERE 1`
    return user
}
async function apiSetUserAccess(req, res) {
    const {username, access} = req.query;
    await sql`Update aspect_users_ SET access = ${access} WHERE username = ${username}`
    res.status(200).json({message: username+"'s user access set to "+access});
}
async function apiUpdateUsername(req, res) {
    const {value, user, password} = req.query;
    const response = await fetch('api/getuserdetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            command: 'update',
            collomn: 'username',
            username: user.username,
            email: user.email,
        })
    }).then(res => res.json())
    .then(data => console.log(data))
}