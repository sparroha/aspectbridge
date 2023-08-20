'use client'
import { useState, useEffect } from 'react';
import { ACTIVEUSERS, ActiveUser, LoginNav, Profile } from '../../pages/login/[userlogin]';
import { Button, Col, Container, Form, Nav, Row, SSRProvider } from 'react-bootstrap';
import useSWR, { SWRConfig } from 'swr';
import useUsers from '../../lib/util/^users';
import jsonFetch from '../../lib/,base/jsonFetch';

const scroll = {
  overflowY: 'scroll'
}
const border = {
  border: '1px outset black',
  borderRadius: '5px',
  padding: '1px',
}

const strip = {
  margin: '0px',
  padding: '0px',
  border: '0px',
}

/**
 * Chat App
 * @param props: ip, user
 * @returns 
 */
export default function Chat(props){
  const {ip, user, activeUsers} = useUsers()
  const [update, setUpdate] = useState(false)
  
  return <SSRProvider><SWRConfig value={{ fetcher: jsonFetch }}><div style={{padding: '1px', ...(props.homepage!='chat'?{margin: '0px'}:{})}}>
    {//<>{ip}<br/>{JSON.stringify(user)}<br/>{JSON.stringify(activeUsers)}<br/></>
    }
    
      <Row>
        <Col xs={12} sm={9} style={strip}>
          <Messages update={update} setUpdate={setUpdate} user={user} homepage={props.homepage} style={{...scroll, ...border, maxHeight: props.maxHeight || '20vh', minHeight: '20px'}}/>
        </Col>
        <Col xs={12} sm={3}>
          <Users activeUsers={activeUsers} style={{...scroll, maxHeight: props.maxHeight || '20vh', minHeight: '20px'}}/>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={strip}>
          <SendForm ip={ip} user={user} setUpdate={setUpdate}/>
        </Col>
      </Row>
  </div></SWRConfig></SSRProvider>
}

/**
 * Messages
 * @param param0: update, setUpdate, access, style 
 * @returns 
 */
function Messages({update, setUpdate, user, homepage, style}){
  //const [dataSorted, setDataSorted] = useState(null)
  const deleteButtonProps = {
      fontSize: 'inherit',
      height: 'inherit',
      margin: '0px',
      padding: '0px 3px 0px 3px',
  }
  const searchInputProps = {
    minWidth: '100px',
    width: '50vw',
    maxWidth: '100%',
    margin: '0px',
    padding: '0px',
    height: '1.5em'
  }
  const {data, error, mutate} = useSWR('/api/chat/messages', { refreshInterval: 500 })
  const [filteredData, setFilteredData] = useState(null)
  let refresh = false
  //initialize messages
  useEffect(()=>{
    if(!data) return

    setFilteredData(data);
    scrollFloor()
    
  }, [data])
  //update messages
  useEffect(()=>{
    if(!update) return
    
    mutate()
    setUpdate(false)
    scrollFloor()
    
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
  return <Row><Col style={{margin: '0px', padding: '0px'}}>
    <Row style={{...style, overflowY: 'auto'}}>
      <Col xs={3} sm={2} md={2}>Search:</Col>
      <Col xs={9} sm={6} md={6} lg={7}>
        <input style={searchInputProps} type='text' defaultValue={''} onChange={(event)=>{
          setFilteredData(data.filter((message)=>{
            return message.message.includes(event.target.value)
          }))
        }}/>
      </Col>
      <Col xs={12} sm={4} md={4} lg={3}>
        <LoginNav user={user} homepage={ homepage || 'chat'} style={{fontSize: '14px'}}/>
      </Col>
    </Row>
    <div id='messages' style={style}>
      
      {filteredData?.map((message, i)=>{
        let t = new Date(message.timestamp)
        let stamp = t.getMonth()+'/'+t.getDate()+
            ' '+(t.getHours()<10?'0':'')+(t.getHours()-(t.getHours()>12?12:0))+
            ':'+(t.getMinutes()<10?'0':'')+t.getMinutes()+
            ':'+(t.getSeconds()<10?'0':'')+t.getSeconds()
        return <p key={i} style={{fontSize: '14px'}}>
          {style.access==2?<Button onClick={handleDelete(message)} style={deleteButtonProps}>Delete</Button>:null}
          {'< '}{stamp}{' > ['}{message.username}{'] '}{message.message}<br/>
        </p>
      })}
    </div>
  </Col></Row>
}

/**
 * Users
 * @param style: style
 * @returns 
 */

function Users({style, activeUsers}: {style: any, activeUsers: ActiveUser[]}){
  return <Row id={ACTIVEUSERS} style={style}>
    {activeUsers?.map((user, i)=>{
      const {name, time} = user
      const color = user.access==2?'red':user.access==1?'orange':'black';
      const access = user.access==2?'[**]':user.access==1?'[*]':'';
      const dateTime = new Date(time).toLocaleTimeString();
      return <div key={i} style={{fontSize: '12px'}}>
        <div style={{color: color, float: 'left'}}>
          {access}
        </div>
        {user.name}{'['}{dateTime}{']'}<br/>
      </div>
    })}
  </Row>

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
  const h2em = {height: '2em'}
  
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
  return <Form onSubmit={handleSubmit} style={{margin: '0px', padding: '0px'}}>
      <Form.Control type='text' style={{visibility: 'collapse', border: '0px', margin: '0px', padding: '0px', height: '0px'}} name='username' defaultValue={user?.username}/> 
      <Row style={{margin: '0px', padding: '0px'}}>
          <Col xs={10} style={{margin: '0px', padding: '0px'}}>
            <Form.Control type='text' name='send' style={{width: '100%', height: '2em'}}
              onChange={(event)=>{
                let out = event.target.value.toLowerCase()
                let command = out.charAt(0)=='/'?out.replace('/', '').split(' ')[0]:null
                setCommand(command)
                setSend(event.target.value)
              }} value={send}/>
          </Col>
          <Col xs={2} style={{margin: '0px', padding: '0px'}}>
            <Button type='submit' style={{margin: '0px', padding: '0px 5px 0px 5px', height: '2em'}}>Send</Button>
          </Col>
      </Row>
  </Form>
}

const scrollFloor = ()=>{
  const messages = document.getElementById('messages')
  setTimeout(() => {
    messages.scrollTop = messages.scrollHeight;
  }, 100);
}
