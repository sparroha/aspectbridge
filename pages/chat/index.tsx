import { useState, useEffect } from 'react';
import { ProfileByIp } from '../login/[userlogin]';
import { GetServerSideProps } from 'next';
import requestIp from 'request-ip';
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import useSWR from 'swr';
import useLog from '../../components/conlog';

const scroll = {
  overflowY: 'scroll'
}
export default function Chat(props){
  const [user, setUser] = useState(null)
  //const [session, setSession] = useState(null)
  const [update, setUpdate] = useState(false)
  const [send, setSend] = useState('')
  const [messages, setMessages] = useState(null)

  useEffect(()=>{
    if(user) {
      fetch('api/chat/users', {method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username: user.username})})
      .then((res)=>res.json())
      .then((data)=>{console.log(data?'user added':'user not added')})
    }
  }, [user])
  useEffect(()=>{
    if(user) window.addEventListener('beforeunload', function (event) {
      // send an API command to remove the user from the session
      fetch('api/chat/deleteuser', {method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username: user.username})})
      .then((res)=>res.json())
      .then((data)=>{console.log(data?'user removed':'user not removed')})
    });
  }, [user])
  return <Container><NavBar user={user} homepage={'chat'}/>
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
function Messages({update, setUpdate, access, style}){
  const {data, error, mutate} = useSWR('api/chat/messages', { refreshInterval: 500 })
  let refresh = false
  useEffect(()=>{
    const messages = document.getElementById('messages')
    messages.scrollTop = messages.scrollHeight
    console.log(data)
  }, [data])
  useEffect(()=>{
    if(update) {mutate();setUpdate(false)}
  }, [update])
  function handleDelete(message){return () =>{
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
function Users(style){
  const {data, error} = useSWR('api/chat/users', { refreshInterval: 2000 })
  useEffect(()=>{
    const messages = document.getElementById('messages')
    messages.scrollTop = messages.scrollHeight
    console.log(data)
  }, [data])
  return <div id='active_users' style={{ maxHeight: '50vh', ...style}}>{data?.map((user, i)=>{
      return <p key={i} style={{fontSize: '10px'}}>{user.username}{'['}{user.last_active}{']'}<br/></p>
  })}</div>
}

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
            <textarea name='send' style={{width: '100%'}} onChange={(event)=>{setSend(()=>{alert(event.target.value);return event.target.value})}} value={send}/>
          </Col>
          <Col xs={2}>
            <Button type='submit'>Send</Button>
          </Col>
      </Row>
  </Form>
}

function NavBar({ user, homepage }) {
  return (
    <Nav>
      <Nav.Link 
        href={
          '/login/' + (user ? 'logout' : 'login') + 
          '?homepage=' + homepage + 
          (user ? '&username=' + user.username : '')
        }>
        {user ? 'Logout ' + user.username : 'Login'}
      </Nav.Link>{' '}
    </Nav>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ip = await requestIp.getClientIp(context.req);
  return { props: { ip } };
};
