import { NextResponse } from "next/server";
import { getParams } from "../../util/params";

export function GET(req: Request, context: any, res: Response){
    const id: string = getParams(context)['id'];
    return NextResponse.json(id);
}