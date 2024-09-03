'use client'
import { createContext, useContext, useReducer } from "react";
import DebugParams from "../../components/debugpageparams";
import { Col, Container, Row } from "react-bootstrap";

type CellProps = {row: number, col: number}
type RowProps = CellProps[]
type GridProps = RowProps[]
const initialGridState = {grid: []}
const GridContext = createContext(null)
const useGridContext = ()=>{
    const context = useContext(GridContext)
    if(!context) throw new Error(
        "GridContext not available in scope"
    )
    return context
}
export default function Page({params, searchParams}){
    //URL extracts
    const queryObject = searchParams
    const queryArray: [string, string][] = Object.entries(queryObject);
    const Title = ()=>{return <h1>Page</h1>}
    const debug = false
    

    return <GridContextProvider>
        <Title/>
        <DebugParams params={params} searchParams={searchParams}/>
        <Grid grid={grid(10,10)}/>
    </GridContextProvider>
}

/**
 * GRID PROVITER
 */

export function GridContextProvider({children}){
    /**
     * These are the rules for all manipulations handled by the user intertface
     * @param state 
     * @param action 
     * @returns 
     */
    const reducer = (state: any, action: {type: string, payload?: any})=>{
        let actionType = action.type.toLowerCase()
        switch(actionType){
            case '1': return state
                break;
            case '2': return state
                break;
            default: return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialGridState)

    return <GridContext.Provider value={{state, dispatch}}>
        {children}
    </GridContext.Provider>

}
/**
 * GRID PROVITER END
 */
function Cell(row, col){
    const {state, dispatch} = useGridContext()
    return <div style={{width: '20px', height: '20px', backgroundColor: 'blue'}}>
        {JSON.stringify(row)}/{JSON.stringify(col)}:STATE:{JSON.stringify(state)}
    </div>
}
function grid(width,height): GridProps{
    let arr: {row: number, col: number}[][] = []
    let row = 0
    for(let y=height;y>0;y--){
        arr.push([])
        let col = 0
        for(let x=0;x<width;x++){
            arr[row].push({row: row, col: col})
            col++
        }
        row++
    }
    return arr
}
function Grid({grid}: {grid: GridProps}){
    if(!grid || grid.length == 0) return <></>
    if(!grid.map)return <>{JSON.stringify(grid)}</>
    return <Container>
        {grid?.map((row, y)=>{
            return <Row>{row.map((col, x)=>{
                return <Col>
                    <Cell row={col.row} col={col.col}/>
                </Col>
            })}</Row>
        })}
    </Container>
}