import sql from "../../../lib/,base/sql"

export default async function chat(req, res) {
  const { request } = req.query
  const { username, send, time, message, access } = req.body
  const method = req.method
  if (method === 'POST') {
    try {
      switch (request) {
        case 'messages':
          await sql`INSERT INTO aspect_chat_messages_ (username, message, timestamp) VALUES (${username}, ${send}, NOW())`
          res.status(200).json({ alert: 'message sent' })
          break
        case 'deleteuser':
          await sql`DELETE FROM aspect_chat_users_ WHERE username = ${username};`
          res.status(200).json({ alert: 'user deleted' })
          break
        case 'users':
          await sql`INSERT INTO aspect_chat_users_ (username, last_active) VALUES (${username}, NOW()) ON DUPLICATE KEY UPDATE last_active = NOW();`
          res.status(200).json({ alert: 'user added' })
          break
        case 'deletesend':
          await sql`DELETE FROM aspect_chat_messages_ WHERE message = ${message};`
          res.status(200).json({ alert: 'message deleted' })
          break
        case 'deletetimesend':
          const [m] = await sql`SELECT * FROM aspect_chat_messages_ WHERE message = ${message};`
          await sql`DELETE FROM aspect_chat_messages_ WHERE timestamp = convert(${time}, datetime);`
          res.status(200).json({ alert: 'message deleted at timestamp: '+ time + ' [Compare '+m.timestamp+']'})
          break
        case 'clear':
          //Not Implemented
          res.status(200).json({ alert: 'clear is not implemented' })
          break
        /*case 'drop':
          await sql`DROP TABLE IF EXISTS aspect_chat_messages_;`
          await sql`DROP TABLE IF EXISTS aspect_chat_users_;`
          res.status(200).json({ alert: 'tables dropped' })
          break
        case 'init':
          await sql`CREATE TABLE IF NOT EXISTS aspect_chat_messages_ (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            message NTEXT NOT NULL,
            timestamp DATETIME NOT NULL
          );`
          await sql`CREATE TABLE IF NOT EXISTS aspect_chat_users_ (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            last_active DATETIME NOT NULL
          );`
          res.status(200).json({ alert: 'tables init' })
          break*/
        default:
          res.status(400).json({
            alert: 'Invalid request',
            request: request,
            method: method,
            username: username,
            send: send,
            time: time,
          })
      }
    } catch (error) {
      res.status(500).json({ alert: 'Server error', body: req.body, username: username, send: send, error: error })
    }
  } else {
    try {
      switch (request) {
        case 'messages':
          //const messages = await sql`SELECT * FROM aspect_chat_messages_ WHERE 1;`
          const messages = await sql`SELECT * FROM aspect_chat_messages_ ORDER BY timestamp ASC;`
          res.status(200).json(messages)
          break
        case 'users':
          const users = await sql`SELECT * FROM aspect_chat_users_ ORDER BY last_active DESC;`
          res.status(200).json(users)
          break
          case 'resetusers':
            await sql`DROP TABLE IF EXISTS aspect_chat_users_;`
            await sql`CREATE TABLE IF NOT EXISTS aspect_chat_users_ (
              id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
              username VARCHAR(100) NOT NULL UNIQUE,
              last_active DATETIME NOT NULL
            );`
            /*await sql`CREATE TABLE IF NOT EXISTS aspect_chat_users_ (
              id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
              username VARCHAR(100) NOT NULL UNIQUE,
              last_active TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              expire TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP + INTERVAL 3 MINUTE
            );`*/
            //Add a Agent job that periodically deletes rows that have expired
            //await sql`CREAT INDEX aspect_chat_users_ttl_column_idx_ ON aspect_chat_users_ (ttl_column) WITH (expiry_delay = '0');`
            res.status(200).json({ alert: 'users reset' })
            break
        default:
          res.status(400).json({
            alert: 'Invalid request',
            request: request,
            method: method,
            username: username,
            send: send,
            time: time,
          })
      }
    } catch (error) {
      res.status(500).json({ alert: 'Server error', body: req.body, username: username, send: send, error: error })
    }
  }
}

/*
    if(request=='init'){
        await sql`CREATE TABLE IF NOT EXISTS aspect_chat_messages_ (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME NOT NULL
          );`
        await sql`CREATE TABLE IF NOT EXISTS aspect_chat_users_ (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            last_active DATETIME NOT NULL
          );`
        return res.status(200).json({alert: 'tables init'})
    }*/