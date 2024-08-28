import sql from "../../../lib/,base/sql"
/**
 * TODO Migrate to App api
 */
export default async function chat(req, res) {
  const { request } = req.query
  const { username, send, time, message, access, messageid } = req.body
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
          await sql`DELETE FROM aspect_chat_messages_ WHERE id = ${messageid};`
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
          res.status(200).json({ alert: 'users reset' })
          break
        case 'deleteusers':
          await sql`DROP TABLE IF EXISTS aspect_chat_users_;`
          res.status(200).json({ alert: 'aspect_chat_users_ permanently deleted' })
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
