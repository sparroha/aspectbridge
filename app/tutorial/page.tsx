import React from 'react'
import ContextBlock from './context'
import fetchIP from '../../lib/util/fetchip'


export default async function TutorialContextProvider({params, searchParams}){
    const ip = await fetchIP()
   
    return <div>
        <ContextBlock>
            <br/>params:{JSON.stringify(params)}
            <br/>searchParams:{JSON.stringify(searchParams)}
        </ContextBlock>
    </div>
}


