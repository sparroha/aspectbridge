import { NextApiRequest, NextApiResponse } from "next";
import { useEffect } from "react";
import useLog from "../../../components/conlog";
import sql from "../../../lib/,base/sql"
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

export default async function getUserById(req: NextApiRequest, res: NextApiResponse){
    /*const db = await open({
        filename : './mydb.sqlite',
        driver: sqlite3.Database
    });
    const user = await db.all('SELECT * FROM User WHERE id = ?', [req.query.id])
    res.json(user+" :: "+user[0].name)*/
    const [{data}] = await sql`select name, email from Users where id=${[req.query.id]}`
    useLog(data[0].name+':'+data[0].email)
    return data;
}