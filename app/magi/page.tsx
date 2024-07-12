'use client';
import { FC, useReducer, useState } from "react";
import Card from "../../components/gamecard/card";
import { alephbeth } from "../../components/hebrew";

interface pageProps{params: {aspect: string[]}, searchParams}

/**
 * ENTRY POINT
 * @param param0 
 * @returns 
 */

const magiData = [
    {name: 'Time Mage', color: 'purple', type: 'Temporal', subtype: 'light', children: <i>"Behold; the Ancient of Days is seated!"</i>, img: '', strimage: alephbeth.tav.uni, href: ''},
    {name: 'Portal Mage', color: 'black', type: 'Spacial', subtype: 'dark', children: <i>"In the beginning, Amen."</i>, img: '', strimage: alephbeth.qoph.uni, href: ''},
    {name: 'Seed Mage', color: 'green', type: 'Organic', subtype: 'nature', children: <><b>Peru:</b> be fruitful<br/><b>Rebu:</b> multiply<br/><i>"Peru urebu!"</i></>, img: '', strimage: alephbeth.nun.uni, href: ''},
    {name: 'Fire Mage', color: 'red', type: 'Ionic', subtype: 'hot', children: <i>"An offering made by fire"</i>, img: '', strimage: alephbeth.shin.uni, href: ''},
    {name: 'Wind Mage', color: 'grey', type: 'Spiritual', subtype: 'warm', children: <i>"No one knows where it comes from or where it goes."</i>, img: '', strimage: alephbeth.lamed.uni, href: ''},
    {name: 'Earth Mage', color: 'brown', type: 'Matterial', subtype: 'cool', children: <i>"Upon a stumbling block..."<br/>"for I stumbled before the Lord<br/>at the alter of His foundation."</i>, img: '', strimage: alephbeth.pe.uni, href: ''},
    {name: 'Water Mage', color: 'blue', type: 'Fluid', subtype: 'cold', children: <i>"Life is sacred"</i>, img: '', strimage: alephbeth.mem.uni, href: ''},
]

const primatives = {
    words: [
        'word',//instant/sorcery
        'being',//creature
    ],
    creations: [
        
    ]
}

const Page: FC<pageProps> = ({params, searchParams})=>{

    const eventStack = []//mutable contents. dies on page refresh
    //const [events, setEvents] = useState(eventStack)//persists on page refresh
    //reducer
    function eventStackReducer(events, event){
        let e = event.type
        let payload = event.payload
        switch(e){
            case 'test': {
                console.log('reducing',e,payload)
                return [...events, {event: e, payload: payload, undo: ()=>{dispatch({type: 'remove', payload: payload})}}]
            }break
            case 'remove': {
                console.log('removing', payload)
                let ne = [...events]
                let p = ne.pop()
                return [...ne]
            }break
            default: return events
        }
    }
    //reducer dispatch
    const [events, dispatch] = useReducer(eventStackReducer, eventStack)


    return <>
        <div className={'row'}>
            {JSON.stringify(events)}<br/>
            {events.map((event, i)=>{
                return <div key={'event_'+i}>
                    {JSON.stringify(event)}<br/>
                    {(i==events.length-1)?<button onClick={event.undo}>Undo</button>:null}
                </div>
            })}<br/>
            <button onClick={()=>{dispatch({type: 'test', payload: 'event'})}}>Add Event</button>
            {magiData.map((item, i) => {
                return <div className={'col-xs-12 col-sm-6 col-md-4 col-lg-3'} key={'mage_'+i}>
                    <RenderCard item={item} alephbeth={alephbeth}/>
                    </div>
            })}
        </div>
    </>
}

function TimeMage(){
    return <RenderCard item={magiData.filter((item)=>item.name=='Time Mage')[0]} alephbeth={alephbeth}/>
}
function SpaceMage(){
    return <RenderCard item={magiData.filter((item)=>item.name=='Portal Mage')[0]} alephbeth={alephbeth}/>
}
function SeedMage(){
    return <RenderCard item={magiData.filter((item)=>item.name=='Seed Mage')[0]} alephbeth={alephbeth}/>
}
function FireMage(){
    return <RenderCard item={magiData.filter((item)=>item.name=='Fire Mage')[0]} alephbeth={alephbeth}/>
}
function WindMage(){
    return <RenderCard item={magiData.filter((item)=>item.name=='Wind Mage')[0]} alephbeth={alephbeth}/>
}
function EarthMage(){
    return <RenderCard item={magiData.filter((item)=>item.name=='Earth Mage')[0]} alephbeth={alephbeth}/>
}
function WaterMage(){
    return <RenderCard item={magiData.filter((item)=>item.name=='Water Mage')[0]} alephbeth={alephbeth}/>
}

function RenderCard({item, alephbeth}){
    return <Card
        name={item.name+' ---- '+alephbeth.gimel.uni+alephbeth.shin.uni+alephbeth.resh.uni+' '+alephbeth.keth.uni+alephbeth.zain.uni+alephbeth.vav.uni+alephbeth.tav.uni} 
        image={item.img} 
        strimage={item.strimage}
        color={item.color} 
        logo={
            item.type=='Temporal'?'⌛':(
                item.type=='Spacial'?'🌌':(
                    item.type=='Organic'?'🌱':(
                        item.type=='Ionic'?'🔥':(
                            item.type=='Spiritual'?'🌪️':(
                                item.type=='Matterial'?'💎':(
                                    item.type=='Fluid'?'🌊':
                                            '⛔'
                                ))))))} 
        click={()=>{window.open(item.href, '_blank')}} 
        type={item.type} 
        subtype={item.subtype} 
        children={item.children}
    />
}

export default Page;

/*
function DefaultPage({params, searchParams}){
    return <>
        Page Parameters: {JSON.stringify(params)}<br/>
        Search Parameters: {JSON.stringify(searchParams)}
    </>
}*/
