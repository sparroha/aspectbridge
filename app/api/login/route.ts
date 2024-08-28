import { NextResponse } from "next/server";
import { getQuery, getSearchParams } from "../util/params";

export async function GET(req: Request, res: Response) {
    return NextResponse.json({ sqlresponse: 'nill' });
    //const search = getSearchParams(req);
    //const query:{[key: string]: string} = getQuery(req);
    //const {username} = query;
    
    //const body = await req.json();
    //return NextResponse.json(username);
}
//UNTESTED
export async function POST(req: Request, res: Response) {
    const body = await req.json();
    return NextResponse.json({ sqlresponse: 'nill' });
}
