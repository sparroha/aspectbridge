import { NextResponse } from "next/server";
import { getParams } from "../../util/params";

export function GET(req: Request, context: any, res: Response){
    const slugs: string[] = getParams(context)['slugs'];
    return NextResponse.json(slugs);
}