'use client'
import useSWR from "swr"
import jsonFetch from "../,base/jsonFetch"
import useUsers from "./^users"
import { useHashCookie } from "./^hashcookie"

export default function UserLogin({homepage, style }){
    const [hash, setHash] = useHashCookie()
    const { data, error } = useSWR('../api/getuserdetails?'+(hash&&hash!=null?'&hash='+hash:''), {fetcher: jsonFetch, refreshInterval: 2000})
    return <a style={style} href={
        `/login/${data ? 'logout' : 'login'}`+
        '/login/' + (data ? 'logout' : 'login') + 
        '?homepage=' + homepage + 
        (data ? '&username=' + data.username : '')
    }>
        {data ? 'Logout ' + data.username : 'Login'}
    </a>
}
/*
export function Profile(props) {
    const [activeUsers, registerActiveUsers, usersloaded]:[string, Function, boolean] = useRegister(ACTIVEUSERS,[])
    const {ip, setUser, hash, setActiveUsers} = props
    const { data, error } = useSWR('../api/getuserdetails?ip='+ip+(hash&&hash!=null?'&hash='+hash:''), {refreshInterval: 10000})
    const debug = props.debug
    useEffect(() => {
      if(!data) return
      setUser(data)
  
      //console.log('@Profile@[userlogin]:-mounting activeUsers: '+activeUsers)
      //console.log('@Profile@[userlogin]:--mounting: '+JSON.stringify(data))
      
      //**SET ACTIVE USERS *
      activateUser(data)
  
      return () => {
        //console.log('@Profile@[userlogin]:-unmounting: '+JSON.stringify(data))
      }
    },[data,usersloaded])
  
    useEffect(()=>{
      if(!usersloaded || !activeUsers) return console.log('No activateUsers')
      if(!setActiveUsers) return console.log('No setActiveUsers function provided')
      if(activeUsers=='default') return console.log('No active users')
      let au: ActiveUser[]
      try{
        au = JSON.parse(activeUsers)
      }catch(e){
        console.log('Error parsing active users: '+activeUsers+':'+e)
        return
      }
      setActiveUsers(au)//send data to external
    },[activeUsers])
  
    if (error) {
      return <Row style={props.style}><Col style={{visibility: (debug?'visible':'hidden'), position: (debug?'relative':'absolute')}}>
          {'ERROR:'+JSON.stringify(error)+'\n'}:No such user:{JSON.stringify(props)+'\nDATA:'+JSON.stringify(data)}
        </Col></Row>
    }
    if (!data) return <Row style={props.style}>loading...</Row>
    else {
      let {username, email, access} = data
      data.message = 'Welcome back '+data.username+'!'
      return <div style={{...props.style,
        color: 'white',
        background: 'none repeat scroll 0 0 #000000',
        borderRadius: '20px',
        padding: 12,
        textAlign: 'center',
        border: '2px outset #bbb',
        backgroundImage: 'linear-gradient(to bottom right, #777, #aaa, #ddd, #fff)'
        }}>
          hello {username}!{` \<${email}\> `} Your access level is {access}.
        </div>
    }
  }*/