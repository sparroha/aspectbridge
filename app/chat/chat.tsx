'use client'
import { useState, useEffect } from 'react';
import { ACTIVEUSERS, ActiveUser, LoginNav, Profile } from '../../pages/login/[userlogin]';
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import useSWR from 'swr';
import useUsers from '../../lib/util/^users';

const scroll = {
  overflowY: 'scroll'
}
const border = {
  border: '1px outset black',
  borderRadius: '5px'
}

/**
 * Chat App
 * @param props: ip, user
 * @returns 
 */
export default function Chat(props){
  const {ip, user, activeUsers} = useUsers()
  //const [userState, setUserState] = useState({username: user?.username || ('guest'+(ip?.split(".")[3] || null)), email: user?.email || '', access: user?.access || 0})
  const [update, setUpdate] = useState(false)
  //const [revalidate, setRevalidate] = useState(false)
  /**
   * INIT userState
   */
  //useEffect(()=>{
  //  setUserState({...user, username:  user?.username || ('guest'+(ip?.split(".")[3] || ''))})
  //}, [user])
  //useEffect(()=>{
    //if(!user)return

    /*const inactivate = ()=>{
      if(user)fetch('/api/chat/deleteuser', {method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username: (user?.access==2?'[**].':(user?.access==1?'[*].':''))+user.username})})
      .then((res)=>res.json())
      .then((data)=>{console.log(data?'user '+name+' left':'user not removed')})
      .catch(error => console.error(error))
    }*/
    //console.log('Rv1: '+JSON.stringify(user?user:name))
    //window.addEventListener('unload', inactivate)
    //window.addEventListener('beforeunload', inactivate)
    //setRevalidate(true)
  //}, [userState])
  /*useEffect(()=>{
    if(revalidate){
      const activate = ()=>{
        //console.log('Rv3: '+JSON.stringify(user))
        if(name)fetch('/api/chat/users', {method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username: (userState?.access==2?'[**].':(userState?.access==1?'[*].':''))+name})})
        .then((res)=>res.json())
        .then((data)=>{console.log(data?'user '+name+' active':'user not active')})
        .catch(error => console.error(error))
      }
      //console.log('Rv2: '+JSON.stringify(user?user:name))
      activate()
      setRevalidate(false)
    }
  }, [revalidate])*/
  
  return <Container>
    
    {<LoginNav user={user} homepage={props.homepage?props.homepage:'chat'}/>}
      <Row>
        <Col xs={8} style={border}>
          <Messages update={update} setUpdate={setUpdate} access={user?.access} style={{...scroll, ...border}}/>
        </Col>
        <Col xs={4}>
          <Users style={scroll} activeUsers={activeUsers}/>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={border}>
          <SendForm ip={ip} user={user} setUpdate={setUpdate}/>
        </Col>
      </Row>
  </Container>
}

/**
 * Messages
 * @param param0: update, setUpdate, access, style 
 * @returns 
 */
function Messages({update, setUpdate, access, style}){
  //const [dataSorted, setDataSorted] = useState(null)
  const {data, error, mutate} = useSWR('/api/chat/messages', { refreshInterval: 500 })
  const [filteredData, setFilteredData] = useState(null)
  let refresh = false
  useEffect(()=>{
    if(data) {
      setFilteredData(data);
      scrollFloor()
    }
  }, [data])
  useEffect(()=>{
    if(update) {
      mutate()
      setUpdate(false)
      scrollFloor()
    }
  }, [update])
  function handleDelete(message){return () =>{
    const date = new Date(message.timestamp);
    const sqlDate = date.toISOString()

    let filteredData = null;
    fetch('/api/chat/deletesend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({
        messageid: message.id,
        message: message.message
      })
    })
    .then(response => response.json())
    .then(data => {
      mutate()
      console.log(data)
      console.log(message.timestamp.replace('T', ' '));
      console.log(sqlDate);
    })
    .catch(error => console.error(error));
  }}
  return <>
    Search: <input type='text' defaultValue={''} onChange={(event)=>{
      setFilteredData(data.filter((message)=>{
        return message.message.includes(event.target.value)
      }))
    }}/>
    <div id='messages' style={{maxHeight: '50vh', minHeight: '20px', ...style}}>
      {filteredData?.map((message, i)=>{
        return <p key={i} style={{fontSize: '14px'}}>{access==2?<Button onClick={handleDelete(message)} style={{fontSize: 'inherit'}}>Delete</Button>:null}{'< '}{message.timestamp}{' > ['}{message.username}{'] '}{message.message}<br/></p>
      })}
    </div>
  </>
}

