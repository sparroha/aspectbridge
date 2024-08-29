import { NextResponse } from "next/server";
import sql from "../../../../lib/,base/sql";
import { getQuery, getSearchParams, getSlug } from "../../util/params";
import { RegistryEntry } from "../route";

export async function GET(req: Request, context: any, res: Response): Promise<RegistryEntry | any> {
    const name: string = getSlug(context,'name');
    const query = getQuery(req);
    const create: boolean = Boolean(query.create).valueOf();
    if (!name) return NextResponse.json({ alert: 'no name found', create: create, query: query });
    const [registry]: [RegistryEntry] = await sql`SELECT * FROM aspect_registry_ WHERE name = ${name};`
    if (registry) {return NextResponse.json(registry)}
    
    if(!create) return NextResponse.json({ alert: 'no registry found', create: create })
    let newR = await sql`INSERT INTO aspect_registry_ (name, registry_data) VALUES (${name}, ${"default"}) ON DUPLICATE KEY UPDATE registry_data = ${"default"};`
    const [newregistry]: [RegistryEntry] = await sql`SELECT * FROM aspect_registry_ WHERE name = ${name};`
    if (!newregistry) return NextResponse.json({ final: 'no registry created' })
    return NextResponse.json(newregistry)
}