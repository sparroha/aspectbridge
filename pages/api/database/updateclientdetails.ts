import sql from "../../../lib/,base/sql";

export default async function updateClientDetails(req, res) {
    const {clientname, email, street1, street2, city, state, statecode, zip, update} = req.query;
    const [count] = await sql`SELECT Count(*) as c FROM logan_clients_ WHERE clientname = ${clientname}`
    if ( update == 'true' ) {
        if (count.c == 0) {await sql`INSERT INTO logan_clients_ (clientname, email, street1, street2, city, state, statecode, zip) values (${clientname}, ${email}, ${street1}, ${street2}, ${city}, ${state}, ${statecode}, ${zip});`}
        const [client] = await sql`SELECT * FROM logan_clients_ WHERE clientname = ${clientname}`
        /*if(client.clientname != clientname) await sql`Update logan_clients_ SET clientname = ${clientname} WHERE clientname = ${clientname}`
        if(client.email != email) await sql`Update logan_clients_ SET email = ${email} WHERE clientname = ${clientname}`
        if(client.street1 != street1) await sql`Update logan_clients_ SET street1 = ${street1} WHERE clientname = ${clientname}`
        if(client.street2 != street2) await sql`Update logan_clients_ SET street2 = ${street2} WHERE clientname = ${clientname}`
        if(client.city != city) await sql`Update logan_clients_ SET city = ${city} WHERE clientname = ${clientname}`
        if(client.state != state) await sql`Update logan_clients_ SET state = ${state} WHERE clientname = ${clientname}`
        if(client.statecode != statecode) await sql`Update logan_clients_ SET statecode = ${statecode} WHERE clientname = ${clientname}`
        if(client.zip != zip) await sql`Update logan_clients_ SET zip = ${zip} WHERE clientname = ${clientname}`}*/
        //else {await sql`Update logan_clients_ SET email = ${email}, street1 = ${street1}, street2 = ${street2}, city = ${city}, state = ${state}, statecode = ${statecode}, zip = ${zip} WHERE clientname = ${clientname}`}
        await sql`Update logan_clients_ SET email = ${email}, street1 = ${street1}, street2 = ${street2}, city = ${city}, state = ${state}, statecode = ${statecode}, zip = ${zip} WHERE clientname = ${clientname}`
        res.status(200).json({clientname: clientname, email: email, street1: street1, street2: street2, city: city, state: state, statecode: statecode, zip: zip, updated: true});
    }
    else {
        const [client] = await sql`SELECT * FROM logan_clients_ WHERE clientname = ${clientname}`
        return res.status(200).json(client)
    }
}/*
async function getUserByHash(hash, ip) {
    const [user] = await sql`SELECT username, email, access FROM aspect_users_ WHERE hash = ${hash}`
    if (user) await sql`Update aspect_users_ SET ip = ${ip} WHERE hash = ${hash}`
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
async function getHashByIp(ip) {
    const [hash] = await sql`SELECT hash FROM aspect_users_ WHERE ip = ${ip}`
    return hash
}
async function getUserByIp(ip) {
    const [user] = await sql`SELECT username, email, access FROM aspect_users_ WHERE ip = ${ip}`
    return user || await getUserByHash(await getHashByIp(ip), ip)
}*/
