import sql from "../../../lib/,base/sql"

export default async function resetTable(req, res){
    if(req.drop=='true') await drop()
    await sql`CREATE TABLE IF NOT EXISTS logan_clients_ (
        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        clientname varchar(255),
        email varchar(255),
        city varchar(63),
        state varchar(63),
        statecode varchar(2),
        zip int(5),
        street1 varchar(255),
        street2 varchar(255)
    );`
    res.status(200).json({message: 'Table logan_clients_ reset.'})
}
async function drop(){
    await sql`DROP TABLE logan_clients_`
}