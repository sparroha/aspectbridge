import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import useLog from "../../components/conlog"
import Landscape from "../../components/ll/css/layout"

export type Ingredients = {
    message: string | string[]
}

export default function Sand(food: Ingredients) {
    //TODO add cookies to carry information across pages and sessions
    const router = useRouter()
    const urlParams = router.query
    const [message, setMessage] = useState(food.message)
    if(!message || message == '') {
        useEffect(() => { router.push({pathname: '/sandbox/message', query: {
        message: 'this message is auto gener...statically stored and retrieved for your viewing: from urlParams',
        }})}, 
        [message])
    }else useLog('message: '+message)

    return <>
        <h2>
        {(message && message!='')?JSON.stringify(urlParams):JSON.stringify(urlParams.message)}
        </h2>
        <ElementFunction urlP={urlParams} message={message}/>
        </>
}
function ElementFunction(food: any){
    return <>{food.urlP.message+' \n& '+food.message}</>
}
export const getServerSideProps: GetServerSideProps<Ingredients> = async (context) => {
    const urlParams = context.query
    const message = urlParams.message
    let food: Ingredients = {
        message: '',
    }
    if(message) {
        food.message = message+': from props'
    }
    return {props: food}
}