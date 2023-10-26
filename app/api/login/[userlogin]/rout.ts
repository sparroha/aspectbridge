import { NextResponse } from "next/server";
import sql from "../../../../lib/,base/sql";
import { sha224 } from "js-sha256";

export async function GET(req: Request, res: Response) {
    const url = new URL(req.url);
    const params = url.pathname
    const create: boolean =  url.searchParams.get('create')=='true'? true : false;
    const method = params.substring(params.lastIndexOf('/')+1)
    switch (method) {
        case 'logout':
            return logout(url.searchParams.get('username'))
        case 'register':
            return register(url.searchParams.get('hash'), url.searchParams.get('username'), url.searchParams.get('email'))
        case 'update':
            return update(url.searchParams.get('nemail'), url.searchParams.get('cemail'), url.searchParams.get('password'))
        default:
            return NextResponse.json({ alert: 'no method found', url: url, search: url.searchParams });
    }
}

async function logout(username){
    await sql`Update aspect_users_ SET ip = null WHERE username = ${username}`
    return NextResponse.json({ alert: 'logged out' })
}
async function register(hash, username, email){
    const [user] = await sql`SELECT * FROM aspect_users_ WHERE hash = ${hash}`
    if (!user) await sql`INSERT INTO aspect_users_ (username, email, hash, access) values (${username}, ${email}, ${hash}, 0);`
    return NextResponse.json({ alert: 'registered' })
}
async function update(nemail, cemail, password){
    await sql`UPDATE aspect_users_ SET email = ${nemail}, hash=${sha224(nemail+''+password)} WHERE hash = ${sha224(cemail+''+password)}`
    return NextResponse.json({ alert: 'updated' })
}