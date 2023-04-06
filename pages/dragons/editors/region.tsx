import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { ProfileByIp } from "../../login/[userlogin]"
import useSWR from "swr"
import requestIp from 'request-ip'
import { a_d_tiles_ } from "../../api/dragons/regions"
import useLog from "../../../components/conlog"
import { GetServerSideProps } from "next"

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
export default function RegionEditor({ip}) {
    const [user, setUser] = useState(null)
    const [tiles, setTiles] = useState(null)
    useTiles(setTiles)

    return <Container>
            <Row>
                <Col xs={12} sm={6}>
                    <iframe style={{display: 'default'}} name={'api'}></iframe>
                </Col>
                <Col xs={12} sm={6}>
                    <AddRegionForm/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <EditTiles access={user?.access} tiles={tiles}/>
                </Col>
            </Row>
            <ProfileByIp ip={ip} setUser={setUser}/>
          </Container>
}
export function useTiles(setTiles){
    const fetcher = (url) => fetch(url).then((res) => res.json()).then((data) => { return setTiles(data) })
    const { data, error } = useSWR('../../../api/dragons/regions?method=getall', fetcher/*{ revalidateOnFocus: true }*/)
    //useEffect(() => { return setTiles(data) },[data])  
    //return data
  }
  export function EditTiles({access, tiles}) {
    //const debug = true
    //if (error) return <Row><Col style={{visibility: (debug?'visible':'hidden'), position: (debug?'relative':'absolute')}}>{JSON.stringify(error)}:Tiles not cached.</Col></Row>
    if (!tiles || typeof tiles === undefined) return <div>loading Region Tile...</div>
    let tilesdata: a_d_tiles_[] = tiles
    return <Row>
      {tilesdata.map((tile: a_d_tiles_, index: number) => {
        return <Col key={index} xs={12} sm={6}><RegionForm tile={tile} access={access}/></Col>
      })}
      </Row>
  }
  export function RegionForm({tile, access}: {tile: a_d_tiles_, access: number}){
    const [updateMethod, setUpdateMethod] = useState('update')
  
    const [name, setName] = useState(tile.name)
    const [description, setDescription] = useState(tile.description)
    const [image, setImage] = useState(tile.image)
    const [paths, setPaths] = useState(tile.paths)
    const [loot_table, setLoot_table] = useState(tile.loot_table)
    const [population_table, setPopulation_table] = useState(tile.population_table)
    const [event_table, setEvent_table] = useState(tile.event_table)
    const [destination, setDestination] = useState(tile.destination)
    const [destinationMap, setDestinationMap] = useState(tile.destinationMap)
  
    let imgname = image&&typeof image !== undefined&&image!=null&&image!=''?image:'tree.png'
    let imgurl = '../../../dragons/assets/'+imgname
    useLog('TILE: '+JSON.stringify(tile))
    return <Form id={'UPDATE_TILE'} method={'post'}>
          <Row>
            <Col xs={9} style={{...background, backgroundImage: 'url("'+imgurl+'")', padding: '5px', border: '1px solid black', borderRadius: '10px'}}>
              <Row style={{background: 'white', opacity: '0.7'}}>
                <Col xs={4}>
                  <img src={imgurl} alt={name} width={'16px'} height={'16px'}/>ID:
                  <Form.Control name="id" value={tile.id}/>
                </Col>
                <Col xs={8}>
                  Name:
                  <Form.Control type="text" name="name" placeholder={name} value={name} onChange={e => setName(e.target.value)}/>
                </Col>
              </Row>
              <Row style={{background: 'white', opacity: '0.7'}}>
                <Col xs={4}>Image: </Col>
                <Col xs={8}>
                  <Form.Control type="text" name="image" placeholder={image} value={image} onChange={e => setImage(e.target.value)}/>
                </Col>
              </Row>
              <Row style={{background: 'white', opacity: '0.7'}}>
                <Col xs={3}>Discription: </Col>
                <Col xs={12}>
                  <Form.Control type="text" name="description" placeholder={description} value={description} onChange={e => setDescription(e.target.value)}/>
                </Col>
              </Row>
              <Row style={{background: 'white', opacity: '0.7'}}>
                <Col xs={12}>
                  Obstructed Pathswys: <Form.Control name="paths" value={paths}/>
                </Col>
                <Col xs={4}>
                  North: <input type="checkbox" placeholder={paths[0]} checked={JSON.parse(paths)[0]==1} onChange={e => setPaths((p: string)=>{let jp=JSON.parse(p); jp[0]=(e.target.checked?1:0); return JSON.stringify(jp)})}/>
                </Col>
                <Col xs={4}>
                  East: <input type="checkbox" placeholder={paths[1]} checked={JSON.parse(paths)[1]==1} onChange={e => setPaths((p: string)=>{let jp=JSON.parse(p); jp[1]=(e.target.checked?1:0); return JSON.stringify(jp)})}/>
                </Col>
                <Col xs={4}>
                  South:<input type="checkbox" placeholder={paths[2]} checked={JSON.parse(paths)[2]==1} onChange={e => setPaths((p: string)=>{let jp=JSON.parse(p); jp[2]=(e.target.checked?1:0); return JSON.stringify(jp)})}/>
                </Col>
                <Col xs={4}>
                  West:<input type="checkbox" placeholder={paths[3]} checked={JSON.parse(paths)[3]==1} onChange={e => setPaths((p: string)=>{let jp=JSON.parse(p); jp[3]=(e.target.checked?1:0); return JSON.stringify(jp)})}/>
                </Col>
                <Col xs={4}>
                  Up:<input type="checkbox" placeholder={paths[4]} checked={JSON.parse(paths)[4]==1} onChange={e => setPaths((p: string)=>{let jp=JSON.parse(p); jp[4]=(e.target.checked?1:0); return JSON.stringify(jp)})}/>
                </Col>
                <Col xs={4}>
                  Down:<input type="checkbox" placeholder={paths[5]} checked={JSON.parse(paths)[5]==1} onChange={e => setPaths((p: string)=>{let jp=JSON.parse(p); jp[5]=(e.target.checked?1:0); return JSON.stringify(jp)})}/>
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
  }
  export function AddRegionForm(){
    const [updateMethod, setUpdateMethod] = useState('set')
  
    const [name, setName] = useState('newRegionTile')
    const [description, setDescription] = useState('description')
    const [image, setImage] = useState('image.png')
    const [paths, setPaths] = useState('[0,0,0,0,0,0]')
    const [loot_table, setLoot_table] = useState('[]')
    const [population_table, setPopulation_table] = useState('[]')
    const [event_table, setEvent_table] = useState('[]')
    const [destination, setDestination] = useState('{x:0,y:0,z:0}')
    const [destinationMap, setDestinationMap] = useState('destinationMap')
  
    let imgname = image&&typeof image !== undefined&&image!=null&&image!=''?image:'tree.png'
    let imgurl = '../../../dragons/assets/'+imgname
    return <Form id={'UPDATE_TILE'} method={'post'}>
          <Row>
            <Col xs={9} style={{...background, backgroundImage: 'url("'+imgurl+'")', padding: '5px', border: '1px solid black', borderRadius: '10px'}}>
              <Row style={{background: 'white', opacity: '0.7'}}>
                <Col xs={4}>
                  <img src={imgurl} alt={name} width={'16px'} height={'16px'}/>ID:
                  <Form.Control placeholder={'0'}/>
                </Col>
                <Col xs={8}>
                  Name:
                  <Form.Control type="text" name="name" placeholder={name} value={name} onChange={e => setName(e.target.value)}/>
                </Col>
              </Row>
              <Row style={{background: 'white', opacity: '0.7'}}>
                <Col xs={4}>Image: </Col>
                <Col xs={8}>
                  <Form.Control type="text" name="image" placeholder={image} value={image} onChange={e => setImage(e.target.value)}/>
                </Col>
              </Row>
              <Row style={{background: 'white', opacity: '0.7'}}>
                <Col xs={3}>Discription: </Col>
                <Col xs={12}>
                  <Form.Control type="text" name="description" placeholder={description} value={description} onChange={e => setDescription(e.target.value)}/>
                </Col>
              </Row>
              <Row style={{background: 'white', opacity: '0.7'}}>
                <Col xs={12}>
                  Obstructed Pathswys: <Form.Control name="paths" value={paths}/>
                </Col>
                <Col xs={4}>
                  North: <input type="checkbox" placeholder={paths[0]} checked={JSON.parse(paths)[0]==1} onChange={e => setPaths((p: string)=>{let jp=JSON.parse(p); jp[0]=(e.target.checked?1:0); return JSON.stringify(jp)})}/>
                </Col>
                <Col xs={4}>
                  East: <input type="checkbox" placeholder={paths[1]} checked={JSON.parse(paths)[1]==1} onChange={e => setPaths((p: string)=>{let jp=JSON.parse(p); jp[1]=(e.target.checked?1:0); return JSON.stringify(jp)})}/>
                </Col>
                <Col xs={4}>
                  South:<input type="checkbox" placeholder={paths[2]} checked={JSON.parse(paths)[2]==1} onChange={e => setPaths((p: string)=>{let jp=JSON.parse(p); jp[2]=(e.target.checked?1:0); return JSON.stringify(jp)})}/>
                </Col>
                <Col xs={4}>
                  West:<input type="checkbox" placeholder={paths[3]} checked={JSON.parse(paths)[3]==1} onChange={e => setPaths((p: string)=>{let jp=JSON.parse(p); jp[3]=(e.target.checked?1:0); return JSON.stringify(jp)})}/>
                </Col>
                <Col xs={4}>
                  Up:<input type="checkbox" placeholder={paths[4]} checked={JSON.parse(paths)[4]==1} onChange={e => setPaths((p: string)=>{let jp=JSON.parse(p); jp[4]=(e.target.checked?1:0); return JSON.stringify(jp)})}/>
                </Col>
                <Col xs={4}>
                  Down:<input type="checkbox" placeholder={paths[5]} checked={JSON.parse(paths)[5]==1} onChange={e => setPaths((p: string)=>{let jp=JSON.parse(p); jp[5]=(e.target.checked?1:0); return JSON.stringify(jp)})}/>
                </Col>
              </Row>
            </Col>
            <Col xs={3}>
              <select name="method" value={updateMethod} onChange={e => setUpdateMethod(e.target.value)}>
                <option value={"set"}>Set</option>
              </select>
              <Button variant="primary" type="submit" formTarget={'api'} formAction={"../../../api/dragons/regions"}>Add</Button>
            </Col>
          </Row>
        </Form>
  }
  
export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const ip = await requestIp.getClientIp(req)
    //const tiles = await sql`SELECT * FROM aspect_dragons_tiles_ WHERE 1`
    return {props: {ip: ip}}
}