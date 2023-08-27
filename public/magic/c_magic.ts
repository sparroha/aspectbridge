import { TLitter } from "../../components/hebrew"

const typelist: string[] = [
    'none',
    'water',
    'fire',
    'air',
    'earth',
    'weak',
    'strong',
    'em',
    'gravity'
]
export class Magic{
    logos: string[]
    name: string
    types: string[]
    functions: string[]

    constructor(logos: string[]){
        this.logos = logos || []
        this.name = logos[0] || ''
        this.types = logos[1]?.split('-') || [typelist[0]]
        this.functions = logos[2]?.split('-') || []
        this.hebrew(this.types)
    }
    hebrew(types: string[]){
        let hebrew: TLitter[] = []
        types.map((type)=>{
            switch(type){
                
            }
        })
    }

    action(v){
        
        return this
    }
}

const spell: Magic = new Magic([]).action(1)