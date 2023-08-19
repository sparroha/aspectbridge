import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { TLitter, alephbeth, alephbethList } from "../../components/hebrew"
import { FTCard, FTCardPropsPartial } from "./class/ftcard"
import { TCard } from "./class/tcard"
import Card from "./class/card"
import { Col, Container, Row } from "react-bootstrap"
import useRegister from "../../lib/util/registry"
export const progStateNum = 22
export default function CardIndex({setCardIndex}) {
    /**
     * INITIALIZATION
     * useRegister
     */
    const render = useState({})[1]
    const defaultState = {
        residents: 0, inns: 0,
        stables: 0, archives: 0,
        temples: 0, mills: 0,
        farms: 0, walls: 0,
        shops: 0, markets: 0,
        forests: 0, schools: 0,
        wells: 0, aquaducts: 0, 
        beams: 0, tower: 0,
        theater: 0, roads: 0,
        posts: 0, company: 0,
        memorials: 0, hubs: 0,

        energy: 0, rest: 0,
        momentum: 0, memory: 0,
        breath: 0, strength: 0,
        nutrients: 0, health: 0,
        utility: 0, wealth: 0,
        lumber: 0, talents: 0,
        water: 0, firtility: 0,
        support: 0, awareness: 0,
        inforation: 0, access: 0,
        navigation: 0, business: 0,
        morale: 0, crosses: 0,
    }
    const stateRefMain = useRef(defaultState)
    const getRefMain = useCallback(()=>stateRefMain.current,[stateRefMain.current])
    const [init, setInit] = useState(false)
    const [registryData, saveRegistryState, registryLoaded] = useRegister('alephbethcards',defaultState)
    function save2registry(){saveRegistryState({...stateRefMain.current})}
    function rendersave(){render({});saveRegistryState({...stateRefMain.current})}
    const registryDataParsed = useMemo(()=>JSON.parse(registryData),[registryData])
    useEffect(()=>{
        if(registryLoaded && !init){
            stateRefMain.current = registryDataParsed
            setInit(true)
        }
    },[registryLoaded])

    /**
     * GAME LOOP
     */
    const [count, setCount] = useState(0)
    useEffect(()=>{
        const interval = setInterval(()=>{setCount((c)=>c+1)},1000)
        return ()=>clearInterval(interval)
    },[])
    useEffect(()=>{
        if(!init) return
        const interval = setInterval(()=>{
            stateRefMain.current.energy+=1
            stateRefMain.current.rest+=Math.floor(stateRefMain.current.inns/11)
            stateRefMain.current.momentum+=Math.floor(stateRefMain.current.stables/11)
            stateRefMain.current.memory+=Math.floor(stateRefMain.current.archives/11)
            stateRefMain.current.breath+=Math.floor(stateRefMain.current.temples/11)
            stateRefMain.current.strength+=Math.floor(stateRefMain.current.mills/11)
            stateRefMain.current.nutrients+=Math.floor(stateRefMain.current.farms/11)
            stateRefMain.current.health+=Math.floor(stateRefMain.current.walls/11)
            stateRefMain.current.utility+=Math.floor(stateRefMain.current.shops/11)
            stateRefMain.current.wealth+=Math.floor(stateRefMain.current.markets/11)
            stateRefMain.current.lumber+=Math.floor(stateRefMain.current.forests/11)
            stateRefMain.current.talents+=Math.floor(stateRefMain.current.schools/11)
            stateRefMain.current.water+=Math.floor(stateRefMain.current.wells/11)
            stateRefMain.current.firtility+=Math.floor(stateRefMain.current.aquaducts/11)
            stateRefMain.current.support+=Math.floor(stateRefMain.current.beams/11)
            stateRefMain.current.awareness+=Math.floor(stateRefMain.current.tower/11)
            stateRefMain.current.inforation+=Math.floor(stateRefMain.current.theater/11)
            stateRefMain.current.access+=Math.floor(stateRefMain.current.roads/11)
            stateRefMain.current.navigation+=Math.floor(stateRefMain.current.posts/11)
            stateRefMain.current.business+=Math.floor(stateRefMain.current.company/11)
            stateRefMain.current.morale+=Math.floor(stateRefMain.current.memorials/11)
            
            setCount(0)
            save2registry()
        }
        ,5000)
        return ()=>clearInterval(interval)
    },[init])


    /**
     * INTERFACE Functions
     */
    
    //click functions mapped to alephbeth
    const alephbeth22: [string, TLitter][] = Object.entries(alephbeth).filter((l, i)=>l[1].order<=22)
        //(l, i)=>l[1].order<=22)
    const useClicks: MouseEventHandler<HTMLButtonElement>[] = useMemo(()=>alephbeth22.map((l, i)=>{
        return (event)=>{
            let refMain = getRefMain()
            let t = event.target
            let stateA = Object.entries(refMain)[i]
            let stateB = Object.entries(refMain)[i+progStateNum]
            if(i==0 && refMain[stateB[0]]>=22){
                refMain[stateB[0]]-=22;
                refMain[stateA[0]]+=1;
            }else if(i > 0 && refMain[stateB[0]]>=22 && refMain.residents >= 1){
                refMain[stateB[0]]-=22;
                refMain.residents -=1;
                refMain[stateA[0]]+=1;
            }else{
                refMain[stateB[0]]+=1;
            }rendersave()
            return true
        }
    }),[stateRefMain.current])
    const mapCards: FTCard[] = useMemo(()=>alephbeth22.map((l: [string, TLitter], i)=>{
        let stateA = Object.entries(stateRefMain.current)[i]
        let stateB = Object.entries(stateRefMain.current)[i+progStateNum]
        return new FTCard({
            name: l[0],
            order: l[1].order,
            strimage: l[1].uni,
            click: useClicks[l[1].order-1],
            color: l[1].order%7 == 1 ? 'lightred' :
                    (l[1].order%7 == 2 ? 'orange' :
                    (l[1].order%7 == 3 ? 'yellow' :
                    (l[1].order%7 == 4 ? 'green' :
                    (l[1].order%7 == 5 ? 'blue' :
                    (l[1].order%7 == 6 ? 'lightpurple' :
                    (l[1].order%7 == 0 ? 'gray' : 'lightgray')))))),
            type: (stateA?(stateA[0].slice(0,1).toUpperCase()+stateA[0].slice(1)):'')
                +':['+(stateA?stateRefMain.current[stateA[0]]:'')+'] -- '
                +(stateB?(stateB[0].slice(0,1).toUpperCase()+stateB[0].slice(1)):'')
                +' ['+(stateB?stateRefMain.current[stateB[0]]:'#')+']',
            logo: l[1].uni,
            children: <>
                {`+1 ${stateB?stateB[0]:''}:`}<br/>{`=> promote a resident to ${stateA?stateA[0]:''}:`}<br/>{`=> provides 1 ${stateA?stateA[0]:''}`}
            </>
        })
    }),[...Object.entries(stateRefMain.current)])||[]
    const cards: FTCard[] = useMemo(()=> [
        ...mapCards.filter((c: FTCard)=>c?true:false),
    ], [...mapCards.filter((c: FTCard)=>c?true:false)])
    
    /**
     * RENDER
     */

    //escape clause to prevent data desync
    if(setCardIndex){
        setCardIndex(mapCards)
        return <>{cards.length}::{mapCards.length}</>
    }
    if(!registryLoaded || !init) return <>
        <div>Loading...registryLoaded:{registryLoaded?'true':'false'}...init:{init?'true':'false'}</div>
        {JSON.stringify(stateRefMain.current)}
        {JSON.stringify(registryDataParsed)}
        {registryData}
    </>
    return <Container style={{position: 'relative', margin: '5px', padding: '0px'}}>
        {//<h3>Stats</h3>{count}{Object.entries(state.current)[11]}
        <Stats state={registryDataParsed}/>
        }
        {//<DisplayCards cards={cards}/>
        }
        {//<DisplayFillerCards/>
        }
        {<CardApp cards={cards}/>
        }
    </Container>
}

