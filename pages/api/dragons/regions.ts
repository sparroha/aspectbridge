import sql from "../../../lib/,base/sql"
import { Position } from "../../../public/dragons/tileTypes"//?

export type a_d_tiles_ = {
    id: number,
    name: string,
    description: string,
    image: string,
    paths: string,
    loot_table: string,
    population_table: string,
    event_table: string,
    destination: string,
    destinationMap: string,
}
/**
 * ERROR getting 404
 * @param req 
 * @param res 
 * @returns 
 */
export default async function getRegionInfo(req?, res?) {
    //sql`INSERT INTO aspect_dragons_tiles_ (id, name, description, image, paths, loot_table, population_table, event_table, destination, destinationMap) VALUES (${1}, ${'air'}, ${'gravity takes over'}, ${'air.png'}, ${JSON.stringify([0,0,0,0,0,0])}, ${JSON.stringify([''])}, ${JSON.stringify([''])}, ${JSON.stringify(['fall'])}, ${JSON.stringify({x: 0, y: 0, z: 0})}, ${''});`
    //TABLE ALREADY EXISTS
    /*const newTable = await sql`CREATE TABLE IF NOT EXISTS aspect_dragons_tiles_ (
                        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        name varchar(255),
                        description varchar(255),
                        image varchar(255),
                        paths varchar(255),
                        loot_table varchar(255),
                        population_table varchar(255),
                        event_table varchar(255),
                        destination varchar(255),
                        destinationMap varchar(255)
                    );`*/
    //call array from table
    const {id, name, description, image, paths, loot_table, population_table, event_table, destination, destinationMap, method} = req.body || req.query;//?
    if(method=='set'){
        const newTile = await setNewTileByName(name, description, image, paths, loot_table, population_table, event_table, destination, destinationMap)
        //if(!newTile) return res.status(404).json({tile: [null], message: 'No tiles found', method: method, success: false})
        return res.status(200).json(newTile)
    }
    if(method=='get'){
        const tile = await getFirstTileByName(name)
        //if(!tile) return res.status(404).json({tile: [null], message: 'No tiles found', method: method, success: false})
        return res.status(200).json(tile)
    }
    if(method=='getall'||!method){
        const tiles = await getAllTiles()
        //if(!tiles) return res.status(404).json({tile: [null], tiles: [null], message: 'No tiles found', method: method, success: false})
        return res.status(200).json(tiles)
    }
    if(method=='delete'&&id){
        const deletedTile = await deleteTileById(id)
        //if(!deletedTile) return res.status(404).json({tiles: [null], message: 'No tiles found', method: method, success: false})
        return res.status(200).json(deletedTile)
    }
    if(method=='delete'&&name){
        const deletedTile = await deleteTileByName(name)
        //if(!deletedTile) return res.status(404).json({tiles: [null], message: 'No tiles found', method: method, success: false})
        return res.status(200).json(deletedTile)
    }
    if(method=='update'&&id){
        const updatedTile = await updateTileById(id, name, description, image, paths, loot_table, population_table, event_table, destination, destinationMap)
        //if(!updatedTile) return res.status(404).json({tiles: [null], message: 'No tiles found', method: method, success: false})
        return res.status(200).json(updatedTile)
    }
    /*if(method=='update'){
        const updatedTile = await updateTileByName(name, description, image, paths, loot_table, population_table, event_table, destination, destinationMap)
        //if(!updatedTile) return res.status(404).json({tiles: [null], message: 'No tiles found', method: method, success: false})
        return res.status(200).json(updatedTile)
    }*/
    /*try {
        const tiles: Region[] = await getTiles()
        return res.status(200).json({tiles: JSON.stringify(tiles), message: 'Tiles found', success: true})
    } catch (error) {
        return res.status(404).json({tiles: [null], message: 'No tiles found', success: false})
    }*/
}
async function getFirstTileByName(name: string) {
    const [tile] = await sql`SELECT * FROM aspect_dragons_tiles_ WHERE name = ${name};`
    return tile
}
async function getAllTiles() {
    const tiles = await sql`SELECT * FROM aspect_dragons_tiles_ WHERE 1;`
    console.log('/api/dragons/regions.getAllTiles()', tiles)
    return tiles
}
/*export async function getTiles(): Promise<Region[]> {
    try {
        const tiles = await sql`select * from aspect_dragons_tiles_;`
        console.log('DATABASE_TILES: '+tiles)//success
        const tileInfo: Region[] = tiles.map((tile) => {
            return {
                id: tile.id,
                name: tile.name,
                description: tile.description,
                image: tile.image,
                paths: JSON.parse(tile.paths),
                loot_table: JSON.parse(tile.loot_table),
                population_table: JSON.parse(tile.population_table),
                event_table: JSON.parse(tile.event_table),
                destination: JSON.parse(tile.destination),
                destinationMap: tile.destinationMap,
            }
        })
        return tileInfo
    } catch (error) {
        console.log(error)
        let e: Region[] = [{name: 'error', paths: [0,0,0,0,0,0]}]
        return e
    }
}*/
async function setNewTileByName(name: string, description: string, image: string, paths: number[], loot_table: string[], population_table: string[], event_table: string[], destination: Position, destinationMap: string, id?) {
    const newTile = await sql`INSERT INTO aspect_dragons_tiles_ (name, description, image, paths, loot_table, population_table, event_table, destination, destinationMap) VALUES (${name}, ${description}, ${image}, ${paths}, ${loot_table}, ${population_table}, ${event_table}, ${destination}, ${destinationMap});`
    return newTile
}
async function deleteTileByName(name: string) {
    const deletedTile = await sql`DELETE FROM aspect_dragons_tiles_ WHERE name=${name};`
    return deletedTile
}
async function deleteTileById(id: number) {
    const deletedTile = await sql`DELETE FROM aspect_dragons_tiles_ WHERE id=${id};`
    return deletedTile
}
async function updateTileByName(name: string, description: string, image: string, paths: number[], loot_table: string[], population_table: string[], event_table: string[], destination: Position, destinationMap: string, id?) {
    const updatedTile = await sql`UPDATE aspect_dragons_tiles_ SET description=${description}, image=${image}, paths=${paths}, loot_table=${loot_table}, population_table=${population_table}, event_table=${event_table}, destination=${destination}, destinationMap=${destinationMap} WHERE name=${name};`
    return updatedTile
}
async function updateTileById(id: number, name: string, description: string, image: string, paths: number[], loot_table: string[], population_table: string[], event_table: string[], destination: Position, destinationMap: string) {
    const updatedTile = await sql`UPDATE aspect_dragons_tiles_ SET name=${name}, description=${description}, image=${image}, paths=${paths}, loot_table=${loot_table}, population_table=${population_table}, event_table=${event_table}, destination=${destination}, destinationMap=${destinationMap} WHERE id=${id};`
    return updatedTile
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