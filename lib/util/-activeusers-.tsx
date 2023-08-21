import useActiveUsers from "./^activeusers"

export default function ActiveUsers(){
    const activeUsers = useActiveUsers()
    return <>{activeUsers?.map((user, i)=>{
        let now = Date.now()
        let then = new Date(user.time).getTime()
        let seconds = Math.floor((now-then)/1000)
        let minutes = Math.floor(seconds/60)
        let minutseconds = (minutes<10?'0':'')+minutes+':'+(seconds%60<10?'0':'')+seconds%60
        return <div key={i} style={{color: 'white'}}>
            {user.name}{' (active '}{minutseconds}{' ago)'}
        </div>
    })}</>
}