const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

async function openDB (){
    return open({
        filename : './mydb.sqlite',
        driver: sqlite3.Database
    })
}


async function setup(){
    const db = await openDB();
    await db.migrate({force : 'last'});

    const user = await db.all('SELECT * FROM User')
    console.log('User: '+JSON.stringify(user, null, 2))
}

setup();