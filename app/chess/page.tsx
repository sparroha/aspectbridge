'use client'
import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"

export default function Main(props){
    const [board, setBoard] = useState(new Board64())
    //const [destination, setDestination] = useState(null)
    const [subject, setSubject] = useState(null)
    const [target, setTarget] = useState(null)
    //constructor
    function move(from: {row: number, col: number}, to: {row: number, col: number}){
        setBoard((b)=>b.moveItem(from,to))
    }
    return <>
        {/*JSON.stringify('board: '+board)}
        {JSON.stringify('cubject: '+subject)*/}
        {board.BOARD.map((row, i)=>{
            return <Row key={i-8} id={''+(i-8)+'_'+i} style={{width: 64*8+'px', height: 64+'px', border: 0, backgroundColor: 'white', margin: 0, padding: 0}}>
                {row.map((col, j)=>{
                    return <Col key={i+1*j+1} id={i+':'+j} style={{width: '64px', height: '64px', border: '2px outset #777', backgroundColor: ((i+1*j+1)%2==0)?'black':'red', margin: 0, padding: 0}}>
                        <button disabled={!(target?.row==i&&target?.col==j||subject)}
                            onMouseOver={()=>setTarget((t)=>{return {row: i, col: j}})}
                            onMouseOut={()=>setTarget((t)=>{
                                if(t?.row==i&&t?.col==j)return null
                                return t
                            })}
                            onClick={(e)=>{
                                if(!subject && board.BOARD[i][j] != '') setSubject({row: i, col: j})
                                else if(subject?.row==i&&subject?.col==j) setSubject(null)
                                else if(board.validDestination(subject,{row: i, col: j})){
                                    setBoard(board.moveItem(subject,{row: i, col: j}))//setDestination({row: i, col: j})
                                    setSubject(null)
                                }
                            }}
                        >{board.BOARD[i][j]}</button>
                    </Col>
                })}
            </Row>
        })}
    </>
}

/**
 * CALSS
 */
class Board64{
    BOARD: string[][]
    //canMove: boolean = false
    constructor(){
        this.BOARD = []
        for(let row=0;row<8;row++){
            this.BOARD.push([])
            for(let col=0;col<8;col++){
                if(row==0||row==7)this.BOARD[row].push('H')
                else this.BOARD[row].push('')
            }
        }
        this.BOARD
    }
    moveItem(from: {row: number, col: number}, to: {row: number, col: number}){
        //if(!this.canMove) return this
        if(this.BOARD[from.row][from.col]=='')return this
        this.BOARD[to.row][to.col] = this.BOARD[from.row][from.col]
        this.BOARD[from.row][from.col] = ''
        return this
    }
    validDestination(from: {row: number, col: number}, to: {row: number, col: number}){
        return true
    }
}