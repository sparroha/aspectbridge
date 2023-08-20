import React from 'react'
import ContextBlock from './context'

export default async function TutorialContextProvider({params, searchParams}){
   
    return <div>
        <ContextBlock>
            <br/>params:{JSON.stringify(params)}
            <br/>searchParams:{JSON.stringify(searchParams)}
        </ContextBlock>
    </div>
}


