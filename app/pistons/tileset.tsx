'use client'
import { Fragment, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";

export type Tile = {
    validConnect?: {N: string[], E: string[], S: string[], W: string[]},
    backgroundColor: string,
    backgroundImage: string,
}
export default function Grid(){
    
    const tilemap = populateTileset()
    const tiles: {current: [string, Tile][]}  = useRef([])
    useEffect(()=>{
        tilemap.forEach((tile, key)=>{
            tiles.current.push([key, tile])
        })
    },[])
    return <Row>
        <Col sx={12}>
            {tiles.current.map((tile, index)=>{
                return <Fragment key={index}><Tile tile={tile} tiles={tiles.current}/></Fragment>
            })}
        </Col>
    </Row>
}

export type TileProps = Partial<{ type: string, resource: string, x: number, y: number, z: number, orientation: string,  }>
export function Tile({tile, tiles}:{tile: [string, Tile], tiles: [string, Tile][]}){
    //statebgGradient={'linear-gradient(#fff, #fff 50%, #90a0f088 52%, #90a0f088 60%, #00000000 70%)'}

    const [tilemap, setTilemap] = useState<TileProps[][]>([[]])
    useEffect(()=>{
        let map = tilemap
        for (let i = 0; i < 20; i++) {
            if(!map[i])map.push([])
            for (let j = 0; j < 20; j++) {
                if(!map[i][j])map[i].push({})
    
                let type = tiles[Math.floor(Math.random()*tiles.length)]?.[0] || 'grass'
    
                map[i][j] = {x: i, y: j, z: 0, type: type}
            }
        }
        setTilemap(map)
    },[])
    return <div style={{width: 50*20+'px', height: 50*20+'px'}}>
        {tilemap?.map((tile, index)=>{
            return <Row key={index} style={{width: 50*20+'px', height: 50+'px'}}>
                {tile?.map((tile, index)=>{
                    return <Col key={index} style={{
                        backgroundColor: tiles.find((t)=>t[0]==tile.type)?.[1]?.backgroundColor || 'none', 
                        backgroundImage: tiles.find((t)=>t[0]==tile.type)?.[1]?.backgroundImage || 'none', 
                        width: 50+'px', height: 50+'px', margin: 0, padding: 0, 
                        border: '1px solid #000', boxSizing: 'border-box'}}/>
                })}
            </Row>
        })}
    </div>
}
function populateTileset(): Map<string, Tile>{
    let tileset = new Map<string, Tile>()
    tileset.set('grass', { validConnect: {
        N: ['forest_grassS','dirty_grassS','grass_shoreS'], 
        E: ['forest_grassW','dirty_grassW','grass_shoreW'], 
        S: ['forest_grassN','dirty_grassN','grass_shoreN'], 
        W: ['forest_grassE','dirty_grassE','grass_shoreE']
    }, backgroundColor: '#4a4', backgroundImage: 'linear-gradient(#4a4)' })
    tileset.set('forest', { validConnect: {
        N: ['forest_grassN'], E: ['forest_grassE'], S: ['forest_grassS'], W: ['forest_grassW']
    }, backgroundColor: '#4a4', backgroundImage: 'radial-gradient(#00000033 20%, #663300dd 45%, #00000033 70%)' })
    tileset.set('dirt', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#630', backgroundImage: 'radial-gradient(#00000033 20%, #663300dd 45%, #00000033 70%)' })
    tileset.set('water', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#00f', backgroundImage: 'radial-gradient(#00000033 20%, #3333ffdd 45%, #00000033 70%)' })
    tileset.set('lava', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#a00', backgroundImage: 'radial-gradient(#00000033 20%, #dd5500dd 45%, #00000033 70%)' })
    tileset.set('stone', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#777', backgroundImage: 'linear-gradient(#777)' })
    tileset.set('ice', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: 'light-blue', backgroundImage: 'radial-gradient(#00000033 30%, lightblue 50%, #00000033 70%)' })
    tileset.set('sand', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#cb9', backgroundImage: 'radial-gradient(#00000033 30%, #cb9 50%, #00000033 70%)' })
    tileset.set('snow', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: 'white', backgroundImage: 'linear-gradient(white)' })
    tileset.set('wood', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#630', backgroundImage: 'linear-gradient(#630)' })
    tileset.set('metal', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#777', backgroundImage: 'radial-gradient(#00000033 20%, #994400dd 45%, #00000033 70%)' })
    //tileset.set('marsh': { backgroundColor: 'green', backgroundImage: 'linear-gradient(green)' })
    tileset.set('crops', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: 'green', backgroundImage: 'radial-gradient(#00000000 10%, #88aa00ff 20%, #00000000 30%, #88aa00ff 40%, #00000000 50%, #88aa00ff 60%, #00000000 70%, #88aa00ff 80%, #00000000 90%)' })
    tileset.set('salt', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#ddd', backgroundImage: 'linear-gradient(#ddd)' })
    
    
    tileset.set('forest_grassN', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassNE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*0.5)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassSE', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*1.5)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassS', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassSW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*2.5)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })
    tileset.set('forest_grassNW', { validConnect: {N: [], E: [], S: [], W: []}, backgroundColor: '#4a4', backgroundImage: 'linear-gradient('+(90*3.5)+'deg, #4a4, #4a4 50%, #630 60%, #4a4 70%, #630 80%, #4a4 90%)' })

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