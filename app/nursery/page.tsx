'use client'

import Card from "../../components/gamecard/card"
import { alephbeth } from "../../components/hebrew"

export default function Plants({params, searchParams}){

    const manaSym = {
        plain: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/8/8e/W.svg/revision/latest/scale-to-width-down/15?cb=20160125094923',
        island: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/4/4e/U.svg/revision/latest/scale-to-width-down/15?cb=20160125094923',
        swamp: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/3/3b/B.svg/revision/latest/scale-to-width-down/15?cb=20160125094923',
        mountain: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/0/0d/R.svg/revision/latest/scale-to-width-down/15?cb=20160125094923',
        forest: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/8/88/G.svg/revision/latest/scale-to-width-down/15?cb=20160125094907',
        colorless: 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/0/0f/C.svg/revision/latest/scale-to-width-down/15?cb=20160125094923'
    }
    const data = [
        {name: 'Bamboo', type: 'Plant', subtype: 'Grass', children: <i>"Taste like broccoli if you add cheese"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Canebrake_in_Kentucky.jpg/270px-Canebrake_in_Kentucky.jpg', href: 'https://en.wikipedia.org/wiki/Bamboo'},
        {name: 'Vetch', type: 'Plant', subtype: 'Tare', children: <i>"Hay"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vicia_orobus1_eF.jpg/330px-Vicia_orobus1_eF.jpg', href: 'https://en.wikipedia.org/wiki/Vicia'},
        {name: 'Dandilion', type: 'Plant', subtype: '', children: <></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/HAWKBEARD.jpg/330px-HAWKBEARD.jpg', href: 'https://en.wikipedia.org/wiki/Taraxacum'},
        {name: 'Prickly Letuce', type: 'Plant', subtype: '', children: <b>Latex</b>, img: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Lactuca_serriola.jpg', href: 'https://en.wikipedia.org/wiki/Lactuca_serriola'},
        {name: 'Wood Sorel', type: 'Plant', subtype: '', children: <i>"Not a clover"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Oxalis_arborea1.jpg', href: 'https://en.wikipedia.org/wiki/Oxalis'},
        {name: 'Purple Archangel', type: 'Plant', subtype: 'Nettle', children: <i>"Deadnettle"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Lamium_purpureum_in_the_spring2.jpg/587px-Lamium_purpureum_in_the_spring2.jpg', href: 'https://en.wikipedia.org/wiki/Lamium_purpureum'},
        {name: 'Stinging Nettle', type: 'Plant', subtype: 'Nettle', children: <></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Urtica_incisa1.JPG/1280px-Urtica_incisa1.JPG', href: 'https://en.wikipedia.org/wiki/Urtica_incisa'},
        {name: 'Horse Nettle', type: 'Plant', subtype: 'Nightshade', children: <i>"Not a nettle"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Solanum_carolinense_in_flower.jpg', href: 'https://en.wikipedia.org/wiki/Solanum_carolinense'},
        {name: 'Iris', type: 'Plant', subtype: 'Flower', children: <></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Iris_germanica_%28Purple_bearded_Iris%29%2C_Wakehurst_Place%2C_UK_-_Diliff.jpg/470px-Iris_germanica_%28Purple_bearded_Iris%29%2C_Wakehurst_Place%2C_UK_-_Diliff.jpg', href: 'https://en.wikipedia.org/wiki/Iris_(plant)'},
        {name: 'Mimosa', type: 'Plant', subtype: 'Tree', children: <><b>Tranquil:</b> Boil 1 tbsp bark in 1 cup water. You may include flowers.<br/><br/><i>"Persian silk"</i></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/2018-07-08_11_10_27_Rosea_Mimosa_blossoms_along_the_ramp_from_southbound_Interstate_95_%28New_Jersey_Turnpike_Eastern_Spur%29_to_westbound_Interstate_280_%28Essex_Freeway%29_in_the_New_Jersey_Meadowlands%2C_within_Kearny%2C_Hudson_County%2C_New_Jersey.jpg/1280px-thumbnail.jpg', href: 'https://en.wikipedia.org/wiki/Albizia_julibrissin'},
        {name: 'Sassafras', type: 'Plant', subtype: 'Tree', children: <i>"Boil the roots for tea"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sassafras_Leaves_June_Nbg_%28261691941%29.jpeg/1280px-Sassafras_Leaves_June_Nbg_%28261691941%29.jpeg', href: 'https://en.wikipedia.org/wiki/Sassafras'},
        {name: 'Praying Mantis', type:'Bug', subtype:'Insect Mantis', children:<><i>"Holier than thow."</i></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/European_praying_mantis_%28Mantis_religiosa%29_green_female_Dobruja.jpg/800px-European_praying_mantis_%28Mantis_religiosa%29_green_female_Dobruja.jpg', href: 'https://en.wikipedia.org/wiki/Mantis'},
        {name: 'Turkey', type:'Animal', subtype:'Bird Poltry', children:<><i>"Gobble!"</i></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Male_wild_turkey_%28Meleagris_gallopavo%29_strutting.jpg/600px-Male_wild_turkey_%28Meleagris_gallopavo%29_strutting.jpg', href: 'https://en.wikipedia.org/wiki/Turkey_(bird)'},
        {name: 'Japanese Beetle', type:'Bug', subtype:'Beetle', children:<><i>"Plague!"</i></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Popillia_japonica.jpg/1024px-Popillia_japonica.jpg', href: 'https://en.wikipedia.org/wiki/Japanese_beetle'},
        {name: 'White-Tailed Deer', type:'Animal', subtype:'Deer', children:<></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/White-tailed_deer.jpg/789px-White-tailed_deer.jpg', href: 'https://en.wikipedia.org/wiki/White-tailed_deer'},
        {name: 'Box Turtle', type:'Animal', subtype:'Turtle', children:<></>, img: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Eastern_Box_Turtle2.jpg', href: 'https://en.wikipedia.org/wiki/Box_turtle'},
        {name: 'Snapping Turtle', type:'Animal', subtype:'Turtle', children:<></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Snapping_Turtle_Heinz.png/800px-Snapping_Turtle_Heinz.png', href: 'https://en.wikipedia.org/wiki/Common_snapping_turtle'},
        {name: 'Armadillo', type:'Animal', subtype:'Nine-banded', children:<></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Dasypus_novemcinctus.jpg/800px-Dasypus_novemcinctus.jpg', href: 'https://en.wikipedia.org/wiki/Nine-banded_armadillo'},
        {name: 'Opossum', type:'Animal', subtype:'Marsupial', children:<></>, img: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Rabipelao2.jpg', href: 'https://en.wikipedia.org/wiki/Common_opossum'},
        {name: 'Brown Rat', type:'Animal', subtype:'Rodent Rat', children:<></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Rattus_norvegicus_-_Brown_rat_02.jpg/800px-Rattus_norvegicus_-_Brown_rat_02.jpg', href: 'https://en.wikipedia.org/wiki/Brown_rat'},
        {name: 'Woodpecker', type:'Animal', subtype:'Bird Picus', children:<></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/PileatedWoodpeckerFeedingonTree%2C_crop.jpg/541px-PileatedWoodpeckerFeedingonTree%2C_crop.jpg', href: 'https://en.wikipedia.org/wiki/Woodpecker'},
        {name: 'Morning Dove', type:'Animal', subtype:'Bird Dove', children:<></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mourning_Dove_2006.jpg/400px-Mourning_Dove_2006.jpg', href: 'https://en.wikipedia.org/wiki/Mourning_dove'},
        {name: 'Cardinal', type:'Animal', subtype:'Bird', children:<></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Male_northern_cardinal_in_Central_Park_%2852612%29.jpg/456px-Male_northern_cardinal_in_Central_Park_%2852612%29.jpg', href: 'https://en.wikipedia.org/wiki/Northern_cardinal'},
        {name: 'Blue Jay', type:'Animal', subtype:'Bird Corvus', children:<></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Blue_jay_in_PP_%2830960%29.jpg/220px-Blue_jay_in_PP_%2830960%29.jpg', href: 'https://en.wikipedia.org/wiki/Blue_jay'},
        {name: 'Crow', type:'Animal', subtype:'Bird Corvus', children:<></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Corvus_corone_-near_Canford_Cliffs%2C_Poole%2C_England-8.jpg/800px-Corvus_corone_-near_Canford_Cliffs%2C_Poole%2C_England-8.jpg', href: 'https://en.wikipedia.org/wiki/Corvus'},
        {name: 'Giant Stag Beetle', type:'Animal', subtype:'Insect Beetle', children:<i>"elephant stag beetle"</i>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Lucanus_elaphus_142395158.jpg/750px-Lucanus_elaphus_142395158.jpg', href: 'https://en.wikipedia.org/wiki/Lucanus_elaphus'},
        {name: 'Widow Skimmer', type:'Bug', subtype:'Insect Dragonfly', children:<></>, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Widow_Skimmer%2C_male.jpg/568px-Widow_Skimmer%2C_male.jpg', href: 'https://en.wikipedia.org/wiki/Widow_skimmer'},
        //{name: '', type:'', subtype:'', children:<></>, img: '', href: ''},
        //{name: '', type:'', subtype:'', children:<></>, img: '', href: ''},
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
            
            <div className={'col-3'}>
                <h1>Aspect Gardens</h1>
                {//<img height={imgHeight} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Bamboo_forest_in_Guangde.jpg/540px-Bamboo_forest_in_Guangde.jpg'}/>
                }
            </div>
            <div className={'col-9'}>
                {/*<p style={{backgroundColor: '#753'}}>permaculture catalog{/*Aspect Gardens is a small, family run business based in Pensacola/Chattanooga. We raise a variaty of interesting crops. Out primary focus is food crops. We nurse various plants with other uses besides consumprion, such as firbre rich or medicinal plants.*}</p>*/}
            </div>
        </div>
        
        <div className={'row'}>
            {data.map((item, i) => {
                return <div className={'col-xs-12 col-sm-6 col-md-4 col-lg-3'} key={i}>
                    <RenderCard {...item}/>
                    </div>
            })}
        </div>
    </div>
}

/**
 * Special/Custom implementation of Card call. 
 * @param item 
 * @returns 
 */
function RenderCard(item){
    return <Card
        name={item.name+' ---- '+alephbeth.gimel.uni+alephbeth.shin.uni+alephbeth.resh.uni+' '+alephbeth.keth.uni+alephbeth.zain.uni+alephbeth.vav.uni+alephbeth.tav.uni} 
        image={item.img} 
        color={
            item.type=='Plant'?'green':(
                item.type=='Bug'?'red':(
                    item.type=='Animal'?'brown':(
                        'grey'
                    )))} 
        logo={
            item.type=='Plant'?'🍃':(
                item.type=='Bug'?'🐞':(
                    item.type=='Animal'?'🐮':(
                        '🌀'
                    )))} 
        click={()=>{window.open(item.href, '_blank')}} 
        type={item.type} 
        subtype={item.subtype} 
        children={item.children}
    />
}






{/*<div id={'carosel'} className={'row'} style={{width: '100%', backgroundColor: 'transparent', backgroundImage: grd}}>
    <div className={'col-1'} style={{textAlign: 'center', margin: 'auto'}}>
        <button onClick={()=>{document.querySelector('#carosel-scroll').scrollLeft+=-(imgWidthVal+40)}} style={{backgroundColor: '#753', height: imgHeight}}>{'<'}</button>
    </div>
    <div id={'carosel-scroll'} className={'col-10'} style={{display: 'flex', overflowX: 'hidden', scrollBehavior: 'smooth'}}>
        {garden.map((item, i) => {
            return <div key={i} style={{
                    margin: '20px', backgroundColor: 'transparent', backgroundImage: 'url('+item.img/**+')',
                    backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px', height: imgHeight
                }}>
                    <div style={{width: imgWidth, font: 'grey'}}>
                        <a href={item.href/**} style={{backgroundColor: '#753'}} >{item.name/**}</a>
                    </div>
                </div>
        })}
    </div>
    <div className={'col-1'} style={{textAlign: 'center', margin: 'auto'}}>
        <button onClick={()=>{document.querySelector('#carosel-scroll').scrollLeft+=(imgWidthVal+40)}} style={{backgroundColor: '#753', height: imgHeight}}>{'>'}</button>
    </div>
</div>*/}



{/*<div id={'carosel'} className={'row'} style={{width: '100%', backgroundColor: 'transparent', backgroundImage: grd}}>
    <div className={'col-1'} style={{textAlign: 'center', margin: 'auto'}}>
        <button onClick={()=>{document.querySelector('#carosel-scroll').scrollLeft+=-(imgWidthVal+40)}} style={{backgroundColor: '#753', height: imgHeight}}>{'<'}</button>
    </div>
    <div id={'carosel-scroll'} className={'col-10'} style={{display: 'flex', overflowX: 'hidden', scrollBehavior: 'smooth'}}>
        {garden.map((item, i) => {
            return <div key={i} style={{
                    margin: '20px', backgroundColor: 'transparent', backgroundImage: 'url('+item.img/**+')',
                    backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px', height: imgHeight
                }}>
                    <div style={{width: imgWidth, font: 'grey'}}>
                        <a href={item.href/**} style={{backgroundColor: '#753'}} >{item.name/**}</a>
                    </div>
                </div>
        })}
    </div>
    <div className={'col-1'} style={{textAlign: 'center', margin: 'auto'}}>
        <button onClick={()=>{document.querySelector('#carosel-scroll').scrollLeft+=(imgWidthVal+40)}} style={{backgroundColor: '#753', height: imgHeight}}>{'>'}</button>
    </div>
</div>*/}