/**
 * COMPONENT Functions
 */

function Stats({state}: {state: {[key: string]: number}}){
    if( !state) return <></>
    return <Row xs={2} sm={3} md={4} lg={5}>
        {Object.entries(state).map((key, i) => {
            return <Col key={i} style={{
                border: '1px solid black',
                backgroundColor: i+1<=progStateNum?'lightgreen':'lightgray',
            }}><p>{key[0]}: {key[1]}</p></Col>
        })}
    </Row>
}
function DisplayCards({cards}: {cards: FTCard[]}){
    
    return <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {cards.map((card, i) => {
            return <div key={i}><Card {...card?.getProps()}/></div>
        })}
    </div>
}
/*function DisplayFillerCards(){
    return <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {alephbethList.map((key, i) => 
            i >= progStateNum &&
            <div key={i}><Card strimage={key.uni}>
                <h4>{key.order}: <b>{key.uni}</b></h4>
                <p style={{fontSize: '20px'}}>{key.char}</p>
            </Card></div>
        )}
    </div>
}*/

/**
 * IMPLEMENTATION
 */
function CardApp({cards}:{cards: FTCard[]}){
    const [deckLoaded, setDeckLoaded] = useState(false)
    const [grave, setGrave]: [FTCard[], Dispatch<SetStateAction<FTCard[]>>] = useState([])
    const [field, setField]: [FTCard[], Dispatch<SetStateAction<FTCard[]>>] = useState([])
    const [deck, setDeck]: [FTCard[], Dispatch<SetStateAction<FTCard[]>>] = useState([])
    
    /*
    const defaultState = {grave: grave, field: field, deck: deck}
    const state = useRef(defaultState)
    const [init, setInit] = useState(false)
    //[data, setData, dataLoaded]
    const [stateString, saveState, stateLoaded] = useRegister('uniqueid',defaultState)
    //save state to database
    function save(){saveState({...state.current})}
    //get stateString as object: compare to state.current
    const dbstate = useMemo(()=>
        JSON.parse(stateString),
    [stateString])
    useEffect(()=>{
       if(stateLoaded && !init){
           state.current = dbstate
           setInit(true)
       }
    },[stateLoaded])
    //escape clause to prevent data desync
    if(!stateLoaded) return <>Loading...</>
*/

    useEffect(()=>{
        if(!deckLoaded) setDeck((d)=>{
            let newDeck: FTCard[] = []
            for(let x=0;x<20;x++){
                //WARN: made a copy. is no longer bound by update render?
                let randNum = Math.floor(Math.random()*cards.length)
                //let nextCard = cards[randNum]
                let nextCardProps = cards[randNum].getProps()
                newDeck.push(
                    new FTCard({
                        ...nextCardProps,
                        key: x,
                        click: (e)=>{
                            nextCardProps.click?nextCardProps.click(e):null
                            playCard(x, setField, setGrave)
                        }
                    })
                )
            }
            setDeckLoaded(true)
            return newDeck
        })
    },[])//WARN: only gets values once with first render. cant rerender this
    
    if(!deckLoaded) return <>Loading...</>
    return <>
        {//<DisplayAppCards cards={cards}/>
        }
        <Deck deck={deck} setDeck={setDeck} setField={setField}/>
        <Grave grave={grave} setDeck={setDeck} setGrave={setGrave}/>
        <Field field={field} setField={setField} setGrave={setGrave}/>
    </>
}
function DisplayAppCards({cards}: {cards: TCard[]}){
    
    return <>
        {cards.map((card, i) => {
            return <div key={i} style={{position: 'absolute', left: (i%5*200)+'px', top: Math.floor(i/5)*158+'px'}}>
                <Card {...card?.getProps()}/>
            </div>
        })}
    </>
}
function Deck({deck, setField, setDeck}: {deck: FTCard[], setField: Dispatch<SetStateAction<FTCard[]>>, setDeck: Dispatch<SetStateAction<FTCard[]>>}){
    function drawCard(e){
        if(deck.length==0) return
        setDeck((d)=>{
            let newD = d
            let p = newD.pop()
            if(p==undefined) return d
            setField((f)=>{
                let newF = f
                let mewLen = newF.push(p!=undefined?p:new FTCard({}))
                console.log('Field: '+newD)
                return newF
            })
            console.log('Deck: '+newD)
            return newD
        })
    }
    const deckCard: FTCard = useMemo(()=>new FTCard({
        name: 'Deck',
        order: 0,
        strimage: '🃏',
        click: drawCard,
        color: 'lightgray',
        type: 'Deck',
        logo: '🃏',
        children: <>
            <h4>Deck: {deck.length}</h4>
        </>,
    }),[{...deck}])
    return <div style={{
        margin: '0',
        border: '0',
        padding: '0',
        backgroundColor: 'lightgray',
        position: 'absolute',
        width: 220+'px',
        height: 288+'+px',
        left: 85+'vw',
        top: 65+'vh'
    }}>
        <Card {...deckCard?.getProps()}/>
    </div>
}
function Grave({grave, setDeck, setGrave}: {grave: FTCard[], setDeck: Dispatch<SetStateAction<FTCard[]>>, setGrave: Dispatch<SetStateAction<FTCard[]>>}){
    function shuffleCards(e){
        setGrave((g)=>{
            if(g.length==0) return g
            setDeck((d)=>{
                let newD = [...d,...g]
                let newShuffle: FTCard[] = []
                let iterations = newD.length
                let len = 0
                for(let x=0;x<iterations;x++){
                    let randIndex = Math.floor(Math.random()*newD.length)
                    newD = newD.filter((crd, i)=>{
                        if (i==randIndex) len = newShuffle.push(crd)
                        console.log(len)
                        return i!=randIndex
                    })
                }
                console.log('Decka: '+newD)
                console.log('Deckb: '+newShuffle)
                return newShuffle
            })
            console.log('Grave: '+[])
            return []
        })
    }
    const graveCard: FTCard = useMemo(()=>new FTCard({
        name: 'Grave',
        order: 0,
        strimage: '🃏',
        click: shuffleCards,
        color: 'lightgray',
        type: 'Grave',
        logo: '🃏',
        children: <>
            <h4>Grave: {grave.length}</h4>
        </>,
    }),[{...grave}])
    return <div style={{
        margin: '0',
        border: '0',
        padding: '0',
        backgroundColor: 'lightgray',
        position: 'absolute',
        width: 220+'px',
        height: 288+'+px',
        left: 5+'vw',
        top: 65+'vh'
    }}>
        <Card {...graveCard?.getProps()}/>
    </div>
}
function Field({field, setField, setGrave}: {field: FTCard[], setField: Dispatch<SetStateAction<TCard[]>>, setGrave: Dispatch<SetStateAction<TCard[]>>}){  
    const render = ()=>useState({})[1]({})
    function RenderCards({cards}: {cards: FTCard[]}){
        return <Row style={{textAlign: 'center', verticalAlign: 'middle'}}>
            {cards.map((card, i) =>{
                let p = card.getProps()
                return <Col key={i}><Card {...p}/></Col>
            })}
        </Row>
    }
    return <Container style={{
        margin: '0',
        border: '0',
        padding: '0',
        backgroundColor: 'lightgray',
        position: 'absolute',
        width: 64+'vw',
        height: 40+'+vh',
        left: 18+'vw',
        top: 60+'vh'
    }}>
        <RenderCards cards={field}/>
    </Container>
}
function playCard(key, setField: Dispatch<SetStateAction<FTCard[]>>, setGrave: Dispatch<SetStateAction<FTCard[]>>){
    setGrave((g)=>{
        let newG = g
        let newLen = 0
        setField((f)=>{
            if(f.length==0) return f
            let newF = f
            console.log('Field: '+newF+' | Grave: '+newG)
            newF = newF.filter((c, i)=>{
                if (c.key==key) newLen = newG.push(c)
                //console.log('key:'+key+'::c.key:'+c.key)
                return c.key!=key
            })
            console.log('Field: '+newF)
            return newF
        })
        console.log('Grave: '+newG)
        return newG
    })
}
