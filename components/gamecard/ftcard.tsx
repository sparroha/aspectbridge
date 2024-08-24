import { MouseEventHandler, useRef } from "react"
import { TCard, TCardProps } from "./tcard"
import Card from "./card"

/**
 * FTCard: FunctionalTradingCard
 */
export type FTCardProps = TCardProps & {
    /*onDraw: MouseEventHandler<HTMLButtonElement>
    onPlay: MouseEventHandler<HTMLButtonElement>
    onCast: MouseEventHandler<HTMLButtonElement>
    onResolve: MouseEventHandler<HTMLButtonElement>
    onAttack: MouseEventHandler<HTMLButtonElement>
    onBlock: MouseEventHandler<HTMLButtonElement>
    onDamage: MouseEventHandler<HTMLButtonElement>
    onHeal: MouseEventHandler<HTMLButtonElement>*/
    click: MouseEventHandler<HTMLButtonElement>
    color: string
    logo: string
}
export type FTCardPropsPartial = Partial<FTCardProps>
export default function FunctionalTradingCard(cardprops: FTCardPropsPartial){return <Card {...new FTCard({})} />}
export class FTCard extends TCard{
    click: any
    color: string
    logo: string
    constructor(props: FTCardPropsPartial){
        super(props)
        this.click = props.click || null
        this.color = props.color || 'yellow'
        this.logo = props.logo || ' '
    }
    getProps(): FTCardPropsPartial{
        return {
            key: this.key,
            name: this.name,
            order: this.order,
            image: this.image,
            strimage: this.strimage,
            type: this.type,
            subtype: this.subtype,
            click: this.click,
            children: this.children,
            color: this.color,
            logo: this.logo
        }
    }
}
