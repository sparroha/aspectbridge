import { NextResponse } from "next/server";
import sql from "../../../../../lib/,base/sql";
import { getParams, getSlug } from "../../../util/params";
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

/*
UNSAFE
UNTESTED
*/

export async function GET(req: Request, context: any, res: Response) {
    
    //return NextResponse.json({ alert: 'GET not allowed' });
    const id = getSlug(context, 'id');
    
    const deleted = await sql`DELETE FROM aspect_users_ WHERE id = ${id}`
    return NextResponse.json(deleted.affectedRows+' users entrie(s) deleted of id: '+id);
}
//UNTESTED
export async function POST(req: Request, res: Response) {
    
    const { id, access } = await req.json();
    if(access<2) return NextResponse.json({ alert: 'access denied' });
    const deleted = await sql`DELETE FROM aspect_users_ WHERE id = ${id}`
    if (!deleted) return NextResponse.json({ alert: 'no user found or deleted' });
    return NextResponse.json(deleted)
}