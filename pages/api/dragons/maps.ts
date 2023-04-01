import sql from "../../../lib/,base/sql"
import { RegionData } from "../../dragons/components/region";
import { treeOfLife } from "../../dragons/components/worldmap";

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
    /*const newTable = await sql`CREATE TABLE IF NOT EXISTS aspect_dragons_maps_ (
                        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        name varchar(255),
                        description varchar(255),
                        map varchar(255)
                    );`*/
    //call array from table
    const { name, description, m, method } = req.body || req.query;//?
    if(method=='set') {
        const map = await setNewMapByName(name, description, m)
        //if(!event) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json({map})
    }
    if(method=='get'||!method) {
        const map = await getFirstMapByName(name)
        //if(!event) return res.status(404).json({name: name, message: 'No event found.', method: method, success: false})
        return res.status(200).json({map})
    }
    if(method=='getall') {
        const maps = await getAllMaps()
        //if(!events) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json({maps})
    }
    if(method=='delete') {
        const map = await deleteMapByName(name)
        //if(!event) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json({map, message: 'Event deleted', method: method, success: true})
    }
    if(method=='update') {
        const map = await updateMapByName(name, description, m)
        //if(!event) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json({map, message: 'Event updated', method: method, success: true})
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
    const [map] = await sql`SELECT * FROM aspect_dragons_maps_ WHERE name = ${name};`
    return map
}
async function getAllMaps() {
    const maps = await sql`SELECT * FROM aspect_dragons_maps_ WHERE 1;`
    return maps
}

async function setNewMapByName(id? ,name?, description?, m?) {
    if(name.toLowerCase()=='all') return null
    const [map] = await sql`INSERT INTO aspect_dragons_maps_ (name, description, map) VALUES (${name}, ${description}, ${JSON.stringify(m)});`
    return map
}
//general use unteasted
async function insertInto(table: string = 'aspect_dragons_maps_', fields: string[], values: string[]) {
    const [map] = await sql`INSERT INTO ${table} (${fields.map((f, i)=>{return f+(i==fields.length-1?'':', ')})}) VALUES (${values.map((v, i)=>{return v+(i==values.length-1?'':', ')})});`
    return map
}
async function deleteMapByName(name) {
    if(name.toLowerCase()=='all') return null
    const [map] = await sql`DELETE FROM aspect_dragons_maps_ WHERE name = ${name};`
    return map
}
//general use unteasted
async function deleteFrom(table: string = 'aspect_dragons_maps_', fields: string[], values: string[]) {
    const [map] = await sql`DELETE FROM ${table} WHERE ${fields.map((f, i)=>{return f+' = '+values[i]+(i==fields.length-1?'':' AND ')})};`
    return map
}
async function updateMapByName(name, description?, m?) {
    if(name=='all') return null
    //corrected for error in comma spacing
    const [map] = await sql`UPDATE aspect_dragons_maps_ SET ${description?'description = '+description+' ':'' }${m?', map = '+m+' ':'' }WHERE name = ${name};`
    return map
}
//general use unteasted
async function updateInto(table: string = 'aspect_dragons_maps_', fields: string[], values: string[], whereFields: string[], whereValues: string[]) {
    const [map] = await sql`UPDATE ${table} SET ${fields.map((f, i)=>{return f+' = '+values[i]+(i==fields.length-1?'':', ')})} WHERE ${fields.map((f, i)=>{return f+' = '+values[i]+(i==fields.length-1?'':' AND ')})};`
    return map
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