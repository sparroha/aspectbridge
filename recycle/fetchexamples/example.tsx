import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import requestIp from 'request-ip';
import jsonFetch from "../../lib/,base/jsonFetch";
import useSWR from "swr";



export default function Main(props){
    const [fetchdata, setFetchdata] = useState(null)
    const [swrdata, setSwrdata] = useState(null)

    /**
     * useSWR
     */
    const {data, error} = useSWR(`http://localhost:3000/api/fetchexamples/example?ip=${props.ip}`, {refreshInterval: 200})
    useEffect(() => {
        if(!data) return
        setSwrdata(data)
        console.log('useSWR: '+JSON.stringify(data))
    }, [data])

    /**
     * fetch
     */
    useEffect(() => {
        let f = ()=>fetch(`http://localhost:3000/api/fetchexamples/example?ip=${props.ip}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setFetchdata(data)
        })
        setTimeout(f, 1000)
    }, [fetchdata])
    return <>
        {'props[GetServerSideProps]: '+(props?.data.text || 'Loading...')+' [only fetched once on page load]'}<br/>
        {'useSWR[{refreshInterval: 200}]: '+(data?.text || 'Loading...')+' [fetched overy .2 seconds]'}<br/>
        {'fetch[useEffect,setTimeout(f, 1000)]: '+(fetchdata?.text || 'Loading...')+' [fetched overy 1 seconds]'}<br/>
        <br/>
        {props.data?.text}<br/>
        {swrdata?.text}<br/>
        {fetchdata?.text}<br/>
    </>
}

/**
 * props
 * @param context 
 * @returns 
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const ip = await requestIp.getClientIp(context.req)
    const data = await fetch(`http://localhost:3000/api/fetchexamples/example?ip=${ip}`,{method: 'GET', headers: {'Content-Type': 'application/json'}}).then(res => res.json())
    return {props: {ip: ip, data: data}} 
}
