'use client'

import { stylex } from "@stylexjs/stylex"
import { useEffect } from "react"
import { styles } from "../layout"

export default function Hello(){
    useEffect(()=>{
        console.log('Hello')
    },[])
    
    return <div {...stylex.props(styles.title)}>
        {'Hello'}
        wendh: {JSON.stringify({wendh})}<br/>
        hweh: {JSON.stringify({hweh})}
        </div>
}

const wendh = [//wind,wrap
    'wantuz',//glove
]
const hweh = [//want
    'wanaz',//lack
]