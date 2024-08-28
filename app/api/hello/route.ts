import { NextResponse } from "next/server";
import { getQuery, getSearchParams } from "../util/params";

// GET /api/hello?name=World
export async function GET(req: Request, context: any, res: Response) {
    const query = getQuery(req);
    const name = query['name'] || 'World';
    return NextResponse.json({ message: 'Hello '+name+'!', context: context, query: query});
}

export async function POST(req: Request, res: Response) {
    const request = await req.json();
    return NextResponse.json({ message: request });
}