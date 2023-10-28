import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useUserSave } from "./^userSave"

export default function ColorPicker({id, username, colors, setColors, children}:{id: string, username: string, colors: string[], setColors: Dispatch<SetStateAction<string[]>>, children: any}){
    const [save, loading] = useUserSave(
        'colorPicker:'+id, 
        username || 'login:admin', 
        colors, 
        (c: string[])=>{
            console.log('colors','set', c)
            setColors((x)=>c)
        }
    )
    useEffect(()=>{
        console.log('loading', /*loading,*/ colors, username)
        if(loading) return
        const i = setInterval(()=>{
            console.log('useEffect','save','colorPicker:'+id, username || 'login:admin',colors)
            save()
        }, 1000)
        return ()=>clearInterval(i)
    },[loading, colors, username])

    const picker = {width: '15px', height: '15px', border: '1px solid grey', margin: 0, padding: 0}
    const stl = {top: '0%', left: '100%', lineHeight: '1em'}
    return <div style={{position: 'relative'}}>
        {children}
        <div style={{position: 'absolute', ...stl}}>
            {colors?.map((color, i)=>{
                return <input key={'colorPicker:'+id+i} type="color" style={picker} value={'#'+( (color!=undefined && color) || '777777')} 
                    onChange={(e)=>{
                        setColors((clrs)=>{return clrs.map((c,j)=>{return i==j?e.target.value.slice(1):c})})
                    }}/>
            })}
        </div>
    </div>
}

export function useColors(colorCount: number, colorDefault?: string[]): [string[], Dispatch<SetStateAction<string[]>>]{
    const [colors, setColors] = useState(colorDefault || [...Array(colorCount).map((c,i)=>{return '777777'})])
    return [colors, setColors]
}