import { NextResponse } from "next/server";
import sql from "../../../../lib/,base/sql";
import { getParams, getSearchParams } from "../../util/params";

export async function GET(req: Request, context: any, res: Response) {
    const create: boolean =  getSearchParams(req).get('create')=='true'? true : false;
    const name = getParams(context)['name'];
    if (!name) return NextResponse.json({ alert: 'no name found'});
    const [register] = await sql`SELECT * FROM aspect_registry_ WHERE name = ${name};`
    if (register) {return NextResponse.json({data: register.registry_data})}
    
    if(!create) return NextResponse.json({ alert: 'no registry found' })
    let newR = await sql`INSERT INTO aspect_registry_ (name, registry_data) VALUES (${name}, ${"default"}) ON DUPLICATE KEY UPDATE registry_data = ${"default"};`
    const [newregister] = await sql`SELECT * FROM aspect_registry_ WHERE name = ${name};`
    if (!newregister) return NextResponse.json({ final: 'no registry created' })
    return NextResponse.json({ data: newregister.registry_data, sqlresponse: newR})
}