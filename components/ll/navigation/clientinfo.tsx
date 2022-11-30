import { useEffect, useState } from "react"
import Ashmore, { AshmoreNav } from "../../../pages/josh/clients/ashmore"
import Bill from "../../../pages/josh/clients/bill"

export default function useClientInfo(path){
    let clinfo = { info: <></>, nav: <></>, subnav: <></> };
    let info = <></>
    let nav = <></>
    let subnav = <></>
        if(path){
            switch(path.dir){
                case 'dashboard': {
                    info= <>Dashboard</>
                    nav= <>DashboardNav</>
                    subnav= <>ClientNav</>
                }
                break;
                case 'ashmore': { 
                    info = <Ashmore />
                    nav = <AshmoreNav />
                    switch(path.sub){
                        case 'yards': {info = <>Yards</>; nav = <>YardsNav</>}
                        break;
                        case 'trimmings': {info = <>Trimmings</>; nav = <>TRIMMINGS</>}
                        break;
                        case 'hardees': {info = <>Hardees</>; nav = <>HARDEES</>}
                        break;
                        default: {info = <Ashmore />, <AshmoreNav />}
                        break;
                    }
                } break;
                case 'bill': { 
                    nav = <Bill />
                    switch(path.sub){
                        case 'yards': {info = <>Yards</>; nav = <>YardsNav</>}
                        break;
                        case 'trimmings': {info = <>Trimmings</>; nav = <>TRIMMINGS</>}
                        break;
                        case 'hardees': {info = <>Hardees</>; nav = <>HARDEES</>}
                        break;
                        default: {info = <>Yards</>}
                        break;
                    }
                } break;
                case 'graves': { 
                    nav = <>Graves</>
                    switch(path.sub){
                        case 'yards': {info = <>Yards</>; nav = <>YardsNav</>}
                        break;
                        case 'trimmings': {info = <>Trimmings</>; nav = <>TRIMMINGS</>}
                        break;
                        case 'hardees': {info = <>Hardees</>; nav = <>HARDEES</>}
                        break;
                        default: {info = <>Yards</>}
                        break;
                    }
                } break;
                default: {
                    info = <>Client/Dashboard</>
                    nav = <>ClientNav</>
                    subnav = <>NA</>
                } break;
            } clinfo = { info: info, nav: nav, subnav: subnav }
        }
    return clinfo;
}