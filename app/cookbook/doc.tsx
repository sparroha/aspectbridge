'use client'
import { useState, useMemo } from "react";
import { useCustomRegistry } from "../../lib/util/^register";
import useUser from "../../lib/util/^user";
type TXTPage = {
    title: string
    lines: string[],

}
export default function Doc(){
    //construct default
    const defaultState: TXTPage = {
        title: 'Cookbook',
        lines: ['default text']
    }
    const [save, setSave]:[TXTPage, Function] = useCustomRegistry('cookbook:root', defaultState, false)
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
        <form style={{width: '100%', height: '96%', padding: '1em'}} onSubmit={newLineAction}>
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
}