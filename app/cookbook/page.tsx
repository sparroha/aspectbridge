'use client';
import { useState } from "react";
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
import Wrapper, { DuoWrap } from "./wrapper";

export default function Cookbook(props){
    const [page, setPage] = useState('home')
    
    return <div style={{padding: '1%', backgroundImage: 'linear-gradient(to bottom, #999, #fff'}}>
        DOC IMPORT<br/>
        <DuoWrap>
            <button onClick={()=>setPage('file')}>
                HTML Doc:<br/>
                <iframe src="/static/docs/josh/file.txt" width="100%"/>
            </button>
            <button onClick={()=>setPage('home')}>
                Home
            </button>
        </DuoWrap>
        {page=='home' && <>
        <DuoWrap>
            <button onClick={()=>setPage('cookbook')}>
                Cookbook<br/>
                <FFrame/>
            </button>
            <button onClick={()=>setPage('sidefactors')}>
                SideFactors<br/>
                <SideFactors/>
            </button>
        </DuoWrap>
        <DuoWrap>
            <>
                CookingIt<br/>
                <CookingIt/>
            </>
            <>
                SystemBaseNotes<br/>
                <SystemBaseNotes/>
            </>
        </DuoWrap>
        <DuoWrap> 
            <>
                Grounding:<br/>
            </>
            <>
                Network:<br/>
            </>
        </DuoWrap>
        <DuoWrap>
            <>
                Soils:<br/>
            </>
            <>
                VeggieTable:<br/>
                <VeggieTable/>
            </>
        </DuoWrap>
        </>}
        <div id='display'>
            {page=='file' && <iframe src="/static/docs/josh/file.txt" width="100%"/>}
            {page=='cookbook' && <FFrame/>}
            {page=='sidefactors' && <SideFactors/>}
        </div>
        
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
