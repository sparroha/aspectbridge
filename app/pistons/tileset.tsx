'use client'
import { Fragment, useEffect, useRef, useState } from "react";
import { Col, ModalTitle, Row } from "react-bootstrap";
import { useDynamicContext } from "./provider";

export type Tile = {
    validConnect?: {N: string[], E: string[], S: string[], W: string[]},
    backgroundColor: string,
    backgroundImage: string,
}
export type TileProps = Partial<{
    type: string, 
    resource: string, 
    x: number, y: number, z: number, 
    orientation: string
}>
const maxWidth = 20
const maxHeight = 20
export default function Grid(){
    return <Row>
        <Col sx={12}>
            <Tiles/>
        </Col>
    </Row>
}

export function Tiles(){
    const {state, dispatch} = useDynamicContext()
    //statebgGradient={'linear-gradient(#fff, #fff 50%, #90a0f088 52%, #90a0f088 60%, #00000000 70%)'}
    const tileset: Map<string, Tile> = populateTileset()
    const tiles: {current: [string, Tile][]}  = useRef([])
    useEffect(()=>{
        tileset.forEach((tile, key)=>{
            tiles.current.push([key, tile])
        })
    },[])
    const [tilemap, setTilemap] = useState<TileProps[][]>([[]])
    //init tileMap empty
    useEffect(()=>{
        let r = [...Array(20)]
        r.forEach((_, i)=>{
            r[i] = [...Array(20)]
        })
        let rR = Math.floor(Math.random()*r.length)
        let rC = Math.floor(Math.random()*r[0].length)
        r[rR][rC] = {type: 'grass', x: rC, y: rR, z: 0}
        dispatch({type: 'spawn', payload: {i: rR, j: rC}})
        setTilemap(r)
    },[])
    
    function getValidZ(map: TileProps[][], row, col, tileset: Map<string, Tile>): number{
        function returnZ(validZs: number[]){
            return validZs[Math.floor(Math.random()*validZs.length)] || 0
        }
        let zN = map[row-1]?.[col]?.z || 0
        let zE = map[row]?.[col+1]?.z || 0
        let zS = map[row+1]?.[col]?.z || 0
        let zW = map[row]?.[col-1]?.z || 0
        let validZs: number[] = [zN-1, zN, zN+1, zE-1, zE, zE+1, zS-1, zS, zS+1, zW-1, zW, zW+1]
        console.log('getValidZs', validZs)
        return returnZ(validZs)
    }
    function getValidTile(map: TileProps[][], row, col, tileset: Map<string, Tile>): [string, Tile]{
        let tN: string[] = tileset[map[row-1]?.[col]?.type]?.validConnect?.N || []
        let tE: string[] = tileset[map[row]?.[col+1]?.type]?.validConnect?.E || []
        let tS: string[] = tileset[map[row+1]?.[col]?.type]?.validConnect?.S || []
        let tW: string[] = tileset[map[row]?.[col-1]?.type]?.validConnect?.W || []
        let validTiles: [string, Tile][] = []
        console.log('getValidTile', tN, tE, tS, tW, validTiles)
        tiles.current.forEach((tile: [string, Tile])=>{
            if(tN.includes(tile[0]) && tE.includes(tile[0]) && tS.includes(tile[0]) && tW.includes(tile[0])){
                validTiles.push(tile)
            }
        })
        if(validTiles.length==0) return [undefined, undefined]
        return validTiles[Math.floor(Math.random()*validTiles.length)]
    }
    //populate tilemap
    useEffect(()=>{
        console.log('tilemap', tilemap)
        let voids = 0
        let ft = tilemap.filter(
            (row)=>row.filter(
                (tile)=>{if(tile==undefined || tile==null || !tile) {voids++; return true;} return false;}
            )
        )
        console.log('voids', voids);
        if(voids==0) return
        let map: TileProps[][] = tilemap
        const populateLoop = async ()=> {console.log('populateLoop')
            //while(map.find((row)=>row.find((tile)=>tile==undefined || tile==null))){
                console.log('populateLoop', 'while')
                map.forEach((row, i)=>{
                    row.forEach((tile, j)=>{
                        if(tile==undefined || tile==null){
                            let [tilename, tileprops]: [string, Tile] = getValidTile(map, i, j, tileset)
                            let validZ: number = getValidZ(map, i, j, tileset)
                            if(tilename==undefined) return
                            map[i][j] = {x: i, y: j, z: validZ, type: tilename || 'error'}
                        }
                    })
                })
            //}
            return map
        }
        populateLoop().then((map)=>setTilemap(map))
        
    },[tilemap])
    return <div style={{width: 50*20+'px', height: 50*20+'px'}}>
        {tilemap?.map((row, ri)=>{
            return <Fragment key={'Tile'+ri}><Row style={{width: 50*20+'px', height: 50+'px'}}>
                {row?.map((tile, ci)=>{
                    return <Fragment key={'Tile'+ri+'-'+ci}><Col style={{
                        backgroundColor: tiles?.current?.find((t)=>t[0]==tile?.type)?.[1]?.backgroundColor || 'none', 
                        backgroundImage: tiles?.current?.find((t)=>t[0]==tile?.type)?.[1]?.backgroundImage || 'none', 
                        width: 50+'px', height: 50+'px', margin: 0, padding: 0, 
                        border: '1px solid #000', boxSizing: 'border-box'}}>
                            Tile {tile?.type} {/*tile?.x} {tile?.y*/} {tile?.z}
                        </Col></Fragment>
                })}
            </Row></Fragment>
        })}
    </div>
}
function populateTileset(): Map<string, Tile>{
    let tileset = new Map<string, Tile>()
    tileset.set('grass', { validConnect: {
        N: ['grass', 'forest_grassS','dirty_grassS','grass_shoreS','grass_stoneS'], 
        E: ['grass', 'forest_grassW','dirty_grassW','grass_shoreW','grass_stoneW'], 
        S: ['grass', 'forest_grassN','dirty_grassN','grass_shoreN','grass_stoneN'], 
        W: ['grass', 'forest_grassE','dirty_grassE','grass_shoreE','grass_stoneE']
    }, backgroundColor: '#4a4', backgroundImage: 'linear-gradient(#4a4)' })
    tileset.set('forest', { validConnect: {
        N: ['forest', 'forest_grassN'], E: ['forest', 'forest_grassE'], S: ['forest', 'forest_grassS'], W: ['forest', 'forest_grassW']
    }, backgroundColor: '#4a4', backgroundImage: 'radial-gradient(#00000033 20%, #663300dd 45%, #00000033 70%)' })
    tileset.set('dirt', { validConnect: {
        N: ['dirt', 'dirty_grassN'], E: ['dirt', 'dirty_grassE'], S: ['dirt', 'dirty_grassS'], W: ['dirt', 'dirty_grassW']
    }, backgroundColor: '#630', backgroundImage: 'radial-gradient(#00000033 20%, #663300dd 45%, #00000033 70%)' })
    tileset.set('water', { validConnect: {
        N: ['water', 'grass_shoreN'], E: ['water', 'grass_shoreE'], S: ['water', 'grass_shoreS'], W: ['water', 'grass_shoreW']
    }, backgroundColor: '#00f', backgroundImage: 'radial-gradient(#00000033 20%, #3333ffdd 45%, #00000033 70%)' })
    tileset.set('lava', { validConnect: {
        N: ['grass_stoneS', 'stone'], E: ['grass_stoneW', 'stone'], S: ['grass_stoneN', 'stone'], W: ['grass_stoneE', 'stone']
    }, backgroundColor: '#a00', backgroundImage: 'radial-gradient(#00000033 20%, #dd5500dd 45%, #00000033 70%)' })
    tileset.set('stone', { validConnect: {
        N: ['stone', 'grass_stoneS'], E: ['stone', 'grass_stoneW'], S: ['stone', 'grass_stoneN'], W: ['stone', 'grass_stoneE']
    }, backgroundColor: '#777', backgroundImage: 'linear-gradient(#777)' })
    tileset.set('ice', { validConnect: {
        N: ['ice', 'grass_snowS', 'snow'], E: ['ice', 'grass_snowW', 'snow'], S: ['ice', 'grass_snowN', 'snow'], W: ['ice', 'grass_snowE', 'snow']
    }, backgroundColor: 'light-blue', backgroundImage: 'radial-gradient(#00000033 30%, lightblue 50%, #00000033 70%)' })
    tileset.set('sand', { validConnect: {
        N: ['sand', 'grass_sandN'], E: ['sand', 'grass_sandE'], S: ['sand', 'grass_sandS'], W: ['sand', 'grass_sandW']
    }, backgroundColor: '#cb9', backgroundImage: 'radial-gradient(#00000033 30%, #cb9 50%, #00000033 70%)' })
    tileset.set('snow', { validConnect: {
        N: ['ice', 'grass_snowS', 'snow'], E: ['ice', 'grass_snowW', 'snow'], S: ['ice', 'grass_snowN', 'snow'], W: ['ice', 'grass_snowE', 'snow']
    }, backgroundColor: 'white', backgroundImage: 'linear-gradient(white)' })
    tileset.set('wood', { validConnect: {
        N: ['wood', 'grass'], E: ['wood', 'grass'], S: ['wood', 'grass'], W: ['wood', 'grass']
    }, backgroundColor: '#630', backgroundImage: 'linear-gradient(#630)' })
    tileset.set('metal', { validConnect: {
        N: ['metal', 'stone'], E: ['metal', 'stone'], S: ['metal', 'stone'], W: ['metal', 'stone']
    }, backgroundColor: '#777', backgroundImage: 'radial-gradient(#00000033 20%, #994400dd 45%, #00000033 70%)' })
    //tileset.set('marsh': { backgroundColor: 'green', backgroundImage: 'linear-gradient(green)' })
    tileset.set('crops', { validConnect: {
        N: ['crops', 'grass_cropN'], E: ['crops', 'grass_cropE'], S: ['crops', 'grass_cropS'], W: ['crops', 'grass_cropW']
    }, backgroundColor: 'green', backgroundImage: 'radial-gradient(#00000000 10%, #88aa00ff 20%, #00000000 30%, #88aa00ff 40%, #00000000 50%, #88aa00ff 60%, #00000000 70%, #88aa00ff 80%, #00000000 90%)' })
    tileset.set('salt', { validConnect: {
        N: ['salt', 'grass_saltN'], E: ['salt', 'grass_saltE'], S: ['salt', 'grass_saltS'], W: ['salt', 'grass_saltW']
    }, backgroundColor: '#ddd', backgroundImage: 'linear-gradient(#ddd)' })
    
    
    tileset.set('forest_grassN', { validConnect: {
        N: ['forest'], E: ['forest_grassN', 'forest_grassNW'], S: ['grass'], W: ['forest_grassN', 'forest_grassNE']
    }, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassNE', { validConnect: {
        N: ['forest', 'forest_grassE'], E: ['forest', 'forest_grassN'], S: ['grass'], W: ['grass']
    }, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0.5)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassE', { validConnect: {
        N: ['forest_grassE', 'forest_grassSE'], E: ['forest'], S: ['forest_grassE', 'forest_grassNE'], W: ['grass']}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassSE', { validConnect: {
        N: ['grass'], E: ['forest_grassS'], S: ['forest_grassE'], W: ['grass']
    }, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1.5)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassS', { validConnect: {
        N: ['grass'], E: ['forest_grassS'], S: ['forest'], W: ['forest_grassS']
    }, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassSW', { validConnect: {
        N: ['grass'], E: ['grass'], S: ['forest_grassW'], W: ['forest_grassS']
    }, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2.5)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassW', { validConnect: {
        N: ['forest_grassW'], E: ['grass'], S: ['forest_grassW'], W: ['forest']
    }, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassNW', { validConnect: {
        N: ['forest_grassW'], E: ['grass'], S: ['grass'], W: ['forest_grassN']
    }, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3.5)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })

    tileset.set('dirty_grassN', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#630', backgroundImage: 'linear-gradient('+(90*0)+'deg, #630, #630 50%, #4a4 60%, #630 70%, #4a4 80%, #630 90%)' })
    tileset.set('dirty_grassNE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#630', backgroundImage: 'linear-gradient('+(90*0.5)+'deg, #630, #630 50%, #4a4 60%, #630 70%, #4a4 80%, #630 90%)' })
    tileset.set('dirty_grassE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#630', backgroundImage: 'linear-gradient('+(90*1)+'deg, #630, #630 50%, #4a4 60%, #630 70%, #4a4 80%, #630 90%)' })
    tileset.set('dirty_grassSE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#630', backgroundImage: 'linear-gradient('+(90*1.5)+'deg, #630, #630 50%, #4a4 60%, #630 70%, #4a4 80%, #630 90%)' })
    tileset.set('dirty_grassS', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#630', backgroundImage: 'linear-gradient('+(90*2)+'deg, #630, #630 50%, #4a4 60%, #630 70%, #4a4 80%, #630 90%)' })
    tileset.set('dirty_grassSW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#630', backgroundImage: 'linear-gradient('+(90*2.5)+'deg, #630, #630 50%, #4a4 60%, #630 70%, #4a4 80%, #630 90%)' })
    tileset.set('dirty_grassW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#630', backgroundImage: 'linear-gradient('+(90*3)+'deg, #630, #630 50%, #4a4 60%, #630 70%, #4a4 80%, #630 90%)' })
    tileset.set('dirty_grassNW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#630', backgroundImage: 'linear-gradient('+(90*3.5)+'deg, #630, #630 50%, #4a4 60%, #630 70%, #4a4 80%, #630 90%)' })

    tileset.set('grass_shoreN', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0)+'deg, #4a4, #4a4 50%, #00f 60%, #4a4 70%, #00f 80%, #4a4 90%)' })
    tileset.set('grass_shoreNE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0.5)+'deg, #4a4, #4a4 50%, #00f 60%, #4a4 70%, #00f 80%, #4a4 90%)' })
    tileset.set('grass_shoreE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1)+'deg, #4a4, #4a4 50%, #00f 60%, #4a4 70%, #00f 80%, #4a4 90%)' })
    tileset.set('grass_shoreSE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1.5)+'deg, #4a4, #4a4 50%, #00f 60%, #4a4 70%, #00f 80%, #4a4 90%)' })
    tileset.set('grass_shoreS', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2)+'deg, #4a4, #4a4 50%, #00f 60%, #4a4 70%, #00f 80%, #4a4 90%)' })
    tileset.set('grass_shoreSW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2.5)+'deg, #4a4, #4a4 50%, #00f 60%, #4a4 70%, #00f 80%, #4a4 90%)' })
    tileset.set('grass_shoreW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3)+'deg, #4a4, #4a4 50%, #00f 60%, #4a4 70%, #00f 80%, #4a4 90%)' })
    tileset.set('grass_shoreNW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3.5)+'deg, #4a4, #4a4 50%, #00f 60%, #4a4 70%, #00f 80%, #4a4 90%)' })

    tileset.set('grass_stoneN', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0)+'deg, #4a4, #4a4 50%, #777 60%, #4a4 70%, #777 80%, #4a4 90%)' })
    tileset.set('grass_stoneNE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0.5)+'deg, #4a4, #4a4 50%, #777 60%, #4a4 70%, #777 80%, #4a4 90%)' })
    tileset.set('grass_stoneE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1)+'deg, #4a4, #4a4 50%, #777 60%, #4a4 70%, #777 80%, #4a4 90%)' })
    tileset.set('grass_stoneSE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1.5)+'deg, #4a4, #4a4 50%, #777 60%, #4a4 70%, #777 80%, #4a4 90%)' })
    tileset.set('grass_stoneS', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2)+'deg, #4a4, #4a4 50%, #777 60%, #4a4 70%, #777 80%, #4a4 90%)' })
    tileset.set('grass_stoneSW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2.5)+'deg, #4a4, #4a4 50%, #777 60%, #4a4 70%, #777 80%, #4a4 90%)' })
    tileset.set('grass_stoneW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3)+'deg, #4a4, #4a4 50%, #777 60%, #4a4 70%, #777 80%, #4a4 90%)' })
    tileset.set('grass_stoneNW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3.5)+'deg, #4a4, #4a4 50%, #777 60%, #4a4 70%, #777 80%, #4a4 90%)' })

    tileset.set('grass_sandN', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0)+'deg, #4a4, #4a4 50%, #cb9 60%, #4a4 70%, #cb9 80%, #4a4 90%)' })
    tileset.set('grass_sandNE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0.5)+'deg, #4a4, #4a4 50%, #cb9 60%, #4a4 70%, #cb9 80%, #4a4 90%)' })
    tileset.set('grass_sandE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1)+'deg, #4a4, #4a4 50%, #cb9 60%, #4a4 70%, #cb9 80%, #4a4 90%)' })
    tileset.set('grass_sandSE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1.5)+'deg, #4a4, #4a4 50%, #cb9 60%, #4a4 70%, #cb9 80%, #4a4 90%)' })
    tileset.set('grass_sandS', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2)+'deg, #4a4, #4a4 50%, #cb9 60%, #4a4 70%, #cb9 80%, #4a4 90%)' })
    tileset.set('grass_sandSW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2.5)+'deg, #4a4, #4a4 50%, #cb9 60%, #4a4 70%, #cb9 80%, #4a4 90%)' })
    tileset.set('grass_sandW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3)+'deg, #4a4, #4a4 50%, #cb9 60%, #4a4 70%, #cb9 80%, #4a4 90%)' })
    tileset.set('grass_sandNW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3.5)+'deg, #4a4, #4a4 50%, #cb9 60%, #4a4 70%, #cb9 80%, #4a4 90%)' })

    tileset.set('grass_snowN', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0)+'deg, #4a4, #4a4 50%, white 60%, #4a4 70%, white 80%, #4a4 90%)' })
    tileset.set('grass_snowNE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0.5)+'deg, #4a4, #4a4 50%, white 60%, #4a4 70%, white 80%, #4a4 90%)' })
    tileset.set('grass_snowE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1)+'deg, #4a4, #4a4 50%, white 60%, #4a4 70%, white 80%, #4a4 90%)' })
    tileset.set('grass_snowSE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1.5)+'deg, #4a4, #4a4 50%, white 60%, #4a4 70%, white 80%, #4a4 90%)' })
    tileset.set('grass_snowS', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2)+'deg, #4a4, #4a4 50%, white 60%, #4a4 70%, white 80%, #4a4 90%)' })
    tileset.set('grass_snowSW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2.5)+'deg, #4a4, #4a4 50%, white 60%, #4a4 70%, white 80%, #4a4 90%)' })
    tileset.set('grass_snowW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3)+'deg, #4a4, #4a4 50%, white 60%, #4a4 70%, white 80%, #4a4 90%)' })
    tileset.set('grass_snowNW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3.5)+'deg, #4a4, #4a4 50%, white 60%, #4a4 70%, white 80%, #4a4 90%)' })

    tileset.set('grass_cropN', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0)+'deg, #4a4, #4a4 50%, green 60%, #4a4 70%, green 80%, #4a4 90%)' })
    tileset.set('grass_cropNE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0.5)+'deg, #4a4, #4a4 50%, green 60%, #4a4 70%, green 80%, #4a4 90%)' })
    tileset.set('grass_cropE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1)+'deg, #4a4, #4a4 50%, green 60%, #4a4 70%, green 80%, #4a4 90%)' })
    tileset.set('grass_cropSE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1.5)+'deg, #4a4, #4a4 50%, green 60%, #4a4 70%, green 80%, #4a4 90%)' })
    tileset.set('grass_cropS', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2)+'deg, #4a4, #4a4 50%, green 60%, #4a4 70%, green 80%, #4a4 90%)' })
    tileset.set('grass_cropSW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2.5)+'deg, #4a4, #4a4 50%, green 60%, #4a4 70%, green 80%, #4a4 90%)' })
    tileset.set('grass_cropW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3)+'deg, #4a4, #4a4 50%, green 60%, #4a4 70%, green 80%, #4a4 90%)' })
    tileset.set('grass_cropNW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3.5)+'deg, #4a4, #4a4 50%, green 60%, #4a4 70%, green 80%, #4a4 90%)' })

    tileset.set('grass_saltN', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0)+'deg, #4a4, #4a4 50%, #ddd 60%, #4a4 70%, #ddd 80%, #4a4 90%)' })
    tileset.set('grass_saltNE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0.5)+'deg, #4a4, #4a4 50%, #ddd 60%, #4a4 70%, #ddd 80%, #4a4 90%)' })
    tileset.set('grass_saltE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1)+'deg, #4a4, #4a4 50%, #ddd 60%, #4a4 70%, #ddd 80%, #4a4 90%)' })
    tileset.set('grass_saltSE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1.5)+'deg, #4a4, #4a4 50%, #ddd 60%, #4a4 70%, #ddd 80%, #4a4 90%)' })
    tileset.set('grass_saltS', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2)+'deg, #4a4, #4a4 50%, #ddd 60%, #4a4 70%, #ddd 80%, #4a4 90%)' })
    tileset.set('grass_saltSW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2.5)+'deg, #4a4, #4a4 50%, #ddd 60%, #4a4 70%, #ddd 80%, #4a4 90%)' })
    tileset.set('grass_saltW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3)+'deg, #4a4, #4a4 50%, #ddd 60%, #4a4 70%, #ddd 80%, #4a4 90%)' })
    tileset.set('grass_saltNW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3.5)+'deg, #4a4, #4a4 50%, #ddd 60%, #4a4 70%, #ddd 80%, #4a4 90%)' })
    
    return tileset
}

const populateArray2D = (x, y, value, tileset: Map<string, Tile>, map: TileProps[][])=>{
    const {state, dispatch} = useDynamicContext()
    if(!state?.spawn) return
    let arr = new Array(x)
    for(let i=0;i<x;i++){
        arr[i] = new Array(y)
        for(let j=0;j<y;j++){
            arr[i][j] = value
        }
    }
    return arr
}