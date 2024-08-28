import { NextResponse } from "next/server";
import sql from "../../../../lib/,base/sql";
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

/*
UNTESTED
*/

export async function GET(req: Request, res: Response) {
    return NextResponse.json({ alert: 'GET not allowed' });
}
//UNTESTED
export async function POST(req: Request, res: Response) {
    
    const { access, username, hash, id } = await req.json();
    if(access<2) return NextResponse.json({ alert: 'access denied' });
    
    if(!hash) return NextResponse.json({message: 'No hash provided.'})
    if(!id) return NextResponse.json({message: 'No id provided.'})
    const [user] = await sql`SELECT * FROM aspect_users_ WHERE id = ${id}`
    let response = user?await sql`Update aspect_users_ SET hash = ${hash} WHERE id = ${id}`:null

    if (!response) return NextResponse.json({ alert: 'no user found or deleted' });

    return NextResponse.json(response)
}


async function setHashById(hash: string, id: number) {
    const [user] = await sql`SELECT * FROM aspect_users_ WHERE id = ${id}`
    let resp = user?await sql`Update aspect_users_ SET hash = ${hash} WHERE id = ${id}`:null
    return resp
}