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
    const wiki = 'https://en.wikipedia.org/wiki/'
    const wikiImg = 'https://upload.wikimedia.org/wikipedia/commons/'
    const data = [
        {order: 0, name: 'Bamboo', type: 'Plant', subtype: 'Grass', children: <i>"Taste like broccoli if you add cheese"</i>,img: wikiImg+'thumb/8/8b/Canebrake_in_Kentucky.jpg/270px-Canebrake_in_Kentucky.jpg', href: wiki+'Bamboo'},
        {order: 0, name: 'Vetch', type: 'Plant', subtype: 'Tare', children: <i>"Hay"</i>, img: wikiImg+'thumb/5/53/Vicia_orobus1_eF.jpg/330px-Vicia_orobus1_eF.jpg', href: wiki+'Vicia'},
        {order: 0, name: 'Dandilion', type: 'Plant', subtype: '', children: <></>, img: wikiImg+'thumb/4/4e/HAWKBEARD.jpg/330px-HAWKBEARD.jpg', href: wiki+'Taraxacum'},
        {order: 0, name: 'Prickly Letuce', type: 'Plant', subtype: '', children: <b>Latex</b>, img: wikiImg+'b/b1/Lactuca_serriola.jpg', href: wiki+'Lactuca_serriola'},
        {order: 0, name: 'Wood Sorel', type: 'Plant', subtype: '', children: <i>"Not a clover"<br/>"Sour grass"</i>, img: wikiImg+'2/2c/Oxalis_arborea1.jpg', href: wiki+'Oxalis'},
        {order: 0, name: 'Purple Archangel', type: 'Plant', subtype: 'Nettle', children: <i>"Deadnettle"</i>, img: wikiImg+'thumb/a/a6/Lamium_purpureum_in_the_spring2.jpg/587px-Lamium_purpureum_in_the_spring2.jpg', href: wiki+'Lamium_purpureum'},
        {order: 0, name: 'Stinging Nettle', type: 'Plant', subtype: 'Nettle', children: <></>, img: wikiImg+'thumb/2/2f/Urtica_incisa1.JPG/1280px-Urtica_incisa1.JPG', href: wiki+'Urtica_incisa'},
        {order: 0, name: 'Horse Nettle', type: 'Plant', subtype: 'Nightshade', children: <i>"Not a nettle"</i>, img: wikiImg+'1/1f/Solanum_carolinense_in_flower.jpg', href: wiki+'Solanum_carolinense'},
        {order: 0, name: 'Iris', type: 'Plant', subtype: 'Flower', children: <></>, img: wikiImg+'thumb/4/49/Iris_germanica_%28Purple_bearded_Iris%29%2C_Wakehurst_Place%2C_UK_-_Diliff.jpg/470px-Iris_germanica_%28Purple_bearded_Iris%29%2C_Wakehurst_Place%2C_UK_-_Diliff.jpg', href: wiki+'Iris_(plant)'},
        {order: 0, name: 'Mimosa', type: 'Plant', subtype: 'Tree', children: <><b>Tranquil:</b> Boil 1 tbsp bark in 1 cup water. You may include flowers.<br/><br/><i>"Persian silk"</i></>, img: wikiImg+'thumb/c/c5/2018-07-08_11_10_27_Rosea_Mimosa_blossoms_along_the_ramp_from_southbound_Interstate_95_%28New_Jersey_Turnpike_Eastern_Spur%29_to_westbound_Interstate_280_%28Essex_Freeway%29_in_the_New_Jersey_Meadowlands%2C_within_Kearny%2C_Hudson_County%2C_New_Jersey.jpg/1280px-thumbnail.jpg', href: wiki+'Albizia_julibrissin'},
        {order: 0, name: 'Sassafras', type: 'Plant', subtype: 'Tree', children: <i>"Boil the roots for tea"</i>, img: wikiImg+'thumb/5/5e/Sassafras_Leaves_June_Nbg_%28261691941%29.jpeg/1280px-Sassafras_Leaves_June_Nbg_%28261691941%29.jpeg', href: wiki+'Sassafras'},
        {order: 0, name: 'Praying Mantis', type:'Bug', subtype:'Insect Mantis', children:<><i>"Holier than thow."</i></>, img: wikiImg+'thumb/6/62/European_praying_mantis_%28Mantis_religiosa%29_green_female_Dobruja.jpg/800px-European_praying_mantis_%28Mantis_religiosa%29_green_female_Dobruja.jpg', href: wiki+'Mantis'},
        {order: 0, name: 'Turkey', type:'Beast', subtype:'Bird Poltry', children:<><i>"Gobble!"</i></>, img: wikiImg+'thumb/8/8a/Male_wild_turkey_%28Meleagris_gallopavo%29_strutting.jpg/600px-Male_wild_turkey_%28Meleagris_gallopavo%29_strutting.jpg', href: wiki+'Turkey_(bird)'},
        {order: 0, name: 'Japanese Beetle', type:'Bug', subtype:'Beetle', children:<><i>"Plague!"</i></>, img: wikiImg+'thumb/d/dd/Popillia_japonica.jpg/1024px-Popillia_japonica.jpg', href: wiki+'Japanese_beetle'},
        {order: 0, name: 'White-Tailed Deer', type:'Beast', subtype:'Deer', children:<></>, img: wikiImg+'thumb/b/b7/White-tailed_deer.jpg/789px-White-tailed_deer.jpg', href: wiki+'White-tailed_deer'},
        {order: 0, name: 'Box Turtle', type:'Beast', subtype:'Turtle', children:<></>, img: wikiImg+'6/6c/Eastern_Box_Turtle2.jpg', href: wiki+'Box_turtle'},
        {order: 0, name: 'Snapping Turtle', type:'Beast', subtype:'Turtle', children:<></>, img: wikiImg+'thumb/0/0a/Snapping_Turtle_Heinz.png/800px-Snapping_Turtle_Heinz.png', href: wiki+'Common_snapping_turtle'},
        {order: 0, name: 'Armadillo', type:'Beast', subtype:'Nine-banded', children:<></>, img: wikiImg+'thumb/7/77/Dasypus_novemcinctus.jpg/800px-Dasypus_novemcinctus.jpg', href: wiki+'Nine-banded_armadillo'},
        {order: 0, name: 'Opossum', type:'Beast', subtype:'Marsupial', children:<></>, img: wikiImg+'2/25/Rabipelao2.jpg', href: wiki+'Common_opossum'},
        {order: 0, name: 'Black Rat', type:'Beast', subtype:'Rodent Rat', children:<>"Rattus rattus"</>, img: wikiImg+'thumb/f/f7/Roofrat_Hagenbeck_02.jpg/220px-Roofrat_Hagenbeck_02.jpg', href: wiki+'Black_rat'},
        {order: 0, name: 'Brown Rat', type:'Beast', subtype:'Rodent Rat', children:<>"Norway rat"</>, img: wikiImg+'thumb/d/d3/Rattus_norvegicus_-_Brown_rat_02.jpg/800px-Rattus_norvegicus_-_Brown_rat_02.jpg', href: wiki+'Brown_rat'},
        {order: 0, name: 'Woodpecker', type:'Bird', subtype:'Picus', children:<></>, img: wikiImg+'thumb/1/12/PileatedWoodpeckerFeedingonTree%2C_crop.jpg/541px-PileatedWoodpeckerFeedingonTree%2C_crop.jpg', href: wiki+'Woodpecker'},
        {order: 0, name: 'Morning Dove', type:'Bird', subtype:'Dove', children:<></>, img: wikiImg+'thumb/b/b7/Mourning_Dove_2006.jpg/400px-Mourning_Dove_2006.jpg', href: wiki+'Mourning_dove'},
        {order: 0, name: 'Cardinal', type:'Bird', subtype:'', children:<></>, img: wikiImg+'thumb/5/5c/Male_northern_cardinal_in_Central_Park_%2852612%29.jpg/456px-Male_northern_cardinal_in_Central_Park_%2852612%29.jpg', href: wiki+'Northern_cardinal'},
        {order: 0, name: 'Blue Jay', type:'Bird', subtype:'Corvus', children:<></>, img: wikiImg+'thumb/f/f4/Blue_jay_in_PP_%2830960%29.jpg/220px-Blue_jay_in_PP_%2830960%29.jpg', href: wiki+'Blue_jay'},
        {order: 0, name: 'Crow', type:'Bird', subtype:'Corvus', children:<></>, img: wikiImg+'thumb/a/a9/Corvus_corone_-near_Canford_Cliffs%2C_Poole%2C_England-8.jpg/800px-Corvus_corone_-near_Canford_Cliffs%2C_Poole%2C_England-8.jpg', href: wiki+'Corvus'},
        {order: 0, name: 'Giant Stag Beetle', type:'Bug', subtype:'Insect Beetle', children:<i>"Elephant etag beetle"</i>, img: wikiImg+'thumb/2/2e/Lucanus_elaphus_142395158.jpg/750px-Lucanus_elaphus_142395158.jpg', href: wiki+'Lucanus_elaphus'},
        {order: 0, name: 'Widow Skimmer', type:'Bug', subtype:'Insect Dragonfly', children:<></>, img: wikiImg+'thumb/d/d9/Widow_Skimmer%2C_male.jpg/568px-Widow_Skimmer%2C_male.jpg', href: wiki+'Widow_skimmer'},
        {order: 0, name: 'Weeping Willow', type:'Plant', subtype:'Tree', children:<>"Babylon willow"</>, img: wikiImg+'thumb/1/18/Ch%C3%A2teau_de_Chenonceau_-_jardin_Russell-Page_%2801%29.jpg/450px-Ch%C3%A2teau_de_Chenonceau_-_jardin_Russell-Page_%2801%29.jpg', href: wiki+'Salix_babylonica#Horticultural_selections_and_related_hybrids'},
        {order: 0, name: 'Canada Wild Lettuce', type:'Plant', subtype:'Letuce', children:<>"Tall lettuce"</>, img: 'https://calphotos.berkeley.edu/imgs/512x768/0000_0000/0506/2241.jpeg', href: wiki+'Lactuca_canadensis'},
        {order: 0, name: 'Green Snake', type:'Beast', subtype:'Serpent', children:<></>, img: wikiImg+'0/0f/Opheodrys_aestivusPCCP20030524-0823B.jpg', href: wiki+'Opheodrys'},
        {order: 0, name: 'Tomato Hornworm', type:'Bug', subtype:'Caterpillar', children:<>Morph: Five-spotted Hawkmoth</>, img: wikiImg+'5/50/Tomato_hornworm.jpg', href: wiki+'Manduca_quinquemaculata'},
        {order: 0, name: 'Five-spotted Hawkmoth', type:'Bug', subtype:'Moth', children:<>Morph: Tomato Hornworm</>, img: wikiImg+'thumb/0/0b/Manduca_quinquemaculata_MHNT_CUT_2010_0_116_Schuylkill_Haven%2C_Schuylkill_Co._Penna_male_dorsal.jpg/800px-Manduca_quinquemaculata_MHNT_CUT_2010_0_116_Schuylkill_Haven%2C_Schuylkill_Co._Penna_male_dorsal.jpg', href: wiki+'Manduca_quinquemaculata'},
        //{order: 0, name: '', type:'', subtype:'', children:<></>, img: wikiImg+'', href: wiki+''},
        //{order: 0, name: '', type:'', subtype:'', children:<></>, img: wikiImg+'', href: wiki+''},
        //{order: 0, name: '', type:'', subtype:'', children:<></>, img: wikiImg+'', href: wiki+''},
        //{order: 0, name: '', type:'', subtype:'', children:<></>, img: wikiImg+'', href: wiki+''},
    ]
    data.sort((a, b) => a.type.localeCompare(b.type))
    data.forEach((item, i) => item.order = i)
    
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
                {//<img height={imgHeight} src={wikiImg+'thumb/d/df/Bamboo_forest_in_Guangde.jpg/540px-Bamboo_forest_in_Guangde.jpg'}/>
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
        order={item.order+1}
        name={item.name}//+' - '+alephbeth.gimel.uni+alephbeth.shin.uni+alephbeth.resh.uni+' '+alephbeth.keth.uni+alephbeth.zain.uni+alephbeth.vav.uni+alephbeth.tav.uni} 
        image={item.img} 
        color={
            item.type=='Plant'?'green':(
                item.type=='Bug'?'red':(
                    item.type=='Beast'?'brown':(
                        item.type=='Bird'?'blue':(
                        'grey'
                    ))))} 
        logo={
            item.type=='Plant'?'🍃':(
                item.type=='Bug'?'🐞':(
                    item.type=='Beast'?'🐮':(
                        item.type=='Bird'?'🐦':(
                        '🌀'
                    ))))} 
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