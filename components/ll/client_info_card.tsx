import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Card, Col } from "react-bootstrap"
import useLog from "../conlog"
import useClientInfo from "./navigation/clientinfo"


export default function ClientInfoCard(){
    //{path: path,data: data}
    const i = useInit()

    //useLog('@ClientInfoCard('+i.path.dir+':'+i.data.info+')')
    return <Col md={10} id="content">
                <Card className={'img-terrace'}>
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
    useLog('@iseInit(\n<<</'+path.dir+'/'+path.sub+'/'+path.nest+'>>>\n'+
                    '['+data.info+','+data.nav+','+data.subnav+'])')
    return {path: path,data: data}
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
        } p()
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
                let d = useClientInfo(path)
                setData(d)
            }
        } p()
        return p()
    }, [path])
    return data
}