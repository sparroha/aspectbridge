'use client'
import { useState, useMemo } from "react";
import { useCustomRegistry } from "../../lib/util/^register";
import useUser from "../../lib/util/^user";
import CookingIt from "./cooking_it";
import Foundations from "./grounding/foundations/page";
import Heating from "./grounding/heating/page";
import TLiterator from "./network/hebrew";
import SpiderAX from "./network/spider_ax";
import SideFactors from "./side_factors";
import Composts from "./soils/composts";
import Drainage from "./soils/drainage";
import Mapping from "./soils/mapping";
import Molecules from "./soils/molecules";
import Nutrients from "./soils/nutrients";
import Soil from "./soils/soil";
import FFrame from "./string";
import SystemBaseNotes from "./system_base_notes";
import VeggieTable from "./veggie table/veggie_plate";
type TXTPage = {
    title: string
    lines: string[],

}
export default function Cookbook(props){
    //construct default
    const defaultState: TXTPage = {
        title: 'Cookbook',
        lines: ['default text']
    }
    const [save, setSave]:[TXTPage, Function] = useCustomRegistry('cookbook:root', defaultState, true)
    const user = useUser()
    const saveTitle = (e)=>{
        let newdata = {...save, title: e.target.value}
        setSave(newdata)
    }
    const saveDoc = (e)=>{
        let newdata = {...save, lines: e.target.value}
        setSave(newdata)
    }
    //APP
    
    const [cursor, setCursor] = useState({lineIndex:0, cursorPos: 0})
    const movecursor = (e,i)=>{
        console.log('Caret at: ', e.currentTarget.selectionStart)
        setCursor({lineIndex: i, cursorPos: e.currentTarget.selectionStart})
    }
    const setLine = (e,i)=>{
        let newdata = [...save.lines]
        newdata[i] = e.target.value
        setSave({...save, lines: newdata})
    }
    const newLine = (e)=>{
        //save data
        let ln = cursor.lineIndex
        console.log('ln',ln)
        let c = cursor.cursorPos
        console.log('c',c)
        let sec1 = save.lines.filter((l,i)=>i<ln)
        console.log('sec1',sec1)
        let [sec2] = save.lines.filter((l,i)=>i===ln)
        console.log('sec2',sec2)
        let sec2a = sec2.substring(0,c)
        console.log('sec2a',sec2a)
        let sec2b = sec2.substring(c)
        console.log('sec2b',sec2b)
        let sec3 = save.lines.filter((l,i)=>i>ln)
        console.log('sec3',sec3)
        let a = [...sec1,sec2a,sec2b,...sec3]
        console.log('a',a)
        setSave({title: save.title, lines: [...a]})
        //save data bisected at cursor
    }
    const newLineAction = (e)=>{
        e.preventDefault()
        console.log('newLineAction')
        newLine(e)
    }
    function Doc({dl}){
        return <>{
            dl?.map((line, i)=>{
                return <>
                    <input name={'line'} key={i} style={{width: '100%', height: '2em', border: 0, margin: 0, padding: 0}}
                        defaultValue={line}
                        onChange={(e)=>setLine(e,i)} 
                        onKeyUp={(e)=>movecursor(e,i)} 
                        onClick={(e)=>movecursor(e,i)}
                    /><br/>
                </>
            })
        }</>
    }
    const submitTextarea = (e)=>{
        let arr_e: string[] = e.target.value.split('\n')
        let s = {...save}
        s.lines = arr_e
        setSave(s)
    }

    if(!save) return <>Cookbook Loading...</>
    return <div style={{backgroundImage: 'linear-gradient(to bottom right, #797, #fff', width: '100%', height: '100%'}}>
        <form style={{width: '100%', height: '96%', padding: '1em'}} /*onSubmit={newLineAction}*/>
            <input name={'title'} defaultValue={save?.title} onChange={saveTitle} style={{height: '4%'}}/><br/>
            <div style={{width: '100%', height: '96%', textAlign: 'center'}}>
                <textarea name={'doc'} defaultValue={save?.lines?.join('\n')} onChange={submitTextarea}
                    style={{width: '100%', height: '100%', border: 0, margin: 0, padding: 0}}/>
            </div><br/>
            {//<input type={'submit'} style={{visibility: 'collapse'}}/>
            }
        </form>
        <button onClick={(e)=>{e.preventDefault();setSave(defaultState)}} style={{height: '4%'}}>Restor Defaults</button>
    </div>
    return <div style={{backgroundImage: 'linear-gradient(to bottom, #777, #fff'}}>
            
        <h1>{save.title}</h1><hr style={{border: '3px solid #777'}}/>
        <FFrame/><hr style={{border: '3px solid #777'}}/>
        <SideFactors/><hr style={{border: '3px solid #777'}}/>
        <CookingIt/><hr style={{border: '3px solid #777'}}/>
        <SystemBaseNotes/><hr style={{border: '3px solid #777'}}/>
        <hr style={{border: '3px solid #777'}}/>
        <div style={{backgroundImage: 'linear-gradient(to bottom, #777, #fff'}}>
            <h2>Grounding</h2><hr style={{border: '2px solid #999'}}/>
            <div>
                <h3>Foundations</h3><hr style={{border: '1px solid #bbb'}}/>
                <Foundations/>
                <h3>Heating</h3><hr/>
                <Heating/>
            </div>
        </div>
        <hr style={{border: '3px solid #777'}}/>
        <div style={{backgroundImage: 'linear-gradient(to bottom, #777, #fff'}}>
            
            <h2>Network</h2>
            <hr style={{border: '2px solid #999'}}/>
            <div>
                <h3>Hebrew</h3><hr style={{border: '1px solid #bbb'}}/>
                <TLiterator/>
                <h3>Spider</h3><hr/>
                <SpiderAX/>
            </div>
            <hr style={{border: '2px solid #999'}}/>

            <h2>Soils</h2>
            <hr style={{border: '2px solid #999'}}/>
            <div>
                <h3>Soil</h3><hr style={{border: '1px solid #bbb'}}/>
                <Soil/>
                <h3>Molecules</h3><hr/>
                <Molecules/>
                <h3>Nutrients</h3><hr/>
                <Nutrients/>
                <h3>Drainage</h3><hr/>
                <Drainage/>
                <h3>Composts</h3><hr/>
                <Composts/>
                <h3>Mapping</h3><hr/>
                <Mapping/>
            </div>

            <h2>Veggie Table</h2>
            <hr style={{border: '2px solid #999'}}/>
            <div>
                <h3>VeggieTable</h3><hr/>
                <VeggieTable/>
            </div>

        </div>
        <hr style={{border: '3px solid #777'}}/>
    </div>
}
