import { GetServerSideProps } from "next";
import ABDeck, { DeckProps, HandProps } from "../../components/tcg/maps/deck";

export type GameProps = {
    deckProps: DeckProps,
    handProps: HandProps,

}
export default function Sandbox(props: GameProps) {
    return <>
        <ABDeck deckProps={props.deckProps}/>
        <>ABHand</>
        <>ABDiscard</>
        </>
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
        deckid: '1',
        deckName: 'Test Deck',
        deckArray: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
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