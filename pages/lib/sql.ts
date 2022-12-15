import mysql from 'mysql2'
import { useState } from 'react'
import { PromiseReturn } from './type-util'
import { sha256, sha224 } from 'js-sha256'
import useLog from '../../components/conlog'

/**
 * Underlying MySQL Connection Pool (no fool-proof SQL Injection protection)
 * @see https://www.npmjs.com/package/mysql2#using-connection-pools
 */
const unsafePool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'db.700s.net',
  database: process.env.MYSQL_DB || 'gg',
  user: process.env.MYSQL_USER || 'gg',
  password: process.env.MYSQL_PASS,
}).promise()

export type SqlFunction =
  <T extends RowDataPacket[]>
    (sql: TemplateStringsArray, ...args: SqlParam[])
    => Promise<SqlFunResult<T>>

export type SqlFunResult<T extends RowDataPacket[]> = T & { affectedRows: number, insertId?: number }
export type SqlParam = string | number | boolean | object

/** from https://github.com/sidorares/node-mysql2/blob/HEAD/typings/mysql/lib/protocol/packets/RowDataPacket.d.ts */
declare interface RowDataPacket {
  [column: string]: any
  [column: number]: any
}

type Sql = <T extends RowDataPacket[]>(template: TemplateStringsArray, ...args: SqlParam[]) => Promise<SqlFunResult<T>>

/**
 * Features
 * - automatic SQL-injection protections. 
 * - automatic invoke of ensureTableChanges
 * @example await sql.`select * from test where col=${param} limit ${param}`
 */
const sql: Sql = makeSqlFn(unsafePool)
export default sql

function makeSqlFn(poolOrConnection: typeof unsafePool | PromiseReturn<(typeof unsafePool)['getConnection']>): Sql {
  return async function sql<T extends RowDataPacket[]>(
    template: TemplateStringsArray, ...args: SqlParam[]
  ): Promise<SqlFunResult<T>> {
    let query = template[0]
    for (let i = 0; i < args.length; i++) {
      if (args[i] instanceof Date) {
        query += 'FROM_UNIXTIME(?)'
        args[i] = (args[i] as Date).getTime() / 1000
      } else
        query += '?'
      query += template[i + 1]
    }
    const [rows, fields] = await poolOrConnection.query(query, args)
    const result = rows as SqlFunResult<T>
    return result
  }
}

export async function sqlConnection<T>(fun: (sql: Sql) => Promise<T>) {
  const unsafeConnection = await unsafePool.getConnection()
  try {
    return await fun(makeSqlFn(unsafeConnection))
  } finally {
    unsafeConnection.release()
  }
}

/*
export async function namedLock<T>(key: string, timeout: number, fun: (locked: boolean, sql: Sql) => Promise<T>) {
  return await sqlConnection(async (sql) => {
    const [{ locked }] = await sql`select GET_LOCK(${key}, ${timeout}) locked`
    try {
      return await fun(locked, sql)
    } finally {
      await sql`select RELEASE_LOCK(${key})`
    }
  })
}
*/

   
export async function createTableOnce(){
  let query = null
  query = await sql`CREATE TABLE IF NOT EXISTS aspect_users_ (
                    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    userid int,
                    email varchar(255),
                    hash varchar(255)
                );`
  return !!query
}
export async function getUsers(){
  let query = null
  try{query = await sql`SELECT * FROM aspect_users_;`}
  catch(e){console.log(e.error); return e}
  return !!query
}

/*export async function fetchUser(email, password) {
  const [username, setUsername] = useState('')
  const [useraccess, setUseraccess] = useState(0)
  let shapassword = sha224(email+password)
  let shauser = await sql<[{ username: string, access: number }]>`select username, from logan_users where email=${email} and hash=${shapassword}`
  if(shauser){
    setUsername(shauser[0].username)
    setUseraccess(shauser[0].access)
  }
}*/