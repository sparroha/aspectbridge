import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Ashmore from "./ashmore";
import Bill from "./bill";

export function Client(){
    const router = useRouter()
    const { pid } = router.query
    const [client, setClient] = useState(pid);
    switch(client){
        case 'ashmore': return <Ashmore />;
        case 'bill': return <Bill />;
        default: return <></>;
    }
}