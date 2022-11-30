import { useEffect, useState } from "react"
import Andrew, { AndrewNav } from "../../../pages/josh/clients/andrew/andrew";
import Ashmore, { AshmoreNav } from "../../../pages/josh/clients/ashmore/ashmore"
import Bill, { BillNav } from "../../../pages/josh/clients/bill/bill"

export default function getClientInfo(path){
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
                case 'andrew': { 
                    info = <Andrew />
                    nav = <AndrewNav />
                    switch(path.sub){
                        case 'yards': {info = <>Yards</>; nav = <AndrewNav />}
                        break;
                        case 'trimmings': {info = <>Trimmings</>; nav = <AndrewNav />}
                        break;
                        case 'hardees': {info = <>Hardees</>; nav = <AndrewNav />}
                        default: {info = <Andrew />, <AndrewNav />}
                        break;
                    }
                } break;
                case 'ashmore': { 
                    info = <Ashmore />
                    nav = <AshmoreNav />
                    switch(path.sub){
                        case 'yards': {info = <>Yards</>; nav = <AshmoreNav/>}
                        break;
                        case 'trimmings': {info = <>Trimmings</>; nav = <AshmoreNav/>}
                        break;
                        case 'hardees': {info = <>Hardees</>; nav = <AshmoreNav/>}
                        break;
                        default: {info = <Ashmore />, <AshmoreNav />}
                        break;
                    }
                } break;
                case 'bill': { 
                    info = <Bill />
                    nav = <BillNav />
                    switch(path.sub){
                        case 'yards': {info = <>Yards</>; nav = <BillNav/>}
                        break;
                        case 'trimmings': {info = <>Trimmings</>; nav = <BillNav/>}
                        break;
                        case 'hardees': {info = <>Hardees</>; nav = <BillNav/>}
                        break;
                        default: {info = <Bill />, <AshmoreNav />}
                        break;
                    }
                } break;
                case 'graves': { 
                    info = <Bill />
                    nav = <BillNav />
                    switch(path.sub){
                        case 'yards': {info = <>Yards</>; nav = <BillNav/>}
                        break;
                        case 'trimmings': {info = <>Trimmings</>; nav = <BillNav/>}
                        break;
                        case 'hardees': {info = <>Hardees</>; nav = <BillNav/>}
                        break;
                        default: {info = <Bill />, <AshmoreNav />}
                        break;
                    }
                } break;
                default: {
                    info = <>Client/Dashboard/Loading...</>
                    nav = <>ClientNav...</>
                    subnav = <>NA...</>
                } break;
            } clinfo = { info: info, nav: nav, subnav: subnav }
        }
    return clinfo;
}