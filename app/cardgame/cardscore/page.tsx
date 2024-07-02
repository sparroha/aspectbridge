'use client'

import { Dispatch, SetStateAction, useState } from "react"

export type ScoreMarks = Mana & {
    rank: number//1-4
} & Skills
export type Mana = {
    colors: {
        white?: number,
        blue?: number,
        black?: number,
        red?: number,
        green?: number,
        generic?: number
    }
}
export type Skills = {
    power: number,
    toughness: number,
    loyalty: number,
    abilities: string[]
}
function getConvertedManaCost(colors): number {
    return (colors?.white || 0)+(colors?.blue || 0)+(colors?.black || 0)+(colors?.red || 0)+(colors?.green || 0)+(colors?.generic || 0)
}
function getDevotion(colors): number {
    return getConvertedManaCost(colors)-(colors?.generic || 0)
}
function getDevotionTo(mana: Mana, color: string): number {
    let colors = mana.colors
    return colors[color]
}
export type ScoreMarksPartial = Partial<ScoreMarks>

export default function CardScore(sm: ScoreMarksPartial){
    const manaScore = getConvertedManaCost(sm.colors)+getDevotion(sm.colors)
    const cardScore = manaScore+sm.rank
    const [score, setScore]:[ScoreMarks, Dispatch<SetStateAction<ScoreMarks>>] = useState(sm as ScoreMarks)
    return <>
            {/*<div>
                <lable>Rank</lable><input type="number" value={sm.rank || 0} onChange={e=>setScore((p)=>{return {...p, rank: parseInt(e.target.value)}})}/>
                <input type="number" value={sm.colors?.white || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, white: parseInt(e.target.value)}}})}/>
                <input type="number" value={sm.colors?.blue || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, blue: parseInt(e.target.value)}}})}/>
                <input type="number" value={sm.colors?.black || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, black: parseInt(e.target.value)}}})}/>
                <input type="number" value={sm.colors?.red || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, red: parseInt(e.target.value)}}})}/>
                <input type="number" value={sm.colors?.green || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, green: parseInt(e.target.value)}}})}/>
                <input type="number" value={sm.colors?.generic || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, generic: parseInt(e.target.value)}}})}/>
                <input type="number" value={sm.power || 0} onChange={e=>setScore((p)=>{return {...p, power: parseInt(e.target.value)}})}/>
                <input type="number" value={sm.toughness || 0} onChange={e=>setScore((p)=>{return {...p, toughness: parseInt(e.target.value)}})}/>
                <input type="number" value={sm.loyalty || 0} onChange={e=>setScore((p)=>{return {...p, loyalty: parseInt(e.target.value)}})}/>
                <input type="text" value={sm.abilities?.join(',') || ''} onChange={e=>setScore((p)=>{return {...p, abilities: e.target.value.split(',')}})}/>
            </div>*/}

            {/*redo form
            <form>
                <label>Rank</label><input type="number" value={sm.rank || 0} onChange={e=>setScore((p)=>{return {...p, rank: parseInt(e.target.value)}})}/>
                <label>White</label><input type="number" value={sm.colors?.white || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, white: parseInt(e.target.value)}}})}/>
                <label>Blue</label><input type="number" value={sm.colors?.blue || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, blue: parseInt(e.target.value)}}})}/>
                <label>Black</label><input type="number" value={sm.colors?.black || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, black: parseInt(e.target.value)}}})}/>
                <label>Red</label><input type="number" value={sm.colors?.red || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, red: parseInt(e.target.value)}}})}/>
                <label>Green</label><input type="number" value={sm.colors?.green || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, green: parseInt(e.target.value)}}})}/>
                <label>Generic</label><input type="number" value={sm.colors?.generic || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, generic: parseInt(e.target.value)}}})}/>
                <label>Power</label><input type="number" value={sm.power || 0} onChange={e=>setScore((p)=>{return {...p, power: parseInt(e.target.value)}})}/>
                <label>Toughness</label><input type="number" value={sm.toughness || 0} onChange={e=>setScore((p)=>{return {...p, toughness: parseInt(e.target.value)}})}/>
                <label>Loyalty</label><input type="number" value={sm.loyalty || 0} onChange={e=>setScore((p)=>{return {...p, loyalty: parseInt(e.target.value)}})}/>
                <label>Ablities</label><input type="text" value={sm.abilities?.join(',') || ''} onChange={e=>setScore((p)=>{return {...p, abilities: e.target.value.split(',')}})}/>
            </form>
            Thank you copilot*/}
            {/**Redo form with breaks*/}
            {/*<form>
                <label>Rank</label><input type="number" value={sm.rank || 0} onChange={e=>setScore((p)=>{return {...p, rank: parseInt(e.target.value)}})}/><br/>
                <label>White</label><input type="number" value={sm.colors?.white || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, white: parseInt(e.target.value)}}})}/><br/>
                <label>Blue</label><input type="number" value={sm.colors?.blue || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, blue: parseInt(e.target.value)}}})}/><br/>
                <label>Black</label><input type="number" value={sm.colors?.black || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, black: parseInt(e.target.value)}}})}/><br/>
                <label>Red</label><input type="number" value={sm.colors?.red || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, red: parseInt(e.target.value)}}})}/><br/>
                <label>Green</label><input type="number" value={sm.colors?.green || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, green: parseInt(e.target.value)}}})}/><br/>
                <label>Generic</label><input type="number" value={sm.colors?.generic || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, generic: parseInt(e.target.value)}}})}/><br/>
                <label>Power</label><input type="number" value={sm.power || 0} onChange={e=>setScore((p)=>{return {...p, power: parseInt(e.target.value)}})}/><br/>
                <label>Toughness</label><input type="number" value={sm.toughness || 0} onChange={e=>setScore((p)=>{return {...p, toughness: parseInt(e.target.value)}})}/><br/>
                <label>Loyalty</label><input type="number" value={sm.loyalty || 0} onChange={e=>setScore((p)=>{return {...p, loyalty: parseInt(e.target.value)}})}/><br/>
                <label>Ablities</label><input type="text" value={sm.abilities?.join(',') || ''} onChange={e=>setScore((p)=>{return {...p, abilities: e.target.value.split(',')}})}/><br/>
            </form>*/}
            
            {/**Redo form with breaks, replace sm with score*/}
            <form>
                <div className={'row'}>
                    <div className={'col-4'}>
                        <label>Rank</label><input type="number" value={score.rank || 0} onChange={e=>setScore((p)=>{return {...p, rank: parseInt(e.target.value)}})}/><br/>
                        <label>White</label><input type="number" value={score.colors?.white || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, white: parseInt(e.target.value)}}})}/><br/>
                        <label>Blue</label><input type="number" value={score.colors?.blue || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, blue: parseInt(e.target.value)}}})}/><br/>
                        <label>Black</label><input type="number" value={score.colors?.black || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, black: parseInt(e.target.value)}}})}/><br/>
                        <label>Red</label><input type="number" value={score.colors?.red || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, red: parseInt(e.target.value)}}})}/><br/>
                        <label>Green</label><input type="number" value={score.colors?.green || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, green: parseInt(e.target.value)}}})}/><br/>
                        <label>Generic</label><input type="number" value={score.colors?.generic || 0} onChange={e=>setScore((p)=>{return {...p, colors: {...p.colors, generic: parseInt(e.target.value)}}})}/><br/>
                    </div>
                    <div className={'col-4'}>
                        <label>Power</label><input type="number" value={score.power || 0} onChange={e=>setScore((p)=>{return {...p, power: parseInt(e.target.value)}})}/><br/>
                        <label>Toughness</label><input type="number" value={score.toughness || 0} onChange={e=>setScore((p)=>{return {...p, toughness: parseInt(e.target.value)}})}/><br/>
                        <label>Loyalty</label><input type="number" value={score.loyalty || 0} onChange={e=>setScore((p)=>{return {...p, loyalty: parseInt(e.target.value)}})}/><br/>
                        <label>Ablities</label><input type="text" value={score.abilities?.join(',') || ''} onChange={e=>setScore((p)=>{return {...p, abilities: e.target.value.split(',')}})}/><br/>
                    </div>
                </div>
            </form>
            
            
            {getConvertedManaCost(score.colors)+getDevotion(score.colors)+score.rank}
        </>
}