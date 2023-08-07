import { sha224 } from "js-sha256"
import sql from "../../lib/,base/sql"
import { User } from "../login/[userlogin]"

export default function EditProfile({user}){
    return <div>
        <h1>Edit Profile</h1>
    </div>
}
async function updateProfile({collomn, value, user, password}){
    switch(collomn){
        case 'username':
            //await updateUsername(value, user, hash)
            break
        case 'email':
            //await updateEmail(value, user, hash)
            break
        default:
            break
    }
    async function updateUsername(value, user: User, password) {
        let hash = sha224(user.email?.toString().toLocaleLowerCase()+''+password)
        const response = await fetch(`api/user/${hash}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                email: user.email,
                access: 0,
                message: '',
                homepage: user.homepage,
                ip: user.ip,
                password: '',
                collumn: 'username',
                command: 'update',
            })
        }).then(res => res.json())
        .then(data => console.log(data))
    }
    const response = await fetch('api/updateprofile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            command: 'update',
            username: user.username,
            email: ''
        })
    }).then(res => res.json())
    .then(data => console.log(data))
}
/**
 * api async functions
 * @param req 
 * @param res 
 */
async function apiSetUserAccess(req, res) {
    const {username, access} = req.query;
    await sql`Update aspect_users_ SET access = ${access} WHERE username = ${username}`
    res.status(200).json({message: username+"'s user access set to "+access});
}
async function apiUpdateUsername(req, res) {
    const {value, user, password} = req.query;
    const hash = sha224(user.email?.toString().toLocaleLowerCase()+''+password)
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