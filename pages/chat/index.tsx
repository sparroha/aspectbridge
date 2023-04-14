import { useState, useEffect } from 'react';
import { LoginNav, Profile, ProfileByIp } from '../login/[userlogin]';
import { GetServerSideProps } from 'next';
import requestIp from 'request-ip';
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import useSWR from 'swr';
import useLog from '../../components/conlog';

const scroll = {
  overflowY: 'scroll'
}

/**
 * Chat App
 * @param props: ip, user, session
 * @returns 
 */
export default function Chat(props){
  const [user, setUser] = useState(props.user?props.user:{username: 'guest'+props.ip.split(".")[3], email: '', access: 0})
  const [update, setUpdate] = useState(false)
  const [revalidate, setRevalidate] = useState(false)
  const [name, setName] = useState('')
  useEffect(()=>{
    if(user)setName(user.username)
  }, [user])
  useEffect(()=>{
    if(name) {
      const inactivate = ()=>{
        if(name)fetch('/api/chat/deleteuser', {method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username: (user?.access==2?'[**].':(user?.access==1?'[*].':''))+name})})
        .then((res)=>res.json())
        .then((data)=>{console.log(data?'user '+name+' left':'user not removed')})
        .catch(error => console.error(error))
      }
      console.log('Rv1: '+JSON.stringify(user?user:name))
      window.addEventListener('unload', inactivate)
      window.addEventListener('beforeunload', inactivate)
      setRevalidate(true)
    }
  }, [name])
  useEffect(()=>{
    if(revalidate){
      const activate = ()=>{
        console.log('Rv3: '+JSON.stringify(user))
        if(name)fetch('/api/chat/users', {method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username: (user?.access==2?'[**].':(user?.access==1?'[*].':''))+name})})
        .then((res)=>res.json())
        .then((data)=>{console.log(data?'user '+name+' active':'user not active')})
        .catch(error => console.error(error))
      }
      console.log('Rv2: '+JSON.stringify(user?user:name))
      activate()
      setRevalidate(false)
    }
  }, [revalidate])
  
  
  return <Container>{!props.user?<LoginNav user={user} homepage={'chat'}/>:null}
      <Row>
        <Col xs={8}>
          <Row>
            <Col xs={12}>
              <Messages update={update} setUpdate={setUpdate} access={user?.access} style={scroll}/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Send name={name} setUpdate={setUpdate} setRevalidate={setRevalidate}/>
            </Col>
          </Row>
        </Col>
        <Col xs={4}>
          <Users style={scroll} revalidate={revalidate}/>
        </Col>
      </Row>
      <Row style={{visibility: 'collapse', height: '0px'}}>
        <Col xs={12}>{props.ip?<Profile ip={props.ip} setUser={setUser}/>:null}</Col>
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
    let filteredData = null;
    fetch('/api/chat/deletesend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({
        time: message.timestamp,
        message: message.message
      })
    })
    .then(response => response.json())
    .then(data => {mutate(),console.log(data)})
    .catch(error => console.error(error));
  }}
  return <>
    Search: <input type='text' defaultValue={''} onChange={(event)=>{setFilteredData(data.filter((message)=>{return message.message.includes(event.target.value)}))}}/>
    <div id='messages' style={{maxHeight: '50vh', minHeight: '20px', ...style}}>
      {filteredData?.map((message, i)=>{
        return <p key={i} style={{fontSize: '12px'}}>{access==2?<Button onClick={handleDelete(message)} style={{fontSize: 'inherit'}}>Delete</Button>:null}{'< '}{message.timestamp}{' > ['}{message.username}{'] '}{message.message}<br/></p>
      })}
    </div>
  </>
}

/**
 * Users
 * @param style: style
 * @returns 
 */
function Users(style){
  const {data, error} = useSWR('/api/chat/users', { refreshInterval: 500 })
  
  useEffect(()=>{
    const userInterval = setInterval(() =>{
      //console.log('BEFORE: '+JSON.stringify(data))
      removeInactiveUsers(data, (1000*60*3))
      //console.log('AFTER: '+JSON.stringify(data))
    }, 1000*60*1);
    return () => clearInterval(userInterval);
  }, [data])
  return <div id='active_users' style={{ maxHeight: '50vh', ...style}}>{data?.map((user, i)=>{
    const User = user.username.split('.')
    const USER = {
      username: User[1],
      access: User[0]=='[**]'?2:User[0]=='[*]'?1:0,
      last_active: user.last_active
    }
    const {username, access, last_active} = USER
    const color = access==2?'red':access==1?'orange':'black';
    return <p key={i} style={{fontSize: '10px'}}><div style={{color: color, float: 'left'}}>{User[0]}</div>{username}{'['}{last_active}{']'}<br/></p>
  })}</div>
}

/**
 * Send
 * @param param0: username, setUpdate
 * @returns
 */
function Send({name, setUpdate, setRevalidate}){
  const [send, setSend] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/chat/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({
        username: name,
        send: send
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
    }, 100)
  }
  return <Form onSubmit={handleSubmit} style={{ maxHeight: '20vh'}}>
      <Form.Control type='text' style={{visibility: 'collapse'}} name='username' defaultValue={name}/> 
      <Row>
          <Col xs={10}>
            <Form.Control type='text' name='send' style={{width: '100%'}} onChange={(event)=>{setSend(event.target.value)}} value={send}/>
            {/*<textarea style={{width: '100%'}} onChange={(event)=>{setSend(event.target.value)}}/>
            <Form.Control type='text' style={{visibility: 'collapse'}} name='send' defaultValue={send}/>*/}
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


export const getServerSideProps: GetServerSideProps = async (context) => {
  const ip = await requestIp.getClientIp(context.req);
  return { props: { ip } };
};
