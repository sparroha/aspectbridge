import { NextResponse } from "next/server";
import { getParams, getQuery, getSlug } from "../../util/params";

export function GET(req: Request, context: any, res: Response){
    const id: string = getSlug(context,'id');
    const query = getQuery(req);
    return NextResponse.json({context: context, query: query, slug: id});
}