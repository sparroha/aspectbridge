import { NextResponse } from "next/server";

// GET /api/hello?name=World
export async function GET(req: Request, res: Response) {
    //const url = new URL(req.url);
    const name = (new URL(req.url)).searchParams.get('name') || 'World';
    return NextResponse.json({ message: 'Hello '+name+'!' });
}

export async function POST(req: Request, res: Response) {
    const request = await req.json();
    return NextResponse.json({ message: request });
}