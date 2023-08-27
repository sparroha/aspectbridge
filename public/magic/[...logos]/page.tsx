import { FC } from 'react'
import Spell from '../-spell+'

interface pageProps{params: {logos: string[]}, searchParams}
//INITIAL
const page: FC<pageProps> = ({params, searchParams})=>{
    return <Spell logos={params.logos}/>
}
export default page

