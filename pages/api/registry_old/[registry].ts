import sql from "../../../lib/,base/sql"
export type RegistryEntry = {
	id: number
	name: string
	registry_data: string
}
export default async function registry(req, res) {
	const { registry , command, id } = req.query //NAME: the dynamic file name associated with the target registry
	const registry_data = req.body || 'default' //DATA: the data to be stored in the registry || the command to run on registry
    const reset = false //(req.query.reset == 'resetregistries') //RESET: if true, reset the registry
	const method = req.method
	
	const STRINGS = {
		COMMAND: 'command',
		COMMANDS: {
			DELETE: 'delete',
			CONFIRMWIPE: 'confirmwipedatabase'
		},
		ALERTS: {
			REGISTRYDELETED: 'register '+registry+' deleted',
			REGISTRYIDDELETED: 'register of id = '+id+' deleted',
			DELETEDALL: 'ALL registries reset',
			NODELETE: 'no registry deleted',
			NOUPDATE: 'no registry updated',
			NOGET: 'no registry found',
			NOGETALL: 'no registries found',
			UPDATE: 'registr',
			UPDATEALL: 'ALL registries updated',
			UPDATEALLFAILED: 'ALL registries failed to update',
			UPDATEFAILED: 'registry failed to update',
		}
	}
	
	if (method === 'POST') {try{
        switch (command) {
            case 'delete':
                await sql`DELETE FROM aspect_registry_ WHERE name = ${registry};`
                res.status(200).json({ alert: 'register deleted' })
                break
            default: //aka update registry
				//if(!registry_data) break
                await sql`INSERT INTO aspect_registry_ (name, registry_data) VALUES (${registry}, ${registry_data}) ON DUPLICATE KEY UPDATE registry_data = ${registry_data};`
                res.status(200).json({ alert: 'registry '+registry+' updated: ', registry_data })
                break
			}
		} catch (error) {
			res.status(500).json({
				alert: 'Server error for '+registry+' : '+registry_data,
				name: registry,
				error: error,
				//body: JSON.parse(req.body)
			})
		}
	} else if (method === 'GET') { try {
		switch (command) {
			case 'confirmwipedatabase':
				if(registry == 'deleteall') {
					await sql`DROP TABLE IF EXISTS aspect_registry_;`
					await sql`CREATE TABLE IF NOT EXISTS aspect_registry_ (
						id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
						name VARCHAR(100) NOT NULL UNIQUE,
						registry_data TEXT(65535) NOT NULL
					);`
					res.status(200).json({ alert: 'ALL registries reset' })
				}else{
					res.status(200).json({ alert: 'no registry deleted' })
				}
				break
			case 'delete':
				if(id) {
					const del = await sql`DELETE FROM aspect_registry_ WHERE id = ${id};`
					res.status(200).json({ alert: STRINGS.ALERTS.REGISTRYIDDELETED, del: 'deleted '+del.affectedRows+' item(s) where id = '+id, sql: `DELETE FROM aspect_registry_ WHERE id = ${id};`})
				}else{
					const del = await sql`DELETE FROM aspect_registry_ WHERE name = ${registry};`
					res.status(200).json({ alert: STRINGS.ALERTS.REGISTRYDELETED, del: del, sql: `DELETE FROM aspect_registry_ WHERE name = ${registry};`})
				}
				break
			case 'search':
				const search = await sql`SELECT * FROM aspect_registry_;`
				let fsearch = search.filter((item)=>item.name.includes(registry))
				res.status(200).json(fsearch)
				break
			default: //aka get registry
				if (registry == 'all') {
					const allregistries = await sql`SELECT * FROM aspect_registry_;`
					if (allregistries) res.status(200).json(allregistries)
					else res.status(200).json({ alert: 'no registries found' })
				}else{
					const [register] = await sql`SELECT * FROM aspect_registry_ WHERE name = ${registry};`
					if (register) {res.status(200).json(register.registry_data)}
					else{
						await sql`INSERT INTO aspect_registry_ (name, registry_data) VALUES (${registry}, ${registry_data || 'default'}) ON DUPLICATE KEY UPDATE registry_data = ${registry_data || 'default'};`
						res.status(200).json({ alert: 'registry '+registry+' updated: '+ registry_data})
					}
				}
				break
		}
		
	} catch (error) {
		res.status(500).json({
			alert: 'Server error for '+registry+' : '+registry_data,
			name: registry,
			error: error,
			//body: JSON.parse(req.body)
		})
	}}
}