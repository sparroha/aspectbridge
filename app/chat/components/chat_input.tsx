import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function ChatInput({ip, user, setUpdate, style}: Partial<any>){
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
    return <Form onSubmit={handleSubmit} style={style}/*style={{margin: '0px', padding: '0px', maxHeight: '3em'}}*/>
        <Form.Control type='text' style={{visibility: 'collapse', border: '0px', margin: '0px', padding: '0px', height: '0px'}} name='username' defaultValue={user?.username}/> 
        <Row /*style={{margin: '0px', padding: '0px'}}*/>
            <Col xs={10} /*style={{margin: '0px', padding: '0px'}}*/>
              <Form.Control type='text' name='send' /*style={{width: '100%', height: '2em'}}*/
                onChange={(event)=>{
                  let out = event.target.value.toLowerCase()
                  let command = out.charAt(0)=='/'?out.replace('/', '').split(' ')[0]:null
                  setCommand(command)
                  setSend(event.target.value)
                }} value={send}/>
            </Col>
            <Col xs={2} /*style={{margin: '0px', padding: '0px'}}*/>
              <Button type='submit' /*style={{margin: '0px', padding: '0px 5px 0px 5px', height: '2em'}}*/>Send</Button>
            </Col>
        </Row>
    </Form>
  }