import { NextApiRequest, NextApiResponse } from "next";
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

/*export default async function getClients(req: NextApiRequest, res: NextApiResponse){
    const db = await open({
        filename : './mydb.sqlite',
        driver: sqlite3.Database
    });
    //const user = await db.all('SELECT * FROM User WHERE id = ?', [req.query.id])
    const users = await db.all('SELECT * FROM User')
    
    res.json(users+" :: "+users[0].name)
}*/
export function handler(request: NextApiRequest, response: NextApiResponse) {
    response.status(200).json({
        body: request.body,
        query: request.query,
        cookies: request.cookies,
    });
  }
export default async function handlera(request: NextApiRequest, response: NextApiResponse) {
    const res = await fetch('./mydb.sqlite', {
        method: 'POST',
        body: JSON.stringify({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    const { name } = request.query;
    return response.end(`Hello ${name}!`);
    const data = await res.json();
    return response.status(200).json({ data });
}



/*
module.exports = (req, res)=>{
    if( req.method == 'GET'){
        res.json([
            { key: '', pair: ''},
            { key: '', pair: ''}
        ])
    }else{}
}*/