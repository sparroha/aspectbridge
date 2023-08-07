import { useMemo, useState } from "react"
import { Col, Nav, Row } from "react-bootstrap"
import { UserSettingsProps } from "./[...aspect]"

export default function UserMenu({user, homepage}){
    if(!user) return <UserLog_in_out user={user} homepage={homepage} />
    const userSettings: UserSettingsProps = useMemo(() => {return {
        user: user
    }},[user])
    return <>
        Profile:
        <UserLog_in_out user={user} homepage={homepage} />
        <UserStats user={user}/>
        <UserSettings user={user} />
    </>
}
function UserSettings({user}){
    const [showUserSettings, setShowUserSettings] = useState(false)
    const [modShowUsers, setModShowUsers] = useState(false)
    const [adminShowUsers, setAdminShowUsers] = useState(false)
    return <>
        {user.access>=0?<Row style={{borderTop: '2px solid black'}}>
            <Row>User Settings</Row>
            <Row>
                <Col sm={3}>
                    <input style={{backgroundColor: '#777'}} type='checkbox' onChange={e=>setShowUserSettings(e.target.checked)} checked={showUserSettings} />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    {showUserSettings?<>TODO: user settings</>:null} 
                </Col>
            </Row>
        </Row>:null}
        {user.access>=1?<Row style={{borderTop: '2px solid black'}}>
            <Row>Moderator Settings</Row>
            <Row>
                <Col sm={3}>
                    <input style={{backgroundColor: '#777'}} type='checkbox' onChange={e=>setModShowUsers(e.target.checked)} checked={modShowUsers} />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    {modShowUsers?<>TODO: user moderation</>:null} 
                </Col>
            </Row>
        </Row>:null}
        {user.access>=2?<Row style={{borderTop: '2px solid black'}}><Col>
            <Row>Admin Settings</Row>
            <Row>
                <Col sm={3}>
                    <input style={{backgroundColor: '#777'}} type='checkbox' onChange={e=>setAdminShowUsers(e.target.checked)} checked={adminShowUsers} />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    {adminShowUsers?<>TODO: user list</>:null} 
                </Col>
            </Row>
        </Col></Row>:null}
    </>
}
function UserLog_in_out({user, homepage}){
    return <Col>
        <Row><Nav.Link style={{color: 'blue'}} href={"/login/"+(user?'logout':'login')+'?homepage='+homepage+(user?'&username='+user.username:'')}>
            {user?('Logout '+user.username):'Login'}
        </Nav.Link></Row>{' '}
    </Col>
}
function UserStats({user}){
    return <Row xs={1} sm={2} md={2} lg={3} xl={3} >
        {JSON.stringify(user).replaceAll('{', '').replaceAll('}', '').replaceAll('::1', 'localhost').replaceAll('"', '').replaceAll(',', '|').split('|').map(
            (value, index) => {
                let [tag, val] = value.split(':')
                if(tag==='hash') val = '********'
                return <Col key={index}><div style={{backgroundColor: '#ddd', margin: '1px', paddingLeft: '5px'}}>
                    <b>{tag}</b>{': '}{val!='1'?val:'localhost'}
                </div></Col>
            }
        )}
    </Row>
}