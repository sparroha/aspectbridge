import { useRef } from "react"

export type Entity = {
    id: any,
    name: string,
    type: string,
    position: {x: number, y: number},
    vector: {x: number, y: number},
    pathing?: Function,
}
export function RenderEntity(props){
    const entityData = useRef<Entity>({ 
        id: props.id||0,
        name: props.name||'entity',
        type: props.type||'entity',
        position: props.position||{x: 0, y: 0},
        vector: props.vector||{x: 0, y: 0},
        pathing: props.pathing||null,
    })
    return <div id="entity" style={{
        position: 'absolute',
        top: entityData.current.position.y,
        left: entityData.current.position.x,
        width: '10px',
        height: '10px',
        backgroundColor: 'blue',
    }}></div>
}

export default function Player(props){
    const playerData = useRef<Entity>({
        id: props.id||0,
        name: props.name||'player',
        type: props.type||'player',
        position: props.position||{x: 0, y: 0},
        vector: props.vector||{x: 0, y: 0},
        pathing: props.pathing||null,
    })
    return <RenderEntity {...playerData.current}/>

}