import sql from "../../lib/,base/sql";
import { StoredUser, User } from "../../app/login/[action]/page";
/**
* DEPRICATED use app/api/users
*/
//url params use query
//form submits use query
//fetch uses body
//mark as depricated
/**
 * 
 * @param req 
 * @param res 
 * @returns DEPRICATED
 */
export default async function getUser(req, res): Promise<Partial<User>> {
    const { email, username, hash, ip, command, id} = req.query;
    let user: any = null
    if(command) switch(command){
        case 'getall'://DEPRICATED /app/api/users/route.ts GET() is used instead
            user = await getAllUsers()
            if(!user) return res.status(400).json({message: 'No users found.'})
            return res.status(200).json(user);
            break;
        case 'delete'://DEPRICATED /app/api/users/delete/route.ts GET() is used instead
            if(!username) return res.status(400).json({message: 'No username provided.'})
            let deluser = await deleteUser(username)
            return res.status(200).json(deluser);
            break;
        case 'deleteid'://DEPRICATED /app/api/users/delete/id/route.ts GET() is used instead
            if(!id) return res.status(400).json({message: 'No id provided.'})
            let deluserid = await deleteUserById(id)
            return res.status(200).json(deluserid);
            break;
        case 'sethashid'://DEPRICATED /app/api/users/hash/route.ts GET() is used instead
            if(!hash) return res.status(400).json({message: 'No hash provided.'})
            if(!id) return res.status(400).json({message: 'No id provided.'})
            let uhash = await setHashById(hash, id)
            return res.status(200).json(uhash);
            break;
        case 'getbyemail'://DEPRICATED
            break;
        case 'getbyusername'://DEPRICATED
            break;
        default:
            break;
    }
    else if(ip && ip!=null) user = await getUserByIp(ip)/*{//DEPRICATED
        if (hash && hash!=null) user = await getUserByHash(hash, ip)
        else user = await getUserByIp(ip)
        if(!user) return res.status(400).json({message: 'No user record with ip '+ip+''})
    }*/
    else if( hash && hash!=null ) user = await getUserByHash(hash)//DEPRICATED
    else if( email ) user = await getUserByEmail(email)//DEPRICATED
    else if( username ) user = await getUserByUsername(username)//DEPRICATED
    else return res.status(400).json({message: 'No email, username or hash provided.'})
    return res.status(200).json(user);
}
//ONLY FOR LOGIN
async function getUserByHash(hash/*, ip*/) {//DEPRICATED
    const [user] = await sql`SELECT * FROM aspect_users_ WHERE hash = ${hash}`
    //if (user) await sql`Update aspect_users_ SET ip = ${ip} WHERE hash = ${hash}`
    return user
}//4194b857972439ee6bd294b9889c2ebec9cbbaa03a9312a16935225c
async function setHashById(hash: string, id: number) {//DEPRICATED
    const [user] = await sql`SELECT * FROM aspect_users_ WHERE id = ${id}`
    let resp = user?await sql`Update aspect_users_ SET hash = ${hash} WHERE id = ${id}`:null
    return resp
}
async function getUserByEmail(email) {//DEPRICATED
    const [user] = await sql`SELECT * FROM aspect_users_ WHERE email = ${email}`
    return user
}
async function getUserByUsername(username) {//DEPRICATED
    const [user] = await sql`SELECT * FROM aspect_users_ WHERE username = ${username}`
    return user
}
async function getHashByIp(ip) {//unsafe unused
    //const [hash] = await sql`SELECT hash FROM aspect_users_ WHERE ip = ${ip}`
    //return hash
}
export async function getUserByIp(ip) {//DEPRICATED
    const [user]: [StoredUser] = await sql`SELECT * FROM aspect_users_ WHERE ip = ${ip}`
    return user // || await getUserByHash(await getHashByIp(ip), ip)
}
async function getAllUsers() {//DEPRICATED
    const user = await sql`SELECT * FROM aspect_users_ WHERE 1`
    return user
}

async function deleteUser(username) {//DEPRICATED
    const data = await sql`DELETE FROM aspect_users_ WHERE username = ${username}`
    return data
}
async function deleteUserById(id) {//DEPRICATED
    const data = await sql`DELETE FROM aspect_users_ WHERE id = ${id}`
    return data
}