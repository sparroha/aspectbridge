import { ServerResponse } from "http"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Card, Col } from "react-bootstrap"
import Ashmore from "../../pages/josh/clients/ashmore"
import Bill from "../../pages/josh/clients/bill"

export default function ClientInfoCard(){
    const router = useRouter()
    const { client } = router.query //array
    const [res, setRes] = useState(<></>)
    const [dir, setDir] = useState('')
    const [sub, setSub] = useState('')
    const [nest, setNest] = useState('')
    function handleClientSelect(){
        if(client){
            let d = (client.length>1?client[0]:client).toString()
            let s = (client.length>1?client[1]:client).toString()
            let n = (client.length>2?client[2]:(client.length>1?client[1]:client)).toString()
            setDir(d)
            setSub(s)
            setNest(n)
            switch(d){
                case 'dashboard': setRes(<>DASHBOARD</>)
                break;
                case 'ashmore': { 
                    switch(s){
                        case 'yards': setRes(<>YARDS</>)
                        break;
                        case 'trimmings': setRes(<>TRIMMINGS</>)
                        break;
                        case 'hardees': setRes(<>HARDEES</>)
                        break;
                        case 'unidentified': setRes(<>unidentified</>)
                        break;
                        default: setRes(<Ashmore />)
                        break;
                    }
                } break;
                case 'bill': { 
                    switch(s){
                        case 'yards': setRes(<>YARDS</>)
                        break;
                        case 'trimmings': setRes(<>TRIMMINGS</>)
                        break;
                        case 'hardees': setRes(<>HARDEES</>)
                        break;
                        case 'unidentified': setRes(<>unidentified</>)
                        break;
                        default: setRes(<Bill />)
                        break;
                    }
                } break;
                case 'graves': { 
                    switch(s){
                        case 'yards': setRes(<>YARDS</>)
                        break;
                        case 'trimmings': setRes(<>TRIMMINGS</>)
                        break;
                        case 'hardees': setRes(<>HARDEES</>)
                        break;
                        case 'unidentified': setRes(<>unidentified</>)
                        break;
                        default: setRes(<>Graves</>)
                        break;
                    }
                } break;
                case 'ashmore': { 
                    switch(s){
                        case 'yards': setRes(<>YARDS</>)
                        break;
                        case 'trimmings': setRes(<>TRIMMINGS</>)
                        break;
                        case 'hardees': setRes(<>HARDEES</>)
                        break;
                        case 'unidentified': setRes(<>unidentified</>)
                        break;
                        default: setRes(<Ashmore />)
                        break;
                    }
                } break;
                break;
                case 'bill': setRes(<Bill />)
                break;
                default: setRes(<>Dashboard</>)
                break;
            }console.log('Client: '+d+'|'+(client.length>1?client[0]:client)+' ./. Subdomain: '+s+'|'+(client.length>1?client[1]:client))
        }
    }
    useEffect(() => {
        handleClientSelect()
        return () => handleClientSelect()
    }, [client])
    
    return <Col md={10} id="content">
                <Card className={'img-terrace'}>
                    <Card.Body>
                        <Card.Title className={'img-banner'}>{sub}</Card.Title>
                        <hr />
                        <Card.Text>
                            {res}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
}