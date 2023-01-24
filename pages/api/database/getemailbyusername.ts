import sql from "../../../lib/,base/sql";

export default async function getUserDetails(req, res) {
    const { username } = req.query;
    let data = null
    if( username ) data = await getEmailbyUsername(username)
    else return res.status(400).json({message: 'No username provided.'})
    res.status(200).json(data);
}
async function getEmailbyUsername(username){
    const [Q] = await sql`SELECT email FROM aspect_users_ WHERE username = ${username}`
    return Q
}