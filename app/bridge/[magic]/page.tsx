import { FC } from 'react'

interface pageProps{params: {magic: string[]}, searchParams}
class Magic{
    magic: string[]
    constructor(magic: string[]){
        this.magic = magic
    }
}

const page: FC<pageProps> = ({params, searchParams})=>{
    const magic: Magic = new Magic(params.magic)
    if(!magic) return <div>Bridge Loading...</div>
    return <Main magic={magic}/>
}
export default page
function Main({magic}){
    return <div>{JSON.stringify(magic)}</div>
}

