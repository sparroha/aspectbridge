import { NextApiRequest, NextApiResponse } from "next";
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

export default async function getClientById(req: NextApiRequest, res: NextApiResponse){
    const db = await open({
        filename : './mydb.sqlite',
        driver: sqlite3.Database
    });
    if(req.method == 'PUT'){
        const sq = await db.prepare('UPDATE User SET name = ?, email = ? WHERE id = ?')
        const r = sq.run(req.body.name, req.body.email, req.body.id)
        //r.finalize()
    }
    const user = await db.get('SELECT * FROM User WHERE id = ?', [req.query.id])
    //const users = await db.all('SELECT * FROM User')
    
    res.json('name: '+user.name+', email: '+user.email+', id: '+user.id)
    /*const response = await fetch('http://localhost:3000/api/clients/1',{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({name: 'Joshua', email: 'relp7@gmail.com', id: 1})
    })*/
}
