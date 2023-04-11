import { useState, useEffect } from 'react';
import { LoginNav, ProfileByIp } from '../login/[userlogin]';
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
  const [user, setUser] = useState({username: 'guest'+props.ip.split(".")[3], email: '', access: 0})
  const [update, setUpdate] = useState(false)

  useEffect(()=>{
    let useractivate = ()=>{
      fetch('api/chat/users', {method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username: user.username})})
      .then((res)=>res.json())
      .then((data)=>{console.log(data?'user '+user.username+' active':'user not active')})
    }
    if(user) useractivate()
    let refreshactivity = setInterval(() => {
      if(user) useractivate()
    }, 1000*60*1);
    return () => clearInterval(refreshactivity);
  }, [user])
  const makeinactive = (event) => {
    // send an API command to remove the user from the session
    fetch('api/chat/deleteuser', {method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username: user.username})})
    .then((res)=>res.json())
    .then((data)=>{console.log(data?'user removed':'user not removed')})
  }
  useEffect(()=>{
    if(user) window.addEventListener('unload', makeinactive);
    if(user) window.addEventListener('beforeunload', makeinactive);
  }, [user])
  return <Container><LoginNav user={user} homepage={'chat'}/>
      <Row>
        <Col xs={8}>
          <Row>
            <Col xs={12}>
              <Messages update={update} setUpdate={setUpdate} access={user?.access} style={scroll}/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Send username={user?.username} setUpdate={setUpdate}/>
            </Col>
          </Row>
        </Col>
        <Col xs={4}>
          <Users style={scroll}/>
        </Col>
      </Row>
      <ProfileByIp ip={props.ip} setUser={setUser}/>
  </Container>
}

/**
 * Messages
 * @param param0: update, setUpdate, access, style 
 * @returns 
 */
function Messages({update, setUpdate, access, style}){
  //const [dataSorted, setDataSorted] = useState(null)
  const {data, error, mutate} = useSWR('api/chat/messages', { refreshInterval: 500 })
  const [filteredData, setFilteredData] = useState(null)
  let refresh = false
  useEffect(()=>{
    const messages = document.getElementById('messages')
    messages.scrollTop = messages.scrollHeight
    console.log("No Data")
    if(!data) return
    console.log(data)
    //if(data) setDataSorted(data.sort((a, b) => {new Date(a.timestamp).getMilliseconds() - new Date(b.timestamp).getMilliseconds()}))
  }, [data])
  useEffect(()=>{
    if(update) {mutate();setUpdate(false)}
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
    .then(data => console.log(data))
    .catch(error => console.error(error));
    mutate()
  }}
  return <div id='messages' style={{maxHeight: '30vh', ...style}}>{data?.map((message, i)=>{
      return <p key={i} style={{fontSize: '12px'}}>{access==2?<Button onClick={handleDelete(message)} style={{fontSize: 'inherit'}}>Delete</Button>:null}{'<'}{message.timestamp}{'> ['}{message.username}{'] '}{message.message}<br/></p>
  })}</div>
}

/**
 * Users
 * @param style: style
 * @returns 
 */
function Users(style){
  const {data, error} = useSWR('api/chat/users', { refreshInterval: 2000 })
  
  useEffect(()=>{
    const userTimeout = setTimeout(() =>{
      console.log('BEFORE: '+JSON.stringify(data))
      removeInactiveUsers(data, (1000*60*3))
      console.log('AFTER: '+JSON.stringify(data))
    }, 1000*60*1);
    return () => clearTimeout(userTimeout);
  }, [data])
  return <div id='active_users' style={{ maxHeight: '50vh', ...style}}>{data?.map((user, i)=>{
      return <p key={i} style={{fontSize: '10px'}}>{user.username}{'['}{user.last_active}{']'}<br/></p>
  })}</div>
}

/**
 * Send
 * @param param0: username, setUpdate
 * @returns
 */
function Send({username, setUpdate}){
  const [send, setSend] = useState('')
  const [name, setName] = useState('')
  useEffect(()=>{
    if(username)setName(username)
  }, [username])
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
    .then(data => console.log(data))
    .catch(error => console.error(error));
    setSend('')
    setUpdate(true)
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
      fetch('api/chat/deleteuser', {method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username: user.username})})
      .then((res)=>res.json())
      .then((data)=>{console.log(data?'user '+user.username+' removed for inactivity because\n lastActive'+lastActive+'<='+inactiveTime:'user not removed for inactivity')})
    }
  });
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const ip = await requestIp.getClientIp(context.req);
  return { props: { ip } };
};
