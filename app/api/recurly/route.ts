import { NextResponse } from "next/server";
import { getQuery } from "../util/params";
// GET /api/hello?name=World
export async function GET(req: Request, context: any, res: Response) {
    const authHeader = req.headers.get('Authorization');
    const query = getQuery(req);
    const secret = process.env.CRON_SECRET;
    if (authHeader !== `Bearer ${secret}` && query['Authorization'] !== secret) {
        return new Response('Not authorized: auth='+query['Authorization'],{status: 401});
    }
    return Response.json({ success: true });
}
