import { createMachine } from "xstate"
export default function SM(){
    const xsm = 
/** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAjAAYAnADoAHBIAsA6UKFyAbNJnT0AT0QAmCWO3CRAVm0B2IxNMSRQpduRoQxctVp0xAZXYkATuwAEAOIkRGCMLGyc3HyCRqaSMnIKyqrS6iBaCAICRmJKIkp2EnFCRkaF0g7ozpQ09J7efkEhYGIAPAB8bQD0HeGsHFw8SCD8CNqlCbLyitIqapo6QtpiAjJCM-kWChIODkA */
createMachine({
    states: {
        "Start Game": {
            states: {
                "<></>": {}
            },

            initial: "<></>"
        }
    },

    initial: "Start Game"
})
    return <>{xsm.initial}</>
}