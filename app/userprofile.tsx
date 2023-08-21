'use client'
import { useEffect, useState } from "react"
import useRegister from "../lib/util/^register"
import useSWR from 'swr'
import { ACTIVEUSERS, ActiveUser, activateUser } from "../pages/login/[userlogin]"
import { Col, Row } from "react-bootstrap"
import useUsers from "../lib/util/^users"


export default function UserProfile(props){
  const {ip, user, activeUsers} = useUsers()
  if (!user) return <Row style={props.style}>loading...</Row>

  let {username, email, access, message} = user
  message = 'Welcome back '+user.username+'{'+(message || '')+'}!'
  return <div style={{...props.style,
    color: 'white',
    background: 'none repeat scroll 0 0 #000000',
    borderRadius: '20px',
    padding: 12,
    textAlign: 'center',
    border: '2px outset #bbb',
    backgroundImage: 'linear-gradient(to bottom right, #777, #aaa, #ddd, #fff)'
  }}>
    {message}{` \<${email}\> `} Your access level is {access}.
  </div>
}

function ProfileLoc(props) {
    const [activeUsers, registerActiveUsers, usersloaded]:[string, Function, boolean] = useRegister(ACTIVEUSERS,[])
    const {ip, setUser, hash, setActiveUsers, alertA} = props
    const { data, error } = useSWR('/api/getuserdetails?ip='+ip+(hash&&hash!=null?'&hash='+hash:''), {refreshInterval: 1000})
    const debug = props.debug
    useEffect(() => {
      fetch('/api/getuser?ip='+ip).then((res)=>res.json()).then((data)=>setUser(data))
      console.log('Loading user information based on ip: '+ip+' and hash: '+hash+'...as user: '+JSON.stringify(data))
      //if(alertA)alertA(props)
      //else alert('alertA dismounted')
      console.log(props)
      console.log('@Profile@[userlogin]:--loading user data: '+JSON.stringify(data))
      if(!data) return console.log('@Profile@[userlogin]:--FAILED loading user '+ip+' data: '+JSON.stringify(data)+' @ERROR '+error)
      try{setUser(data);console.log('setUser('+JSON.stringify(data)+')')}catch{(e)=>console.log('Cant set User with function '+setUser)}
      //console.log('@Profile@[userlogin]:--mounting: '+JSON.stringify(data))
      
      /**SET ACTIVE USERS */
      activateUser(data)
      //console.log('@Profile@[userlogin]:-mounting activeUsers: '+activeUsers)
  
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
  }