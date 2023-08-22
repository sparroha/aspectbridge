import Chat from "./chat"

export default function Page({params}){
    return <div style={{backgroundImage: 'linear-gradient(180deg, #F2F2F2 0%, #FFFFFF 100%)', height: '100%'}}>
        <Chat homepage={'chat'}/>
    </div>
}