/**
 * Users
 * @param style: style
 * @returns 
 */

function Users(style, activeUsers: ActiveUser[]){
  if(activeUsers)return <div id={ACTIVEUSERS} style={{ maxHeight: '50vh', ...style}}>
    {activeUsers?.map((user, i)=>{
      const {name, time} = user
      const color = user.access==2?'red':user.access==1?'orange':'black';
      const access = user.access==2?'[**]':user.access==1?'[*]':'';

      return <div key={i} style={{fontSize: '12px'}}>
        <div style={{color: color, float: 'left'}}>
          {access}
        </div>
        {user.name}{'['}{time}{']'}<br/>
      </div>
    })}
  </div>

  {/**TODO update ACTIVEUSERS database for this structure of information OOOOR *update this function to call user data from db based on current ACTIVEUSERS* */}
  return<div id={ACTIVEUSERS} style={{ maxHeight: '50vh', ...style}}>{activeUsers.map((user, i)=>{
    const User = fetch('/api/getUserdetails/'+user, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json()).then(data => {
      console.log(data)
      return data
    }).catch(error => console.error(error));
    const USER = {
      username: User[1],
      access: User[0]=='[**]'?2:User[0]=='[*]'?1:0,
      last_active: user.time
    }
    const {username, access, last_active} = USER
    const color = access==2?'red':access==1?'orange':'black';
    return <div key={i} style={{fontSize: '12px'}}><div style={{color: color, float: 'left'}}>{User[0]}</div>{username}{'['}{last_active}{']'}<br/></div>
  })}</div>
}

/**
 * Send
 * @param param0: username, setUpdate
 * @returns
 */
function SendForm({ip, user, setUpdate}){
  const [send, setSend] = useState('')
  const [command, setCommand] = useState(null)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(command){
      switch(command){
        case 'clear':
          fetch('/api/chat/clear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: user?.username || 'guest'+(ip?.split(".")[3] || ''),
              send: send,
              access: user?.access || 0
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
          })
          .catch(error => console.error(error));
          break;
        case 'help':
          console.log('Commands: /clear, /revalidate, /help')
          break;
        default:
          console.log('Command not found')
          break;
      }
      return;
    }
    fetch('/api/chat/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({
        username: user.username,
        send: send,
      })
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
    })
    .catch(error => console.error(error));
    setTimeout(()=>{
      setUpdate(true)
      setSend('')
      setCommand('')
    }, 100)
  }
  return <Form onSubmit={handleSubmit} style={{ maxHeight: '20vh'}}>
      <Form.Control type='text' style={{visibility: 'collapse', border: '0px', margin: '0px', padding: '0px', height: '0px'}} name='username' defaultValue={user.username}/> 
      <Row>
          <Col xs={10}>
            <Form.Control type='text' name='send' style={{width: '100%'}}
              onChange={(event)=>{
                let out = event.target.value.toLowerCase()
                let command = out.charAt(0)=='/'?out.replace('/', '').split(' ')[0]:null
                setCommand(command)
                setSend(event.target.value)
              }} value={send}/>
          </Col>
          <Col xs={2}>
            <Button type='submit'>Send</Button>
          </Col>
      </Row>
  </Form>
}

/**
 * Remove Inactive Users
 * @param users: array of users
 * @param inactivePeriod: in milliseconds
 */
const removeInactiveUsers = async (users, inactivePeriod) => {
  const now = new Date();
  const inactiveTime = now.getTime() - inactivePeriod;

  users?.forEach(user => {
    let lastActive = new Date(user.last_active).getTime();
    if(lastActive <= inactiveTime){
      fetch('/api/chat/deleteuser', {method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username: user.username})})
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data?'user '+user.username+' removed for inactivity':'error removing user for inactivity')
      })
      .catch((err)=>console.error(err))
    }
  });
}
const scrollFloor = ()=>{
  const messages = document.getElementById('messages')
  setTimeout(() => {
    messages.scrollTop = messages.scrollHeight;
  }, 100);
}
