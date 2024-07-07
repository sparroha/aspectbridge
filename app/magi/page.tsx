'use client';
import { FC } from "react";
import Card from "../../components/gamecard/card";
import { alephbeth } from "../../components/hebrew";

interface pageProps{params: {aspect: string[]}, searchParams}

/**
 * ENTRY POINT
 * @param param0 
 * @returns 
 */

const pageMode = 'default';
const magiData = [
    {name: 'Time Mage', color: 'purple', type: 'Temporal', subtype: 'light', children: <i>"All is now"</i>, img: '', strimage: alephbeth.tav.uni, href: ''},
    {name: 'Portal Mage', color: 'black', type: 'Spacial', subtype: 'dark', children: <i>"All is here"</i>, img: '', strimage: alephbeth.qoph.uni, href: ''},
    {name: 'Seed Mage', color: 'green', type: 'Organic', subtype: 'nature', children: <i>"Growth"</i>, img: '', strimage: alephbeth.nun.uni, href: ''},
    {name: 'Fire Mage', color: 'red', type: 'Ionic', subtype: 'hot', children: <i>"An offering made by fire"</i>, img: '', strimage: alephbeth.shin.uni, href: ''},
    {name: 'Wind Mage', color: 'grey', type: 'Spiritual', subtype: 'warm', children: <i>"No one knows where it comes from or where it goes."</i>, img: '', strimage: alephbeth.lamed.uni, href: ''},
    {name: 'Earth Mage', color: 'brown', type: 'Matterial', subtype: 'cool', children: <i>"Upon a subling block..."<br/>"for I stumbled before the Lord<br/>at the alter of His foundation."</i>, img: '', strimage: alephbeth.pe.uni, href: ''},
    {name: 'Water Mage', color: 'blue', type: 'Fluid', subtype: 'cold', children: <i>"Life is sacred"</i>, img: '', strimage: alephbeth.mem.uni, href: ''},
]

const Page: FC<pageProps> = ({params, searchParams})=>{
    
    //if(pageMode == 'default') return <DefaultPage params={params} searchParams={searchParams}/>
 
    return <>
        <div className={'row'}>
            {magiData.map((item, i) => {
                return <div className={'col-xs-12 col-sm-6 col-md-4 col-lg-3'} key={i}>
                    <RenderCard item={item} alephbeth={alephbeth}/>
                    </div>
            })}
        </div>
    </>
}

function MageCard(){
    return <div>Card</div>
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
                                    item.type=='Fluid'?' 🌊':
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
