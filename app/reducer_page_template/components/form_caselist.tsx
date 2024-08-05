import React from "react"
import { StateContext } from "../provider"

export default function CaseListForm(){
    const [state, dispatch] = React.useContext(StateContext)
    function removeCase(name: string) {
        dispatch({type: 'REMOVE_CASE', payload: name})
    }
    return <ul>
        {state.cases.map((c, i) => <li key={i}>
            {c.name}: {c.value}
            <button onClick={() => removeCase(c.name)}>Remove</button>
        </li>)}
    </ul>
}