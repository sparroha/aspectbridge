import sql from "../../../lib/,base/sql";

export default async function updateClientDetails(req, res) {
    const {clientname, email, street1, street2, city, state, statecode, zip, update} = req.query;
    if ( update == 'true' ) {
        const [count] = await sql`SELECT Count(*) as c FROM logan_clients_ WHERE clientname = ${clientname}`
        if (count.c == 0) {await sql`INSERT INTO logan_clients_ (clientname, email, street1, street2, city, state, statecode, zip) values (${clientname}, ${email}, ${street1}, ${street2}, ${city}, ${state}, ${statecode}, ${zip});`}
        const [client] = await sql`SELECT * FROM logan_clients_ WHERE clientname = ${clientname}`

        if(email!='' && client.email != email) await sql`Update logan_clients_ SET email = ${email} WHERE clientname = ${clientname}`
        if(street1!='' && client.street1 != street1) await sql`Update logan_clients_ SET street1 = ${street1} WHERE clientname = ${clientname}`
        if(street2!='' && client.street2 != street2) await sql`Update logan_clients_ SET street2 = ${street2} WHERE clientname = ${clientname}`
        if(city!='' && client.city != city) await sql`Update logan_clients_ SET city = ${city} WHERE clientname = ${clientname}`
        if(state!='' && client.state != state) await sql`Update logan_clients_ SET state = ${state} WHERE clientname = ${clientname}`
        if(statecode!='' && client.statecode != statecode) await sql`Update logan_clients_ SET statecode = ${statecode} WHERE clientname = ${clientname}`
        if(zip!='' && client.zip != zip) await sql`Update logan_clients_ SET zip = ${zip} WHERE clientname = ${clientname}`
        
        res.status(200).json({clientname: clientname, email: email, street1: street1, street2: street2, city: city, state: state, statecode: statecode, zip: zip, updated: true});
    }
    else {
        const [client] = await sql`SELECT * FROM logan_clients_ WHERE clientname = ${clientname}`
        return res.status(200).json(client)
    }
}
