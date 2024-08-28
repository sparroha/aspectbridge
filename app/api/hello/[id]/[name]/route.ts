import { NextResponse } from "next/server";
import { getQuery, getSlugs } from "../../../util/params";

export function GET(req: Request, context: any, res: Response){
    const slugs: {[key: string]: string} = getSlugs(context);
    const {id, name}: {[key: string]: string} = slugs
    const query = getQuery(req);
    return NextResponse.json({context: context, query: query, slugs: slugs});
}