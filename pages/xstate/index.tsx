import { Button } from "react-bootstrap"
import { createMachine } from "xstate"
export default function SM(){
    const xsm = 
/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOinQCcIx8BibMAGwAcBtABgF1FRmB7WLgAuuPvh4gAHogCMAVgAsJdgHYAzGpUBOOTIBse9vL0AaEAE9EAWnUk17BQA5Hcx3oUAmOSscyAvn5maFh4hKQYFLjoMLSw2JRgHNxIIPyCImIS0ggyMiTqKuyqMgq5MmoevmaWCFblWnYOzq7uXj4BQRg4BMQksEIUAK5QUIxgsfGoiVwSacKi4inZeiQeHuweWo4qeoWOWwoK1daV7Ha6Wx65BlpaHh0gwd1hfQPDo+OYfKjMkai4sGmyV4AnmmSWsg8amUrT0UK0RjUuw8x1qVzO7D0uUcRhKKgUWIeT1CvWYYCw4wY6EYSVmoIyi1A2Q8u1WPmcMhU8n2MhRFmseJIch0BJ2+JkDhUciJXRJpDw1FoAGFsJF+rSUnMGVlIdDMZ51I41J5KnI+TUrMa5EKPAotAoHAiVGsDDKQj1SABlakAN3QDNov0GhA1IPSCx1CBZKjZzl8XNcWl5qKslSUlV5GluWjU9sUAUCIHwfGo8BSxI9dPD4KZ1icqz09gc9k2Pl0pn5tQUxtWigq9kOSL0WhUbuevXIVBoVbBjKkiA8+OU6k0On0hmMKaXihczili4JrjHcpIESiMBn2ohOQxK+07Y3cjhW4aA+abk83l8x49ryGIzGS8I2vKwzhZTY7l3ZxdhkbY5BTK48jfXdWi-H8XgVMAgJredajAxsim7DYRxcTdO0tAl8j0D84QdKFDnQ0lyUwLDNXpYDayjPRrSxM13H2NoqnIxDGicFDP3aQsKxeb1GD9K8w1nSMWSULkCUMQwthKNQU2NFYdhoy52DkVRRwLIA */
createMachine({
    states: {
        garden: {
            on: {
                help: "mariage"
            }
        },

        mariage: {
            on: {
                share: "struggle"
            }
        },

        struggle: {
            on: {
                shame: "hide",
                comprimise: "peace"
            }
        },

        hide: {
            on: {
                Christ: "Salvation"
            }
        },

        peace: {
            on: {
                heal: "garden"
            }
        },

        Salvation: {
            on: {
                prune: "peace"
            }
        }
    },

    initial: "garden"
})
    return <>
        {xsm.initial}<br/><br/>
        {JSON.stringify(xsm.states.garden.id)}<br/><br/>
        {JSON.stringify(xsm.states.mariage)}<br/><br/>
        {JSON.stringify(xsm.states.struggle.on)}<br/><br/>
        {JSON.stringify(xsm.states.hide.on)}<br/><br/>
        {JSON.stringify(xsm.states.peace.on)}<br/><br/>
        {JSON.stringify(xsm.states.Salvation.on)}<br/><br/>

        {JSON.stringify(xsm.events)}<br/><br/>
        {xsm.events[0]}<br/><br/>
        {xsm.events.map((event)=>{
            return <Button onClick={()=>{xsm.transition(xsm.initialState, event)}}>{event}</Button>
        })}<br/><br/>
        {xsm.transition(xsm.initialState, "help").value}<br/><br/>
    </>
}
