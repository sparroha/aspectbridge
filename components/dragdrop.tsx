import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import useLog from './conlog';
 

//dragdrop and card functions
export default function DragDrop(){
  require('./cards.module.css')
  
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);
  const [reservedCards, setReservedCards] = useState([]);//deck
  const [standbyCards, setStandbyCards] = useState([]);//hand
  const [activeCards, setActiveCards] = useState([]);//field
  const [removedCards, setRemovedCards] = useState([]);//graveyard
  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)
  
  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  ///is called, doesnt seem to work
  function drawCard(){
    let draw = transitCard(reservedCards, standbyCards)
    setReservedCards(draw.from)
    setStandbyCards(draw.to)
    console.log('Button Press')
  }

  function discardCard(){
    let draw = transitCard(standbyCards, removedCards)
    setStandbyCards(draw.from)
    setRemovedCards(draw.to)
  }

  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  const dummy = {
    id: 'dummy',
    styles: ['playcard'],
    name: 'dummy',
    discription: 'Dummy Object',
    flavortext: 'dumb thing, smart idea',
  }

  useEffect(()=>{
    for(let x=0;x<60;x++)reservedCards.push(dummy)
    setReservedCards(reservedCards)
  }, [])
  
  useEffect(()=>{
    window.onmousemove = handleMouseMove;
    function handleMouseMove(e, ...callback) {
        e = e || window.event; // IE-ism
        setMouseX(e.x)
        setMouseY(e.y)
    //console.log(mouseX+"|"+mouseX)
    }
  }, []);

 
  const [miliseconds, setMiliseconds] = useState(1000)
  //useEffect(()=>{setInterval(loop, miliseconds);});
  function loop(){
      //setMaxHeightWidth();
      //moveClientObj(clientPlayer,5);
      //handleAI();
      //vecObjs=arrayMoveObj(vecObjs);
      //debug();
  }
  const dragStart = (e, position) => {
    list.push
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };
 
  return (
    <>{'mouseX: '+ mouseX +', mouseY:'+ mouseY}
    {
    list&&
    list.map((item, index) => (
      <div style={{backgroundColor:'lightblue', margin:'20px 25%', textAlign:'center', fontSize:'40px'}}
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragEnd={drop}
        key={index}
        draggable>
          {item}
      </div>
      ))}
      <Button onClick={()=> {drawCard()}}>Draw Card</Button>
      <Row id='hand'>
        <RenderArena />
      </Row>
      
    </>
  );
};
//Card Object Class
interface CardProps{
  id: String;
  styles: String[];
  name: String;
  discription: String;
  flavortext: String;
}
/**
 * adds an instance of a card style (buffs and debuffs as classes)
 * 
 * useage: card = addCardProp(card,'classname')
 * @param card 
 * @param prop 
 */
//untested
function addCardStyle(card: CardProps, prop: String){
  card.styles.push(prop)
}
/**
 * removes first instance of a card style<Class> (buffs and debuffs as classes)
 *
 * useage: card = removeCardStyle(card,'classname')
 * @param card 
 * @param style 
 * @returns card: CarProps
 */
//untested
function removeCardStyle(card: CardProps, style: String){
  let count = Object.keys(card.styles).length
  while(card.styles[0]!=style && count > 0)scrollArray(card.styles)
  if(card.styles[0]==style)card.styles.shift()
  return card
}
//untested
function scrollArray(arr: Array<any>, shift: Boolean = true){
  if(shift){
    arr.push(arr.shift())
  }else{
    arr.unshift(arr.pop())
  }
  return arr
}
/**
 * moves the top card of target to the top of the destination
 * 
 * useage: "const drawCard = () => transitCard(deck, hand)"
 * useage: "const discard = () => transitCard(hand, graveyard)"
 * @param from 
 * @param to 
 * @returns 
 */
//untested
function transitCard(from: Array<CardProps>,to: Array<CardProps>,){
  to.push(from.pop())
  return {from: from, to: to}
}
//untested
//IMPORTANT: Do not call this in a loop. It should already be dynamic with useState()
function RenderArena(){
  return<>
    <RenderField />
    <RenderHand />
  </>
}
//untested
function RenderField(){
    const [activeCards, setActiveCards] = useState([]);//field
    return <><Row id="field">
      {activeCards && activeCards.map((card: CardProps, index) => (
            <RenderCard {...card} />
    ))}</Row></>
}
//untested
function RenderHand(){
  const [standbyCards, setStandbyCards] = useState([]);//hand
      return <><Row id="hand">
        {standbyCards && standbyCards.map((card: CardProps, index) => (
            <RenderCard {...card} />
    ))}</Row></>
}
//untested
function RenderCard(card: CardProps){
  return <Col><Card className={card.styles.join()}>
            <Card.Title>{card.name?card.name:'Unknown'} #{card.id?card.id:'unidentified'}</Card.Title>
            <Card.Text>{card.discription?card.discription:''}<hr />{card.flavortext?card.flavortext:''}</Card.Text>
        </Card></Col>
}