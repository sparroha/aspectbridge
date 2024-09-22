import { createContext, useContext, useReducer } from "react"
import { Col, Container, Row } from "react-bootstrap"

type CellProps = {row: number, col: number}
type RowProps = CellProps[]
type GridProps = RowProps[]//{row: number, col: number}[][]
const initialGridState: {grid: GridProps}  = {grid: []}
const GridContext = createContext(null)
const useGridContext = ()=>{
    const context = useContext(GridContext)
    if(!context) throw new Error(
        "GridContext not available in scope"
    )
    return context
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
    const [state, dispatch]: [GridProps, any] = useReducer(reducer, initialGridState)

    return <GridContext.Provider value={{state, dispatch}}>
        {children}
    </GridContext.Provider>

}
/**
 * GRID PROVITER END
 */
export function Cell({row, col}){
    //{grid: []}
    const {state, dispatch} = useGridContext()
    return <div style={{width: '100px', height: '100px', backgroundColor: '#bbb'}}>
        {
            /**
             * GRID FUNCTIONAL CONTENT
             */

            /**
             * GRID FUNCTIONAL CONTENT
             */
        }
        {JSON.stringify(row)}/{JSON.stringify(col)}:STATE:{JSON.stringify(state)}
    </div>
}
export function grid(width,height): GridProps{
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
export function Grid({grid}: {grid: GridProps}){
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