import { ServerResponse } from "http"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Card, Col } from "react-bootstrap"
import { setEnvironmentData } from "worker_threads"
import Ashmore, { AshmoreNav } from "../../pages/josh/clients/ashmore"
import Bill from "../../pages/josh/clients/bill"
import useLog from "../conlog"
import useClientInfo from "./navigation/clientinfo"


export default function ClientInfoCard(){
    //get client from url
    const client = useClient()

    //get path from client
    const path = usePath(client)
    
    //get data from path
    const data = useData(path)

    return <Col md={10} id="content">
                <Card className={'img-terrace'}>
                    <Card.Body>
                        <Card.Title className={'img-banner'}>{path.dir}</Card.Title>
                        <hr />
                        <Card.Text>
                            {data.info}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
}
function useClient(){
    const router = useRouter()
    const { client } = router.query
    useLog(client)
    return client;
}
function usePath(client){
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
    useLog(path)
    return path;
}
function useData(path){
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