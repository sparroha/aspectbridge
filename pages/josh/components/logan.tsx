import React, { useEffect, useState } from 'react';
import jsObjs from '../jsobjs';
const jo = jsObjs();
export default function Example(){
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
        </div>
    );
}

function useClientGroup(client){
    const [page, setPage] = useState(jo.page.home.html);
    return
        <button onClick={() => setPage(jo.page.home.html)}>
            Click me
        </button>
}