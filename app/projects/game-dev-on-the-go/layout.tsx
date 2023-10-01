import ZRCProvider from './provider'

export default async function OTGLayout({ children }) {
	return <ZRCProvider>{children}</ZRCProvider>
}

/**
 * All form components must implement the following paterns to apropriately integrate with the data
 */
/*
<page.tsx>
return...
... <Row id="interface-zones">
        <Zone id={"Mine"} bgColor={"#aa7"} bgAlt={'Gold Mine'} helper bgImage={'https://www.automation.com/getmedia/f4d4cca4-3167-4426-803a-de780ccefab9/Gold-mine-feature-July-29-2021-web.png?width=500&height=313&ext=.png'}>
                <MineOre/>
                <SmeltMetal/>
        </Zone>
        ...
</page.tsx>
<provider.tsx>
    export const locations: {[key: string]: LocationInfo} = {
        island: {name: 'Island', zones: ['Mine', 'Quary', 'Forest', 'River', 'Library', 'Tower']},
        mainland: {name: 'Mainland', zones: ['Quary', 'Forest', 'Port', 'Shipyard', 'Library', 'Scripts']},
        styx: {name: 'Styx', zones: ['Forest', 'River', 'Scripts', 'Aurical']}
    }

    const reducer = (state: any, action: {type: string, payload?: any})=>{
        let actionType = action.type.toLowerCase()
        switch(actionType){
            case 'teleport':
                return window.location.href = '/'+action.payload.destination
            case 'set':
                return action.payload != "default" ? action.payload : initialState
            case 'craft':
                let craftType = action.payload.type.toLowerCase()
                switch(craftType){
                    case 'metal':
                    if(state.ore<3) {alert('not enough ore'); return state}
                    if(state.wood<3) {alert('not enough wood'); return state}
                    return {...state, ore: state.ore-3, wood: state.wood-3, metal: state.metal?state.metal+2:2}
            ...
</provider.tsx>
<zones.tsx>
    //zone activities
    export function ChopWood(){
        const {state, dispatch} = useZRContext()
        return <Col xs={4}>
            <Button onClick={()=>{dispatch({type: 'add', payload: {type: 'wood', count: 1}})}}>Chop</Button><br/>
            <div style={{backgroundColor: '#777777aa'}}>+Wood: {state.wood}</div>
        </Col>
    }
</zones.tsx>



*/
