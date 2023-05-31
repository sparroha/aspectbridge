import sql from "../../../lib/,base/sql"

export default async function cost(req, res) {
    const { request } = req.query
    const { username, title, pages, content, footer } = req.body || req.query
    const STRINGS = {
        COMMAND: {
            SITES: 'sites',
            RESETSITES: 'resetsites',
            SITE: 'site',
            DELETESITE: 'deletesite'
        },
        DISCRIPTION: {
            SITES: 'get all sites or all sites by username',
            RESETSITES: 'reset sites table: forbiden',
            SITE: 'add or update site: on POST accepts (username, title, pages, content, footer)',
            DELETESITE: 'delete site: on POST requires username and title'
        }
    }
    const COMMANDS = [
        {name: STRINGS.COMMAND.SITES, description: STRINGS.DISCRIPTION.SITES},
        //{name: STRINGS.COMMAND.RESETSITES, description: STRINGS.DISCRIPTION.RESETSITES},
        {name: STRINGS.COMMAND.SITE, description: STRINGS.DISCRIPTION.SITE},
        //{name: STRINGS.COMMAND.DELETESITE, description: STRINGS.DISCRIPTION.DELETESITE}
    ]
    const method = req.method//default: GET
    function defaultRes(res){
        res.status(400).json({
            alert: 'Invalid request',
            commands: COMMANDS,
            request: request,
            method: method,
            username: username,
            title: title,
            pages: pages,
            content: content,
            footer: footer
        })
    }
    if (method === 'POST') {try {
        switch (request) {
          case STRINGS.COMMAND.DELETESITE:
            if(!username) throw new Error('username required')
            if(!title || title==null || title == '') throw new Error('title required')
            await sql`DELETE FROM aspect_sites_devpack_ WHERE username = ${username} AND title = ${title};`
            res.status(200).json({ alert: 'site deleted' })
            break
          case STRINGS.COMMAND.SITE://aka update site
            if(!title || title==null || title == '') throw new Error('title required')
            await sql`INSERT INTO aspect_sites_devpack_ (username, title, pages, content, footer) VALUES (${username}, ${title}, ${pages}, ${content}, ${footer}) ON DUPLICATE KEY UPDATE pages = ${pages}, content = ${content}, footer = ${footer};`
            res.status(200).json({ alert: 'site added' })
            break
          default:
            defaultRes(res)
        }
      } catch (error) {
        res.status(500).json({ alert: 'Server error', body: req.body, username: username, error: error })
      }
    } else {//method === 'GET'
      try {
        switch (request) {
          case STRINGS.COMMAND.SITE:

            const sites = (!title||title==null||title=='')?await sql`SELECT * FROM aspect_sites_devpack_ ORDER BY id ASC;`:
                              await sql`SELECT * FROM aspect_sites_devpack_ WHERE title = ${title};`
            res.status(200).json(sites)
            break
          case STRINGS.COMMAND.RESETSITES:
            await sql`DROP TABLE IF EXISTS aspect_sites_devpack_;`
            await sql`CREATE TABLE IF NOT EXISTS aspect_sites_devpack_ (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                title VARCHAR(100) NOT NULL UNIQUE,
                pages VARCHAR(255),
                content VARCHAR(255),
                footer VARCHAR(255)
            );`
            res.status(200).json({ alert: 'users reset' })
            break
          default:
            defaultRes(res)
        }
      } catch (error) {
        res.status(500).json({ alert: 'Server error', body: req.body, username: username, error: error })
      }
    }
}
  