import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import { Card, Col } from "react-bootstrap"
import useLog from "../conlog"
import getClientInfo from "./navigation/clientinfo"


export default function ClientInfoCard(pageInfo){
    //{path: path,data: data}
    const i = pageInfo
    //const i = useInit()

    //useLog('@ClientInfoCard('+i.path.dir+':'+i.data.info+')')
    return <Col md={10} id="content">
                <Card className={''}>
                    <Card.Body>
                        <Card.Title className={'img-banner'}>{i.path.dir}</Card.Title>
                        <hr />
                        <Card.Text>
                            {i.data.info}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
}
export function ClientNavSelector(){

}
export function useInit(){
    //get client from url
    const client = useClient()
    //get path from client
    const path = usePath(client)
    //get data from path
    const data = useData(path)
    //save this info to instance
    const init = useMemo(()=> {return {path: path, data: data}}, [data]);
    useLog('@useInit(\n<<</'+init.path.dir+'/'+init.path.sub+'/'+init.path.nest+'>>>\n'+
                    '['+init.data.info+','+init.data.nav+','+init.data.subnav+'])')
    return init
}
export function useClient(){
    const router = useRouter()
    const { client } = router.query
    //useLog('@useClient('+client+')')
    return client;
}
export function usePath(client){
    const [path, setPath] = useState({dir: ' ', sub: ' ', nest: ' '});
    useEffect(()=>{
        function p(){
            if(client){
                let dir = (client.length>1?client[0]:client).toString()
                let sub = (client.length>1?client[1]:client).toString()
                let nest = (client.length>2?client[2]:(client.length>1?client[1]:client)).toString()
                setPath({dir: dir, sub: sub, nest: nest})
            }
        }
        return p()
    }, [client])
    //useLog('@usePath(/'+path.dir+'/'+path.sub+'/'+path.nest+')')
    return path;
}
export function useData(path){
    const [data, setData] = useState({ info: <></>, nav: <></>, subnav: <></> })
    useEffect(()=>{
        function p(){
            if(path){
                let d = getClientInfo(path)
                setData(d)
            }
        }
        return p()
    }, [path])
    return data
}