import sql from "../../../lib/,base/sql";

export default async function deleteUser(req, res) {
    const {username} = req.query;
    await sql`DELETE FROM aspect_users_ WHERE username = ${username}`
    res.status(200).json({message: username+" deleted."});
}