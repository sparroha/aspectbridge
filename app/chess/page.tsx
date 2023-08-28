'use client'
import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import useRegister from "../../lib/util/^register"
import useUser from "../../lib/util/^user"
import useSWR from "swr"
import jsonFetch from "../../lib/,base/jsonFetch"

type BoardItem = {
    name: string,
    master: string,
    val: string
}
export default function Chess(props){
    const user = useUser()
    const [save, setSave, exists] = useRegister('chess:master','default')
    //const {data, error} = useSWR('/api/registry/chess:master', {fetcher: jsonFetch})
    //initialize board
    const [board, setBoard]: [Board64, any] = useState(null)
    const saveAll = (data: Board64)=>{
        console.log('saveAll()')
        setBoard(data)
        setSave({actor: data.actor, board: data.BOARD})
    }
    
    useEffect(()=>{
        const interval = setInterval(async ()=>{
            console.log('board', board)
            if(!board) return
            const data: string = await fetch('/api/registry/chess:master').then(res=>res.json())
            console.log('data', data)
            let boardData: BoardItem[][] = JSON.parse(data)
            //if(!data || data=='default') return
            setBoard(new Board64(boardData))
        }
        ,1000)
        return ()=>clearInterval(interval)
    },[])
    //initialize peices
    function resetBoard(){
        console.log('resetBoard()')
        saveAll((new Board64()).setVal(0,0,{name: 'rook', master: 'white', val: 'R'}).setVal(0,1,{name: 'knight', master: 'white', val: 'N'}).setVal(0,2,{name: 'bishop', master: 'white', val: 'B'}).setVal(0,3,{name: 'queen', master: 'white', val: 'Q'}).setVal(0,4,{name: 'king', master: 'white', val: 'K'}).setVal(0,5,{name: 'bishop', master: 'white', val: 'B'}).setVal(0,6,{name: 'knight', master: 'white', val: 'N'}).setVal(0,7,{name: 'rook', master: 'white', val: 'R'})
            .setVal(7,0,{name: 'rook', master: 'red', val: 'R'}).setVal(7,1,{name: 'knight', master: 'red', val: 'N'}).setVal(7,2,{name: 'bishop', master: 'red', val: 'B'}).setVal(7,3,{name: 'queen', master: 'red', val: 'Q'}).setVal(7,4,{name: 'king', master: 'red', val: 'K'}).setVal(7,5,{name: 'bishop', master: 'red', val: 'B'}).setVal(7,6,{name: 'knight', master: 'red', val: 'N'}).setVal(7,7,{name: 'rook', master: 'red', val: 'R'})
            .setVal(1,0,{name: 'pawn', master: 'white', val: 'P'}).setVal(1,1,{name: 'pawn', master: 'white', val: 'P'}).setVal(1,2,{name: 'pawn', master: 'white', val: 'P'}).setVal(1,3,{name: 'pawn', master: 'white', val: 'P'}).setVal(1,4,{name: 'pawn', master: 'white', val: 'P'}).setVal(1,5,{name: 'pawn', master: 'white', val: 'P'}).setVal(1,6,{name: 'pawn', master: 'white', val: 'P'}).setVal(1,7,{name: 'pawn', master: 'white', val: 'P'})
            .setVal(6,0,{name: 'pawn', master: 'red', val: 'P'}).setVal(6,1,{name: 'pawn', master: 'red', val: 'P'}).setVal(6,2,{name: 'pawn', master: 'red', val: 'P'}).setVal(6,3,{name: 'pawn', master: 'red', val: 'P'}).setVal(6,4,{name: 'pawn', master: 'red', val: 'P'}).setVal(6,5,{name: 'pawn', master: 'red', val: 'P'}).setVal(6,6,{name: 'pawn', master: 'red', val: 'P'}).setVal(6,7,{name: 'pawn', master: 'red', val: 'P'}))
    }
    //load data from db
    useEffect(()=>{
        if(!save) return
        if(!board){ 
            console.log('reset data', save, board)
            //initialize peices
            if(JSON.parse(save)=='default') return resetBoard()
            else{
                let parse = JSON.parse(save)
                return setBoard(new Board64(parse.board).setActor(parse.actor))
            }
        }
        //if(!data) return
        //setBoard(new Board64(JSON.parse(data)))
    },[save, board, /*data*/])
    //define peices
    function pathToTarget(from, to){
        let next = from
        if(from == to) return true
        if(from.row < to.row){//south
            if(from.col < to.col){//right
                while(next!=to){
                    //if(!!next.row)
                    next.col++
                    next.row++
                }
            }else if(from.col > to.col){//left
                
            }else{//mid
                
            }
        }
        else if(from.row > to.row){//north
            if(from.col < to.col){//right
                
            }else if(from.col > to.col){//left

            }else{//mid

            }
        }else{//same row
            if(from.col < to.col){//right
                
            }else if(from.col > to.col){//left

            }else{//mid

            }
        }
        if(from.row+1 == to.row && from.col == to.row) return true
        //rook horizontal
        //bishop vertical
        //queen both
        return false
    }
    function validMove(from: {row: number, col: number}, to: {row: number, col: number}){
        //if(!pathToTarget(from,to))return false
        switch(board.BOARD[from.row][from.col].name){
            case 'pawn':
                if(board.BOARD[from.row][from.col].master=='white'){
                    if(from.row==1&&to.row==3&&from.col==to.col&&board.BOARD[to.row][to.col].val=='')return true
                    if(from.row+1==to.row&&from.col==to.col&&board.BOARD[to.row][to.col].val=='')return true
                    //to attack
                    if(from.row+1==to.row&&from.col+1==to.col&&board.BOARD[to.row][to.col].val!='')return true
                    if(from.row+1==to.row&&from.col-1==to.col&&board.BOARD[to.row][to.col].val!='')return true
                }
                if(board.BOARD[from.row][from.col].master=='red'){
                    if(from.row==6&&to.row==4&&from.col==to.col&&board.BOARD[to.row][to.col].val=='')return true
                    if(from.row-1==to.row&&from.col==to.col&&board.BOARD[to.row][to.col].val=='')return true
                    //to attack
                    if(from.row-1==to.row&&from.col+1==to.col&&board.BOARD[to.row][to.col].val!='')return true
                    if(from.row-1==to.row&&from.col-1==to.col&&board.BOARD[to.row][to.col].val!='')return true
                }
                break
            case 'rook':
                //valid path

                if(from.row==to.row||from.col==to.col)return true
                break
            case 'knight':
                if((from.row+2==to.row||from.row-2==to.row)&&(from.col+1==to.col||from.col-1==to.col))return true
                if((from.row+1==to.row||from.row-1==to.row)&&(from.col+2==to.col||from.col-2==to.col))return true
                break
            case 'bishop':
                if(Math.abs(from.row-to.row)==Math.abs(from.col-to.col))return true
                break
            case 'queen':
                if(from.row==to.row||from.col==to.col)return true
                if(Math.abs(from.row-to.row)==Math.abs(from.col-to.col))return true
                break
            case 'king':
                if(Math.abs(from.row-to.row)<=1&&Math.abs(from.col-to.col)<=1)return true
                break
        }

        return false
    }
    //control selectors
    const [subject, setSubject] = useState(null)
    const [target, setTarget] = useState(null)
    //movement validation
    function validDestination(from: {row: number, col: number}, to: {row: number, col: number}){
        if(!subject) return false
        if(board.BOARD[from.row][from.col].master == board.BOARD[to.row][to.col].master) return false
        return validMove(from, to)
    }
    function disabledButton(col,i,j){
        //if nothing selected
        if(!subject && col.master == board.actor) return false
        //if this tile selected
        if(subject && subject.row == i && subject.col == j ) return false
        //if this tile valid target to move
        if(subject && validDestination(subject,{row: i, col: j})) return false
        return true
    }
    if(!board) return <>Loading...</>
    return <>
        <>{/*JSON.stringify(board.BOARD)}:{save}:{data*/}</>
        <button onClick={resetBoard}>Reset</button>
        {board?.BOARD.map?.((row, i)=>{
            return <Row key={i-8} id={''+(i-8)+'_'+i} style={{width: 64*8+'px', height: 64+'px', border: 0, backgroundColor: 'white', margin: 0, padding: 0}}>
                {row.map((col, j)=>{
                    return <Col key={i+1*j+1} id={i+':'+j}
                            onClick={(e)=>{
                                if(!subject) return false
                                else if(validDestination(subject,{row: i, col: j})){
                                    saveAll(board.moveItem(subject,{row: i, col: j}).setActor(board.actor=='red'?'white':'red'))
                                    setSubject(null)
                                    //setActor((a)=>{return a=='red'?'white':'red'})
                                }
                            }} style={{display: 'flex', verticalAlign: 'middle', textAlign: 'center', width: '64px', height: '64px', border: '2px outset #777', backgroundColor: ((i+1*j+1)%2==0)?'black':'red', margin: 0, padding: 0, fontSize: '10px'}}>
                        {col.name!='vacant'?
                            <button style={{backgroundColor: col.master, margin: 'auto', width: '48px', height: '48px'}}
                                disabled={
                                    /*!(
                                        !(!subject && col.master == actor) || 
                                        !subject || 
                                        !validDestination(subject,{row: i, col: j})
                                    )*/
                                    disabledButton(col,i,j)
                                }
                                onMouseOver={()=>setTarget((t)=>{return {row: i, col: j}})}
                                onMouseOut={()=>setTarget((t)=>{
                                    if(t?.row==i&&t?.col==j)return null
                                    return t
                                })}
                                onClick={(e)=>{
                                    if(!subject && board.BOARD[i][j].val != '') setSubject({row: i, col: j})
                                    else if(subject?.row==i&&subject?.col==j) setSubject(null)
                                    else if(validDestination(subject,{row: i, col: j})){
                                        saveAll(board.moveItem(subject,{row: i, col: j}).setActor(board.actor=='red'?'white':'red'))
                                        setSubject(null)
                                        //setActor((a)=>{return a=='red'?'white':'red'})
                                    }
                                }}
                            >{board.BOARD[i][j].val!=''?<>{board.BOARD[i][j].master}<br/>{board.BOARD[i][j].val}<br/>{board.BOARD[i][j].name}</>:null}</button>
                        :null}
                    </Col>
                })}
            </Row>
        }) || null}
    </>
}

