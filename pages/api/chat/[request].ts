import sql from "../../../lib/,base/sql"

export default async function chat(req, res) {
  const { request } = req.query
  const { username, send, time, message } = req.body
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
          const messages = await sql`SELECT * FROM aspect_chat_messages_ WHERE 1;`
          res.status(200).json(messages)
          break
        case 'users':
          const users = await sql`SELECT * FROM aspect_chat_users_ WHERE 1;`
          res.status(200).json(users)
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
      res.status(500).json({ alert: 'Server error' })
    }
  }
}

/*export default async function chat(req, res){
    const {request} = req.query
    const {username, send, time} = req.body
    const method = req.method
    /*if(request=='drop'){
        await sql`DROP TABLE IF EXISTS aspect_chat_messages_;`
        await sql`DROP TABLE IF EXISTS aspect_chat_users_;`
        return res.status(200).json({alert: 'tables dropped'})
    }
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
    }/
    if(method=='POST'){
        if(request=='messages'){
            try {
                await sql`INSERT INTO aspect_chat_messages_ (username, message, timestamp) VALUES (${username}, ${send}, NOW())`
            } catch (error) {
                res.status(400).json(error)
            }
            return res.status(200).json({alert: 'message sent'})
        }else if(request=='deleteuser'){
            try {
                await sql`DELETE FROM aspect_chat_users_ WHERE username = ${username};`
            } catch (error) {
                res.status(400).json(error)
            }
            res.status(200).json({alert: 'user deleted'})
        }else if(request=='users'){
            try {
                await sql`INSERT INTO aspect_chat_users_ (username) VALUES (${username}) ON DUPLICATE KEY UPDATE last_active = NOW();`
            } catch (error) {
                res.status(400).json(error)
            }
            res.status(200).json({alert: 'user added'})
        }else if(request=='deletesend'&&time){
            try {
                await sql`DELETE FROM aspect_chat_messages_ WHERE timestamp = ${time};`
            } catch (error) {
                res.status(400).json(error)
            }
            res.status(200).json({alert: 'message deleted'})
        }else {
            res.status(400).json({ alert: 'Invalid request', request: request, method: method, username: username, send: send, time: time })
        }
    }else{
        if(request=='messages'){
            const messages = await sql`SELECT * FROM aspect_chat_messages_ WHERE 1;`
            res.status(200).json(messages)
            //return [{ timestamp: DATE(), user: string, send: string}]
        }else if(request=='users'){
            const users = await sql`SELECT * FROM aspect_chat_users_ WHERE 1;`
            res.status(200).json(users)
            //return [string]
        }
    }
    
}*/
