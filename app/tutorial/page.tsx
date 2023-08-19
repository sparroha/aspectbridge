import React from 'react'
import ContextBlock from './context'
import useIP from '../../lib/util/^ip'


export default async function TutorialContextProvider({params, searchParams}){
    const ip = useIP()
   
    return <div>
        <ContextBlock>
            <br/>params:{JSON.stringify(params)}
            <br/>searchParams:{JSON.stringify(searchParams)}
        </ContextBlock>
    </div>
}


