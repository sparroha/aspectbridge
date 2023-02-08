import { GetServerSideProps } from "next";
import { Button, Col, Row } from "react-bootstrap";
import abclayout from '../../components/tcg/css/abc.module.css';


export type ABCard = {
  key: number,
  cardname: string,
  use: Function,
}
export type DeckProps = {
  deckid: string,
  deckName: string,
  deckArray: string[],
}
export type HandProps = {
  handid: string,
  handName: string,
  handArray: string[],
}
export type GameProps = {
    deckProps: DeckProps,
    handProps: HandProps,
}
export default function Sandbox(props: GameProps) {
    return <>
        <Row>
          <Col sm={3} style={{textAlign: 'center'}}>Opponent Discard<br/><ABDeck deckProps={props.deckProps}></ABDeck></Col>
          <Col sm={6} style={{textAlign: 'center'}}>Opponent Hand<br/><ABHand handProps={props.handProps}/></Col>
          <Col sm={3} style={{textAlign: 'center'}}>Opponent Deck<br/><ABDeck deckProps={props.deckProps}/></Col>
        </Row>
        <Row style={{height:'300px'}}>
          <Col sm={1} style={{textAlign: 'center'}}>Opponent Stats<br/></Col>
          <Col sm={10} style={{textAlign: 'center'}}>Field<br/></Col>
          <Col sm={1} style={{textAlign: 'center'}}>Stats<br/></Col>
        </Row>
        <Row>
          <Col sm={3} style={{textAlign: 'center'}}>Deck<br/><ABDeck deckProps={props.deckProps}/></Col>
          <Col sm={6} style={{textAlign: 'center'}}>Hand<br/><ABHand handProps={props.handProps}/></Col>
          <Col sm={3} style={{textAlign: 'center'}}>Discard<br/><ABDeck deckProps={props.deckProps}/></Col>
        </Row>
        </>
}
function ABDeck(props: {deckProps: DeckProps}) {
  return <>
      <Button id={props.deckProps.deckid} className={abclayout.card} onClick={()=>{/*draw card*/}}>
        Deck ID
      </Button>
  </>
}
function ABHand(props: {handProps: HandProps}) {
  return <>
      <Row id={props.handProps.handid}>
          {props.handProps.handArray.map((cardname: string, index: number) => {
            return <>{index%10==0&&index>=10?<><Col sm={1}></Col><Col sm={1}></Col></>:<></>}
                <Col sm={1} className={abclayout.cardcontainer+' '+abclayout.draggable}>
                  <ABCard key={index} cardname={cardname} use={getCardUse(cardname)}/>
                </Col>
              </>
            })}
      </Row>
  </>
}
function ABCard(card: ABCard) {
  return <Button key={card.key} className={abclayout.card} onClick={card.use()}>
              <h2>Card: {card.cardname}</h2>
              <img src={'/images/cards/'+card.cardname+'.png'} alt={card.cardname} />
              <p>{/*getCardText(card)*/}</p>
              <h2>Type: {getCardType(card.cardname)}</h2>
          </Button>
}
function getCardType(name: string) {
  return name;
}

function getCardUse(name: string) {
  return function() {
      console.log(name);
  }
}

export const getServerSideProps: GetServerSideProps<GameProps> = async (context) => {
    const sessionid = context.req.cookies.sessionid;
    const players: string[] = ['1','2','3','4'];

    const deckProps: DeckProps = {
        deckid: '1',
        deckName: 'Test Deck',
        deckArray: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
    }
    const handProps: HandProps = {
        handid: '1',
        handName: 'Test Deck',
        handArray: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
    }
    const gameProps: GameProps = {
        deckProps: deckProps,
        handProps: handProps,
    }   
    return {props: gameProps}
}

// Let's make <Card text='Write the docs' /> draggable!


/**
 * Your Component
 */
// Let's make <Card text='Write the docs' /> draggable!


/**
 * Your Component
 *
export function DragCard({ isDragging, text }) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'CARD',
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )
  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  )
}*/