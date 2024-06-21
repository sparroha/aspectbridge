'use client'

import { useState } from "react"
import Card from "../card/class/card"

export default function Plants({params, searchParams}){

    const manaSym = {
        plain: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/8/8e/W.svg/revision/latest/scale-to-width-down/15?cb=20160125094923',
        island: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/4/4e/U.svg/revision/latest/scale-to-width-down/15?cb=20160125094923',
        swamp: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/3/3b/B.svg/revision/latest/scale-to-width-down/15?cb=20160125094923',
        mountain: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/0/0d/R.svg/revision/latest/scale-to-width-down/15?cb=20160125094923',
        forest: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/8/88/G.svg/revision/latest/scale-to-width-down/15?cb=20160125094907',
        colorless: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/0/0f/C.svg/revision/latest/scale-to-width-down/15?cb=20160125094923'
    }
    const garden = [
        {name: 'Bamboo', type: 'Plant', subtype: 'Grass', children: <i>"Taste like broccoli if you add cheese"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Canebrake_in_Kentucky.jpg/270px-Canebrake_in_Kentucky.jpg', href: 'https://en.wikipedia.org/wiki/Bamboo'},
        {name: 'Vetch', type: 'Plant', subtype: 'Tare', children: <i>"Hay"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vicia_orobus1_eF.jpg/330px-Vicia_orobus1_eF.jpg', href: 'https://en.wikipedia.org/wiki/Vicia'},
        {name: 'Dandilion', type: 'Plant', subtype: '', children: <></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/HAWKBEARD.jpg/330px-HAWKBEARD.jpg', href: 'https://en.wikipedia.org/wiki/Taraxacum'},
        {name: 'Prickly Letuce', type: 'Plant', subtype: '', children: <>Latex</>, img: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Lactuca_serriola.jpg', href: 'https://en.wikipedia.org/wiki/Lactuca_serriola'},
        {name: 'Wood Sorel', type: 'Plant', subtype: '', children: <i>"Not a clover"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Oxalis_arborea1.jpg', href: 'https://en.wikipedia.org/wiki/Oxalis'},
        {name: 'Purple Archangel', type: 'Plant', subtype: 'Nettle', children: <i>"Deadnettle"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Lamium_purpureum_in_the_spring2.jpg/587px-Lamium_purpureum_in_the_spring2.jpg', href: 'https://en.wikipedia.org/wiki/Lamium_purpureum'},
        {name: 'Stinging Nettle', type: 'Plant', subtype: 'Nettle', children: <></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Urtica_incisa1.JPG/1280px-Urtica_incisa1.JPG', href: 'https://en.wikipedia.org/wiki/Urtica_incisa'},
        {name: 'Horse Nettle', type: 'Plant', subtype: 'Nightshade', children: <i>"Not a nettle"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Solanum_carolinense_in_flower.jpg', href: 'https://en.wikipedia.org/wiki/Solanum_carolinense'},
        {name: 'Iris', type: 'Plant', subtype: 'Flower', children: <></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Iris_germanica_%28Purple_bearded_Iris%29%2C_Wakehurst_Place%2C_UK_-_Diliff.jpg/470px-Iris_germanica_%28Purple_bearded_Iris%29%2C_Wakehurst_Place%2C_UK_-_Diliff.jpg', href: 'https://en.wikipedia.org/wiki/Iris_(plant)'},
        {name: 'Mimosa / Persian silk', type: 'Plant', subtype: 'Tree', children: <>Tranquil<br/><br/><i>"Use bark and flower for tea"</i></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/2018-07-08_11_10_27_Rosea_Mimosa_blossoms_along_the_ramp_from_southbound_Interstate_95_%28New_Jersey_Turnpike_Eastern_Spur%29_to_westbound_Interstate_280_%28Essex_Freeway%29_in_the_New_Jersey_Meadowlands%2C_within_Kearny%2C_Hudson_County%2C_New_Jersey.jpg/1280px-thumbnail.jpg', href: 'https://en.wikipedia.org/wiki/Albizia_julibrissin'},
        {name: 'Sassafras', type: 'Plant', subtype: 'Tree', children: <i>"Boil the roots for tea"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sassafras_Leaves_June_Nbg_%28261691941%29.jpeg/1280px-Sassafras_Leaves_June_Nbg_%28261691941%29.jpeg', href: 'https://en.wikipedia.org/wiki/Sassafras'},
        //{name: '', img: '', href: ''},
    ]
    const drkgrn = 'darkgreen'
    function neonLaser(angle: number, color: string, width: number, radiance: number, hexopacity?: string){
        return `linear-gradient(${angle}deg, #000000${hexopacity || '00'}, #000000${hexopacity || '00'} ${50-width-radiance}%, ${color} ${50-width}%, #fff 50%, ${color} ${50+width}%, #000000${hexopacity || '00'} ${50+width+radiance}%, #000000${hexopacity || '00'} 3%)`
    }
    const grd = neonLaser(0, drkgrn, 20, 30, '77')
    const imgHeight = '125px'
    const imgWidthVal = 250
    const imgWidth = imgWidthVal+'px'
    return <div style={{position: 'relative', height: '1000%', backgroundColor: '#642', color: 'black'}}>
        <div id={'intro'} className={'row'} style={{backgroundColor: 'transparent', backgroundImage: grd}}>
            <h1>Aspect Gardens</h1>
            <div className={'col-3'}>
                <img height={imgHeight} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Bamboo_forest_in_Guangde.jpg/540px-Bamboo_forest_in_Guangde.jpg'}/>
            </div>
            <div className={'col-9'}>
                <p style={{backgroundColor: '#753'}}>permaculture catalog{/*Aspect Gardens is a small, family run business based in Pensacola/Chattanooga. We raise a variaty of interesting crops. Out primary focus is food crops. We nurse various plants with other uses besides consumprion, such as firbre rich or medicinal plants.*/}</p>
            </div>
        </div>
        {<div id={'carosel'} className={'row'} style={{width: '100%', backgroundColor: 'transparent', backgroundImage: grd}}>
            <div className={'col-1'} style={{textAlign: 'center', margin: 'auto'}}>
                <button onClick={()=>{document.querySelector('#carosel-scroll').scrollLeft+=-(imgWidthVal+40)}} style={{backgroundColor: '#753', height: imgHeight}}>{'<'}</button>
            </div>
            <div id={'carosel-scroll'} className={'col-10'} style={{display: 'flex', overflowX: 'hidden', scrollBehavior: 'smooth'}}>
                {garden.map((item, i) => {
                    return <div key={i} style={{
                            margin: '20px', backgroundColor: 'transparent', backgroundImage: 'url('+item.img/**/+')',
                            backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px', height: imgHeight
                        }}>
                            <div style={{width: imgWidth, font: 'grey'}}>
                                <a href={item.href/**/} style={{backgroundColor: '#753'}} >{item.name/**/}</a>
                            </div>
                        </div>
                })}
            </div>
            <div className={'col-1'} style={{textAlign: 'center', margin: 'auto'}}>
                <button onClick={()=>{document.querySelector('#carosel-scroll').scrollLeft+=(imgWidthVal+40)}} style={{backgroundColor: '#753', height: imgHeight}}>{'>'}</button>
            </div>
        </div>}
        <div>
            {garden.map((item, i) => {
                return <Card key={i} name={item.name} image={item.img} color={'darkgreen'} logo={'🍃'} click={()=>{window.open(item.href, '_blank')}} type={item.type} subtype={item.subtype} children={item.children}/>
                return <div key={i} style={{
                        margin: '20px', backgroundColor: 'transparent', backgroundImage: 'url('+item.img/**/+')',
                        backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px', width: imgWidthVal, height: imgHeight
                    }}>
                        <div style={{width: '300px', font: 'grey'}}>
                            <a href={item.href/**/} style={{backgroundColor: '#753'}} >{item.name/**/}</a>
                        </div>
                    </div>
            })}
        </div>
    </div>
}