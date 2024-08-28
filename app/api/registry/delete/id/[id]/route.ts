import { NextResponse } from "next/server";
import sql from "../../../../../../lib/,base/sql";
import { getSlug } from "../../../../util/params";

export async function GET(req: Request, context: any, res: Response) {
    const id = getSlug(context, 'id');

    if (!id) return NextResponse.json({ alert: 'no id found' });
    const del = await sql`DELETE FROM aspect_registry_ WHERE id = ${id};`
    return NextResponse.json({data: del})
}