import { NextResponse } from "next/server";
import sql from "../../../../lib/,base/sql";
import { RegistryEntry } from "../../registry/route";
import { parsedRegistryData } from "../../util/parsedregistry";
import { ActiveUsers } from "../../../../components/page_builder";
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export type ActiveUser = {
    name: string,
    access: number,
    time: number
}

export async function GET(req, res): Promise<ActiveUser[] | any>{
    const ACTIVEUSERS = 'active_users'
    const [users]: [RegistryEntry] = await sql`SELECT * FROM aspect_registry_ WHERE name = ${ACTIVEUSERS};`
    const activeUsers: ActiveUsers[] = parsedRegistryData(users.registry_data)
    if(!users) return NextResponse.json([])
    return NextResponse.json(activeUsers)
}