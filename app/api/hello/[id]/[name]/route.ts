import { NextResponse } from "next/server";
import { getSlugs } from "../../../util/params";

export function GET(req: Request, context: any, res: Response){
    const slugs: {[key: string]: string} = getSlugs(context);
    const {id, name}: {[key: string]: string} = slugs
    return NextResponse.json({context: context, slugs: slugs, id: id, name: name});
}