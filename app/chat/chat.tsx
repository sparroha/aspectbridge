'use client'
import { useState, useEffect } from 'react';
import { Button, Col, Form, Nav, Row } from 'react-bootstrap';
import useSWR, { SWRConfig } from 'swr';
import useUser from '../../lib/util/^user';
import jsonFetch from '../../lib/,base/jsonFetch';
import ActiveUsers from '../../lib/util/-activeusers-';

const scroll = {
  overflow: 'scroll'
}
const border = {
  border: '1px outset black',
  borderRadius: '5px',
  padding: '1px',
  maxHeight: '100vh',
  minHeight: '20vh',
}
const fill = {
  width: '100%',
  height: '100%',
}
const strip = {
  margin: '0px',
  padding: '0px',
  //border: '0px',
}

/**
 * Chat App
 * @param props: ip, user
 * @returns 
 */
export default function Chat(props){
  const user = useUser()
  const [update, setUpdate] = useState(false)
  
  return <SWRConfig value={{ fetcher: jsonFetch }}>
    <div style={{padding: '1px', ...fill, ...(props.homepage!='chat'?{margin: '0px'}:{})}}>
      <Row style={{height: '80%'}}>
        <Col xs={12} sm={9} style={strip}>
          <Messages update={update} setUpdate={setUpdate} user={user} homepage={props.homepage} style={{...border}}/>
        </Col>
        <Col xs={12} sm={3}>
          <ActiveUsers style={{...scroll}}/>
        </Col>
      </Row>
      <Row style={{height: '20%'}}>
        <Col xs={12} style={strip}>
          <SendForm ip={null} user={user} setUpdate={setUpdate}/>
        </Col>
      </Row>
    </div>
  </SWRConfig>
}
function ChatWindow({user, data, filteredData, setFilteredData, handleDelete}){
  return <Row style={{...strip, height: '2em'}}>
      <Col>
        <SearchHeader data={data} setFilteredData={setFilteredData}/>
        <MessageWindow user={user} filteredData={filteredData} handleDelete={handleDelete}/>
      </Col>
    </Row>
}
function SearchHeader({data, setFilteredData}){
  const searchInputProps = {
    minWidth: '100px',
    width: '50vw',
    maxWidth: '100%',
    margin: '0px',
    padding: '0px',
    height: '1.5em'
  }
  return <Row id={'search'} style={{...strip, height: '2em'}}>
  <Col xs={3} sm={2} md={2}>Search:</Col>
  <Col xs={9} sm={6} md={6} lg={7}>
    <input style={searchInputProps} type='text' defaultValue={''} onChange={(event)=>{
      setFilteredData(data.filter((message)=>{
        return message.message.includes(event.target.value)
      }))
    }}/>
  </Col>
</Row>
}
function MessageWindow({user, filteredData, handleDelete}){
  const deleteButtonProps = {
    fontSize: 'inherit',
    height: 'inherit',
    margin: '0px',
    padding: '0px 3px 0px 3px',
  }
  return <Row id={'messages'} style={{...scroll, maxHeight: '100vh', minHeight: '20vh', height: '20em'}}>
    {filteredData?.map((message, i)=>{
      let t = new Date(message.timestamp)
      let stamp = t.getMonth()+'/'+t.getDate()+
          ' '+(t.getHours()<10?'0':'')+(t.getHours()-(t.getHours()>12?12:0))+
          ':'+(t.getMinutes()<10?'0':'')+t.getMinutes()+
          ':'+(t.getSeconds()<10?'0':'')+t.getSeconds()
      return <p key={i} style={{fontSize: '14px'}}>
        {user?.access==2?<Button onClick={handleDelete(message)} style={deleteButtonProps}>Delete</Button>:null}
        {'< '}{stamp}{' > ['}{message.username}{'] '}{message.message}<br/>
      </p>
    })}
  </Row>
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
  return <ChatWindow user={user} data={data} filteredData={filteredData} setFilteredData={setFilteredData} handleDelete={handleDelete}/>
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
