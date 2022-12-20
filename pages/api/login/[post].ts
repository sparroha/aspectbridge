import { useRouter } from "next/router"
import sql, { ActiveUser } from "../../../lib/,base/sql"

export default async function handler(req, res) {
    const router = useRouter()
    const { aspect } = router.query //query url props
    if(aspect === 'login') {
        let [Q] = await sql`UPDATE aspect_users_ SET username=${username}, email=${newemail}, access=${access} hash=${newhash} WHERE hash=${hash};`
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
    if(aspect === 'register') {}

    switch (req.method) {
        case 'POST': {}
        case 'GET': {}
        case 'PUT': {}
        case 'DELETE': {}
        default: {}
    }
}