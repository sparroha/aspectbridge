import { useRouter } from "next/router"
import sql, { ActiveUser } from "../../lib/,base/sql"

const router = useRouter()
const { loginPath } = router.query //query url props


export const getUser = async (context) => {
    const hash = context.query.hash
    const [Q] = await sql`SELECT (username, email, access) FROM aspect_users_ WHERE hash = ${hash}`
    if(Q) {
        const user: ActiveUser = {
            username: Q.username,
            email: Q.email,
            access: Q.access
        }
        return user
    }
    return false
}