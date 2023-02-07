import sql from "../../../lib/,base/sql"

export default async function resetAspectUsers(req, res){
    if(req.drop=='true') await dropAspectUsers()
    await sql`CREATE TABLE IF NOT EXISTS aspect_users_ (
        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username varchar(255),
        email varchar(255),
        hash varchar(255),
        ip varchar(255),
        access int(2)
    );`
    res.status(200).json({message: 'Table aspect_users_ reset.'})
}
async function dropAspectUsers(){
    await sql`DROP TABLE aspect_users_`
}