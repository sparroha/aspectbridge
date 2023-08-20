import sql from '../../lib/,base/sql';
import { ACTIVEUSERS, ActiveUser } from '../login/[userlogin]';
import { RegistryCollomn } from './registry/[registry]';
export default async function getActiveUsers(req, res){
    const nonuser: ActiveUser = {name: '420: No Users Active', access: 2, time: Date.now()}
    let regdata: ActiveUser[] = [nonuser]
    const [users]: [RegistryCollomn] = await sql`SELECT * FROM aspect_registry_ WHERE name = ${ACTIVEUSERS};`
    regdata = users?JSON.parse(users.registry_data):[nonuser]
    if(!users) return res.status(420).json([{name: '420: No Users Active', access: 2, time: Date.now()}])
    
    res.status(200).json(regdata)
}