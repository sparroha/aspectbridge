import Link from "next/link"
import { Card } from "react-bootstrap"

const componentObject = {
    navcards: {
        aspects: 
            <Card className={'img-grey-back'}>
                <Card.Body>
                    <Card.Title className={'img-banner'}>
                        <Link href='/aspects'>Aspects</Link>
                    </Card.Title>
                    <hr />
                    <Card.Text>
                        <Link href='/air'>Aspect of Air</Link>
                        <Link href='/fire'>Aspect of Fire</Link>
                        <Link href='/water'>Aspect of Water</Link>
                        <Link href='/earth'>Aspect of Earth</Link>
                    </Card.Text>
                </Card.Body>
            </Card>,
        air:
            <Card className={'img-grey-back'}>
                <Card.Body>
                    <Card.Title className={'img-banner'}>
                        <Link href='/air'>Air</Link>
                    </Card.Title>
                    <hr />
                    <Card.Text>
                        <Link href='/light'>Aspect of Spirit</Link>
                        <Link href='/spirit'>Aspect of breath</Link>
                        <Link href='/water'>Aspect of wind</Link>
                        <Link href='/earth'>Aspect of wand</Link>
                    </Card.Text>
                </Card.Body>
            </Card>,
    },

}
export default function navCcomponentObject(){

    return componentObject
}