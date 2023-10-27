import { useEffect, useState } from "react"

export type NaviProps = {
    mouseClickPos: {x: number, y: number},
    click: (e)=>void
}
export default function Navi(props){
    const prophet = props.prophet || useProphet()
    const [viv, setViv] = useState(10)
    const [vive, setVive] = useState(5)
    const [cycle, setCycle] = useState(1)
    
    useEffect(()=>{
        console.log('nav hob')
        const i = setInterval(()=>{
            console.log('nav hob')
            prophet.setNavipos((p)=>({left: p.left + vive, top: p.top + viv}))

            setViv((v)=>v*-1)

            setVive((v)=>(v*-1)*cycle)

            setCycle((c)=>{
                //if(c>0)setViv((v)=>v*-1)
                return c*-1
            })
        },300)
        return ()=>clearInterval(i)
    },[prophet.setNavipos, viv])
    return <div style={{zIndex: 20, position: 'absolute', left: prophet.navipos.left, top: prophet.navipos.top, transition: 'top 300ms ease-in-out, left 300ms '+(cycle<0?'ease-out':'ease-in'),
                    width: '100px', height: '100px', backgroundColor: 'transparent', borderRadius: '50%', padding: '10px', 
                    justifyContent: 'center', textAlign: 'center', boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.5)', 
                    backgroundImage: 'radial-gradient(#ffffffff, #ffffffdd 50%, #90a0f0aa 52%, #90a0f077 60%, #ffffff44 70%)'
                }}
                onClick={props.click?props.click:(e)=>{prophet.setListen((l)=>!l)}}>
            <h5>{prophet.hey}!</h5>
            <div>{prophet.listen?prophet.message:'listen!'}</div>
            <div>{}</div>
        </div>

}

export const useProphet = () => {
    const [navipos, setNavipos] = useState({left: 0, top: 0})
    const [hey, setHey] = useState('hey')//see
    const [message, setMessage] = useState('I talk a lot')
    const [listen, setListen] = useState(false)//hear
    return {
        navipos: navipos,
        setNavipos: setNavipos,
        hey: hey,
        setHey: setHey,
        message: message,
        setMessage: setMessage,
        listen: listen,
        setListen: setListen,
    }
}
