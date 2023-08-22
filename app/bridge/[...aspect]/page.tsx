'use client'
import React, { useEffect, useMemo, FC } from 'react'
import {Col, Row} from "react-bootstrap";
import { useRouter } from 'next/navigation';
import UserMenu from '../usermenu';
import UserProfile from '../../../lib/util/-userprofile-';
import useUser from '../../../lib/util/^user';
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
	const user = useUser()
	const activeUsers = useActiveUsers(10000)
    const currentUsername = useMemo(()=>user?.username || 'guest',[user])

    useEffect(() => { 
        if(!user) return
        if(currentUsername != aspect[0]){
          router.push(`/bridge/${currentUsername}${aspect.length>1?'/'+aspect[1]:''}${aspect.length>2?'/'+aspect[2]:''}`)
        }
    },[user])
    return <>
        <UserProfile />
        <AspectBridge {...{user, activeUsers, aspect}}/>
    </>
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
        <Row id={'profile_editor'} className={""} style={{maxHeight: '50vh'}}>
            <Col xs={12}style={{background: 'white'}}>
                <UserMenu user={user} homepage={'bridge'}/>
            </Col>
        </Row>
        <Row id={'chat'} className={'justify-content-md-center'} style={{maxHeight: '50vh'}}>
            <Col xs={12} style={{
                    backgroundImage: 'linear-gradient(to bottom, #777, #fff)' , maxHeight: '40vh'
                }}>
                <Chat user={user} homepage={'bridge'} ip={null}/>
            </Col>
        </Row>
    </>
}