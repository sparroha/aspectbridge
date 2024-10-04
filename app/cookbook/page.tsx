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

export default function Cookbook({params}){
    const [page, setPage] = useState('Home')
    const [subPage, setSubPage] = useState('')
    const pages = [
        'Home',
        'HTML_Doc',
        'Cookbook',
        'SideFactors',
        'CookingIt',
        'SystemBaseNotes',
        'Grounding',
        'Network',
        'Soils',//looping
        'VeggieTable'
    ]
    
    return <div style={{ width: '80vw', backgroundImage: 'linear-gradient(to bottom, #999, #fff', borderRadius: '22px'}}>
        <div className="row" style={{backgroundColor: 'transparent'}}>
            {pages.map((p, i)=>{
                if((page == 'Home' && p != 'Home') || (page != 'Home' && p == 'Home'))return <div key={i} className="col-4" style={{height: '100px', backgroundImage: 'none'}}>
                    <div style={{position: 'relative', width: '100%', height: '100%'}}>
                        <div style={{position: 'absolute', width: '98%', height: '98%', opacity: '.5', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', zIndex: '0'}}></div>
                        <div style={{position: 'absolute', width: '100%', height: '100%', margin: '0', padding: '0', border: '0', borderRadius: '22px', backgroundImage: ''}}>
                            <button onClick={()=>setPage(p)} style={{width: '100%', height: '100%', padding: '2%', border: '5px outset #ddd', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #999, #fff)', overflow: 'auto'}}> 
                                {p}
                            </button>
                        </div>
                    </div>
                </div>
            })}
        </div>

        {page == 'HTML_Doc' && <iframe src="/static/docs/josh/file.txt" width="100%"/>}
        {page == 'Cookbook' && <FFrame/>}
        {page == 'SideFactors' && <SideFactors/>}
        {page == 'CookingIt' && <CookingIt/>}
        {page == 'SystemBaseNotes' && <SystemBaseNotes/>}
        {page == 'Grounding' && 
            <>
                <h1>Grounding</h1><br/>
                <div className="row">
                    {(['Foundations', 'Heating']).map((page, i)=>{
                        return <div key={i} className="col-4" style={{height: '100px'}}>
                            <div key={i} style={{position: 'relative', width: '100%', height: '100%'}}>
                                <div style={{position: 'absolute', width: '98%', height: '98%', opacity: '.5', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', zIndex: '0'}}></div>
                                <div style={{position: 'absolute', width: '98%', height: '98%', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: ''}}>
                                    <button onClick={()=>setSubPage(page)} style={{width: '100%', height: '100%', padding: '2%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #aaf, #fff)', overflow: 'auto'}}> 
                                        {page}
                                    </button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                {subPage == 'Foundations' && <Foundations/>}
                {subPage == 'Heating' && <Heating/>}
            </>
        }
        {page == 'Network' && 
            <>
                <h1>Network</h1><br/>
                <div className="row">
                    {(['Hebrew', 'Spider']).map((page, i)=>{
                        return <div key={i} className="col-4" style={{height: '100px'}}>
                            <div key={i} style={{position: 'relative', width: '100%', height: '100%'}}>
                                <div style={{position: 'absolute', width: '98%', height: '98%', opacity: '.5', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', zIndex: '0'}}></div>
                                <div style={{position: 'absolute', width: '98%', height: '98%', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: ''}}>
                                    <button onClick={()=>setSubPage(page)} style={{width: '100%', height: '100%', padding: '2%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #aaf, #fff)', overflow: 'auto'}}> 
                                        {page}
                                    </button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                {subPage == 'Hebrew' && <TLiterator/>}
                {subPage == 'Spider' && <SpiderAX/>}
            </>
        }
        {page == 'Soils' &&  
            <>
                <h1>Soils</h1><br/>
                <div className="row">
                    {(['Soil', 'Molecules', 'Nutrients', 'Drainage', 'Composts', 'Mapping']).map((page, i)=>{
                        return <div key={i} className="col-4" style={{height: '100px'}}>
                            <div key={i} style={{position: 'relative', width: '100%', height: '100%'}}>
                                <div style={{position: 'absolute', width: '98%', height: '98%', opacity: '.5', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', zIndex: '0'}}></div>
                                <div style={{position: 'absolute', width: '98%', height: '98%', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: ''}}>
                                    <button onClick={()=>setSubPage(page)} style={{width: '100%', height: '100%', padding: '2%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #aaf, #fff)', overflow: 'auto'}}> 
                                        {page}
                                    </button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                {subPage == 'Soil' && <Soil/>}
                {subPage == 'Molecules' && <Molecules/>}
                {subPage == 'Nutrients' && <Nutrients/>}
                {subPage == 'Drainage' && <Drainage/>}
                {subPage == 'Composts' && <Composts/>}
                {subPage == 'Mapping' && <Mapping/>}
            </>
        }
        {page == 'VeggieTable' && 
            <>
                <h1>VeggieTable</h1><br/>
                <div className="row">
                    {(['VeggieTable']).map((page, i)=>{
                        return <div key={i} className="col-4" style={{height: '100px'}}>
                            <div key={i} style={{position: 'relative', width: '100%', height: '100%'}}>
                                <div style={{position: 'absolute', width: '98%', height: '98%', opacity: '.5', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #777, #fff)', zIndex: '0'}}></div>
                                <div style={{position: 'absolute', width: '98%', height: '98%', margin: '1%', padding: '1%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: ''}}>
                                    <button onClick={()=>setSubPage(page)} style={{width: '100%', height: '100%', padding: '2%', border: '1% outset #aaa', borderRadius: '22px', backgroundImage: 'linear-gradient(to bottom right, #aaf, #fff)', overflow: 'auto'}}> 
                                        {page}
                                    </button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                {subPage == 'VeggieTable' && <VeggieTable/>}
            </>
        }
    </div>
}
