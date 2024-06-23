import { GetServerSideProps } from "next";
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import ABCard from "../cards/abcard";
import abclayout from '../css/abc.module.css';

export type DeckProps = {
    deckid: string,
    deckName: string,
    deckArray: string[],
}
export type HandProps = {
    deckid: string,
    deckName: string,
    deckArray: string[],
}

export default function ABDeck(props: {deckProps: DeckProps}) {
    return <>
        <h2 className={abclayout.cardtitle}>{props.deckProps.deckName || 'unknown'}</h2>
        <div id={props.deckProps.deckid} className={'deck'}>
            {props.deckProps.deckArray.map((cardname: string, index: number) => {return <ABCard key={index} cardname={cardname} className={abclayout.card+' '+abclayout.draggable} use={getCardUse(cardname)}/>})}
        </div>
    </>
}

function getCardUse(name: string) {
    return function() {
        console.log(name);
    }
}
/*export const getServerSideProps: GetServerSideProps<DeckProps> = async (context) => {
    const deckProps: DeckProps = {
        deckid: '1',
        deckName: 'Test Deck',
        deckArray: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
    }
    return {props: deckProps}
}*/