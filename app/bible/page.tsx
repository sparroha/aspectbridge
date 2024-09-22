'use client'

import { create, createStore } from "zustand"
type StateEntry = {
    [key: string]: string | ((name: string, value: string) => void)
}
type State = StateEntry &{
    ELOHIM: string
    fmake: (name: string, value: string) => void
}

const useStore = create((set) => ({
    ELOHIM: 'ELOHIM',
    fmake: (name, value) => set((state) => ({ ...state, [name]: value })),
}))
useStore.subscribe((state: State) => console.log('new state', state))
//context?

export default function Gen({params, searchParams}) {
    //create = (set: ()=>{}) => ({})
    /*const useStore = create((set) => ({
        ELOHIM: 'ELOHIM',
        fmake: (name, value) => set((state) => ({ ...state, [name]: value })),
    }))
    useStore.subscribe((state: State) => console.log('new state', state))*/
    const make = useStore((state: State) => state.fmake)
    const el = useStore((state: State) => state.ELOHIM)

    const c = params.chapter
    const v = params.verse
    if(c==1&&(!v||v==2))return <>
        In the Beginning there was water and air<br/>
        "And the Spirit of {el} was hovering over the face of the waters"<br/>
        "And the breath of {el} was growing soft over the face of the waters"<br/>
        "And {el} smelled the water"<br/>
    </>
     
    if(c==1&&v==3)return <>
        "And {el} said Yehi Aur, and there was light"
    </>
    
    if(c==1&&v==4){
        let Bein = ['interval', 'spance between']
        let Bin = ['divide', 'discern']
        let Binah = 'understanding'
        
        let Ben = ['anointed', 'son']
        let Benah = ['build', 'obtain children', 'make', 'set up']

        let Bneyan = ["structure, building"]
        return <>
            "And {el} saw the light, that it was good"
            "And {el} divided between the light and between the darkness"
            "And {el} did badel 'Ben haAur' and 'Ben haChoshek'"
        </>
    }
    return <>
        <a href="https://scripture.api.bible/admin/applications/1409624938121?service_id=2555417731121">scripture.api.bible/admin</a><br/>
        <a href="https://scripture.api.bible/livedocs#/Bibles/getBibles">scripture.api.bible/livedocs#/Bibles/getBibles</a>
    </>
}