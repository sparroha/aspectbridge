import { sha224 } from "js-sha256"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { SetStateAction, useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import useSWR from 'swr'
import requestIp from 'request-ip'
import sql from "../../../lib/,base/sql"
import SimpleNav from "../../../components/simplenav"
import { a_d_maps_ } from "../../api/dragons/maps"
import { a_d_tiles_ } from "../../api/dragons/regions"
import useLog from "../../../components/conlog"
import { ProfileByIp } from "../../login/[userlogin]"

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
    const [user, setUser] = useState(null)

    return <Container>
            <Row><Col xs={12}>
              <input type="text" name="mapname" value={mapname} onChange={(e)=>setMapname(e.target.value)}/>
              {/*<EditMap access={user?.access} name={mapname} setEmap={setEmap}/>*/}
            </Col></Row>
            <Row><Col xs={12}>
              <EditMap access={user?.access} map={map} setMap={setMap}/>
            </Col></Row>
            <Row><Col xs={12}><ProfileByIp ip={ip} setUser={setUser}/></Col></Row>
          </Container>
}

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const ip = await requestIp.getClientIp(req)
    //const tiles = await sql`SELECT * FROM aspect_dragons_tiles_ WHERE 1`
    return {props: {ip: ip}}
}

export function useMap({name, setEmap}){
  const [map , setMap] = useState(null)
  const { data, error } = useSWR('../../../api/dragons/maps?method=get&name='+name, { revalidateOnFocus: false })
  const debug = true
  useEffect(() => { return setEmap(data) },[data])
  
  return {map: map, setMap: setMap}
}
export function EditMap({access, map, setMap}) {
  const { data, error } = useSWR('../../../api/dragons/maps?method=get&name='+name, { revalidateOnFocus: false })
  const debug = true
  useEffect(() => { return setMap(data) },[data])
  if (error) return <Row><Col style={{visibility: (debug?'visible':'hidden'), position: (debug?'relative':'absolute')}}>{JSON.stringify(error)}:Map not cached.</Col></Row>
  if (!data) return <div>loading Map...</div>

  let mapConstructedFromDB: string[][][] = [[[]]]
  data.forEach((tile: a_d_maps_, index: number) => {
    mapConstructedFromDB[tile.mapX][tile.mapY][tile.mapZ] = tile.name
  },[]);
  
  return <Row>
      <Col sm={4}></Col>
      <Col sm={4} className={'tcenter'} style={{color: 'white', background: 'gray', borderRadius: '90px'}}>
        <h1>Map: {data}</h1>

      </Col>
      <Col sm={4}></Col>
    </Row>
}

