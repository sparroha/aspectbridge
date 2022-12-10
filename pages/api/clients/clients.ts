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
    const res = await fetch('http://localhost:3000/api/clients/1', {
        method: 'POST',
        body: JSON.stringify({
            name: process.env.CLIENT_ID,
            email: process.env.CLIENT_SECRET,
            id: 1,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    return response.status(200).json({ data });
}
/**
 * const response = await fetch('http://localhost:3000/api/clients/1',{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({name: 'Joshua', email: 'relp7@gmail.com', id: 1})
    })
 */



/*
module.exports = (req, res)=>{
    if( req.method == 'GET'){
        res.json([
            { key: '', pair: ''},
            { key: '', pair: ''}
        ])
    }else{}
}*/