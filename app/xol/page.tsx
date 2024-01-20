'use client'
import { Fragment, useEffect } from "react"
import { useMousePosition } from "../../components/mouse"
import { useDynamicContext } from "./provider"

export default function Page({params, searchParams}){
    const {state, dispatch} = useDynamicContext()
    
    const mouse = useMousePosition('field')
    useEffect(()=>{if(state.selectedEntity == '') return; dispatch({type: 'move', payload: mouse.clickpos})},[mouse.clickpos])

    return <div id={'field'} style={{position: 'relative', background: 'white', height: '100%'}}>
        <button onClick={()=>dispatch({type: 'new', payload: 'selectable'})}>New Selectable</button>
        X:{mouse.clickpos.left}_Y:{mouse.clickpos.top}
        {searchParams.now}
        {Object.keys(state.mobileEntity).map((id, i)=>{
            return <Fragment key={i}><SelectableItem id={id} state={state} dispatch={dispatch} style={{width: '40px', height: '40px'}}>
                <div style={{width: '100%', height: '100%'}}>{id}</div>
            </SelectableItem></Fragment>
        })}
        {/*<SelectableItem id={'test'} state={state} dispatch={dispatch} style={{width: '40px', height: '40px'}}>
            <div style={{width: '100%', height: '100%'}}>Test</div>
        </SelectableItem>
        <SelectableItem id={'test1'} state={state} dispatch={dispatch} style={{width: '40px', height: '40px'}}>
            <div style={{width: '100%', height: '100%'}}>Test1</div>
        </SelectableItem>
        <SelectableItem id={'test2'} state={state} dispatch={dispatch} style={{width: '40px', height: '40px'}}>
            <div style={{width: '100%', height: '100%'}}>Test2</div>
        </SelectableItem>
        <SelectableItem id={'test3'} state={state} dispatch={dispatch} style={{width: '40px', height: '40px'}}>
            <div style={{width: '100%', height: '100%'}}>Test3</div>
        </SelectableItem>*/}
    </div>
}

function SelectableItem({id, state, dispatch, style, children}: {id: string, state: any, dispatch: ({type, payload}:{type: string, payload: any})=>void, style: any, children: JSX.Element}){
    let w = style ? Number.parseFloat(style.width.replace('px','')) : 0
    let h = style ? Number.parseFloat(style.height.replace('px','')) : 0
    return <div onClick={()=>dispatch({type: 'select', payload: id})} style={{
        ...style,
        position: 'absolute', transition: 'all 1s linear',
        left: state[id] ? state[id].left-w/2 : w,
        top: state[id] ? state[id].top-h/2 : h,
        boxShadow: state.selectedEntity === id ? '0 0 0 2px #000' : 'none',
    }}>
        {/*<Link href={sarchArgs('selected=' + id, searchParams)}>*/}{children}{/*</Link>*/}
    </div>
}