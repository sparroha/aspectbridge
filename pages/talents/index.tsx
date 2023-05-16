import useSWR from "swr"

export default function Talents(props: any){
    const SKILLS = {
        ATK: 'attack +1',
        DEF: 'defence +1',
        HP: 'health +1',
        COST: 'cost -1',
    }
    const ABILITIES = [
        {name: 'heal', text: 'heal 1', prereq: {skill: SKILLS.HP, lvl: 5}, discription: 'heal+=30%', augmentHeal(heal: number){return heal*1.3}},
        {name: 'block', text: 'defend 1', prereq: {skill: SKILLS.DEF, lvl: 5}},
        {name: 'assult', text: 'attack 1', prereq: {skill: SKILLS.ATK, lvl: 5}}
    ]
    const stats = {
        attack: 1,//influence
        defence: 1,//resolve
        health: 3,//action
        cost: 1,//requirement
        abilities: ['heal 1(motivate)'],
    }

    const sessionId = props.sessionId
    const players = useSWR('players', ()=>{})
    const P1 = useSWR('player1', ()=>{})
    const P2 = useSWR('player2', ()=>{})

    return <></>
}