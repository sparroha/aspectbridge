'use client'
import { useEffect, useState } from "react"
import { User } from "../../pages/login/[userlogin]"
import { getDB, setDB } from "./^register"
export type ActiveUser = {
    name: string,
    access: number,
    time: number,
  }
export const ACTIVEUSERS = 'active_users'
export default function useActiveUsers(delay: number = 2000): ActiveUser[]{
    const [activeUsers, setActiveUsers] = useState(null)
    useEffect(()=>{
        const f = setInterval(()=>{
            fetch('/api/getactiveusers').then((res)=>res.json()).then((data)=>setActiveUsers(data))
        }, delay)
        return ()=>clearInterval(f)
    },[])
    return activeUsers
}
export async function activateUser(user: Partial<User>){
    if(!user) return console.log('No user provided')
    return getDB(ACTIVEUSERS)
      .then((data: string)=>JSON.parse(data) || [])
      .then((data: ActiveUser[])=>{
        if(data.length == 0){
          setDB(ACTIVEUSERS, [{name: user.username, access: user.access || 0, time: new Date().getTime()}])
        }else{
          //remove current and old users
          let dataArr = data.filter(({time, name}) => {
            if(name == user.username) return false //prevent duplicate user entry
            if((new Date().getTime() - time) > (1000*60*60)/6) return false//remove users that havent been active in the last hour...last 10 min
            return true
          })
          dataArr.push({name: user.username, access: user.access, time: new Date().getTime()})
          setDB(ACTIVEUSERS, dataArr)
        }
      }
    )
  }