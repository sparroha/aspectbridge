import sql from "../../../lib/,base/sql"

/**
 * 
 * @param req query: name, description, oninit, onupdate, ondestroy, method; 
 * @param res 
 * 
 * @returns {event, events, eventInfo}
 */
export default async function getEvenInfo(req, res) {
    //sql`INSERT INTO aspect_dragons_events_ (name, description, oninit) VALUES (${'fall'}, ${'you fell'}, ${JSON.stringify(['fall'])});`
    //TABLE ALREADY EXISTS
    /*const newTable = await sql`CREATE TABLE IF NOT EXISTS aspect_dragons_events_ (
                        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        name varchar(255),
                        description varchar(255),
                        oninit varchar(255),
                        onupdate varchar(255),
                        ondestroy varchar(255)
                    );`*/
    //call array from table
    const { name, description, oninit, onupdate, ondestroy, method } = req.body || req.query;//?
    if(method=='add') {//works but doesnt work
        const newEvent = await addNewEvent(name, description, oninit, onupdate, ondestroy)
        return res.status(200).json({newEvent})
        //const event = await getFirstEventByName(name)
        //return res.status(200).json({event})
    } else if(method=='get'||!method) {
        const event = await getFirstEventByName(name)
        //if(!event) return res.status(404).json({name: name, message: 'No event found.', method: method, success: false})
        return res.status(200).json({event})
    } else if(method=='getall') {
        const events = await getAllEvents()
        //if(!events) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json({events})
    } else if(method=='delete') {
        const events = await deleteEventByName(name)
        //if(!event) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json({events})
    } else if(method=='update') {
        const event = await updateEventByName(name, description, oninit, onupdate, ondestroy)
        if(!event) return res.status(404).json({message: 'No event found.'})
        return res.status(200).json({event})
    }else return res.status(404).json({message: 'No event found.'})
}
async function getFirstEventByName(name) {
    const [event] = await sql`SELECT * FROM aspect_dragons_events_ WHERE name = ${name};`
    return event
}
async function getAllEvents() {
    const events = await sql`SELECT * FROM aspect_dragons_events_ WHERE 1;`
    return events
}
/*export async function getEventData(req?, res?): Promise<EventData[]> {
    const { name, method } = req.query;
    try {
        const events = await sql`SELECT * FROM aspect_dragons_events_ WHERE ${name=='all'?'1': 'name = '+name};`
        console.log(events)
        const eventInfo: EventData[] = events.map((event) => {
            return {
                id: event.id,
                name: event.name,
                description: event.description,
                oninit: JSON.parse(event.oninit),
                onupdate: JSON.parse(event.onupdate),
                ondestroy: JSON.parse(event.ondestroy),
            }
        })
        return eventInfo
    } catch (error) {
        console.log(error)
        return [null]
    }
}*/
async function addNewEvent(name?, description?, oninit?, onupdate?, ondestroy?) {
    const [event] = await sql`INSERT INTO aspect_dragons_events_ (name, description, oninit, onupdate, ondestroy) VALUES (${name}, ${description}, ${oninit}, ${onupdate}, ${ondestroy});`
    return event
}
//general use unteasted
async function insertInto(table: string = 'aspect_dragons_events_', fields: string[], values: string[]) {
    const [event] = await sql`INSERT INTO ${table} (${fields.map((f, i)=>{return f+(i==fields.length-1?'':', ')})}) VALUES (${values.map((v, i)=>{return v+(i==values.length-1?'':', ')})});`
    return event
}
async function deleteEventByName(name) {
    try {
        await sql`DELETE FROM aspect_dragons_events_ WHERE name = ${name};`
        return getAllEvents()
    } catch (error) {
        return error
    }
}
//general use unteasted
async function deleteFrom(table: string = 'aspect_dragons_events_', fields: string[], values: string[]) {
    try {
        await sql`DELETE FROM ${table} WHERE ${fields.map((f, i)=>{return f+' = '+values[i]+(i==fields.length-1?'':' AND ')})};`
        return getAllEvents()
    } catch (error) {
        return error
    }
}
async function updateEventByName(name, description?, oninit?, onupdate?, ondestroy?) {
    const [event] = await sql`UPDATE aspect_dragons_events_ SET ${description?'description = '+description+', ':'' }${oninit?'oninit = '+oninit+', ':'' }${onupdate?'onupdate = '+onupdate+', ':'' }${ondestroy?'ondestroy = '+ondestroy+', ':'' }WHERE name = ${name};`
    return event
}
//general use unteasted
/*async function updateInto(table: string = 'aspect_dragons_events_', fields: string[], values: string[], whereFields: string[], whereValues: string[]) {
    const [event] = await sql`UPDATE ${table} SET ${fields.map((f, i)=>{return f+' = '+values[i]+(i==fields.length-1?'':', ')})} WHERE ${fields.map((f, i)=>{return f+' = '+values[i]+(i==fields.length-1?'':' AND ')})};`
    return event
}*/