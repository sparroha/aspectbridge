import { Card } from "react-bootstrap";

type ABCard = {
    key: number,
    cardname: string,
    use: () => any,
}
export default function ABCard(card: {key: number, cardname: string, className: string}) {
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