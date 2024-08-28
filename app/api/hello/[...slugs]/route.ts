import { NextResponse } from "next/server";
import { getQuery, getSpreadSlugs } from "../../util/params";

export function GET(req: Request, context: any, res: Response){
    const slugs = getSpreadSlugs(context, 'slugs');
    const query = getQuery(req);
    return NextResponse.json({context: context, query: query, slugs: slugs});
}