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
    const [emap, setEmap] = useState(null)
    const [user, setUser] = useState(null)
    const {tiles, setTiles} = useTiles()

    return <Container>
            <Row><Col xs={12}>
              <input type="text" name="mapname" value={mapname} onChange={(e)=>setMapname(e.target.value)}/>
              <EditMap access={user?.access} name={mapname} setEmap={setEmap}/>
            </Col></Row>
            <Row><Col xs={12}>
              <EditTile access={user?.access} tiles={tiles} setTiles={setTiles}/>
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
export function EditMap({access, name, setEmap}) {
  const { data, error } = useSWR('../../../api/dragons/maps?method=get&name='+name, { revalidateOnFocus: false })
  const debug = true
  useEffect(() => { return setEmap(data) },[data])
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
export function useTiles(){
  const [tiles , setTiles] = useState(null)
  const { data, error } = useSWR('../../../api/dragons/regions?method=getall', { revalidateOnFocus: true })
  useEffect(() => { setTiles(data); return setTiles(data) },[data])
  useLog(data)
  
  return {tiles: tiles, setTiles: setTiles}
}
export function EditTile({access, tiles, setTiles}) {
  const [updateMethod, setUpdateMethod] = useState('update')
  //const debug = true
  //if (error) return <Row><Col style={{visibility: (debug?'visible':'hidden'), position: (debug?'relative':'absolute')}}>{JSON.stringify(error)}:Tiles not cached.</Col></Row>
  if (!tiles || typeof tiles === undefined) return <div>loading Region Tile...</div>
  let tilesdata: a_d_tiles_[] = tiles
  return <>
    <iframe style={{display: 'default'}} name={'api'}></iframe>
    <Row>
      <Col xs={2}>
        ID
      </Col>
      <Col xs={2}>
        Region Name
      </Col>
      <Col xs={3}>
        Description
      </Col>
      <Col xs={3}>
        Paths Array
      </Col>
      <Col xs={2}>
        Action
      </Col>
    </Row>
    <Form id={'ADD_TILE'} method={'post'} target={'api'}>
      <Row>
        <Col xs={2}>
          <Form.Control value={0}/>
        </Col>
        <Col xs={2}>
          <Form.Control required type="text" name="name" placeholder={'name'}/>
        </Col>
        <Col xs={3}>
          <Form.Control type="text" name="description" placeholder={'description'}/>
        </Col>
        <Col xs={3}>
          <Form.Control required type="text" name="paths" placeholder={'paths'}/>
        </Col>
        <Col xs={2}>
          <Form.Control name="method" value={'set'}/>
          <Button type="submit" formAction={"../../../api/dragons/regions"}>Add</Button>
        </Col>
      </Row>
    </Form>

    {tilesdata.map((tile: a_d_tiles_, index: number) => {
      let image = tile&&typeof tile.image !== undefined&&tile.image!=null&&tile.image!=''?tile.image:'tree.png'
      let imgurl = '../../../dragons/assets/'+image
      return <Form key={tile.id} id={'DELETE_TILE'} method={'post'}>
            <Row>
              <Col xs={8} sm={5} style={{...background, backgroundImage: 'url("'+imgurl+'")'}}>
                <Row>
                  <Col xs={3}>
                    <Form.Control name="id" value={tile.id}/>
                    {image}<img src={imgurl} alt={tile.name} width={'16px'} height={'16px'}/>
                  </Col>
                  <Col xs={9}>
                    <Form.Control type="text" name="name" placeholder={tile.name}/>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Control type="text" name="description" placeholder={tile.description}/>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Form.Control type="text" name="paths" placeholder={tile.paths}/>
                  </Col>
                </Row>
              </Col>
              <Col xs={3}>
                <select name="method" value={updateMethod} onChange={e => setUpdateMethod(e.target.value)}>
                  <option value={"update"}>Update</option>
                  {(access&&access==2)?<option value={"delete"}>Delete</option>:null}
                </select>
                <Button variant="primary" type="submit" formTarget={'api'} formAction={"../../../api/dragons/regions"}>Update</Button>
              </Col>
            </Row>
          </Form>
    })}
  </>
}
