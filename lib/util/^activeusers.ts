'use client'
import { useEffect, useState } from "react"
import { getDB, setDB } from "./@registry"
import { ActiveUser } from "../../app/api/users/active/route"
import { User } from "../../app/login/[action]/page"
import { RegistryEntry } from "../../app/api/registry/route"
import { parsedRegistryData } from "../../app/api/util/parsedregistry"
export const ACTIVEUSERS = 'active_users'
export default function useActiveUsers(delay: number = 2000): ActiveUser[]{
    const [activeUsers, setActiveUsers] = useState([{name: 'Loading...', access: 2, time: 0}])
    useEffect(()=>{
        const f = setInterval(()=>{
            fetch('/api/users/active',{ next: { revalidate: 0 } })
			.then((res)=>res.json())
			.then((data: ActiveUser[])=>setActiveUsers(data))
        }, delay)
        return ()=>clearInterval(f)
    },[])
    return activeUsers
}
export async function activateUser(user: Partial<User>){
    //console.log('activating')
    if(!user) return console.log('/lib/util/^activeusers.activateUser(): No user provided')
    return getDB(ACTIVEUSERS)
		.then((data: RegistryEntry | any)=>{
			if(!data) return console.log('/lib/util/^activeusers.activateUser(): No active users found')
			if(data.error) return console.log('/lib/util/^activeusers.activateUser():',data.error)
			return parsedRegistryData(data.registry_data)}
		)
		.then((data: ActiveUser[])=>{
			if(!data) return console.log('/lib/util/^activeusers.activateUser(): No active users found')
			if(data.length == 0){
				setDB(ACTIVEUSERS, [{name: user.username, access: user.access || 0, time: new Date().getTime()}])
			}else{
				let activeUsers = cleanupInactiveUsers(data,user)
				//console.log('activated')
				activeUsers.push({name: user.username, access: user.access, time: new Date().getTime()})
				setDB(ACTIVEUSERS, activeUsers)
			}
		}
    )
}

const cleanupInactiveUsers = (activeUsers: ActiveUser[], user: Partial<User>)=> {
	const freshActiveUsers: ActiveUser[] = activeUsers?.filter((nextActiveUser: ActiveUser) => {
		if(nextActiveUser.name == user.username) return false //prevent duplicate user entry
		if((new Date().getTime() - nextActiveUser.time) > (1000*60*60)/6) return false//remove users that have not been active in the last hour...last 10 min
		return true
	})
	return freshActiveUsers
}