import { NextResponse } from "next/server";
import { getQueryArray, getSearchParams } from "../util/params";

export async function GET(req: Request, res: Response) {
    const search = getSearchParams(req);
    const query:{[key: string]: string} = Object.fromEntries(getQueryArray(req));
    const {username} = query;
    
    //const body = await req.json();
    return NextResponse.json(username);
}
//UNTESTED
export async function POST(req: Request, res: Response) {
    const body = await req.json();
    return NextResponse.json({ sqlresponse: 'nill' });
}
