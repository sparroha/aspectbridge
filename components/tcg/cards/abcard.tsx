import { Button, Card } from "react-bootstrap";

type ABCard = {
    key: number,
    cardname: string,
    className: string,
    use: Function,
}
export  function ABCardCard(card: {key: number, cardname: string, className: string}) {
    return <Card key={card.key} className={card.className}>
                <Card.Body>
                    <Card.Title>Card: {card.cardname}</Card.Title>
                    <hr />
                    <Card.Text>
                        {/*getCardText(card)*/}
                    </Card.Text>
                </Card.Body>
            </Card>
}
export default function ABCard(card: ABCard) {
    return <Button key={card.key}  className={card.className} onClick={card.use()}>
                    <h2>Card: {card.cardname}</h2>
                    <img src={'/images/cards/'+card.cardname+'.png'} alt={card.cardname} />
                    <p>{/*getCardText(card)*/}</p>
                    <h2>Type: {getCardType(card.cardname)}</h2>
            </Button>
}
function getCardType(name: string) {
    return name;
}