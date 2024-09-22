'use client'
import { useEffect, useState } from "react";

class Word {
    ['prefix']: string[]
    root: string
    suffix: string[]

    constructor(prefix: string | string[], root: string, suffix: string | string[]) {
        
        if (typeof prefix === 'string') {
            this['prefix'] = [prefix]
        }else this['prefix'] = prefix
        
        this['root'] = root

        if (typeof suffix === 'string') {
            this['suffix'] = [suffix]
        } else this['suffix'] = suffix

        this.process()
        
    }
    process = ()=> {
        
        let processed: string[] = []

        this['prefix'].forEach((p, i)=>{
            switch (p) {
                case 'again':
                case 're':
                    processed[i] = 're'//again
                    break
                case 'with':
                case 'com':
                case 'con':
                    processed[i] = this['root'].charAt(0)=='b'?'com':'con'//with
                    break
                case 'dis':
                    processed[i] = 'away'
                    break
                case 'in':
                    processed[i] = 'not'
                    break
                case 'un':
                    processed[i] = 'not'
                    break
                case 'pre':
                    processed[i] = 'before'
                    break
                case 'pro':
                    processed[i] = 'for'
                    break
                case 'sub':
                    processed[i] = 'under'
                    break
            }
        })
        this['prefix'] = processed
        processed = []

        this['suffix'].forEach((s, i)=>{
            switch (s) {
                case 'able':
                    processed[i] = 'able'
                    break
                case 'al':
                    processed[i] = 'al'
                    break
                case 'ed':
                    processed[i] = 'ed'
                    break
                case 'en':
                    processed[i] = 'made of'
                    break
                case 'ate':
                case 'at':
                    processed[i] = i==this['suffix'].length-1?'ate':'at'
                    break
                case 'er':
                    processed[i] = 'er'
                    break
                case 'ion':
                    processed[i] = 'ion'
                    break
                case 'ing':
                    processed[i] = 'ing'
                    break
                case 'or':
                    processed[i] = 'or'
                    break
                case 'es':
                case 's':
                    processed[i] = this['root'].charAt(this['root'].length-1)=='e'?'es':'s'//with
                    break
                case 'tion':
                    processed[i] = 'tion'
                    break
                case 'y':
                    processed[i] = 'characterized by'
                    break
            }
        })
        this['suffix'] = processed
        processed = []
        

        
        processed[0] = this['root']
        switch (processed[0].charAt(processed[0].length-1)) {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
            case 'y':
                processed[0] = processed[0].slice(0,-1)
                break
        }
        this['root'] = processed[0]

    }

    say: ()=>string = ()=>{
        return this['prefix'].join('')+
            this['root']+
            this['suffix'].join('')
    }
}
//const word: string = prefix(new Root('root','pre'))?.['suffix']?.()


export default function Page({params, searchParams}){
    const [word, setWord] = useState(new Word(['again','with'],'bini',['ate','ion']))

    
    return <div style={{color: 'white'}}>
        <h1>{"Word(['again','with'],'bini',['ate','ion'])"}</h1>
        <h2>{word.prefix.concat([word.root]).concat(word.suffix).join(',')}</h2>
        <h3>{word.say()}</h3>
    </div>
}