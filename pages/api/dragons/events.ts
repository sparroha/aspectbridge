import sql from "../../../lib/,base/sql"

export type EventData = {
    id?: number,
    name: string,
    description?: string,
    oninit?: string[],//JSON.stringify(['function1', 'function2'])
    onupdate?: string[],//JSON.stringify(['function1', 'function2'])
    ondestroy?: string[],//JSON.stringify(['function1', 'function2'])
}
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
    const { name, description, oninit, onupdate, ondestroy, method } = req.query;
    if(method=='set') {
        const event = await setNewEventByName(name, description, oninit, onupdate, ondestroy)
        //if(!event) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json({event})
    }
    if(method=='get'||!method) {
        const event = await getFirstEventByName(name)
        //if(!event) return res.status(404).json({name: name, message: 'No event found.', method: method, success: false})
        return res.status(200).json({event})
    }
    if(method=='getall') {
        const events = await getAllEvents()
        //if(!events) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json({events})
    }
    if(method=='delete') {
        const event = await deleteEventByName(name)
        //if(!event) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json({event, message: 'Event deleted', method: method, success: true})
    }
    if(method=='update') {
        const event = await updateEventByName(name, description, oninit, onupdate, ondestroy)
        //if(!event) return res.status(404).json({message: 'No event found.', method: method, success: false})
        return res.status(200).json({event, message: 'Event updated', method: method, success: true})
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
async function setNewEventByName(id? ,name?, description?, oninit?, onupdate?, ondestroy?) {
    if(name.toLowerCase()=='all') return null
    const [event] = await sql`INSERT INTO aspect_dragons_events_ (name, description, oninit, onupdate, ondestroy) VALUES (${name}, ${description}, ${oninit}, ${onupdate}, ${ondestroy});`
    return event
}
async function deleteEventByName(name) {
    if(name.toLowerCase()=='all') return null
    const [event] = await sql`DELETE FROM aspect_dragons_events_ WHERE name = ${name};`
    return event
}
async function updateEventByName(name, description?, oninit?, onupdate?, ondestroy?) {
    if(name=='all') return null
    const [event] = await sql`UPDATE aspect_dragons_events_ SET ${description?'description = '+description+', ':'' }${oninit?'oninit = '+oninit+', ':'' }${onupdate?'onupdate = '+onupdate+', ':'' }${ondestroy?'ondestroy = '+ondestroy+', ':'' }WHERE name = ${name};`
    return event
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