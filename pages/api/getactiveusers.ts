import sql from '../../lib/,base/sql';
import { ACTIVEUSERS } from '../login/[userlogin]';
export default async function getActiveUsers(req, res){
    const [users] = await sql`SELECT * FROM aspect_registry_ WHERE name = ${ACTIVEUSERS};`
    if(!users) return res.status(400).json({message: 'No users found.'})

    res.status(200).json(JSON.parse(users.registry_data))
}