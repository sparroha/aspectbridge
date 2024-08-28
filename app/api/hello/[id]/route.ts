import { NextResponse } from "next/server";
import { getParams, getSlug } from "../../util/params";

export function GET(req: Request, context: any, res: Response){
    const id: string = getSlug(context,'id');
    return NextResponse.json({context: context, slug: id});
}