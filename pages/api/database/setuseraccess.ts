import sql from "../../../lib/,base/sql";

export default async function setUserAccess(req, res) {
    const {username, access} = req.query;
    await sql`Update aspect_users_ SET access = ${access} WHERE username = ${username}`
    res.status(200).json({message: username+"'s user access set to "+access});
}