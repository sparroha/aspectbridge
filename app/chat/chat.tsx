'use client'
import { useState } from 'react';
import { Button, Col, Form, Nav, Row } from 'react-bootstrap';
import useUser from '../../lib/util/^user';
import ActiveUsers from '../../lib/util/-activeusers-';
import Messages from './components/message_manager';
import ChatInput from './components/chat_input';

const scroll = {
  overflow: 'auto'
}
const border = {
  border: '1px outset black',
  borderRadius: '5px',
  padding: '1px',
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
  
  return <>
      <Row id={'main_row'} style={{height: '80%'}}>
        <Col xs={12} sm={9} style={{...strip, height: '100%'}}>
          <Messages update={update} setUpdate={setUpdate} user={user} homepage={props?.homepage} style={{...border, height: '100%'}}/>
        </Col>
        <Col xs={12} sm={3} style={{...strip, height: '100%'}}>
          <ActiveUsers style={{/*...scroll,*/ height: '80vw'}}/>
        </Col>
      </Row>
      <Row id={'submit_row'} style={{height: '3em'}}>
        <Col xs={12}  style={{...strip, height: '100%'}}>
          <ChatInput ip={null} user={user} setUpdate={setUpdate} style={{height: '2em'}}/>
        </Col>
      </Row>
    </>
}