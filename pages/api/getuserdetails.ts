import sql from "../../lib/,base/sql";

export default async function getUserDetails(req, res) {
    const { email, username, hash } = req.query;
    let user = null
    if ( hash ) user = await getUserByHash(hash)
    else if( email ) user = await getUserByEmail(email)
    else if( username ) user = await getUserByUsername(username)
    else return res.status(400).json({message: 'No email, username or hash provided.'})
    res.status(200).json(user);
}
async function getUserByHash(hash) {
    const [user] = await sql`SELECT username, email, access FROM aspect_users_ WHERE hash = ${hash}`
    return user
}
async function getUserByEmail(email) {
    const [user] = await sql`SELECT username, email, access FROM aspect_users_ WHERE email = ${email}`
    return user
}
async function getUserByUsername(username) {
    const [user] = await sql`SELECT username, email, access FROM aspect_users_ WHERE username = ${username}`
    return user
}
