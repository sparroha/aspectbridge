'use client'
import useUser from "./^user"
export default function UserLogin(props){
    const {homepage, style, debug} = props
    const user = useUser()
    function handleLogout(e){
        document.cookie = 'hash=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        console.log('COOKIE at logout', document.cookie)
    }
    if(!user) return <a className={props.className} style={style} 
        href={'/login/login?homepage=' + homepage}
    >Login</a>
    return <a className={props.className} style={style} 
        href={'/login/logout?homepage=' + homepage}
        onClick={handleLogout}
    >{'Logout '+user.username}</a>
}