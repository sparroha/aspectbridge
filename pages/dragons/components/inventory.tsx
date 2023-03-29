import { useState } from "react"
import { Button } from "react-bootstrap"

export default function Inventory({inventory}){
    const {I, setI} = inventory
    return <div className={'net-dragons-inventory'}>
        {I.map((item, i) => <Button key={i} onClick={e => useItem(I, setI, item)}>{item}</Button>)}
    </div>
}
export function useInventory({inventory}){
    const [I, setI] = useState(inventory)
    return {I, setI}
}
function addItem(I, setI, item){
    setI([...I, item])
}
function useItem(I, setI, item){
    switch(item){
        case 'hair':
            setI(I.filter(i => i!=item))
            addItem(I, setI, 'hair')
            item.use()
            break
        default:
            break
    }
}