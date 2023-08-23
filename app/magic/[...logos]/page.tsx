import { FC } from 'react'
import { Magic } from '../c_magic'

interface pageProps{params: {logos: string[]}, searchParams}
//INITIAL
const page: FC<pageProps> = ({params, searchParams})=>{
    const magic: Magic = new Magic(params.logos)
    return <Main magic={magic}/>
}
export default page
//JSX
function Main({magic}: {magic: Magic}){
    return <div>
        {JSON.stringify(magic)}
    </div>
}

