import { FC } from 'react'
import { Elements } from '../../app/bible/bible'
//import { Elements } from '../bible/bible'

interface pageProps{params, searchParams}
const bible = new Elements()
//INITIAL
const page: FC<pageProps> = ({params, searchParams})=>{
    return <div>Hello Realm!
        <pre>{JSON.stringify(params)}</pre>
        <pre>{JSON.stringify(searchParams)}</pre>
        <div>
            <h1>In the beginning {bible.THEY} create the sky and the dry land. "Air, Earth"</h1>
            {//an idea, a creative process
            }
            <h1>Now the earth was baren and had not been shapen by intention, and darkness was upon the face of the deep -Tehom. "gravity"</h1>
            {//a blank canvas
            }
            <h1>And Roc of {bible.ELOHIM} floating above the face of the waters. "smell, Water"</h1>
            {//perspective
            }
            <h1>And said {bible.ELOHIM}, thet there be light, and there was light</h1>
            {//imagination, vision
            }
            <>And God saw that the light was good.</>
            {//inspection, evaluation
            }
            <>Now there was evening and there was morning. Day 1</>
            {//rest, reflection
            }
        </div>
    </div>
}
export default page

