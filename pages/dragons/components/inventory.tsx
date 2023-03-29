import { GetServerSideProps } from "next"
import { useState } from "react"
import { Button } from "react-bootstrap"
import useSWR from "swr"
import { ItemData } from "./item"
export type Inventory = {
    id: number,
    name: string,
    description: string,
    items: string[]
}
export default function Inventory({inventory}: {inventory: {I: string[], setI: Function}}){
    const {data, error} = useSWR('/api/dragons/items', { revalidateOnFocus: false })
    if(!inventory) return <>Inventory Loading...</>
    const {I, setI} = inventory
    return <div className={'net-dragons-inventory'}>
        {I.map((item, i) => <Button key={i} onClick={e => useItem(I, setI, item)}>{item}</Button>)}
    </div>
}
function checkname(n1, n2){return n1 == n2 }
export function useInventory({inventory}){
    const [I, setI] = useState(inventory)
    return {I, setI}
}
function addItem(I: string[], setI: Function, item: string){
    setI([...I, item])
}
function useItem(I: string[], setI: Function, item: string){
    switch(item){
        case 'hair':
            setI(I.filter(i => i!=item))
            addItem(I, setI, 'hair')
            //item.onuse()
            break
        default:
            break
    }
}
