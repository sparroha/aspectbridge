import { FC } from 'react'

interface pageProps{params, searchParams}
//INITIAL
const page: FC<pageProps> = ({params, searchParams})=>{
    return <div>Hello Realm!</div>
}
export default page

