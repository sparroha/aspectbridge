'use client'

import { stylex } from "@stylexjs/stylex"
import { useEffect } from "react"

const styles = stylex.create({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#eee',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#ddd',
        },
    },
})

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