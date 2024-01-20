'use client'
import { useDynamicContext } from "./provider"

const poetica = {
    oneLiners: [],
    stanzas: [],
    verses: [],
    rhymes: [],
}
export default function Page({params, searchParams}){
    const {state, dispatch} = useDynamicContext()

    return <div id={'field'} style={{position: 'relative', background: 'white', height: '100%'}}>
        <table><tbody>
            <tr style={{borderBottom: '1px solid black'}}> <th>Yimir</th>&nbsp;&nbsp;<th></th>&nbsp;&nbsp;<th></th>&nbsp;&nbsp;<th></th> </tr>
            <tr> <td>Not God</td>&nbsp;|&nbsp;<td>Father to 3 or 4 races</td>&nbsp;|&nbsp;<td>first man</td>&nbsp;|&nbsp;<td>First Rime-giant</td> </tr>
        </tbody></table>
        <table><tbody>
            <tr style={{borderBottom: '1px solid black'}}> <th>Yimir</th>&nbsp;&nbsp;<th></th>&nbsp;&nbsp;<th></th>&nbsp;&nbsp;<th></th> </tr>
            <tr> <td>Not God</td>&nbsp;|&nbsp;<td>Father to 3 or 4 races</td>&nbsp;|&nbsp;<td>first man</td>&nbsp;|&nbsp;<td>First Rime-giant</td> </tr>
        </tbody></table>
        <table><tbody>
            <tr style={{borderBottom: '1px solid black'}}> <th>Yimir</th>&nbsp;&nbsp;<th></th>&nbsp;&nbsp;<th></th>&nbsp;&nbsp;<th></th> </tr>
            <tr> <td>Not God</td>&nbsp;|&nbsp;<td>Father to 3 or 4 races</td>&nbsp;|&nbsp;<td>first man</td>&nbsp;|&nbsp;<td>First Rime-giant</td> </tr>
        </tbody></table>
        <table><tbody>
            <tr style={{borderBottom: '1px solid black'}}> <th>Yimir</th>&nbsp;&nbsp;<th></th>&nbsp;&nbsp;<th></th>&nbsp;&nbsp;<th></th> </tr>
            <tr> <td>Not God</td>&nbsp;|&nbsp;<td>Father to 3 or 4 races</td>&nbsp;|&nbsp;<td>first man</td>&nbsp;|&nbsp;<td>First Rime-giant</td> </tr>
        </tbody></table>
    </div>
}

export const SelectableItem = ({children})=>{
    return <div>
        {children}
    </div>
}