/**
 * CALSS
 */
class Board64{
    actor: string = 'red'
    vacant: BoardItem = {name: 'vacant', master: 'none', val: ''}
    BOARD: BoardItem[][]
    constructor(board?: BoardItem[][]){
        if(board)this.BOARD = board
        else{
            this.BOARD = []
            for(let row=0;row<8;row++){
                this.BOARD.push([])
                for(let col=0;col<8;col++){
                    //if(row==0||row==7)this.BOARD[row].push('H')
                    //else 
                    this.BOARD[row].push(this.vacant)
                }
            }
        }
    }
    setActor(actor: string){
        this.actor = actor
        return this
    }
    setVal(row: number, col: number, val: BoardItem){
        this.BOARD[row][col] = val
        return this
    }
    moveItem(from: {row: number, col: number}, to: {row: number, col: number}){
        //if(!this.canMove) return this
        if(this.BOARD[from.row][from.col]?.val=='')return this
        this.BOARD[to.row][to.col] = this.BOARD[from.row][from.col]
        this.BOARD[from.row][from.col] = this.vacant
        return this
    }
    removeItem(from: {row: number, col: number}){
        this.BOARD[from.row][from.col] = this.vacant
        return this
    }
    placeItem(to: {row: number, col: number}, val: BoardItem){
        if(this.BOARD[to.row][to.col].val=='') this.BOARD[to.row][to.col]=val
        return this
    }
}