import { User } from "../../login/[userlogin]"
import sql from "../../../lib/,base/sql"
type ProfileProps = Partial<User> & {
    password: string
    collumn: string
    command: string
    newHash: string
    newAccess: number
}
//this page is only accessable when a user is logged in and a hash is provided
//this will ensure the user detailes are matched with the provided login data to ensure no desync occurs when updating user data
//and other reasons
export default async function userProfileApi(req, res){
    const { hashid } = req.query
    const { id, username, email, access, message, homepage, ip, password, collumn, command , newHash, newAccess}: Partial<ProfileProps> = req.body
    const method = req.method


    /*
    body: JSON.stringify({
        id: user.id,
        username: username,
        collumn: 'username',
        command: 'update',
    })
    */
    try {
    let user = null
    switch(command){
        case 'update':
        switch(collumn){
            case 'email':
                if(!newHash) res.status(400).json({message: 'No hash provided.'})
                if(!email) res.status(400).json({message: 'No email provided.'})
                if(!id) res.status(400).json({message: 'No id provided.'})
                let resEmail = await sql`UPDATE aspect_users_ SET hash = ${newHash}, email = ${email} WHERE id = ${id}`
                res.status(200).json(resEmail);
                break;
            case 'username':
                if(!username) res.status(400).json({message: 'No username provided.'})
                if(!id) res.status(400).json({message: 'No id provided.'})
                user = await sql`UPDATE aspect_users_ SET username = ${username} WHERE id = ${id}`
                .then(res.status(200).json(user))
                break;
            case 'password':
                if(!newHash) res.status(400).json({message: 'No hash provided.'})
                if(!id) res.status(400).json({message: 'No id provided.'})
                let resObj = await sql`UPDATE aspect_users_ SET hash = ${newHash} WHERE id = ${id}`
                //let resObj = setHashById(newHash, id)
                res.status(200).json(resObj);
                break;
            case 'access':
                if(newAccess!=0 && !newAccess) {res.status(400).json({message: 'No new access provided.'});break;}
                if(!id) res.status(400).json({message: 'No id provided.'})
                user = await sql`UPDATE aspect_users_ SET access = ${newAccess} WHERE id = ${id}`
                res.status(200).json(user);
                break;
            default:
                break;
        }
        break;
        default:
            break;
    }
    } catch (error) {
        res.status(400).json({message: error})
    }
    //if no hash is provided, return an error
    res.status(400).json({message: 'Bad Request.'})
    
}
async function setHashById(hash: string, id: number) {
    const [user] = await sql`SELECT username, email, access FROM aspect_users_ WHERE id = ${id}`
    let resp = user?await sql`Update aspect_users_ SET hash = ${hash} WHERE id = ${id}`:null
    return resp
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