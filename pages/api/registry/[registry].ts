import sql from "../../../lib/,base/sql"


export default async function registry(req, res) {
	const { registry } = req.query //NAME: the dynamic file name associated with the target registry
	const { registry_data } = req.body?JSON.parse(req.body):0 //DATA: the data to be stored in the registry || the command to run on registry
    const reset = false //(req.query.reset == 'resetregistries') //RESET: if true, reset the registry
	const method = req.method
    //require NAME for reference
    if (!registry) res.status(400).json({alert: 'Registry name required by dynamic rout'})
	if (method === 'POST') {try{
        switch (registry_data) {
            case 'delete':
                await sql`DELETE FROM aspect_registry_ WHERE name = ${registry};`
                res.status(200).json({ alert: 'user deleted' })
                break
            default: //aka update registry
				//if(!registry_data) break
                await sql`INSERT INTO aspect_registry_ (name, registry_data) VALUES (${registry}, ${JSON.stringify(registry_data) || 0}) ON DUPLICATE KEY UPDATE registry_data = ${JSON.stringify(registry_data) || 0};`
                res.status(200).json({ alert: 'registry '+registry+' updated: '+ registry_data +' :'+JSON.parse(req.body).registry_data })
                break
			}
		} catch (error) {
			res.status(500).json({
				alert: 'Server error',
				name: registry,
				error: error
			})
		}
	} else {
		try {
			if(reset) {
					await sql`DROP TABLE IF EXISTS aspect_registry_;`
					await sql`CREATE TABLE IF NOT EXISTS aspect_registry_ (
                        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(100) NOT NULL UNIQUE,
                        registry_data TEXT(65535) NOT NULL
                    );`
					res.status(200).json({ alert: 'ALL registries reset' })
            }else{
                    const [data] = await sql`SELECT * FROM aspect_registry_ WHERE name = ${registry};`
                    res.status(200).json(JSON.parse(data.registry_data))
			}
		} catch (error) {
			res.status(500).json({
				alert: 'Server error',
                name: registry,
				//registry_data: registry_data,
				error: error
			})
		}
	}
}
