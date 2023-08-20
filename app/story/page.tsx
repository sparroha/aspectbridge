'use client'
import { Dispatch, useCallback, useEffect, useState, FC} from "react"
import useRegister from "../../lib/util/registry"
import { LoginNav } from "../../pages/login/[userlogin]"
import StrBldr from "../../components/stringbuilder";
import { Button } from "react-bootstrap"
import downloadFile from "../../lib/util/downloadfile"
import useUsers from "../../lib/util/^users";
import UserProfile from "../userprofile";
import { SWRConfig } from "swr";
import jsonFetch from "../../lib/,base/jsonFetch";

export type Story = string | {what?: string, why?: string, who?: string}
export type StoryBoard = Story[]
const page: FC<any> = ({params})=>{
    return <SWRConfig value={{ fetcher: jsonFetch }}>
        <Init/>
    </SWRConfig>
}
export default page
function Init(props){
    const {ip, user, activeUsers} = useUsers()
    const [register, saveData, registryLoaded] = useRegister('story', ['berashith'])

    const [what, setWhat] = useState('')
    const [why, setWhy] = useState('')
    const [who, setWho] = useState('')
    const [story, setStory]: [StoryBoard, Dispatch<any>] = useState([])
    
    useEffect(()=>{
        if(!registryLoaded)return
        let regipage: any[] = JSON.parse(register)
        let rp: StoryBoard = regipage.map((p,i)=>typeof p === 'string' ?{what: p, why: '', who: ''}:p)
        //console.log(register)
        setStory(rp)
    },[register,registryLoaded])

    //use: register, page
    const save = useCallback(()=>{
        //let rp: StoryBoard = story.map((p,i)=>typeof p === 'string' ?{what: p, why: '', who: ''}:p)
        console.log('save data')
        setStory((s)=>{
            let sty = [...s]
            sty.push({what: what, why: why, who: who})
            saveData(sty)
            setWhat('')
            setWhy('')
            setWho('')
            return sty
        })
    },[story])

    const [submitTooltip, setSubmitTooltip] = useState(false)
    function toggleSubmitTooltip(){
        setSubmitTooltip(!submitTooltip)
    }

    const [trnsfrm , setTrnsfrm] = useState(0)
    const [shadow, setShadow] = useState(-90)
    const [pulse, setPulse] = useState(0)
    //useEffect(()=>{
        //return
        /*let fun = ()=>{
            setTrnsfrm((deg)=>deg+10)
            setShadow((deg)=>deg>=180?-180+20:deg+20)
            //setPulse((p)=>p>=180?-180+20:p+20)
        }
        let i =setInterval(fun, 1000)
        return ()=>clearInterval(i)*/
    //},[])
    //use: story, page, setPage, save
    return !registryLoaded?<>Loading...</>:
    <div style={{perspective: '720px', height: '100vh', backgroundImage: 'linear-gradient(to right, #557, #77a, #aad)'}}>
        {what}<br/>{why}<br/>{who}<br/>
        <LoginNav user={user} homepage={'story'}/>
        <UserProfile/>
        <Story story={story} saveData={saveData} setWhat={setWhat} setWhy={setWhy} setWho={setWho} user={user}/>
        <div style={{textAlign: 'center', width: '360px', border: '2px outset #bbb', backgroundImage: 'linear-gradient(to bottom right, #aaa, #ccc, #ddd, #fff)', backgroundSize: 'cover', translate: '100px 0px '+pulse+'px', transform: 'rotateY('+trnsfrm+'deg)', boxShadow: (Math.abs(shadow))/2+'px 10px 10px 0 #333', transition: 'translate 1s linear, transform 1s linear, box-shadow 1s linear'}}>
            <WhatHappens what={what} setWhat={setWhat} save={save} submitTooltip={submitTooltip} toggleSubmitTooltip={toggleSubmitTooltip}/>
            <WhyItHappens why={why} setWhy={setWhy} save={save} submitTooltip={submitTooltip} toggleSubmitTooltip={toggleSubmitTooltip}/>
            <WhoIsInvolved who={who} setWho={setWho} save={save} submitTooltip={submitTooltip} toggleSubmitTooltip={toggleSubmitTooltip}/>
            <Button onClick={()=>downloadFile(story)}>SaveFile</Button>
        </div>
        <div style={{textAlign: 'center', width: '360px', border: '2px outset #bbb', backgroundImage: 'linear-gradient(to bottom right, #aaa, #ccc, #ddd, #fff)', backgroundSize: 'cover', translate: '500px -352px '+pulse+'px', transform: 'rotateY('+trnsfrm+'deg)', boxShadow: (Math.abs(shadow))/2+'px 10px 10px 0 #333', transition: 'translate 1s linear, transform 1s linear, box-shadow 1s linear'}}>
            <StrBldr/>
        </div>
    </div>
}
function Story({story, saveData, setWhat, setWhy, setWho, user}){
    useEffect(()=>{
        var element = document.getElementById("storyboard");
        element.scrollTop = element.scrollHeight;
    },[story])
    return <div id={'storyboard'} style={{overflow: 'auto', height: '500px', border: '3px outset #bbb', padding: '10px 20px 20px 20px', backgroundImage: 'linear-gradient(#444, #575, #7a7, #ada, #fff)', backgroundSize: 'cover'}}>
        <h1>Story</h1>
        {story.map((par,i)=>
            <div key={i} style={{display: 'flex', width: '100%', padding: '5px', marginTop: '10px', border: '3px outset #bbb', backgroundImage: 'linear-gradient(to bottom right, #aaa, #ccc, #ddd, #fff)'}}>
                <div style={{alignItems: 'left', width: '50%', fontSize: '18px', marginBottom: '8px'}}>Paragraph {i+1}:
                    <p id={'what'+i} style={{fontSize: '16px', marginBottom: '8px'}}>What?: {typeof par === 'string' ? par : par.what}</p>
                    <p id={'why'+i} style={{fontSize: '16px', marginBottom: '8px'}}>Why?: {typeof par === 'string' ? '' : par.why}</p>
                    <p id={'who'+i} style={{fontSize: '16px', marginBottom: '8px'}}>Who?: {typeof par === 'string' ? '' : par.who}</p>
                </div>
                <div style={{textAlign: 'right', width: '50%', fontSize: '18px', marginBottom: '8px'}}>
                    <button
                        style={{height: '28px', fontSize: '14px', marginLeft: '10px'}}
                        onClick={(e)=>{
                            setWhat(document.querySelector('#what'+i).innerHTML.slice(7))
                            setWhy(document.querySelector('#why'+i).innerHTML.slice(6))
                            setWho(document.querySelector('#who'+i).innerHTML.slice(6))
                        }}
                    >copy
                    </button><br/>
                    <button
                        style={{height: '28px', fontSize: '14px', marginLeft: '10px'}}
                        onClick={(e)=>{
                            setWhat('"'+document.querySelector('#what'+i).innerHTML.slice(7)+'" \n --')
                            setWhy('"'+document.querySelector('#why'+i).innerHTML.slice(6)+'" \n --')
                            setWho('"'+document.querySelector('#who'+i).innerHTML.slice(6)+'" \n --')
                        }}
                    >quote
                    </button><br/>
                    {(user?.access>=2)?
                        <button
                            style={{height: '28px', fontSize: '14px', marginLeft: '10px'}}
                            onClick={(e)=>{
                                saveData(story.filter((p,pi)=>pi!=i))
                            }}
                        >delete
                        </button>
                    :null}<br/>
                </div>
            </div>
        )}
    </div>
}
function WhatHappens({what, setWhat, save, submitTooltip, toggleSubmitTooltip}){
    return <form onSubmit={(e)=>{e.preventDefault();save();return true}}>
        <label>what happens next?:</label>
        <br/>
        <textarea id={'story_page'} name={'what'} value={what} style={{width: '300px', height: '60px'}} onChange={(e)=>setWhat(e.target.value)}/>
        <br/>
        <input hidden={true} type={'submit'} value={'save'} onMouseOver={toggleSubmitTooltip} onMouseOut={toggleSubmitTooltip}/><br/>
        <label hidden={true} style={{border: '4px inset #0000ee', padding: '5px', fontSize: '12px', width: '300px'}}>- add your page to the story</label>
    </form>
}
function WhyItHappens({why, setWhy, save, submitTooltip, toggleSubmitTooltip}){
    return <form onSubmit={(e)=>{e.preventDefault();save()}}>
        <label>why does it happen?:</label>
        <br/>
        <textarea id={'story_page'} name={'why'} value={why} style={{width: '300px', height: '60px'}} onChange={(e)=>setWhy(e.target.value)}/>
        <br/>
        <input hidden={true} type={'submit'} value={'save'} onMouseOver={toggleSubmitTooltip} onMouseOut={toggleSubmitTooltip}/><br/>
        <label hidden={true} style={{border: '4px inset #0000ee', padding: '5px', fontSize: '12px', width: '300px'}}>- add your page to the story</label>
    </form>
}
function WhoIsInvolved({who, setWho, save, submitTooltip, toggleSubmitTooltip}){
    return <form onSubmit={(e)=>{e.preventDefault();save()}}>
        <label>who is involved?:</label>
        <br/>
        <textarea id={'story_page'} name={'who'} value={who} style={{width: '300px', height: '60px'}} onChange={(e)=>setWho(e.target.value)}/>
        <br/>
        <input type={'submit'} value={'save'} onMouseOver={toggleSubmitTooltip} onMouseOut={toggleSubmitTooltip}/><br/>
        <label hidden={!submitTooltip} style={{border: '4px inset #0000ee', padding: '5px', fontSize: '12px', width: '300px'}}>- add your page to the story</label>
    </form>
}