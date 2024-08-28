import { NextResponse } from "next/server";
import sql from "../../../../lib/,base/sql";
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function GET(req: Request, res: Response) {
    return NextResponse.json({ alert: 'GET not allowed' });
}
//UNTESTED
export async function POST(req: Request, res: Response) {
    
    const { access, username } = await req.json();
    if(access<2) return NextResponse.json({ alert: 'access denied' });

    const deleted = await sql`DELETE FROM aspect_users_ WHERE username = ${username}`
    if (!deleted) return NextResponse.json({ alert: 'no user found or deleted' });
    return NextResponse.json(deleted)
}