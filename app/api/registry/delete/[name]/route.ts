import { NextResponse } from "next/server";
import sql from "../../../../../lib/,base/sql";
import { getSlug } from "../../../util/params";

export async function GET(req: Request, context: any, res: Response) {
    const name = getSlug(context, 'name');

    if (!name) return NextResponse.json({ alert: 'no name found' });
    const del = await sql`DELETE FROM aspect_registry_ WHERE name = ${name};`
    return NextResponse.json({data: del})
}