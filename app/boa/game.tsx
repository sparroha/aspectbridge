'use client'

import { Dispatch, Fragment, useEffect, useReducer, useState } from "react"
import useUser from "../../lib/util/^user"
import { useUserSave } from "../../lib/util/^userSave"
import { useLog } from "../../components/conlog"

const classNames = {
    phase_bar: 'b3 r15 bc-black bs-solid tcenter mauto orange-back'
}

const mpSyncList = [
    'phase change',
    'status change',
]

const turn = {
    phases: [
        'recovery',
        'preparation',
        'action',
        'resolution',
        'suspence'
    ]
}
const defaultGameState = {phase: 'recovery'}
const gameReducer = (state, action)=>{
    switch(action.type){
        case 'start':
            return {...state, phase: 'recovery'}
        case 'next':
            return {...state, phase: state.phase === 'suspence'?'recovery':turn.phases[turn.phases.indexOf(state.phase)+1]}
        default:
            return state
    }
}
export default function Game(){
    const [gameState, gameDispatch] = useReducer(gameReducer, defaultGameState)
    const user = useUser()
    const s = useUserSave('bridge_game', user?.username || null, {}, ()=>{gameDispatch({type: 'start'})}, (username)=>{console.log('username changed to '+username)})
    return <>
    {/** */}
        <div id={'game_status'} className={'row blue-back'}>
            <div className={'col'}>
            </div>
            <div className={'col'}>
                <div className={'row tcenter'}><h2>Game Phase</h2></div>
                <div className={'row'}>
                    {turn.phases.map((phase, i)=>{
                        if(gameState.phase!=phase) return <div key={'phase'+i} className={`col ${classNames.phase_bar}`}>{phase}</div>
                        return <div key={'phase'+i} className={`col blue-font ${classNames.phase_bar}`}><h3>{phase}</h3></div>
                    })}
                </div>
            </div>
            <div className={'col'}>
            </div>
        </div>
    {/** */}
        <div id={'game_board'} className={'row h80 white-back black-font'}>
            <div className={'col-12 vh70'}>Game Board</div>
        </div>
    {/** */}
        <div id={'game_actions'} className={'row'}>
            <div className={'col-10'}>
                
            </div>
            <div className={'col-2 tcenter grey-back'}>
                <button onClick={()=>gameDispatch({type: 'next'})}>Next Phase</button>
            </div>
            
        </div>
    {/** */}
    </>
}




//
//
//

function Fight(){
    let p1 = {
        name: 'Player 1',
        health: 100,
        attack: 10,
        defense: 5
    }
    let p2 = {
        name: 'Player 2',
        health: 100,
        attack: 10,
        defense: 5
    }
    return <div>Fight</div>
}


//
//Grid Behavior idea
//
type Grid = {
    tile?: number,
    entity?: string
}[][]
const grid: Grid = [
    [
        {
            entity: ''
        }
    ],
    [
        {
            tile: 0,
        }
    ]
]
function behavior(grid: Grid, x: number, y: number){
    grid.forEach(
        (row, j)=>{
            row.forEach((col, i)=>{
                //do something at x = i and y = j
            })
        }
    )
}