import { createMachine } from "xstate"
export default function SM(){
    const xsm = createMachine({
        initial: 'ready'
    })
}