import { NextResponse } from "next/server";
import { getSearchParams } from "../util/params";

// GET /api/hello?name=World
export async function GET(req: Request, context: any, res: Response) {
    const name = getSearchParams(req).get('name') || 'World';
    return NextResponse.json({ message: 'Hello '+name+'!', context: context, request: req});
}

export async function POST(req: Request, res: Response) {
    const request = await req.json();
    return NextResponse.json({ message: request });
}