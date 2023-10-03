'use client'
import { useEffect, useState } from "react";
import { TLitter, alephbeth } from "./hebrew";

export type diceProps = {
    sides?: number,
    speed?: number,
    rand?: Function,
    value?: number,
    setRoller?: Function,
    selectSides?: Function,
    setValue?: Function,
    setSpeed?: Function,
}
export type diceInitProps = {
    sides?: number,
    speed?: number,
    rand?: Function,
}

/**
 * DATA HOOK: Dice Roll useDiceRoll(props: diceInitProps): diceProps{}
 * @param props: diceInitProps
 * @returns 
 */
function useDiceRoll(props: diceInitProps): diceProps{
    const rand: Function = props.rand?props.rand:()=>Math.random()
    const [sides, selectSides] = useState(props.sides || 0)
    const [value, setValue] = useState(1)
    const [roller, setRoller] = useState('false')
    const [speed, setSpeed] = useState(props.speed || 5)
    
    useEffect(() => {
        if(roller=='false') return
        const i = setInterval(() => {
            setValue(Math.floor(rand()*sides)+1);
            //console.log('dice roll every '+speed+' seconds!');
        }, speed*1000);
        return () => clearInterval(i)
    }, [sides, roller])

    return {
        sides: sides,
        speed: speed,
        rand: rand,
        value: value,
        setRoller: setRoller,
        selectSides: selectSides,
        setValue: setValue,
        setSpeed: setSpeed
    }
}
export const albt22: TLitter[] = Object.entries(alephbeth).filter((l)=>l[1].order<=22).map((l)=>l[1])
export default function D20({setExternalProps, clickD}: {setExternalProps: Function, clickD?: Function}){
    //useEffect(()=>{console.log('albt22',albt22)},[])
    const {sides, speed, rand, 
        value, setRoller, 
        selectSides, setValue, 
        setSpeed}: diceProps = useDiceRoll({sides: 22, speed: 5})
        const dice = [2,4,6,8,10,12,20,alephbeth['caph'].number+alephbeth['beth'].number,100]
    const [toggle, setToggle] = useState(false)
    const click = (e) => {
        //console.log(e.currentTarget.innerHTML.split('>')[1].split('<')[0])
        setToggle((t)=>!t)
        setValue(Math.floor(Math.random()*sides)+1)
        clickD()
    }
    useEffect(()=>{
        setExternalProps({
            sides, speed, rand, 
            value, setRoller, 
            selectSides, setValue, 
            setSpeed
        })
    },[toggle])
    return <div style={{position: 'relative', width: '6em', height: '6em', backgroundColor: 'transparent', border: 'none'}}>
    <button style={{
        position: 'absolute', 
        zIndex: 1, border: 'none', 
        borderRadius: '50%', fontSize: '1em', 
        width: '2em', height: '2em', 
        right: '0em', top: '0em', 
        margin: 'auto', padding: '0'
    }} onClick={(e)=>{e.preventDefault();selectSides(dice[dice.indexOf(sides)+(sides<100?1:-dice.length+1)])}}>{sides!=22?sides:alephbeth['caph'].uni+alephbeth['beth'].uni}</button>
    
    <button style={{
        position: 'absolute',
        display : 'flex',
        alignItems : 'center',
        color: 'blue',
        margin : 'auto',
        left: '1.5em',
        top: '1.5em',
        border: '1px outset #888',
        width: '3em',
        height: '3em',
        fontSize: '1em', 
        borderRadius: '.5em',
        backgroundColor: '#fff',
        transition: 'linear .2s all', 
        transform: `rotate(${toggle?360:0}deg)`
    }} onClick={ click }>
        <h1 style={{margin: 'auto'}}>{sides==2?(value==1?'I':'O'):sides!=22?value:albt22[value-1].uni}</h1>
    </button>
        {/***
        <hr style={{
            position: 'absolute',
            margin : 'auto',
            left: '3em',
            top: '2em',
            transform: 'rotate(30deg)',
            border: '1px outset #444', 
            width: '2em',
        }}/>
        {/*<hr style={{
            position: 'absolute',
            margin : 'auto',
            left: '1em',
            top: '1em',
            transform: 'rotate(60deg)',
            border: '1px outset #888',
            width: '2em',
        }}/>*}
        <hr style={{
            position: 'absolute',
            margin : 'auto',
            left: '.5em',
            top: '3em',
            transform: 'rotate(90deg)',
            border: '1px outset #ccc',
            width: '2em',
        }}/>
        {/*<hr style={{
            position: 'absolute',
            margin : 'auto',
            left: '1em',
            top: '4em',
            transform: 'rotate(120deg)',
            border: '1px outset #888',
            width: '2em',
        }}/>*}
        <hr style={{
            position: 'absolute',
            margin : 'auto',
            left: '3em',
            top: '4em',
            transform: 'rotate(150deg)',
            border: '1px outset #444',
            width: '2em',
        }}/>
        <hr style={{
            position: 'absolute',
            margin : 'auto',
            left: '2em',
            top: '1.75em',
            transform: 'rotate(180deg)',
            border: '1px outset #888',
            width: '2em',
        }}/>
        <hr style={{
            position: 'absolute',
            margin : 'auto',
            left: '1em',
            top: '4em',
            transform: 'rotate(210deg)',
            border: '1px outset #ccc',
            width: '2em',
        }}/>
        {/*<hr style={{
            position: 'absolute',
            margin : 'auto',
            left: '1em',
            top: '1em',
            transform: 'rotate(240deg)',
            border: '1px outset #888',
            width: '2em',
        }}/>*}
        <hr style={{
            position: 'absolute',
            margin : 'auto',
            left: '3.5em',
            top: '3em',
            transform: 'rotate(270deg)',
            border: '1px outset #444',
            width: '2em',
        }}/>


        {/*<hr style={{
            position: 'absolute',
            margin : 'auto',
            left: '1em',
            top: '2em',
            transform: 'rotate(300deg)',
            border: '1px outset #888',
            width: '2em',
        }}/>*}
        <hr style={{
            position: 'absolute',
            margin : 'auto',
            left: '1em',
            top: '2em',
            transform: 'rotate(330deg)',
            border: '1px outset #ccc',
            width: '2em',
        }}/>
        <hr style={{
            position: 'absolute',
            margin : 'auto',
            left: '2em',
            top: '4.25em',
            transform: 'rotate(360deg)',
            border: '1px outset #888',
            width: '2em',
        }}/>
        ***/}
    </div>
}