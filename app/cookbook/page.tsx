'use client'
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
    lines: string[] | string,

}
export default function Cookbook(props){
    //construct default
    const defaultState: TXTPage = {
        title: 'Cookbook',
        lines: '[]'
    }
    const [save, setSave]:[TXTPage, Function] = useCustomRegistry('cookbook:root', defaultState)
    const user = useUser()
    function handleChangeCursor(user){}
    const onChangeCorsor = (e)=>{

    }
    const saveTitle = (e)=>{
        let newdata = {...save, title: e.target.value}
        setSave(newdata)
    }
    const saveDoc = (e)=>{
        let newdata = {...save, lines: e.target.value}
        setSave(newdata)
    }
    if(!save) return <>Cookbook Loading...</>
    return <div style={{backgroundImage: 'linear-gradient(to bottom right, #797, #fff', width: '100%', height: '100%'}}>
        <form style={{width: '100%', height: '100%'}}>
            <input name={'title'} value={save?.title} onChange={saveTitle} style={{margin: '1em 0 0 3%'}}/><br/>
            <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
                <textarea id="cookbook-file-textarea" name={'doc'} onChange={saveDoc} value={save.lines}
                style={{width: '94%', height: '90%'}}/>
            </div>
        </form>
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