import mysql from 'mysql2';
import sql, { createTableOnce, getUserName, addUser, alterTable, getAnthymn, addAnthymn } from '../lib/sql';

export default async function query(req, res){
    res.status(200).json(addAnthymn())

}