import sql from "../../../lib/,base/sql"
import { RegionData } from "../../dragons/components/region";
import { treeOfLife } from "../../dragons/components/worldmap";

export type a_d_maps_ = {
    name: string,
    description: string,
    mapX: number,
    mapY: number,
    mapZ: number,
    tile: string
}
/**
 * 
 * @param req query: name, description, oninit, onupdate, ondestroy, method; 
 * @param res 
 * 
 * @returns {event, events, eventInfo}
 */
export default async function getMapInfo(req, res) {
    //DATA IS TOO LARGE FOR MAP SIZE. need to use floorplan instead of map for this. map = floors
    //sql`INSERT INTO aspect_dragons_maps_ (name, description, map) VALUES (${'fall'}, ${'you fell'}, ${JSON.stringify(treeOfLife)});`
    //TABLE ALREADY EXISTS BUT
    //await sql`DROP TABLE IF EXISTS aspect_dragons_maps_;`
    /*const newTable = await sql`CREATE TABLE IF NOT EXISTS aspect_dragons_maps_ (
                        name varchar(255),
                        description varchar(255),
                        mapX int(255),
                        mapY int(255),
                        mapZ int(255),
                        tile varchar(255)
                    );`
                    return res.status(200).json({newTable})*/
    //call array from table
    const { name, description, x, y, z, tile, method } = req.body || req.query;//?
    //const { name, description, x, y, z, tile } = body
    if(!method){
        const allM = await getAllMaps()
        return res.status(200).json(allM)
    }
    if(method=='set') {
        const insert = await setMapTilename(name, x, y, z, tile, description)
        //if(!event) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json(insert)
    }
    else if(method=='get'||!method) {
        const map = await getFirstMapByName(name)
        //if(!event) return res.status(404).json({name: name, message: 'No event found.', method: method, success: false})
        return res.status(200).json(map)
    }
    else if(method=='getall') {
        const maps = await getAllMaps()
        //if(!events) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json(maps)
    }
    else if(method=='delete') {
        const map = await deleteMapByName(name)
        //if(!event) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json(map)
    }
    else if(method=='update') {
        const upd = await updateMapByName(name, x, y, z, tile, description)
        //if(!event) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json(upd)
    }
    /*let event = null
    let events = null
    let eventInfo: EventData[] = null//TODO<-- whats happening here?
    try{eventInfo = await getEventData(req, res)}catch(error){console.log(error)}
    
    if( name ) {
        event = await getFirstEventByName(name) //return only first event from sql query
        events = await getAllEventByName(name)
    }
    if(!event) res.status(404).json({message: 'No event found.'})
    else res.status(200).json({event, events, eventInfo})*/
}
async function getFirstMapByName(name) {
    const map = await sql`SELECT * FROM aspect_dragons_maps_ WHERE name = ${name};`
    return map
}
async function getAllMaps() {
    const maps = await sql`SELECT * FROM aspect_dragons_maps_ WHERE 1;`
    return maps
}

async function setMapTilename(name, x, y, z, tile, description?) {
    const [map] = await sql`INSERT INTO aspect_dragons_maps_ (name, description, mapX, mapY, mapZ, tile) VALUES (${name}, ${description}, ${x}, ${y}, ${z}, ${tile});`
    return map
}
//general use unteasted
/*async function insertInto(table: string, fields: string[], values: string[]) {
    //const querystr = `INSERT INTO ${table} (${fields.map((f)=>{return f})}) VALUES (${values.map((v)=>{return v})});`
    const [insert] = await sql`INSERT INTO ${table} (${fields.map((f)=>{return f})}) VALUES (${values.map((v)=>{return v})});`
    return insert
}*/
async function deleteMapByName(name) {
    const [map] = await sql`DELETE FROM aspect_dragons_maps_ WHERE name = ${name};`
    return map
}
//general use unteasted
/*async function deleteFrom(table: string = 'aspect_dragons_maps_', fields: string[], values: string[]) {
    const [map] = await sql`DELETE FROM ${table} WHERE ${fields.map((f, i)=>{return f+' = '+values[i]+(i==fields.length-1?'':' AND ')})};`
    return map
}*/
async function updateMapByName(name, x, y, z, tile, description?) {
    //corrected for error in comma spacing
    const [update] = await sql`UPDATE aspect_dragons_maps_ SET ${description?'description = '+description+' ':'' }${', mapX = '+x+'' }${', mapY = '+y+'' }${', mapZ = '+z+'' }${', tile = '+tile+'' } WHERE name = ${name};`
    return update
}
//general use unteasted
/*async function updateInto(table: string = 'aspect_dragons_maps_', fields: string[], values: string[], whereFields: string[], whereValues: string[]) {
    const [map] = await sql`UPDATE ${table} SET ${fields.map((f, i)=>{return f+' = '+values[i]+(i==fields.length-1?'':', ')})} WHERE ${fields.map((f, i)=>{return f+' = '+values[i]+(i==fields.length-1?'':' AND ')})};`
    return map
}*/