'use client'
import React, { useEffect, useMemo, FC } from 'react'
import {Col, Row} from "react-bootstrap";
import { useRouter } from 'next/navigation';
import UserMenu from '../usermenu';
import UserProfile from '../../../lib/util/-userprofile-';
import useUsers from '../../../lib/util/^user';
import { SWRConfig } from 'swr';
import jsonFetch from '../../../lib/,base/jsonFetch';
import Chat from '../../chat/chat';
import useActiveUsers from '../../../lib/util/^activeusers';

interface pageProps{params: {aspect: string[]}, searchParams}

/**
 * ENTRY POINT
 * @param param0 
 * @returns 
 */
const page: FC<pageProps> = ({params, searchParams})=>{
    const router = useRouter()
    const {aspect} = params
	const user = useUsers(searchParams)
	const activeUsers = useActiveUsers(10000)
    const currentUsername = useMemo(()=>user?.username || 'guest',[user])

    useEffect(() => { 
        if(!user) return
        if(currentUsername != aspect[0]){
          router.push(`/bridge/${currentUsername}${aspect.length>1?'/'+aspect[1]:''}${aspect.length>2?'/'+aspect[2]:''}`)
        }
    },[user])
    return <SWRConfig value={{ fetcher: jsonFetch }}>
        <UserProfile />
        <AspectBridge {...{user, activeUsers, aspect}}/>
    </SWRConfig>
}
export default page

/**
 * PAGE CONTENT
 * @param props 
 * @returns 
 */
function AspectBridge(props){
	const {user, activeUsers, aspect} = props
    return <>
        {//aspect.map((a,i)=><p key={i} style={{color: 'white', float: 'left', margin: '2px', fontSize: '.8em'}}>{a}</p>)}<hr/>
        }
        <Row id={'profile_editor'} className={""}>
            <Col xs={12}style={{background: 'white'}}>
                <UserMenu user={user} homepage={'bridge'}/>
            </Col>
        </Row>
        <Row id={'chat'} className={'justify-content-md-center'}>
            <Col xs={12}style={{
                    backgroundImage: 'linear-gradient(to bottom, #777, #fff)'
                }}>
                <Chat user={user} homepage={'bridge'} ip={null} maxHeight={'10vh'}/>
            </Col>
        </Row>
    </>
}