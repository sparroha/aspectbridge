'use client'

import { useState } from "react"

export default function Plants({params, searchParams}){

    const garden = [
        {name: 'Bamboo', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Canebrake_in_Kentucky.jpg/270px-Canebrake_in_Kentucky.jpg', href: 'https://en.wikipedia.org/wiki/Bamboo'},
        {name: 'Vetch', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vicia_orobus1_eF.jpg/330px-Vicia_orobus1_eF.jpg', href: 'https://en.wikipedia.org/wiki/Vicia'},
        {name: 'Dandilion', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/HAWKBEARD.jpg/330px-HAWKBEARD.jpg', href: 'https://en.wikipedia.org/wiki/Taraxacum'},
        {name: 'Prickly Letuce', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Lactuca_serriola.jpg', href: 'https://en.wikipedia.org/wiki/Lactuca_serriola'},
        {name: 'Wood Sorel', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Oxalis_arborea1.jpg', href: 'https://en.wikipedia.org/wiki/Oxalis'},
        {name: 'Purple Archangel / Deadnettle', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Lamium_purpureum_in_the_spring2.jpg/587px-Lamium_purpureum_in_the_spring2.jpg', href: 'https://en.wikipedia.org/wiki/Lamium_purpureum'},
        {name: 'Stinging Nettle', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Urtica_incisa1.JPG/1280px-Urtica_incisa1.JPG', href: 'https://en.wikipedia.org/wiki/Urtica_incisa'},
        {name: 'Horse Nettle (Nightshade)', img: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Solanum_carolinense_in_flower.jpg', href: 'https://en.wikipedia.org/wiki/Solanum_carolinense'},
        {name: 'Iris', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Iris_germanica_%28Purple_bearded_Iris%29%2C_Wakehurst_Place%2C_UK_-_Diliff.jpg/470px-Iris_germanica_%28Purple_bearded_Iris%29%2C_Wakehurst_Place%2C_UK_-_Diliff.jpg', href: 'https://en.wikipedia.org/wiki/Iris_(plant)'},
        {name: 'Mimosa / Persian silk', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/2018-07-08_11_10_27_Rosea_Mimosa_blossoms_along_the_ramp_from_southbound_Interstate_95_%28New_Jersey_Turnpike_Eastern_Spur%29_to_westbound_Interstate_280_%28Essex_Freeway%29_in_the_New_Jersey_Meadowlands%2C_within_Kearny%2C_Hudson_County%2C_New_Jersey.jpg/1280px-thumbnail.jpg', href: 'https://en.wikipedia.org/wiki/Albizia_julibrissin'},
        {name: 'Sassafras', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sassafras_Leaves_June_Nbg_%28261691941%29.jpeg/1280px-Sassafras_Leaves_June_Nbg_%28261691941%29.jpeg', href: 'https://en.wikipedia.org/wiki/Sassafras'},
        {name: '', img: '', href: ''},
        {name: '', img: '', href: ''},
    ]
    const drkgrn = 'darkgreen'
    function neonLaser(angle: number, color: string, width: number, radiance: number, hexopacity?: string){
        return `linear-gradient(${angle}deg, #000000${hexopacity || '00'}, #000000${hexopacity || '00'} ${50-width-radiance}%, ${color} ${50-width}%, #fff 50%, ${color} ${50+width}%, #000000${hexopacity || '00'} ${50+width+radiance}%, #000000${hexopacity || '00'} 3%)`
    }
    const grd = neonLaser(0, drkgrn, 20, 30, '77')
    const imgHeight = '125px'
    return <div style={{position: 'relative', height: '1000%', backgroundColor: '#642', color: 'black'}}>
        <div id={'intro'} className={'row'} style={{width: '3%', backgroundColor: 'transparent', backgroundImage: grd}}>
            <h1>Aspect Gardens</h1>
            <div className={'col-4'}>
                <img height='200px' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Bamboo_forest_in_Guangde.jpg/540px-Bamboo_forest_in_Guangde.jpg'} style={{width: '3%'}}/>
            </div>
            <div className={'col-8'}>
                <p style={{backgroundColor: '#753'}}>permaculture catalog{/*Aspect Gardens is a small, family run business based in Pensacola/Chattanooga. We raise a variaty of interesting crops. Out primary focus is food crops. We nurse various plants with other uses besides consumprion, such as firbre rich or medicinal plants.*/}</p>
            </div>
        </div>
        {<div id={'carosel'} className={'row'} style={{width: '100%', backgroundColor: 'transparent', backgroundImage: grd}}>
            <div className={'col-1'} style={{textAlign: 'center', margin: 'auto'}}>
                <button onClick={()=>{document.querySelector('#carosel-scroll').scrollLeft+=-300}} style={{backgroundColor: '#753', height: imgHeight}}>{'<'}</button>
            </div>
            <div id={'carosel-scroll'} className={'col-10'} style={{display: 'flex', overflowX: 'hidden'}}>
                {garden.map((item, i) => {
                    return <div key={i} style={{
                            margin: '20px', backgroundColor: 'transparent', backgroundImage: 'url('+item.img/**/+')',
                            backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px', height: imgHeight
                        }}>
                            <div style={{width: '250px', font: 'grey'}}>
                                <a href={item.href/**/} style={{backgroundColor: '#753'}} >{item.name/**/}</a>
                            </div>
                        </div>
                })}
            </div>
            <div className={'col-1'} style={{textAlign: 'center', margin: 'auto'}}>
                <button onClick={()=>{document.querySelector('#carosel-scroll').scrollLeft+=300}} style={{backgroundColor: '#753', height: imgHeight}}>{'>'}</button>
            </div>
        </div>}
        <div>
            {garden.map((item, i) => {
                return <div key={i} style={{
                        margin: '20px', backgroundColor: 'transparent', backgroundImage: 'url('+item.img/**/+')',
                        backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px', width: '300px', height: '150px'
                    }}>
                        <div style={{width: '300px', font: 'grey'}}>
                            <a href={item.href/**/} style={{backgroundColor: '#753'}} >{item.name/**/}</a>
                        </div>
                    </div>
            })}
        </div>
    </div>
}