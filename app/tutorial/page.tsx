import React from 'react'
import ContextBlock from './context'
import useIP from '../../lib/util/^ip'

export default async function TutorialContextProvider({params, searchParams}){
   
    return <div>
        <ContextBlock>
            <br/>params:{JSON.stringify(params)}
            <br/>searchParams:{JSON.stringify(searchParams)}
        </ContextBlock>
    </div>
}


