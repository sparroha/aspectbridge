import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react"
import requestIp from 'request-ip';
import { LoginNav, Profile } from "../login/[userlogin]";
import { update } from "xstate/lib/actionTypes";

export default function Gather(props){
    const render = useState({})[1]
    const user = useRef(null)//set by <Profile/> to provide user authentiation
    const player = useRef(
        {
            coin: 0,
            income: 0,
            prestige: 0,
            gems: 0,
            items: [
                {name: 'item1', value: 1, amount: 0},
                {name: 'item2', value: 2, amount: 0},
                {name: 'item3', value: 3, amount: 0},
                {name: 'item4', value: 4, amount: 0},
                {name: 'item5', value: 5, amount: 0},
                {name: 'item6', value: 6, amount: 0},
                {name: 'item7', value: 7, amount: 0},
                {name: 'item8', value: 8, amount: 0},
                {name: 'item9', value: 9, amount: 0},
                {name: 'item10', value: 10, amount: 0},
            ]
        }
    )
    useEffect(()=>{
        const playerData = fetch('/api/gather/users?username='+user?.current?.username)
        .then((res)=>res.json())
        .then(([{player_data}])=>{ 
            //console.log(data)
            player.current = JSON.parse(player_data)
        }).catch((e)=>{console.log(e)})
    },[user])

    function updatePlayer(user, player){
        console.log('updatePlayer')
        fetch('/api/gather/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user?.current?.username,
                player_data: player.current//do I need to stringify inside my stringify?
            })
        }).then((res)=>res.json())
        .then((data)=>{
            //console.log(data)
        })
        .catch((e)=>{console.log(e)})
    }
    
    return <>
        <LoginNav user={user.current} homepage={'gather'}/>{/*provides standard login link for redirect;homepage=here*/}
        <Profile ip={props.ip} setUser={(data)=>{user.current=data;render({})}}/>{/*sets by user state to provide user authentiation*/}
        {updatePlayer(user, player)}
    </>
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const ip = await requestIp.getClientIp(context.req)
    return {props: {ip: ip}} 
}