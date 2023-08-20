'use client'
import { useState, useEffect } from 'react';
import { ACTIVEUSERS, ActiveUser, LoginNav, Profile } from '../login/[userlogin]';
import { GetServerSideProps } from 'next';
import requestIp from 'request-ip';
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import useSWR from 'swr';
import useLog from '../../components/conlog';
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
  const [userState, setUserState] = useState({username: user?.username || ('guest'+(ip?.split(".")[3] || null)), email: user?.email || '', access: user?.access || 0})
  const [update, setUpdate] = useState(false)
  const [revalidate, setRevalidate] = useState(false)
  const [name, setName] = useState('')
  useEffect(()=>{
    setUserState({username:  user?.username || ('guest'+(ip?.split(".")[3] || null)), email: user?.email || '', access: user?.access || 0})
    if(!user)return
    console.log('Chat: '+JSON.stringify(userState))
    if(userState)setName(userState.username)
  }, [ip, user])
  useEffect(()=>{
    if(name) {
      const inactivate = ()=>{
        if(name)fetch('/api/chat/deleteuser', {method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username: (userState?.access==2?'[**].':(userState?.access==1?'[*].':''))+name})})
        .then((res)=>res.json())
        .then((data)=>{console.log(data?'user '+name+' left':'user not removed')})
        .catch(error => console.error(error))
      }
      //console.log('Rv1: '+JSON.stringify(user?user:name))
      window.addEventListener('unload', inactivate)
      window.addEventListener('beforeunload', inactivate)
      setRevalidate(true)
    }
  }, [name])
  useEffect(()=>{
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
  }, [revalidate])
  
  return <Container>{<LoginNav user={userState?.username?.substring(0,5)!='guest'?userState:null} homepage={props.homepage?props.homepage:'chat'}/>}
      <Row>
        <Col xs={8} style={border}>
          <Messages update={update} setUpdate={setUpdate} access={userState?.access} style={{...scroll, ...border}}/>
        </Col>
        <Col xs={4}>
          <Users style={scroll} revalidate={revalidate} activeUsers={activeUsers}/>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={border}>
          <Send name={name} access={userState?.access} setUpdate={setUpdate} setRevalidate={setRevalidate}/>
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
  const {data, error} = useSWR('/api/chat/users', { refreshInterval: 500 })
  
  useEffect(()=>{
    const userInterval = setInterval(() =>{
      //console.log('BEFORE: '+JSON.stringify(data))
      removeInactiveUsers(data, (1000*60*3))
      //console.log('AFTER: '+JSON.stringify(data))
    }, 1000*60*1);
    return () => clearInterval(userInterval);
  }, [data])
  if(true/* !activeUsers */)return <div id={ACTIVEUSERS} style={{ maxHeight: '50vh', ...style}}>{data?.map((user, i)=>{
    const User = user.username.split('.')
    const USER = {
      username: User[1],
      access: User[0]=='[**]'?2:User[0]=='[*]'?1:0,
      last_active: user.last_active
    }
    const {username, access, last_active} = USER
    const color = access==2?'red':access==1?'orange':'black';
    return <div key={i} style={{fontSize: '12px'}}><div style={{color: color, float: 'left'}}>{User[0]}</div>{username}{'['}{last_active}{']'}<br/></div>
  })}</div>

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
function Send({name, access, setUpdate, setRevalidate}){
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
              username: name,
              send: send,
              access: access
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
          })
          .catch(error => console.error(error));
          break;
        case 'revalidate':
          setRevalidate(true)
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
        username: name,
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
      setRevalidate(true)
    }, 100)
  }
  return <Form onSubmit={handleSubmit} style={{ maxHeight: '20vh'}}>
      <Form.Control type='text' style={{visibility: 'collapse', border: '0px', margin: '0px', padding: '0px', height: '0px'}} name='username' defaultValue={name}/> 
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