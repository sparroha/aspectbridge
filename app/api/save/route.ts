import { NextResponse } from "next/server";
import sql from "../../../lib/,base/sql";

export async function GET(req: Request, res: Response) {
    const allregistries: {id: number, name: string, registry_data: string}[] = await sql`SELECT * FROM aspect_registry_;`
    if (!allregistries) return NextResponse.json({ alert: 'no registries found' });
    /*let regList: {name: string, data: any}[] = allregistries.map((reg, i)=>{
        let parsed_data: any
        try {
            parsed_data = JSON.parse(reg.registry_data)
        } catch (error) {
            parsed_data = reg.registry_data
        }
        return {name: reg.name, data: parsed_data}
    })*/
    /*let stringList = ''
    allregistries.map((reg, i)=>{
        stringList += reg.name+'::'+reg.registry_data+'<--------------->'
    })*/
    //if (!regList) return NextResponse.json({ alert: 'no registries found' })
    //raw: allregistries
    //narrow: regList
    //string: stringList

    return NextResponse.json(allregistries)
}
//UNTESTED
export async function POST(req: Request, res: Response) {
    const body = await req.json();
    if (!body?.name) return NextResponse.json({ alert: 'no body or name found' });
    const name = body.name
    let data = body.data || 'default'
    if (typeof data !== 'string') data = JSON.stringify(data)
    const inject = await sql`INSERT INTO aspect_registry_ (name, registry_data) VALUES (${name}, ${data}) ON DUPLICATE KEY UPDATE registry_data = ${data};`
    console.log(inject)
    return NextResponse.json({ inject: inject });
}
                