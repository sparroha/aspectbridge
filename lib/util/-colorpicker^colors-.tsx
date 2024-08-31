import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useUserSave } from "./^userSave"
import { useAutoSave } from "./^autosave";

export default function ColorPicker({id, username, colors, setColors, children}:{id: string, username: string, colors: string[], setColors: Dispatch<SetStateAction<string[]>>, children: any}){
    const [save, loading] = useUserSave('colorPicker:'+id, username, colors, setColors)
    useAutoSave(save, loading, colors)
    useEffect(()=>{
        if(typeof colors == 'string')setColors([colors])
        else if(colors instanceof Array){
            if(colors[0].length < 4)setColors([colors.join('')])
            else setColors(colors)
        }
        //setColors((c)=>typeof colors == 'string'?[colors]:c)
    },[colors])

    const picker = {width: '15px', height: '15px', border: '1px solid grey', margin: '3 3 0 0', padding: 0}
    const stl = {top: '0%', left: '100%', lineHeight: '1em'}
    if(!colors) return <div style={{position: 'relative'}}>{children}</div>
    return <div style={{position: 'relative'}}>
        {children}
        <div style={{position: 'absolute', ...stl}}>
            {!(colors  instanceof Array)?<>{JSON.stringify(colors)}</>:colors?.map((color, i)=>{
                return <input key={'colorPicker:'+id+i} type="color" style={picker} value={color || '#777777'} 
                    onChange={(e)=>{
                        setColors((clrs)=>{
                            return [...clrs.map((c,j)=>{
                                return i==j?e.target.value:c
                            })]
                        })
                    }}/>
            })}
        </div>
    </div>
}

const fillNewArray = (count: number)=>{
    return [...Array(count).map((c,i)=>'#777777')]
}
export function useColors(colorCount: number, defaultColors?: string[]): [string[], Dispatch<SetStateAction<string[]>>]{
    const [colors, setColors] = useState(defaultColors || fillNewArray(colorCount))
    return [colors, setColors]
}