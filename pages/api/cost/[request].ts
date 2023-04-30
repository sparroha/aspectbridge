import sql from "../../../lib/,base/sql"

export default async function cost(req, res) {
    const { request } = req.query
    const { username, send, time, message, access, coin, income, prestige } = req.body
    const method = req.method
    if (method === 'POST') {try {
        switch (request) {
          case 'deleteuser':
            await sql`DELETE FROM aspect_cost_users_ WHERE username = ${username};`
            res.status(200).json({ alert: 'user deleted' })
            break
          case 'users'://aka update user
            await sql`INSERT INTO aspect_cost_users_ (username, last_active, coin, income, prestige) VALUES (${username}, NOW(), ${coin}, ${income}, ${prestige}) ON DUPLICATE KEY UPDATE last_active = NOW(), coin = ${coin}, income = ${income}, prestige = ${prestige};`
            res.status(200).json({ alert: 'user added' })
            break
          default:
            res.status(400).json({
              alert: 'Invalid request',
              request: request,
              method: method,
              username: username,
              coin: coin,
              income: income,
            })
        }
      } catch (error) {
        res.status(500).json({ alert: 'Server error', body: req.body, username: username, send: send, error: error })
      }
    } else {
      try {
        switch (request) {
          case 'users':
            const users = !username?await sql`SELECT * FROM aspect_cost_users_ ORDER BY last_active DESC;`:
                              await sql`SELECT * FROM aspect_cost_users_ WHERE username = ${username};`
            res.status(200).json(users)
            break
          case 'resetusers':
            await sql`DROP TABLE IF EXISTS aspect_cost_users_;`
            await sql`CREATE TABLE IF NOT EXISTS aspect_cost_users_ (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL UNIQUE,
                last_active DATETIME NOT NULL,
                coin INT NOT NULL DEFAULT 0,
                income INT NOT NULL DEFAULT 0,
                prestige INT NOT NULL DEFAULT 0
            );`
            res.status(200).json({ alert: 'users reset' })
            break
          default:
            res.status(400).json({
              alert: 'Invalid request',
              request: request,
              method: method,
              username: username,
              coin: coin,
              income: income,
            })
        }
      } catch (error) {
        res.status(500).json({ alert: 'Server error', body: req.body, username: username, income: income, error: error })
      }
    }
  }
  