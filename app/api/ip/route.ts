import { NextResponse } from "next/server";
import requestIp from 'request-ip';

export async function GET(req: Request, res: Response) {//not working
    const ip = await requestIp.getClientIp(req)
    const hip = await req.headers['x-client-ip'];
    return NextResponse.json({ip: ip, hip: hip});
}

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    return NextResponse.json({ sqlresponse: 'nill' });
}