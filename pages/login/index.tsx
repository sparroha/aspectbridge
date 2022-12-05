import React, { useEffect, useState } from 'react';
export default async function UserLogin(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    function updateInfo(event){
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        useEffect(()=>{
            if(fieldName === 'email') {
                setEmail(fieldValue);
            }
            else if(fieldName === 'password'){
                setPassword(fieldValue);
            }
        }, [])
    }
    function login(e){
        useEffect(()=>{
            setUsername(authUser(email, password))
            let p = () => alert('Welcom '+username)
            return p
        }, [username])
    }
    return(<>
            <div className="add_book">
                <label>email: </label>
                <input onChange={updateInfo} name="email" value={email}/>
            </div>
            <div>
                <label >password: </label>
                <input onChange={updateInfo} name="password" value={password}/>
            </div>
            <div>
                <button onClick={login}>Login</button>    
            </div>
        </>
    )
}

/**
 * Database Access Function
 * 
 * @param sql query script
 * @returns Array result
 */
export function querySQL(sql){
    var queryresults = []
    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host     : 'sql9.freesqldatabase.com',
        user     : 'sql9582797',
        password : 'wEuxqy4eH1',
        database : 'sql9582797'
    });
    connection.connect()
    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw err
        queryresults = rows
        console.log('The solution is: ', rows[0].solution)
    })
    connection.end()
    return queryresults //row[]
}
function authUser(email, password){
    let userid = querySQL(`SELECT userid FROM logan_users WHERE email=${email} AND password=${password}`)[0]
    return userid
}
function addUser(){

}
function removeUser(){}
function updateUser(){

}
const sql = 'SELECT 1 + 1 AS solution'
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

