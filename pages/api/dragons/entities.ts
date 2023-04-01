import sql from "../../../lib/,base/sql"
import { Entity } from "../../dragons/components/entity"


//Table
export default async function getEntityInfo(req?, res?) {
    //TABLE ALREADY EXISTS
    /*const newTable = await sql`CREATE TABLE IF NOT EXISTS aspect_dragons_entities_ (
                        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        name varchar(255),
                        description varchar(255),
                        image varchar(255),
                        onaction varchar(255)
                    );`*/
    //call array from table
    try {
        const creatures: Entity[] = await getEntities()
        return res.status(200).json({tiles: JSON.stringify(creatures), message: 'Population found', success: true})
    } catch (error) {
        return res.status(404).json({tiles: [null], message: 'No creatures found', success: false})
    }
}
export async function getEntities(selector: string = '*'): Promise<Entity[]> {
    try {
        const tiles = await sql`select * from aspect_dragons_entities_;`
        console.log(tiles)
        const creatureInfo: Entity[] = tiles.map((creature) => {
            return {
                id: creature.id,
                name: creature.name,
                description: creature.description,
                image: creature.image,
                onaction: JSON.parse(creature.actions),
            }
        })
    } catch (error) {
        console.log(error)
        return [null]
    }
}
//**********
/*
login(userCredentials) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/api/login`, {
        method: 'POST',
        headers: new Headers({'Content-Type':'application/json'}),
        body: JSON.stringify(userCredentials)
    }).then(res => return res.json())
    .then((res) => {
          console.log('statusCode:'+ res.status)
          console.log('Token:' +res.token)
          this.setToken(res.token) // Setting the token in localStorage
          return Promise.resolve(res);

    })
}
*/