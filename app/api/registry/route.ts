import { NextResponse } from "next/server";
import sql from "../../../lib/,base/sql";
export type RegistryEntry = {
	id: number
	name: string
	registry_data: string
}
export type RegistryFetch = { data?: string, sqlresponse?: any, alert?: string}
export async function GET(req: Request, res: Response) {
    const allregistries: RegistryEntry[] = await sql`SELECT * FROM aspect_registry_;`
    if (!allregistries) return NextResponse.json({ alert: 'no registries found' });
    return NextResponse.json(allregistries)
}
//UNTESTED
export async function POST(req: Request, res: Response) {
    const {name, data}: {name: string, data: any} = await req.json();
    if (!name) return NextResponse.json({ alert: 'no body or name found' });
    const dataString = (typeof data !== 'string')?JSON.stringify(data): data
    
    const inject = await sql`INSERT INTO aspect_registry_ (name, registry_data) VALUES (${name}, ${dataString}) ON DUPLICATE KEY UPDATE registry_data = ${data};`
    console.log('/api/registry.POST:', inject, 'FROM:', {name, data})
    return NextResponse.json({ sqlresponse: inject });
}
                