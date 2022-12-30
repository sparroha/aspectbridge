import { createMachine } from "xstate"
export default function SM(){
    const xsm = 
/** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAjADoArAHYATCIAMATjEA2EQqnoAnogC0ADiETZ0sdoViALAGYBC09JXI0IYuWq06QgE5gSEDUmasOLh4-fgRTWVFJGXklFRF1RCMhAVkFFVMxERFtEVlzbXt7IA */
createMachine({
    states: {
        ready: {}
    },

    initial: "ready"
})
    return <>{xsm.initial}</>
}