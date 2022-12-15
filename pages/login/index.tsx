// This app shows what Next.js bundles for the client-side with its new SSG
// support. This editor supports TypeScript syntax.
import Cookies from 'cookies';
import Mysql from 'mysql2';
import Link from 'next/link';
import SQL from 'sql-template-strings';
//import Layout from '../../components/ll/css/layout';

//const pool = Mysql.createPool(process.env.DATABASE_URL);

var queryresults = []
//var mysql = require('mysql')
const connection = Mysql.createConnection({
    host     : 'sql9.freesqldatabase.com',
    user     : 'sql9582797',
    password : 'wEuxqy4eH1',
    database : 'sql9582797'
});
connection.connect((err)=>{if (err) throw err; console.log('Database Connected...')})
/*connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err
    queryresults = rows
    console.log('The solution is: ', rows[0].solution)
})
connection.end()*/

export default function ({ projects }) {
  return (
    <Layout>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href="/projects/[id]" as={`/projects/${project.id}`}>
              <a>{project.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const userId = new Cookies(req, res).get('user_id');
  const projects = await new Promise((resolve, reject) =>
  connection.query(
      SQL`SELECT id, name FROM projects WHERE user_id = ${userId};`,
      (err, results) => (err ? reject(err) : resolve(results))
    )
  );
  return { props: { projects } };
}

/*
Host: sql9.freesqldatabase.com
Database name: sql9582797
Database user: sql9582797
Database password: wEuxqy4eH1
Port number: 3306
*/

/*
	1	userid  Primary int(11)         AUTO_INCREMENT
	2	username        varchar(256)
	3	contact         text            JSON
	4	billing         text            JSON	
	5	access          varchar(256)    "user", "admin", "dev"      :posibly as binary [01 = user, 10 = "admin", 11 = "dev"]

*/

/*
// db.js
import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
});
export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

*//*

// next.config.js
module.exports = {
  env: {
    'MYSQL_HOST': '127.0.0.1',
    'MYSQL_PORT': '3306',
    'MYSQL_DATABASE': {database_name},
    'MYSQL_USER': {user_name},
    'MYSQL_PASSWORD': {user_password},
  }
}
*/