import { GetServerSideProps } from "next"
import { SetStateAction, useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import useSWR from 'swr'
import requestIp from 'request-ip'
import { a_d_maps_ } from "../../api/dragons/maps"
import Region, { RegionData } from "../components/region"
import { GameData } from "../../../public/dragons/tileTypes"
import { useTiles } from "./region"
import { a_d_tiles_ } from "../../api/dragons/regions"
import { MapData } from "../components/worldmap"
import UserProfile from "../../../lib/util/-userprofile-"
import useUser from "../../../lib/util/^user"

export type ActiveUser = {
  username: string | string[],
  email: string | string[],
  access: string | string[],
  message: string | string[],
  homepage: string | string[],
  ip: string | string[]
}
const debugAccess='2'
const loginLayout = {
    backgroundColor: '#0c0',
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '10px'
}
const registerLayout = {
    backgroundColor: '#cc0',
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '10px'
}
const menuLayout = {
    backgroundColor: '#c0c',
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '10px'
}
const background = {
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}
export default function MapEditor({ip}) {
    const [mapname, setMapname] = useState('tree')
    const [map, setMap] = useState(null)
    const user = useUser()
    useMap(mapname, setMap)

    return <Container>
            <Row><Col xs={12}>
              <input type="text" name="mapname" value={mapname} onChange={(e)=>setMapname(e.target.value)}/>
              {/*<EditMap access={user?.access} name={mapname} setEmap={setEmap}/>*/}
            </Col></Row>
            <Row><Col xs={12}>
              <EditMap user={user} map={map} setMap={setMap}/>
            </Col></Row>
            <Row><Col xs={12}><UserProfile/></Col></Row>
          </Container>
}

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const ip = await requestIp.getClientIp(req)
    //const tiles = await sql`SELECT * FROM aspect_dragons_tiles_ WHERE 1`
    return {props: {ip: ip}}
}

export function useMap(name, setMap){
  const fetcher = (url) => fetch(url).then((res) => res.json()).then((data) => { return setMap(data) })
  const { data, error } = useSWR('../../../api/dragons/maps?method=get&name='+name, { revalidateOnFocus: false })
}
export function EditMap({user, map, setMap}) {
  const [tiles, setTiles] = useState(null)
  const debug = true
  if (!map) return <div>loading Map...</div>
  useTiles(setTiles)
  let tilesdata: a_d_tiles_[] = tiles
  let mapConstructedFromDB: RegionData[][][] = [[[]]]
  map.forEach((tile: a_d_maps_, index: number) => {
    let T: a_d_tiles_ = tilesdata.find((t: a_d_tiles_) => { return t.name === tile.tile })
    let R: RegionData = {
      name: tile.name,
      description: T.description,
      image: T.image,
      paths: JSON.parse(T.paths),
      loot_table: JSON.parse(T.loot_table),
      population_table: JSON.parse(T.population_table),
      event_table: JSON.parse(T.event_table),
      destination: JSON.parse(T.destination),
      destinationMap: T.destinationMap,
    }
    mapConstructedFromDB[tile.mapX][tile.mapY][tile.mapZ] = R
  });
  let M: MapData = {
    name: map[0].name,
    description: map[0].description,
    background: '',
    viewDistance: 2,
    setViewDistance: null,
    regions: null
  }
  let game: GameData = {
    user: user,
    name: map[0].name,
    description: map[0].description,
    background: '',
    previousMap: null,
    previousMapPos: null,
    setPreviousMapPos: null,
    activeMap: M,
    setActiveMap: null,
    events: null,
    eventIndex: 0,
    setEventIndex: null,
    viewDistance: 2,
    setViewDistance: null,
    position: { x: 0, y: 0, z: 0 },
    setPosition: null
  }

  return <Row>
      <Col sm={12}></Col>
      <Col sm={12} className={'tcenter'} style={{color: 'white', background: 'gray', borderRadius: '90px'}}>
        <MapF game={game}/>

      </Col>
      <Col sm={12}></Col>
    </Row>
}

export function MapF({game}: {game: GameData}){
  const [update, setUpdate] = useState()
  const [lastIndex, setLastIndex] = useState(game?.eventIndex||0)
  if(!game) return <>Map Loading...</>
  /*useEffect(()=>{
      setLastIndex(game.eventIndex)
      return !game.activeMap.regions[game.position.z][game.position.x][game.position.y].events?game.setEventIndex(game.events.findIndex((e: EventData)=>{return e.name === 'none'})):
      game.activeMap.regions[game.position.z][game.position.x][game.position.y].events?.forEach((event: string)=>{
          let E: EventData = game.events.find((e: EventData)=>{return e.name === event})//thank you copilot
          let I: number = game.events.findIndex((e: EventData)=>{return e.name === event})
          game.setEventIndex(I)
          E?.oninit?.forEach((event: string)=>{
              console.log(event)
              switch(event){
                  case 'fall':
                      fallEvent(game)
                      game.setEventIndex(game.events.findIndex((e: EventData)=>{return e.name === event}))
                      break;
                  case 'enter':
                      enterEvent(game)
                      game.setEventIndex(game.events.findIndex((e: EventData)=>{return e.name === event}))
                      break;
                  case 'exit':
                      exitEvent(game)
                      game.setEventIndex(game.events.findIndex((e: EventData)=>{return e.name === event}))
                      break;
                  case 'fight':
                      break;
                  case 'item':
                      break;
                  case 'trap':
                      break;
                  case 'treasure':
                      break;
                  case 'event':
                      break;
                  default:
                      game.setEventIndex(game.events.findIndex((e: EventData)=>{return e.name === 'none'}))
                      break;
              }
          })
      })
  },[game.position])*/
  return <div className={'net-dragons-map'}>
      LastEvent:{'\['}{game.events[lastIndex].name}{': '}{game.events[lastIndex].description}{'\]'}<br/>
      Event:{'\['}{game.events[game.eventIndex].name}{': '}{game.events[game.eventIndex].description}{'\]'}
      {game.activeMap.regions?.map((row, i) => (game.position.z==i)?<Row key={i}>Floor {i+1}<Col xs={12}>
          {row.map((col, j) => (j>=(game.position.x-game.viewDistance))&&(j<=(game.position.x+game.viewDistance))?<Row key={j}><Col xs={12} style={{padding: 0}}>
              {col.map((cell, k) => ((k>=game.position.y-game.viewDistance)&&(k<=game.position.y+game.viewDistance))?
              <div key={k}><Region region={cell} disabled={(game.position.x==j&&game.position.y==k&&game.position.z==i?false:true)} /></div>
              :<div key={k}></div>)}
          </Col></Row>:<div key={j}></div>)}
      </Col></Row>:<div key={i}></div>)}
  </div>
}