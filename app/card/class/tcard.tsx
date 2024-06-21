
export type TCardProps = {
    key: number
    name: string
    order: number
    image: string
    strimage: string
    type: string
    subtype: string
    children: any
}
export type TCardPropsPartial = Partial<TCardProps>
export default function D(){return null}

export class TCard{
    key: number
    name: string
    order: number
    image: string
    strimage: string
    type: string
    subtype: string
    children: any
    constructor(props: TCardPropsPartial){
        this.key = props.key || 0
        this.name = props.name || ''
        this.order = props.order || 0
        this.image = props.image || ''
        this.strimage = props.strimage || ''
        this.type = props.type || ''
        this.subtype = props.subtype || ''
        this.children = props.children || null
    }
    getProps(): TCardPropsPartial{
        return {
            key: this.key,
            name: this.name,
            order: this.order,
            image: this.image,
            strimage: this.strimage,
            type: this.type,
            subtype: this.subtype,
            children: this.children
        }
    }
}
